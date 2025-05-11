"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowRight,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash,
  LayoutGrid,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  title: string;
  email: string;
  mobile?: string;
}

interface Campaign {
  id: string;
  campaign_name: string;
  clientId: string;
  client?: Client;
  createdAt: string;
  updatedAt: string;
  _count?: {
    ads: number;
  };
}

export default function ClientCampaignsPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientLoading, setClientLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch client details
  useEffect(() => {
    const fetchClient = async () => {
      try {
        setClientLoading(true);
        const response = await fetch(`/api/clients/${clientId}`);
        
        if (response.status === 404) {
          setError("Client not found");
          return;
        }
        
        if (!response.ok) {
          throw new Error("Failed to fetch client data");
        }
        
        const data = await response.json();
        setClient(data);
      } catch (err) {
        console.error("Error fetching client:", err);
        setError("Failed to load client data. Please try again later.");
      } finally {
        setClientLoading(false);
      }
    };
    
    fetchClient();
  }, [clientId]);

  // Fetch campaigns for this client
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/campaigns?clientId=${clientId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }
        
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCampaigns();
  }, [clientId]);

  const handleDeleteCampaign = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        const response = await fetch(`/api/campaigns/${id}`, {
          method: "DELETE",
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete campaign");
        }
        
        // Remove campaign from state
        setCampaigns(campaigns.filter(campaign => campaign.id !== id));
      } catch (err: any) {
        console.error("Error deleting campaign:", err);
        alert(err.message || "Failed to delete campaign");
      }
    }
  };

  // Filter campaigns based on search term
  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.campaign_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (clientLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Link
            href="/office/clients"
            className="inline-flex items-center text-primary hover:text-primary/90"
          >
            <ArrowRight className="mr-2 h-4 w-4 rtl:rotate-180" />
            חזרה לרשימת הלקוחות
          </Link>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4">
          הלקוח המבוקש לא נמצא.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Link
          href="/office/clients"
          className="inline-flex items-center text-primary hover:text-primary/90"
        >
          <ArrowRight className="mr-2 h-4 w-4 rtl:rotate-180" />
          חזרה לרשימת הלקוחות
        </Link>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">קמפיינים: {client.name}</h1>
          <Link
            href={`/office/clients/${clientId}/campaigns/new`}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Plus className="me-2 h-4 w-4" />
            קמפיין חדש
          </Link>
        </div>
        <p className="text-gray-500">{client.title} • {client.email}</p>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full py-2 pr-10 pl-4 text-sm text-gray-900 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="חיפוש קמפיינים..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        /* Campaigns table */
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    שם קמפיין
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    פרסומות
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    נוצר ב
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    עודכן ב
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">פעולות</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCampaigns.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      לא נמצאו קמפיינים{searchTerm ? ` עבור "${searchTerm}"` : ""}
                    </td>
                  </tr>
                ) : (
                  filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-medium text-lg">
                            {campaign.campaign_name.charAt(0)}
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">
                              {campaign.campaign_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {campaign._count?.ads || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(campaign.createdAt), "yyyy-MM-dd")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(campaign.updatedAt), "yyyy-MM-dd")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        <div className="relative inline-block text-right">
                          <div className="group">
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <MoreVertical className="h-5 w-5 text-gray-400" />
                            </button>
                            <div className="hidden group-hover:block absolute left-0 z-10 w-48 mt-2 origin-top-left bg-white rounded-md shadow-lg border border-gray-100">
                              <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                              >
                                <Link
                                  href={`/office/clients/${clientId}/campaigns/${campaign.id}/ads`}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <LayoutGrid className="ml-2 h-4 w-4" /> פרסומות
                                </Link>
                                <Link
                                  href={`/office/clients/${clientId}/campaigns/${campaign.id}/edit`}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit className="ml-2 h-4 w-4" /> ערוך
                                </Link>
                                <button
                                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  onClick={() => handleDeleteCampaign(campaign.id)}
                                >
                                  <Trash className="ml-2 h-4 w-4" /> מחק
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 