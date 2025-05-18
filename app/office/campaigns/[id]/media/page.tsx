"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash,
  Download,
  Eye,
  ImageIcon,
  FilePlus,
  Pencil,
  X,
  CheckCircle2,
} from "lucide-react";

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
  description?: string;
  images: AdImage[];
}

interface Campaign {
  id: string;
  campaign_name: string;
  client: {
    name: string;
  };
  ads: Ad[];
}

export default function CampaignMediaPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAdId, setSelectedAdId] = useState<string | null>(null);

  // Fetch campaign data
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/campaigns/${campaignId}?include=ads,images`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCampaign(data);
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

  // Handle media deletion
  const handleDeleteMedia = async (imageId: string) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק מדיה זו?")) {
      return;
    }

    try {
      const response = await fetch(`/api/media/${imageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete media");
      }

      // Update UI by removing the deleted image
      if (campaign) {
        const updatedAds = campaign.ads.map((ad) => ({
          ...ad,
          images: ad.images.filter((img) => img.id !== imageId),
        }));

        setCampaign({
          ...campaign,
          ads: updatedAds,
        });
      }
    } catch (err) {
      console.error("Error deleting media:", err);
      alert("Failed to delete media. Please try again.");
    }
  };

  // Set image as main
  const handleSetAsMain = async (adId: string, imageId: string) => {
    try {
      const response = await fetch(
        `/api/ads/${adId}/images/${imageId}/set-main`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to set image as main");
      }

      // Update UI to show the new main image
      if (campaign) {
        const updatedAds = campaign.ads.map((ad) => {
          if (ad.id === adId) {
            return {
              ...ad,
              images: ad.images.map((img) => ({
                ...img,
                isMain: img.id === imageId,
              })),
            };
          }
          return ad;
        });

        setCampaign({
          ...campaign,
          ads: updatedAds,
        });
      }
    } catch (err) {
      console.error("Error setting main image:", err);
      alert("Failed to set main image. Please try again.");
    }
  };

  // Filter ads by search term
  const filteredAds =
    campaign?.ads.filter(
      (ad) =>
        ad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ad.description &&
          ad.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];

  // Get the selected ad or the first ad if none is selected
  const selectedAd = selectedAdId
    ? filteredAds.find((ad) => ad.id === selectedAdId) || null
    : filteredAds[0] || null;

  // Format file size
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
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
            <span>מדיה</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            ניהול מדיה - {campaign.campaign_name}
          </h1>
          <p className="text-gray-500">לקוח: {campaign.client.name}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/office/campaigns/${campaign.id}/media/add`}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Plus className="me-2 h-4 w-4" />
            הוסף מדיה
          </Link>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full py-2 pr-10 pl-4 text-sm text-gray-900 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="חיפוש מודעות..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* No ads message */}
      {filteredAds.length === 0 && (
        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
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
              <Plus className="mr-2 h-4 w-4" />
              צור מודעה חדשה
            </Link>
          </div>
        </div>
      )}

      {/* Media display */}
      {filteredAds.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Ads sidebar */}
          <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">מודעות</h3>
            <div className="space-y-2">
              {filteredAds.map((ad) => (
                <button
                  key={ad.id}
                  className={`w-full text-right p-2 rounded-md transition-colors ${
                    selectedAd?.id === ad.id
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setSelectedAdId(ad.id)}
                >
                  <div className="font-medium text-sm">{ad.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {ad.images.length} פריטי מדיה
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Media content */}
          <div className="lg:col-span-4">
            {selectedAd ? (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">
                    מדיה של {selectedAd.name}
                  </h3>
                  <Link
                    href={`/office/campaigns/${campaign.id}/ads/${selectedAd.id}/media/add`}
                    className="inline-flex items-center text-sm px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                  >
                    <Plus className="me-1 h-4 w-4" />
                    הוסף מדיה
                  </Link>
                </div>

                {selectedAd.images.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      אין מדיה
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      לחץ על הוסף מדיה כדי להעלות תמונות.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedAd.images.map((image) => (
                      <div
                        key={image.id}
                        className={`rounded-lg border ${
                          image.isMain
                            ? "border-primary/50 bg-primary/5"
                            : "border-gray-200"
                        } overflow-hidden group relative`}
                      >
                        <div className="aspect-video relative bg-gray-100">
                          {image.url ? (
                            <Image
                              src={image.url}
                              alt={image.altText || "Ad image"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <ImageIcon className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                          {image.isMain && (
                            <div className="absolute top-2 right-2 bg-primary text-white text-xs py-1 px-2 rounded-md">
                              תמונה ראשית
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-sm truncate">
                                {image.altText || "ללא כותרת"}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {image.width && image.height
                                  ? `${image.width} × ${image.height}`
                                  : "מידות לא ידועות"}{" "}
                                • {formatFileSize(image.size)}
                              </div>
                            </div>
                            <div className="relative">
                              <div className="group">
                                <button className="p-1 rounded-full hover:bg-gray-200">
                                  <MoreVertical className="h-5 w-5 text-gray-500" />
                                </button>
                                <div className="hidden group-hover:block absolute left-0 z-10 w-48 mt-2 origin-top-left bg-white rounded-md shadow-lg border border-gray-200">
                                  <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                  >
                                    {!image.isMain && (
                                      <button
                                        onClick={() =>
                                          handleSetAsMain(
                                            selectedAd.id,
                                            image.id
                                          )
                                        }
                                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        <CheckCircle2 className="ml-2 h-4 w-4" />{" "}
                                        הגדר כתמונה ראשית
                                      </button>
                                    )}
                                    <Link
                                      href={`/office/campaigns/${campaign.id}/ads/${selectedAd.id}/media/${image.id}/edit`}
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      <Edit className="ml-2 h-4 w-4" /> ערוך
                                    </Link>
                                    <a
                                      href={image.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      <Eye className="ml-2 h-4 w-4" /> צפה
                                    </a>
                                    <a
                                      href={image.url}
                                      download
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      <Download className="ml-2 h-4 w-4" /> הורד
                                    </a>
                                    <button
                                      onClick={() =>
                                        handleDeleteMedia(image.id)
                                      }
                                      className="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 font-medium"
                                    >
                                      <Trash className="ml-2 h-4 w-4" /> מחק
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="font-medium text-gray-900">
                  בחר מודעה מהרשימה כדי לצפות במדיה
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
