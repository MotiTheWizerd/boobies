"use client";

import React, { useState, useEffect } from "react";
import { AdFormProps, AdFormData } from './types';
import FormHeader from './FormHeader';
import PersonalDetails from './PersonalDetails';
import FileUploadSection from './FileUploadSection';
import LocationSelector from './LocationSelector';
import StatusControls from './StatusControls';
import FeatureToggles from './FeatureToggles';

export default function AdForm({
  onSubmit,
  isSubmitting = false,
  defaultValues = {},
  ad_id,
}: AdFormProps) {
  const [form, setForm] = useState<AdFormData>({
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
    areaIds: defaultValues.areaIds || [],
    cityId: defaultValues.cityId || "",
    files: defaultValues.files || [],
    defaultFileName: defaultValues.defaultFileName || "",
    service_type: defaultValues.service_type || "INCALL",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch ad data in edit mode
  useEffect(() => {
    if (!ad_id) return;
    
    const fetchAdData = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        const response = await fetch(`/api/ads/${ad_id}`);
        if (!response.ok) throw new Error("Failed to fetch ad details");
        
        const data = await response.json();
        let areaIds = [];
        if (data.areas && Array.isArray(data.areas)) {
          areaIds = data.areas.map((adArea: any) => adArea.areaId?.toString() || '').filter(Boolean);
        } else if (data.areaIds && Array.isArray(data.areaIds)) {
          areaIds = data.areaIds.map((id: any) => id?.toString() || '').filter(Boolean);
        }

        setForm({
          ...form,
          ...data,
          areaIds,
          tags: data.tags ? (Array.isArray(data.tags) ? data.tags.join(", ") : data.tags) : "",
          files: [],
          defaultFileName: data.images && data.images.length > 0 ? 
            data.images.find((img: any) => img.isDefault)?.fileName || data.images[0]?.fileName || "" 
            : "",
        });
      } catch (err: any) {
        console.error('Error fetching ad:', err);
        setFetchError(err.message || "Error loading ad");
      } finally {
        setLoading(false);
      }
    };

    fetchAdData();
  }, [ad_id]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "שדה חובה";
    if (!form.status) newErrors.status = "שדה חובה";
    if (!form.campaignId) newErrors.campaignId = "חובה לבחור קמפיין";
    if (!form.areaIds || form.areaIds.length === 0) newErrors.areaIds = "חובה לבחור לפחות אזור אחד";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAreaChange = (areaIds: (string | number)[]) => {
    setForm((prev) => ({
      ...prev,
      areaIds,
      cityId: "", // Reset city when area changes
    }));
    if (errors.areaIds) {
      setErrors((prev) => ({ ...prev, areaIds: "" }));
    }
  };

  const handleFilesChange = (files: File[]) => {
    setForm((prev) => ({
      ...prev,
      files,
      defaultFileName: prev.defaultFileName || (files.length > 0 ? files[0].name : ""),
    }));
  };

  const handleSetDefaultFile = (file: File) => {
    setForm((prev) => ({
      ...prev,
      defaultFileName: file.name,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const dataToSubmit = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        cityId: form.cityId ? parseInt(form.cityId.toString()) : undefined,
        areaIds: form.areaIds,
      };

      await onSubmit({
        ...dataToSubmit,
        files: form.files,
        defaultFileName: form.defaultFileName,
      });
    } catch (err: any) {
      console.error("Error in handleSubmit:", err);
      setErrors({ general: err.message || "Error processing ad" });
    }
  };

  if (loading) return <div className="p-6 text-center">טוען נתוני מודעה...</div>;
  if (fetchError) {
    return (
      <div className="p-6 text-center text-red-500">
        שגיאה בטעינת נתוני מודעה: {fetchError}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto transition-all duration-200 ease-in-out">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <FormHeader isEdit={!!ad_id} />

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="shortDescription">
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="description">
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

          <FeatureToggles
            isHappyHour={form.isHappyHour}
            isHot={form.isHot}
            isPremium={form.isPremium}
            priority={form.priority}
            onChange={handleChange}
          />

          <StatusControls
            status={form.status}
            serviceType={form.service_type}
            tags={form.tags}
            onChange={handleChange}
            errors={errors}
          />

          <LocationSelector
            areaIds={form.areaIds}
            cityId={form.cityId}
            onAreaChange={handleAreaChange}
            onCityChange={handleChange}
            errors={errors}
          />

          <FileUploadSection
            files={form.files}
            defaultFileName={form.defaultFileName}
            onFilesChange={handleFilesChange}
            onSetDefaultFile={handleSetDefaultFile}
          />

          <PersonalDetails
            form={form}
            onChange={handleChange}
          />
        </div>

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
