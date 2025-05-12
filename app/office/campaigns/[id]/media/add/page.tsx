"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  X,
  Check,
  Info,
  AlertCircle,
} from "lucide-react";

interface Ad {
  id: string;
  name: string;
  description?: string;
}

interface Campaign {
  id: string;
  campaign_name: string;
  client: {
    name: string;
  };
  ads: Ad[];
}

export default function AddMediaPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAdId, setSelectedAdId] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  // Fetch campaign data
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/campaigns/${campaignId}?include=ads`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCampaign(data);

        // If there's only one ad, select it automatically
        if (data.ads && data.ads.length === 1) {
          setSelectedAdId(data.ads[0].id);
        }
      } catch (err) {
        console.error("Error fetching campaign:", err);
        setError("Failed to load campaign data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newFiles = Array.from(e.target.files);
    const errors: Record<string, string> = {};

    // Validate files
    newFiles.forEach((file) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        errors[file.name] = "קובץ לא תקין. יש להעלות תמונות בלבד.";
        return;
      }

      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        errors[file.name] = "התמונה גדולה מדי. גודל מקסימלי הוא 5MB.";
        return;
      }
    });

    setFileErrors(errors);
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Reset the input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove file from list
  const removeFile = (index: number) => {
    setUploadedFiles((files) => {
      const newFiles = [...files];
      const removedFile = newFiles.splice(index, 1)[0];

      // Remove any errors for this file
      if (fileErrors[removedFile.name]) {
        const newErrors = { ...fileErrors };
        delete newErrors[removedFile.name];
        setFileErrors(newErrors);
      }

      return newFiles;
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!selectedAdId) {
      alert("יש לבחור מודעה");
      return;
    }

    if (uploadedFiles.length === 0) {
      alert("יש להעלות לפחות תמונה אחת");
      return;
    }

    if (Object.keys(fileErrors).length > 0) {
      alert("יש לתקן את השגיאות לפני העלאת הקבצים");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("adId", selectedAdId);

      // Add all files
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Upload files with progress tracking
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/media/upload", true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(progress));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadComplete(true);
          setTimeout(() => {
            // Navigate back to media page
            router.push(`/office/campaigns/${campaignId}/media`);
          }, 1500);
        } else {
          setError(`שגיאה בהעלאת הקבצים: ${xhr.statusText}`);
          setUploading(false);
        }
      };

      xhr.onerror = () => {
        setError("שגיאה בהעלאת הקבצים");
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err) {
      console.error("Error uploading files:", err);
      setError("שגיאה בהעלאת הקבצים");
      setUploading(false);
    }
  };

  // Trigger file input click
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error && !uploading) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        {error}
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium text-gray-900">לא נמצא קמפיין</h2>
        <p className="mt-2 text-sm text-gray-500">הקמפיין המבוקש לא נמצא.</p>
        <div className="mt-6">
          <Link
            href="/office/campaigns"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            חזרה לקמפיינים
          </Link>
        </div>
      </div>
    );
  }

  // If there are no ads, show message
  if (campaign.ads.length === 0) {
    return (
      <div className="space-y-6">
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
          <span>הוספת מדיה</span>
        </div>

        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            אין מודעות בקמפיין זה
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            כדי להוסיף מדיה, יש ליצור מודעה חדשה תחילה.
          </p>
          <div className="mt-6">
            <Link
              href={`/office/campaigns/${campaign.id}/ads/new`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
            >
              צור מודעה חדשה
            </Link>
          </div>
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
          <span>הוספה</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          הוספת מדיה - {campaign.campaign_name}
        </h1>
        <p className="text-gray-500">לקוח: {campaign.client.name}</p>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Ad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              בחר מודעה <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedAdId}
              onChange={(e) => setSelectedAdId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
              disabled={uploading}
            >
              <option value="">בחר מודעה</option>
              {campaign.ads.map((ad) => (
                <option key={ad.id} value={ad.id}>
                  {ad.name}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              בחר קבצים <span className="text-red-500">*</span>
            </label>

            {/* Upload Area */}
            <div
              onClick={triggerFileSelect}
              className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
              <div className="flex flex-col items-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">
                  <span className="font-medium text-primary">
                    לחץ כדי להעלות קבצים
                  </span>{" "}
                  או גרור לכאן
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF עד 5MB
                </p>
              </div>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="text-sm font-medium text-gray-700">
                  קבצים שנבחרו ({uploadedFiles.length})
                </div>
                <ul className="border rounded-md divide-y divide-gray-200">
                  {uploadedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3"
                    >
                      <div className="flex items-center">
                        <ImageIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div className="flex flex-col">
                          <span
                            className="text-sm font-medium text-gray-700 truncate"
                            style={{ maxWidth: "250px" }}
                          >
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                      </div>
                      {fileErrors[file.name] ? (
                        <div className="flex items-center">
                          <span className="text-xs text-red-600 mr-2">
                            {fileErrors[file.name]}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-800"
                            disabled={uploading}
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-gray-600"
                          disabled={uploading}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    טיפים לתמונות איכותיות
                  </h3>
                  <div className="mt-2 text-xs text-blue-700 space-y-1">
                    <p>• רזולוציה גבוהה תוביל לתצוגה איכותית יותר</p>
                    <p>
                      • אם יש מספר תמונות, הראשונה תוגדר כתמונה ראשית באופן
                      אוטומטי
                    </p>
                    <p>
                      • מומלץ להשתמש בתמונות ביחס 16:9 או 4:3 עבור תצוגה
                      אופטימלית
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  מעלה קבצים...
                </span>
                <span className="text-sm text-gray-500">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {uploadComplete && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  הקבצים הועלו בהצלחה
                </h3>
                <p className="mt-1 text-xs text-green-700">
                  מעביר אותך לעמוד ניהול המדיה...
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && uploading && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">
                    שגיאה בהעלאת הקבצים
                  </h3>
                  <p className="mt-1 text-xs text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 rtl:space-x-reverse">
            <Link
              href={`/office/campaigns/${campaign.id}/media`}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              ביטול
            </Link>
            <button
              type="submit"
              disabled={
                uploading ||
                uploadComplete ||
                uploadedFiles.length === 0 ||
                Object.keys(fileErrors).length > 0 ||
                !selectedAdId
              }
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "מעלה..." : "העלה קבצים"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
