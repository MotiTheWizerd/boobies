"use client";
import Head from "next/head";
import AdForm from "../AdForm";
import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function ManageAdsPage() {
  const router = useRouter();
  const params = useParams();
  const pageCampaignId = params.campaignId as string; // Extract campaignId from params
  const searchParams = useSearchParams();
  const adId = searchParams.get("ad_id");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useTestData, setUseTestData] = useState(false);

  // Test data for the form
  const testData = {
    name: "מודעה לדוגמה",
    description: "תיאור מפורט של המודעה לדוגמה עם מידע נוסף על השירות המוצע.",
    shortDescription: "תיאור קצר של המודעה",
    isHappyHour: true,
    isHot: true,
    isPremium: false,
    priority: true,
    status: "active",
    tags: "וי-איי-פי, מיוחד, מבצע",
    campaignId: pageCampaignId, // Use campaignId from the URL params
    age: "25",
    country: "ישראל",
    titsSize: "C",
    mobile: "0501234567",
    whatsapp: "972501234567",
    telegram: "@exampletelegram",
  };

  // Handle form submission and API call
  const handleAdSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);

    // Ensure the actual campaignId from the route is part of the submission
    const submissionData = {
      ...data,
      campaignId: pageCampaignId || data.campaignId, // Prioritize route campaignId
    };

    try {
      let response;
      if (adId) {
        // Edit mode: update existing ad
        response = await fetch(`/api/ads/${adId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });
      } else {
        // Create mode: create new ad
        response = await fetch("/api/ads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            (adId ? "Failed to update ad" : "Failed to create ad")
        );
      }

      const resultAd = await response.json();
      console.log(
        adId ? "Ad updated successfully:" : "Ad created successfully:",
        resultAd
      );

      // Show toast instead of redirect
      toast.success(adId ? "המודעה עודכנה בהצלחה!" : "המודעה נוצרה בהצלחה!");
      // Optionally, you can reset the form or update state here
    } catch (err: any) {
      console.error(adId ? "Error updating ad:" : "Error creating ad:", err);
      setError(
        err.message ||
          (adId
            ? "An error occurred while updating the ad"
            : "An error occurred while creating the ad")
      );
      toast.error(adId ? "שגיאה בעדכון המודעה" : "שגיאה ביצירת המודעה");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <Head>
        <title>ניהול מודעות | קמפיינים</title>
        <meta
          name="description"
          content="ניהול מודעות עבור קמפיינים במערכת הפרסום"
        />
        <meta property="og:title" content="ניהול מודעות | קמפיינים" />
        <meta
          property="og:description"
          content="ניהול מודעות עבור קמפיינים במערכת הפרסום"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`/office/campaigns/manage_ads/${pageCampaignId}`}
        />
      </Head>
      <header className="mb-8">
        <h1 className="text-2xl font-bold">ניהול מודעות</h1>
        <div className="mt-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useTestData}
              onChange={() => setUseTestData(!useTestData)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/25 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              השתמש בנתוני דוגמה
            </span>
          </label>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <AdForm
        onSubmit={handleAdSubmit}
        isSubmitting={isSubmitting}
        defaultValues={useTestData ? testData : { campaignId: pageCampaignId }}
        ad_id={adId || undefined}
      />
    </main>
  );
}
