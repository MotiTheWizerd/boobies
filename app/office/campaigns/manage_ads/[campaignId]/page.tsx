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
  console.log('Campaign ID from URL:', pageCampaignId);
  
  // Check if we're in 'new' mode or have an actual campaign ID
  const isNewMode = pageCampaignId === 'new';
  const formattedCampaignId = pageCampaignId ? pageCampaignId.trim() : '';
  
  // State to store the selected campaign ID when in 'new' mode
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [availableCampaigns, setAvailableCampaigns] = useState<{id: string, campaign_name: string}[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  
  // Fetch available campaigns when in 'new' mode
  useEffect(() => {
    if (isNewMode) {
      setLoadingCampaigns(true);
      fetch('/api/campaigns')
        .then(res => res.json())
        .then(data => {
          setAvailableCampaigns(data);
          console.log('Available campaigns:', data);
        })
        .catch(err => console.error('Error fetching campaigns:', err))
        .finally(() => setLoadingCampaigns(false));
    }
  }, [isNewMode]);
  const searchParams = useSearchParams();
  const adId = searchParams.get("ad_id");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useTestData, setUseTestData] = useState(false);
  const [currentDefaultValues, setCurrentDefaultValues] = useState({ campaignId: isNewMode ? selectedCampaignId : formattedCampaignId });

  useEffect(() => {
    setCurrentDefaultValues(useTestData ? testData : { campaignId: isNewMode ? selectedCampaignId : formattedCampaignId });
  }, [useTestData, selectedCampaignId, formattedCampaignId, isNewMode]);

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
  const handleAdSubmit = async (formData: any) => {
    // Prevent submission if in new mode and no campaign selected
    if (isNewMode && !selectedCampaignId) {
      toast.error('יש לבחור קמפיין לפני יצירת מודעה');
      setError('יש לבחור קמפיין לפני יצירת מודעה');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    console.log('Form submission started');
    console.log('Form data received:', formData);
    console.log('Campaign ID in URL:', formattedCampaignId);
    console.log('Selected campaign ID:', isNewMode ? selectedCampaignId : formattedCampaignId);

    try {
      // Prepare the submission data
      const { files, defaultFileName, ...submissionData } = formData;
      
      // Use selected campaign ID if in new mode, otherwise use the route campaign ID
      submissionData.campaignId = isNewMode ? selectedCampaignId : formattedCampaignId;
      
      console.log('Submission data after preparation:', submissionData);
      

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
        // Include campaignId in the submission data and ensure it's properly formatted
        const newAdData = {
          ...submissionData,
          campaignId: isNewMode ? selectedCampaignId : formattedCampaignId,  // Use selected campaign ID if in new mode
          images: [] // Initialize with empty images array
        };
        
        console.log('Creating new ad with data:', JSON.stringify(newAdData, null, 2));
        console.log('Campaign ID being sent:', formattedCampaignId);
        
        response = await fetch("/api/ads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAdData),
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
      
      // Handle file uploads if there are any files
      if (files && files.length > 0) {
        try {
          const formData = new FormData();
          files.forEach((file: File) => {
            formData.append("files", file);
          });
          
          // Add the default file name if specified
          if (defaultFileName) {
            formData.append("defaultFileName", defaultFileName);
          }
          
          const uploadResponse = await fetch(`/api/ads/${resultAd.id}/upload`, {
            method: "POST",
            body: formData,
          });
          
          if (!uploadResponse.ok) {
            const error = await uploadResponse.json();
            throw new Error(error.message || "Failed to upload files");
          }
          
          // Refresh the ad data to include the uploaded files
          const updatedAdResponse = await fetch(`/api/ads/${resultAd.id}`);
          if (!updatedAdResponse.ok) {
            throw new Error("Failed to fetch updated ad data");
          }
          
          const updatedAd = await updatedAdResponse.json();
          console.log("Ad created/updated with files:", updatedAd);
          
          // Show success message
          toast.success(adId ? "המודעה עודכנה בהצלחה!" : "המודעה נוצרה בהצלחה!");
          return updatedAd;
          
        } catch (uploadError: any) {
          // If file upload fails, delete the created ad to avoid orphaned records
          if (!adId) {
            try {
              await fetch(`/api/ads/${resultAd.id}`, { method: "DELETE" });
            } catch (deleteError) {
              console.error("Failed to clean up ad after upload error:", deleteError);
            }
          }
          throw uploadError;
        }
      } else {
        // No files to upload, just show success message
        console.log(
          adId ? "Ad updated successfully:" : "Ad created successfully:",
          resultAd
        );
        toast.success(adId ? "המודעה עודכנה בהצלחה!" : "המודעה נוצרה בהצלחה!");
        return resultAd;
      }
      
    } catch (err: any) {
      console.error(adId ? "Error updating ad:" : "Error creating ad:", err);
      setError(
        err.message ||
          (adId
            ? "An error occurred while updating the ad"
            : "An error occurred while creating the ad")
      );
      toast.error(adId ? "שגיאה בעדכון המודעה" : "שגיאה ביצירת המודעה");
      throw err; // Re-throw to allow the form to handle the error
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

      {isNewMode && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">בחר קמפיין</h2>
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
            {loadingCampaigns ? (
              <p>טוען קמפיינים...</p>
            ) : (
              <>
                <select 
                  value={selectedCampaignId} 
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">בחר קמפיין</option>
                  {availableCampaigns.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.campaign_name}
                    </option>
                  ))}
                </select>
                {!selectedCampaignId && (
                  <p className="text-red-500 mt-2">*יש לבחור קמפיין לפני יצירת המודעה</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
      
      <AdForm
        onSubmit={handleAdSubmit}
        isSubmitting={isSubmitting}
        defaultValues={currentDefaultValues}
        ad_id={adId || undefined}
      />
    </main>
  );
}
