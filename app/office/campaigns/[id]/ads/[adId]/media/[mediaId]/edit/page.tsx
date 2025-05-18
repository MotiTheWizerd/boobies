"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, AlertCircle, Check, ImageIcon } from "lucide-react";

interface AdImage {
  id: string;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
  size?: number;
  order: number;
  isMain: boolean;
  adId: string;
  createdAt: string;
  updatedAt: string;
}

interface Ad {
  id: string;
  name: string;
}

interface Campaign {
  id: string;
  campaign_name: string;
}

export default function EditMediaPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  const adId = params.adId as string;
  const mediaId = params.mediaId as string;

  const [media, setMedia] = useState<AdImage | null>(null);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveComplete, setSaveComplete] = useState(false);

  const [form, setForm] = useState({
    altText: "",
    order: 0,
    isMain: false,
  });

  // Fetch media data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch media details
        const mediaResponse = await fetch(`/api/media/${mediaId}`);
        if (!mediaResponse.ok) {
          throw new Error(`Error fetching media: ${mediaResponse.status}`);
        }
        const mediaData = await mediaResponse.json();
        setMedia(mediaData);

        // Set form data
        setForm({
          altText: mediaData.altText || "",
          order: mediaData.order || 0,
          isMain: mediaData.isMain || false,
        });

        // Fetch ad details
        const adResponse = await fetch(`/api/ads/${adId}`);
        if (!adResponse.ok) {
          throw new Error(`Error fetching ad: ${adResponse.status}`);
        }
        const adData = await adResponse.json();
        setAd(adData);

        // Fetch campaign details
        const campaignResponse = await fetch(`/api/campaigns/${campaignId}`);
        if (!campaignResponse.ok) {
          throw new Error(
            `Error fetching campaign: ${campaignResponse.status}`
          );
        }
        const campaignData = await campaignResponse.json();
        setCampaign(campaignData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load media data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (mediaId && adId && campaignId) {
      fetchData();
    }
  }, [mediaId, adId, campaignId]);

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!media) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/media/${mediaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          altText: form.altText,
          order: form.order,
          isMain: form.isMain,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update media");
      }

      setSaveComplete(true);

      // Navigate back after a short delay
      setTimeout(() => {
        router.push(`/office/campaigns/${campaignId}/media`);
      }, 1500);
    } catch (err) {
      console.error("Error updating media:", err);
      setError("Failed to update media. Please try again.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error && !saving) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        {error}
      </div>
    );
  }

  if (!media || !ad || !campaign) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium text-gray-900">לא נמצא מדיה</h2>
        <p className="mt-2 text-sm text-gray-500">המדיה המבוקשת לא נמצאה.</p>
        <div className="mt-6">
          <Link
            href={`/office/campaigns/${campaignId}/media`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            חזרה לניהול מדיה
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <Link href="/office/campaigns" className="hover:text-primary">
            קמפיינים
          </Link>
          <span>/</span>
          <Link
            href={`/office/campaigns/${campaign.id}`}
            className="hover:text-primary"
          >
            {campaign.campaign_name}
          </Link>
          <span>/</span>
          <Link
            href={`/office/campaigns/${campaign.id}/media`}
            className="hover:text-primary"
          >
            מדיה
          </Link>
          <span>/</span>
          <span>עריכה</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">עריכת מדיה</h1>
        <p className="text-gray-500">מודעה: {ad.name}</p>
      </div>

      {/* Edit Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Media Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">תצוגה מקדימה</h3>
            <div className="aspect-video relative bg-gray-100 rounded-md overflow-hidden">
              {media.url ? (
                <Image
                  src={media.url}
                  alt={media.altText || "Ad image"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="mt-3 space-y-1 text-sm text-gray-500">
              {media.width && media.height && (
                <p>
                  רזולוציה: {media.width} × {media.height} px
                </p>
              )}
              {media.size && (
                <p>גודל קובץ: {(media.size / 1024).toFixed(1)} KB</p>
              )}
              <p>
                תאריך העלאה:{" "}
                {new Date(media.createdAt).toLocaleDateString("he-IL")}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Alt Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  טקסט חלופי
                </label>
                <textarea
                  name="altText"
                  value={form.altText}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  rows={3}
                  placeholder="תיאור התמונה עבור נגישות ו-SEO"
                  disabled={saving}
                />
                <p className="mt-1 text-xs text-gray-500">
                  כתוב תיאור קצר המתאר את תוכן התמונה. זה משפר את הנגישות ואת
                  דירוג ה-SEO.
                </p>
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  סדר הצגה
                </label>
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  min={0}
                  disabled={saving}
                />
                <p className="mt-1 text-xs text-gray-500">
                  מספר נמוך יותר יציג את התמונה קודם. תמונות מסודרות לפי סדר
                  עולה.
                </p>
              </div>

              {/* Is Main */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="isMain"
                    name="isMain"
                    type="checkbox"
                    checked={form.isMain}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    disabled={saving}
                  />
                </div>
                <div className="mr-3 text-sm">
                  <label htmlFor="isMain" className="font-medium text-gray-700">
                    תמונה ראשית
                  </label>
                  <p className="text-gray-500">
                    הגדרה כתמונה ראשית תציג אותה בראש רשימת התמונות ותשמש כתמונה
                    הראשית של המודעה.
                  </p>
                </div>
              </div>

              {/* Success Message */}
              {saveComplete && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-green-800">
                      השינויים נשמרו בהצלחה
                    </h3>
                    <p className="mt-1 text-xs text-green-700">
                      מעביר אותך לעמוד ניהול המדיה...
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && saving && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">
                        שגיאה בשמירת השינויים
                      </h3>
                      <p className="mt-1 text-xs text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-3 rtl:space-x-reverse">
                <Link
                  href={`/office/campaigns/${campaignId}/media`}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  ביטול
                </Link>
                <button
                  type="submit"
                  disabled={saving || saveComplete}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "שומר..." : "שמור שינויים"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
