"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NewClientPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "שם הלקוח הוא שדה חובה";
    }

    if (!formData.title.trim()) {
      newErrors.title = "תפקיד הוא שדה חובה";
    }

    if (!formData.email.trim()) {
      newErrors.email = "דוא״ל הוא שדה חובה";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "כתובת דוא״ל לא תקינה";
    }

    if (
      formData.mobile &&
      !/^\d{9,10}$/.test(formData.mobile.replace(/[-\s]/g, ""))
    ) {
      newErrors.mobile = "מספר טלפון לא תקין";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "אירעה שגיאה בעת יצירת הלקוח");
      }

      // Redirect to clients list on success
      router.push("/office/clients");
    } catch (err: any) {
      console.error("Error creating client:", err);
      setServerError(err.message || "אירעה שגיאה בעת יצירת הלקוח");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Link
          href="/office/clients"
          className="inline-flex items-center text-primary hover:text-primary/90 dark:text-primary-light dark:hover:text-primary-light/90"
        >
          <ArrowRight className="mr-2 h-4 w-4 rtl:rotate-180" />
          חזרה לרשימת הלקוחות
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">
          לקוח חדש
        </h1>
        <p className="text-gray-500 dark:text-gray-400">הוסף לקוח חדש למערכת</p>
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-800 dark:bg-red-950 dark:border-red-900 dark:text-red-300 rounded-md p-4">
          {serverError}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                שם הלקוח <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors.name
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                placeholder="הזן שם לקוח"
                dir="rtl"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                תפקיד <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors.title
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                placeholder="הזן תפקיד"
                dir="rtl"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                דוא״ל <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors.email
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                placeholder="הזן כתובת דוא״ל"
                dir="ltr"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="mobile"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                נייד
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors.mobile
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600"
                } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white sm:text-sm`}
                placeholder="הזן מספר נייד"
                dir="ltr"
              />
              {errors.mobile && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.mobile}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 rtl:space-x-reverse">
            <Link
              href="/office/clients"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              ביטול
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-primary dark:bg-primary-light border border-transparent rounded-md hover:bg-primary/90 dark:hover:bg-primary-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "שומר..." : "שמור לקוח"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
