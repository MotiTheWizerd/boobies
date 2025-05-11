"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import CampaignsTable from "./components/CampaignsTable";
import StatsOverview from "./components/StatsOverview";
import SearchFilters from "./components/SearchFilters";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";

// Campaign type definition based on the API
interface Client {
  id: string;
  name: string;
  email: string;
  title: string;
}

interface Campaign {
  id: string;
  campaign_name: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  client: Client;
  status: string;
  _count?: {
    ads: number;
  };
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "pending" | "completed"
  >("all");

  // Fetch campaigns data from the API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/campaigns");

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCampaigns(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load campaigns. Please try again later.");
        setLoading(false);
        console.error("Error fetching campaigns:", err);
      }
    };

    fetchCampaigns();
  }, []);

  // Handle campaign deletion
  const handleDeleteCampaign = async (id: string) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק קמפיין זה?")) {
      try {
        const response = await fetch(`/api/campaigns/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete campaign");
        }

        // Remove campaign from state
        setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
      } catch (err: any) {
        console.error("Error deleting campaign:", err);
        alert(err.message || "Failed to delete campaign");
      }
    }
  };

  // Filter campaigns based on search term and status
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.campaign_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.client.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return a.campaign_name.localeCompare(b.campaign_name);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">קמפיינים</h1>
        <Link
          href="/office/campaigns/new"
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="me-2 h-4 w-4" />
          קמפיין חדש
        </Link>
      </div>

      {/* Stats Overview */}
      <StatsOverview campaigns={campaigns} loading={loading} />

      {/* Search and filters */}
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Error message */}
      <ErrorMessage message={error} />

      {/* Loading state */}
      <LoadingSpinner show={loading} />

      {/* Table */}
      {!loading && (
        <CampaignsTable
          campaigns={sortedCampaigns}
          loading={loading}
          onDelete={handleDeleteCampaign}
        />
      )}
    </div>
  );
}
