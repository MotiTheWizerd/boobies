"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Badge } from "../../../../components/ui/Badge";
import { format } from "date-fns";
import { FileEdit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge variant="success">פעיל</Badge>;
    case "paused":
      return <Badge variant="warning">מושהה</Badge>;
    case "completed":
      return <Badge variant="secondary">הושלם</Badge>;
    default:
      return <Badge variant="default">לא ידוע</Badge>;
  }
}

export default function AdsListPage() {
  // Get campaign_id from the URL params
  const params = useParams();
  const campaignId = params?.campaign_id as string;

  // State for ads, loading, and error
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!campaignId) return;
    setLoading(true);
    setError(null);
    fetch(`/api/ads?campaignId=${campaignId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch ads");
        return res.json();
      })
      .then((data) => setAds(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [campaignId]);

  return (
    <main className="min-h-screen bg-background text-foreground py-8 px-4 md:px-8">
      {/* SEO Meta */}
      <Head>
        <title>רשימת מודעות | קמפיין {campaignId} | ניהול קמפיינים</title>
        <meta
          name="description"
          content={`רשימת כל המודעות של קמפיין ${campaignId}. ניהול, עריכה ומעקב אחר ביצועים.`}
        />
        <meta
          property="og:title"
          content={`רשימת מודעות | קמפיין ${campaignId} | ניהול קמפיינים`}
        />
        <meta
          property="og:description"
          content={`רשימת כל המודעות של קמפיין ${campaignId}. ניהול, עריכה ומעקב אחר ביצועים.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`/office/campaigns/ads/ads_list/${campaignId}`}
        />
      </Head>
      <section className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-foreground">רשימת מודעות</h1>
          <Link
            href={`/office/campaigns/manage_ads/new?campaignId=${campaignId}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium shadow"
          >
            <FileEdit className="w-4 h-4" />
            צור מודעה חדשה
          </Link>
        </header>
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {/* Loading state */}
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : error ? (
              <div className="text-center text-destructive py-10 font-medium">
                שגיאה בטעינת המודעות: {error}
              </div>
            ) : (
              <table className="min-w-full divide-y divide-border table-fixed">
                <thead className="bg-muted">
                  <tr>
                    <th className="w-[30%] px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      שם מודעה
                    </th>
                    <th className="w-[10%] px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      סטטוס
                    </th>
                    <th className="w-[10%] px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      קליקים
                    </th>
                    <th className="w-[15%] px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      חשיפות
                    </th>
                    <th className="w-[15%] px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      תקציב (₪)
                    </th>
                    <th className="w-[15%] px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      תאריך יצירה
                    </th>
                    <th className="w-[5%] px-6 py-3 text-center relative">
                      <span className="sr-only">פעולות</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {ads.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-10 text-center text-muted-foreground font-medium"
                      >
                        לא נמצאו מודעות
                      </td>
                    </tr>
                  ) : (
                    ads.map((ad) => (
                      <tr
                        key={ad.id}
                        className="hover:bg-muted/40 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-foreground">
                            {ad.title || ad.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {getStatusBadge(ad.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="text-xs font-medium text-foreground">
                            {ad.clicks ?? "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="text-xs font-medium text-foreground">
                            {ad.impressions ?? "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="text-xs font-medium text-foreground">
                            {ad.budget ? ad.budget.toLocaleString() : "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-foreground font-medium">
                          {ad.createdAt
                            ? format(new Date(ad.createdAt), "yyyy-MM-dd")
                            : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center gap-2">
                            <Link
                              href={`/office/campaigns/manage_ads/${campaignId}?ad_id=${ad.id}`}
                              className="text-primary hover:text-primary/80"
                            >
                              <FileEdit className="h-4 w-4" />
                              <span className="sr-only">ערוך</span>
                            </Link>
                            <button className="text-destructive hover:text-destructive/80">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">מחק</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
