"use client";

import React, { useState, useEffect } from "react";
import Areas from "@/components/Areas/Areas";

interface AdFormProps {
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
  defaultValues?: {
    name?: string;
    description?: string;
    shortDescription?: string;
    isHappyHour?: boolean;
    isHot?: boolean;
    isPremium?: boolean;
    priority?: boolean;
    status?: string;
    tags?: string;
    campaignId?: string;
    age?: string;
    country?: string;
    titsSize?: string;
    mobile?: string;
    whatsapp?: string;
    telegram?: string;
    areaId?: string | number;
  };
  ad_id?: string; // Optional ad_id for edit mode
}

const statusOptions = [
  { value: "active", label: "פעיל" },
  { value: "draft", label: "טיוטה" },
  { value: "archived", label: "ארכיון" },
];

export default function AdForm({
  onSubmit,
  isSubmitting = false,
  defaultValues = {},
  ad_id,
}: AdFormProps) {
  const [form, setForm] = useState({
    name: defaultValues.name || "",
    description: defaultValues.description || "",
    shortDescription: defaultValues.shortDescription || "",
    isHappyHour: defaultValues.isHappyHour || false,
    isHot: defaultValues.isHot || false,
    isPremium: defaultValues.isPremium || false,
    priority: defaultValues.priority || false,
    status: defaultValues.status || "active",
    tags: defaultValues.tags || "",
    campaignId: defaultValues.campaignId || "",
    age: defaultValues.age || "",
    country: defaultValues.country || "",
    titsSize: defaultValues.titsSize || "",
    mobile: defaultValues.mobile || "",
    whatsapp: defaultValues.whatsapp || "",
    telegram: defaultValues.telegram || "",
    areaId: defaultValues.areaId || "",
  });

  // Edit mode: fetch ad data if ad_id is provided
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!ad_id) return;
    setLoading(true);
    setFetchError(null);
    fetch(`/api/ads/${ad_id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch ad details");
        return res.json();
      })
      .then((data) => {
        setForm({
          name: data.name || "",
          description: data.description || "",
          shortDescription: data.shortDescription || "",
          isHappyHour: data.isHappyHour || false,
          isHot: data.isHot || false,
          isPremium: data.isPremium || false,
          priority: data.priority || false,
          status: data.status || "active",
          tags: data.tags ? data.tags.join(", ") : "",
          campaignId: data.campaignId || "",
          age: data.age || "",
          country: data.country || "",
          titsSize: data.titsSize || "",
          mobile: data.mobile || "",
          whatsapp: data.whatsapp || "",
          telegram: data.telegram || "",
          areaId: data.areaId || "",
        });
      })
      .catch((err) => {
        setFetchError(err.message || "Error loading ad");
      })
      .finally(() => setLoading(false));
  }, [ad_id]);

  // Restore: update form when defaultValues change, but only if not in edit mode
  useEffect(() => {
    if (ad_id) return; // Don't override edit mode
    setForm({
      name: defaultValues.name || "",
      description: defaultValues.description || "",
      shortDescription: defaultValues.shortDescription || "",
      isHappyHour: defaultValues.isHappyHour || false,
      isHot: defaultValues.isHot || false,
      isPremium: defaultValues.isPremium || false,
      priority: defaultValues.priority || false,
      status: defaultValues.status || "active",
      tags: defaultValues.tags || "",
      campaignId: defaultValues.campaignId || "",
      age: defaultValues.age || "",
      country: defaultValues.country || "",
      titsSize: defaultValues.titsSize || "",
      mobile: defaultValues.mobile || "",
      whatsapp: defaultValues.whatsapp || "",
      telegram: defaultValues.telegram || "",
      areaId: defaultValues.areaId || "",
    });
  }, [defaultValues, ad_id]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "שדה חובה";
    if (!form.status) newErrors.status = "שדה חובה";
    if (!form.campaignId) newErrors.campaignId = "חובה לבחור קמפיין";
    if (!form.areaId) newErrors.areaId = "חובה לבחור אזור";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: e.target.type === "checkbox" ? checked : value,
    }));
  };

  const handleAreaChange = (areaIdValue: string | number) => {
    setForm((prev) => ({
      ...prev,
      areaId: areaIdValue,
    }));
    if (errors.areaId) {
      setErrors((prev) => ({ ...prev, areaId: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const dataToSubmit = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      areaId: form.areaId,
    };
    if (ad_id) {
      fetch(`/api/ads/${ad_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to update ad");
          return res.json();
        })
        .then((updatedAd) => {
          onSubmit(updatedAd);
        })
        .catch((err) => {
          setErrors({ general: err.message || "Error updating ad" });
        });
    } else {
      onSubmit(dataToSubmit);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">טוען נתוני מודעה...</div>;
  }
  if (fetchError) {
    return (
      <div className="p-6 text-center text-red-500">
        שגיאה בטעינת נתוני מודעה: {fetchError}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto transition-all duration-200 ease-in-out"
    >
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Form Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {ad_id ? "עריכת מודעה" : "יצירת מודעה חדשה"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {ad_id
              ? "ערוך את פרטי המודעה"
              : "מלא את הפרטים ליצירת מודעה חדשה במערכת"}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="name"
            >
              שם מודעה <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="הכנס שם למודעה"
            />
            {errors.name && (
              <div className="text-red-500 text-xs mt-1">{errors.name}</div>
            )}
          </div>

          {/* Short Description Field */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="shortDescription"
            >
              תיאור קצר
            </label>
            <input
              id="shortDescription"
              name="shortDescription"
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
              value={form.shortDescription}
              onChange={handleChange}
              placeholder="הכנס תיאור קצר למודעה"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="description"
            >
              תיאור
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200 min-h-[120px]"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="הוסף תיאור מפורט למודעה"
            />
          </div>

          {/* Checkboxes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer group">
              <input
                type="checkbox"
                name="isHappyHour"
                checked={form.isHappyHour}
                onChange={handleChange}
                className="w-5 h-5 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-offset-gray-800"
              />
              <span className="mr-3 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                Happy Hour
              </span>
            </label>
            <label className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer group">
              <input
                type="checkbox"
                name="isHot"
                checked={form.isHot}
                onChange={handleChange}
                className="w-5 h-5 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-offset-gray-800"
              />
              <span className="mr-3 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                חם 🔥
              </span>
            </label>
            <label className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer group">
              <input
                type="checkbox"
                name="isPremium"
                checked={form.isPremium}
                onChange={handleChange}
                className="w-5 h-5 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-offset-gray-800"
              />
              <span className="mr-3 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                פרימיום ⭐
              </span>
            </label>
            <label className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer group">
              <input
                type="checkbox"
                name="priority"
                checked={form.priority}
                onChange={handleChange}
                className="w-5 h-5 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-offset-gray-800"
              />
              <span className="mr-3 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                עדיפות ⚡
              </span>
            </label>
          </div>

          {/* Status Field */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="status"
            >
              סטטוס <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
              value={form.status}
              onChange={handleChange}
              required
            >
              {statusOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-white dark:bg-gray-700"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.status && (
              <div className="text-red-500 text-xs mt-1">{errors.status}</div>
            )}
          </div>

          {/* Tags Field */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="tags"
            >
              תגיות
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
              value={form.tags}
              onChange={handleChange}
              placeholder="הכנס תגיות מופרדות בפסיקים (לדוגמה: מבצע, חורף, קיץ)"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              הפרד תגיות בעזרת פסיקים
            </p>
          </div>

          {/* Areas Dropdown */}
          <div className="space-y-2">
            <Areas
              label="אזור"
              id="areaId"
              value={form.areaId}
              onChange={handleAreaChange}
              className="w-full"
            />
            {errors.areaId && (
              <div className="text-red-500 text-xs mt-1">{errors.areaId}</div>
            )}
          </div>

          {/* Personal Details Section */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              פרטים אישיים
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age Field */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="age"
                >
                  גיל
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="הכנס גיל"
                />
              </div>

              {/* Country Field */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="country"
                >
                  מדינה
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="הכנס מדינה"
                />
              </div>

              {/* Tits Size Field */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="titsSize"
                >
                  מידת חזה
                </label>
                <input
                  id="titsSize"
                  name="titsSize"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
                  value={form.titsSize}
                  onChange={handleChange}
                  placeholder="הכנס מידת חזה"
                />
              </div>

              {/* Mobile Field */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="mobile"
                >
                  מספר נייד
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="הכנס מספר נייד"
                />
              </div>

              {/* WhatsApp Field */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="whatsapp"
                >
                  מספר וואטסאפ
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="הכנס מספר וואטסאפ"
                />
              </div>

              {/* Telegram Field */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="telegram"
                >
                  כתובת טלגרם
                </label>
                <input
                  id="telegram"
                  name="telegram"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
                  value={form.telegram}
                  onChange={handleChange}
                  placeholder="הכנס כתובת טלגרם"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "שומר מודעה..." : "שמור מודעה"}
          </button>
        </div>
      </div>
    </form>
  );
}
