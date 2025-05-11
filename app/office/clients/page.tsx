"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash,
  Mail,
  Phone,
  Calendar,
  X,
  ChevronDown,
  Megaphone,
  Briefcase,
  UserCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import Modal from "@/app/components/Common/Modal";

// Update the dropdown styles to use fixed positioning and click events
const dropdownStyles = `
  .dropdown-wrapper {
    position: relative;
  }
  
  .dropdown-menu {
    display: none;
    position: fixed;
    z-index: 9999;
    min-width: 16rem;
    padding: 0.5rem 0;
    background-color: white;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 1px solid #e5e7eb;
  }
  
  .dropdown-trigger {
    cursor: pointer;
  }
  
  .dropdown-menu.active {
    display: block;
  }
`;

// Client type definition
interface Client {
  id: string;
  name: string;
  title: string;
  email: string;
  mobile?: string;
  createdAt: string;
  _count?: {
    campaigns: number;
  };
  campaigns?: Campaign[];
}

// Campaign type definition
interface Campaign {
  id?: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  clientId: string;
  status?: string;
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "name">(
    "newest"
  );
  const [clientStatus, setClientStatus] = useState<
    "all" | "active" | "inactive"
  >("all");

  // Campaign modal state
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    description: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      "yyyy-MM-dd"
    ),
    budget: 0,
    status: "draft",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [campaignError, setCampaignError] = useState<string | null>(null);

  // Add new client modal state
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    name: "",
    title: "",
    email: "",
    mobile: "",
  });
  const [newClientErrors, setNewClientErrors] = useState<
    Record<string, string>
  >({});
  const [isNewClientSubmitting, setIsNewClientSubmitting] = useState(false);
  const [newClientSuccess, setNewClientSuccess] = useState(false);
  const [newClientError, setNewClientError] = useState<string | null>(null);

  // Delete campaign confirmation modal state
  const [showDeleteCampaignModal, setShowDeleteCampaignModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(
    null
  );
  const [isDeletingCampaign, setIsDeletingCampaign] = useState(false);
  const [deleteCampaignError, setDeleteCampaignError] = useState<string | null>(
    null
  );
  const [deleteCampaignSuccess, setDeleteCampaignSuccess] = useState(false);

  // Add state to track which dropdown is open
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Add an effect to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownId &&
        !(event.target as Element).closest(".dropdown-wrapper")
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdownId]);

  // Handle dropdown toggle
  const toggleDropdown = (e: React.MouseEvent, clientId: string) => {
    e.stopPropagation(); // Prevent event bubbling

    // If this dropdown is already open, close it
    if (openDropdownId === clientId) {
      setOpenDropdownId(null);
      return;
    }

    // Get the dropdown menu element
    const button = e.currentTarget;
    const menu = button.nextElementSibling as HTMLElement;

    if (menu) {
      // Get button position
      const rect = button.getBoundingClientRect();
      // Position the menu relative to the button
      menu.style.top = `${rect.bottom + window.scrollY + 8}px`;
      menu.style.left = `${rect.left + window.scrollX - 120}px`; // Offset to center better

      // Open this dropdown
      setOpenDropdownId(clientId);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/clients");

        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }

        const data = await response.json();

        // For each client with campaigns, also fetch their campaigns
        const clientsWithCampaigns = await Promise.all(
          data.map(async (client: Client) => {
            if (client._count?.campaigns && client._count.campaigns > 0) {
              try {
                const campaignsResponse = await fetch(
                  `/api/clients/${client.id}/campaigns`
                );
                if (campaignsResponse.ok) {
                  const campaignsData = await campaignsResponse.json();
                  return { ...client, campaigns: campaignsData };
                }
              } catch (err) {
                console.error(
                  `Error fetching campaigns for client ${client.id}:`,
                  err
                );
              }
            }
            return client;
          })
        );

        setClients(clientsWithCampaigns);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError("Failed to load clients. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDeleteClient = async (id: string) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק לקוח זה?")) {
      try {
        const response = await fetch(`/api/clients/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete client");
        }

        // Remove client from state
        setClients(clients.filter((client) => client.id !== id));
      } catch (err: any) {
        console.error("Error deleting client:", err);
        alert(err.message || "Failed to delete client");
      }
    }
  };

  const openCampaignModal = (client: Client) => {
    console.log("🔍 OPENING MODAL FOR CLIENT:", client.id, client.name);

    // First, reset the form
    setCampaignForm({
      name: "",
      description: "",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        "yyyy-MM-dd"
      ),
      budget: 0,
      status: "draft",
    });

    // Then set the selected client (keep this separate from form)
    setSelectedClient(client);

    // Finally show the modal
    setShowCampaignModal(true);
  };

  const closeCampaignModal = () => {
    setShowCampaignModal(false);
    setSelectedClient(null);
    setCampaignError(null);
    setSubmitSuccess(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCampaignForm((prev) => ({
      ...prev,
      [name]: name === "budget" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCampaignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Start with a clean slate
      setIsSubmitting(true);
      setCampaignError(null);

      // Basic validation
      if (!campaignForm.name.trim()) {
        setCampaignError("שם הקמפיין נדרש");
        return;
      }

      if (!selectedClient) {
        setCampaignError("לא נמצא מזהה לקוח");
        return;
      }

      // Create a very simple object with only the absolutely required fields
      // Make sure field names match EXACTLY what the server expects
      const minimumRequiredData = {
        campaign_name: campaignForm.name.trim(),
        clientId: selectedClient.id,
        // Add other fields that might be needed
        description: campaignForm.description || "",
        startDate: campaignForm.startDate,
        endDate: campaignForm.endDate,
        budget: campaignForm.budget,
        status: "draft",
      };

      console.log(
        "🔍 CAMPAIGN DATA BEING SENT:",
        JSON.stringify(minimumRequiredData, null, 2)
      );

      // Make a direct API call with minimal data
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(minimumRequiredData),
      });

      // Check the raw response
      console.log("🔍 RESPONSE STATUS:", response.status);
      console.log("🔍 RESPONSE OK:", response.ok);

      const responseData = await response.json();
      console.log("🔍 RESPONSE DATA:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create campaign");
      }

      // Success! Update the UI
      const updatedClients = clients.map((client) => {
        if (client.id === selectedClient.id) {
          return {
            ...client,
            _count: {
              campaigns: (client._count?.campaigns || 0) + 1,
            },
          };
        }
        return client;
      });

      setClients(updatedClients);
      setSubmitSuccess(true);

      // Close modal after success message shown
      setTimeout(() => {
        closeCampaignModal();
      }, 2000);
    } catch (err: any) {
      console.error("🔴 Error creating campaign:", err);
      setCampaignError(err.message || "Failed to create campaign");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openNewClientModal = () => {
    setShowNewClientModal(true);
    setNewClientForm({
      name: "",
      title: "",
      email: "",
      mobile: "",
    });
    setNewClientErrors({});
    setNewClientError(null);
    setNewClientSuccess(false);
  };

  const closeNewClientModal = () => {
    setShowNewClientModal(false);
  };

  const handleNewClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClientForm((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (newClientErrors[name]) {
      setNewClientErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateNewClientForm = () => {
    const errors: Record<string, string> = {};

    if (!newClientForm.name.trim()) {
      errors.name = "שם הלקוח הוא שדה חובה";
    }

    if (!newClientForm.title.trim()) {
      errors.title = "תפקיד הוא שדה חובה";
    }

    if (!newClientForm.email.trim()) {
      errors.email = "דוא״ל הוא שדה חובה";
    } else if (!/^\S+@\S+\.\S+$/.test(newClientForm.email)) {
      errors.email = "כתובת דוא״ל לא תקינה";
    }

    if (
      newClientForm.mobile &&
      !/^\d{9,10}$/.test(newClientForm.mobile.replace(/[-\s]/g, ""))
    ) {
      errors.mobile = "מספר טלפון לא תקין";
    }

    setNewClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNewClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateNewClientForm()) {
      return;
    }

    setIsNewClientSubmitting(true);
    setNewClientError(null);

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClientForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "אירעה שגיאה בעת יצירת הלקוח");
      }

      // Add the new client to the list
      setClients((prevClients) => [data, ...prevClients]);

      // Show success state
      setNewClientSuccess(true);

      // Reset form after a delay
      setTimeout(() => {
        closeNewClientModal();
        // Reset success state after modal closes
        setTimeout(() => setNewClientSuccess(false), 300);
      }, 2000);
    } catch (err: any) {
      console.error("Error creating client:", err);
      setNewClientError(err.message || "אירעה שגיאה בעת יצירת הלקוח");
    } finally {
      setIsNewClientSubmitting(false);
    }
  };

  const openDeleteCampaignModal = (campaignId: string) => {
    // Find the campaign in the clients list
    let campaignFound: Campaign | null = null;

    for (const client of clients) {
      if (client.campaigns) {
        const campaign = client.campaigns.find((c) => c.id === campaignId);
        if (campaign) {
          campaignFound = campaign;
          break;
        }
      }
    }

    if (campaignFound) {
      setCampaignToDelete(campaignFound);
      setShowDeleteCampaignModal(true);
      setDeleteCampaignError(null);
      setDeleteCampaignSuccess(false);
    } else {
      console.error("Campaign not found:", campaignId);
    }
  };

  const closeDeleteCampaignModal = () => {
    setShowDeleteCampaignModal(false);
    setTimeout(() => {
      setCampaignToDelete(null);
      setDeleteCampaignError(null);
      setDeleteCampaignSuccess(false);
    }, 300);
  };

  const handleDeleteCampaign = async () => {
    if (!campaignToDelete || !campaignToDelete.id) return;

    try {
      setIsDeletingCampaign(true);
      setDeleteCampaignError(null);

      const response = await fetch(`/api/campaigns/${campaignToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete campaign");
      }

      // Show success message
      setDeleteCampaignSuccess(true);

      // Update client's campaign count and remove the campaign from the list
      const updatedClients = clients.map((client) => {
        if (client.id === campaignToDelete.clientId) {
          // Update campaign count
          const updatedCount = client._count
            ? {
                ...client._count,
                campaigns: Math.max(0, (client._count.campaigns || 1) - 1),
              }
            : { campaigns: 0 };

          // Remove campaign from list
          const updatedCampaigns = client.campaigns
            ? client.campaigns.filter((c) => c.id !== campaignToDelete.id)
            : [];

          return {
            ...client,
            _count: updatedCount,
            campaigns: updatedCampaigns,
          };
        }
        return client;
      });

      setClients(updatedClients);

      // Close modal after success
      setTimeout(() => {
        closeDeleteCampaignModal();
      }, 2000);
    } catch (err: any) {
      console.error("Error deleting campaign:", err);
      setDeleteCampaignError(err.message || "Failed to delete campaign");
    } finally {
      setIsDeletingCampaign(false);
    }
  };

  // Filter and sort clients
  const filteredAndSortedClients = clients
    .filter(
      (client) =>
        (searchTerm === "" ||
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (clientStatus === "all" ||
          (clientStatus === "active" && (client._count?.campaigns || 0) > 0) ||
          (clientStatus === "inactive" &&
            (client._count?.campaigns || 0) === 0))
    )
    .sort((a, b) => {
      if (sortOrder === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    });

  return (
    <div className="space-y-6">
      {/* Add the styles to the page */}
      <style jsx>{dropdownStyles}</style>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">לקוחות</h1>
          <p className="text-gray-500">נהל את רשימת הלקוחות שלך</p>
        </div>
        <button
          onClick={openNewClientModal}
          className="flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Plus className="h-5 w-5 ml-1" />
          לקוח חדש
        </button>
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
              placeholder="חיפוש לקוחות..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <select
                className="appearance-none block text-sm py-2 px-3 pr-8 border border-gray-200 rounded-md bg-white"
                value={clientStatus}
                onChange={(e) =>
                  setClientStatus(
                    e.target.value as "all" | "active" | "inactive"
                  )
                }
              >
                <option value="all">כל הלקוחות</option>
                <option value="active">פעילים</option>
                <option value="inactive">לא פעילים</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <select
                className="appearance-none block text-sm py-2 px-3 pr-8 border border-gray-200 rounded-md bg-white"
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest" | "name")
                }
              >
                <option value="newest">חדשים ביותר</option>
                <option value="oldest">ישנים ביותר</option>
                <option value="name">לפי שם</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
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
        /* Clients table */
        <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="w-[25%] px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    שם
                  </th>
                  <th
                    scope="col"
                    className="w-[15%] px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    תפקיד
                  </th>
                  <th
                    scope="col"
                    className="w-[25%] px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    פרטי התקשרות
                  </th>
                  <th
                    scope="col"
                    className="w-[15%] px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    קמפיינים
                  </th>
                  <th
                    scope="col"
                    className="w-[15%] px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    נוצר ב
                  </th>
                  <th
                    scope="col"
                    className="w-[5%] px-6 py-3 text-center relative"
                  >
                    <span className="sr-only">פעולות</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedClients.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-gray-600 font-medium"
                    >
                      לא נמצאו לקוחות{searchTerm ? ` עבור "${searchTerm}"` : ""}
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium text-lg">
                            {client.name.charAt(0)}
                          </div>
                          <div className="mr-6">
                            <div className="text-sm font-semibold text-gray-900">
                              {client.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-800">
                          {client.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Mail className="h-4 w-4 mr-1 text-gray-600" />{" "}
                          {client.email}
                        </div>
                        {client.mobile && (
                          <div className="text-sm text-gray-700 flex items-center mt-1">
                            <Phone className="h-4 w-4 mr-1 text-gray-600" />{" "}
                            {client.mobile}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {client._count?.campaigns || 0}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openCampaignModal(client);
                              setOpenDropdownId(null); // Close dropdown after action
                            }}
                            className="text-xs bg-blue-100 text-blue-700 py-1 px-2 rounded-md hover:bg-blue-200 transition-colors font-medium"
                          >
                            + קמפיין חדש
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center font-medium">
                        {format(new Date(client.createdAt), "yyyy-MM-dd")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                        <div className="flex justify-center">
                          <div className="dropdown-wrapper">
                            <button
                              className="dropdown-trigger p-1 rounded-full hover:bg-gray-200"
                              onClick={(e) => toggleDropdown(e, client.id)}
                            >
                              <MoreVertical className="h-5 w-5 text-gray-500" />
                            </button>
                            <div
                              className={`dropdown-menu ${
                                openDropdownId === client.id ? "active" : ""
                              }`}
                            >
                              <div
                                className="py-1 overflow-visible"
                                role="menu"
                                aria-orientation="vertical"
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
                              >
                                <Link
                                  href={`/office/clients/${client.id}`}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit className="ml-2 h-4 w-4" /> ערוך
                                </Link>
                                <button
                                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openCampaignModal(client);
                                    setOpenDropdownId(null); // Close dropdown after action
                                  }}
                                >
                                  <Megaphone className="ml-2 h-4 w-4" /> קמפיין
                                  חדש
                                </button>
                                <Link
                                  href={`/office/clients/${client.id}/campaigns`}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Briefcase className="ml-2 h-4 w-4" /> כל
                                  הקמפיינים
                                </Link>
                                {client.campaigns &&
                                  client.campaigns.length > 0 && (
                                    <>
                                      <div className="border-t border-gray-100 my-1"></div>
                                      <div className="px-4 py-2 text-xs text-gray-500 font-medium">
                                        קמפיינים פעילים
                                      </div>
                                      {client.campaigns
                                        .slice(0, 3)
                                        .map((campaign) => (
                                          <div
                                            key={campaign.id}
                                            className="px-4 py-2 hover:bg-gray-100"
                                          >
                                            <div className="flex justify-between items-center">
                                              <span className="text-sm text-gray-700 truncate max-w-[150px]">
                                                {campaign.name}
                                              </span>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  if (campaign.id) {
                                                    openDeleteCampaignModal(
                                                      campaign.id
                                                    );
                                                    setOpenDropdownId(null); // Close dropdown after action
                                                  }
                                                }}
                                                className="text-red-600 hover:text-red-800"
                                                title="מחק קמפיין"
                                              >
                                                <Trash className="h-4 w-4" />
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      {client.campaigns.length > 3 && (
                                        <Link
                                          href={`/office/clients/${client.id}/campaigns`}
                                          className="px-4 py-2 text-xs text-blue-600 hover:text-blue-800 font-medium block text-center"
                                        >
                                          הצג {client.campaigns.length - 3}{" "}
                                          קמפיינים נוספים
                                        </Link>
                                      )}
                                    </>
                                  )}
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                  className="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 font-medium"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClient(client.id);
                                    setOpenDropdownId(null); // Close dropdown after action
                                  }}
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

          {/* Pagination */}
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-300">
            <div className="flex-1 flex justify-between items-center">
              <span className="text-sm text-gray-700 font-medium">
                מציג <span className="font-semibold text-gray-900">1</span> עד{" "}
                <span className="font-semibold text-gray-900">
                  {filteredAndSortedClients.length}
                </span>{" "}
                מתוך{" "}
                <span className="font-semibold text-gray-900">
                  {clients.length}
                </span>{" "}
                תוצאות
              </span>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button
                  disabled
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-500 bg-gray-50"
                >
                  הקודם
                </button>
                <button
                  disabled
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-500 bg-gray-50"
                >
                  הבא
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Client Modal */}
      <Modal
        isOpen={showNewClientModal}
        onClose={closeNewClientModal}
        title="לקוח חדש"
        size="md"
      >
        {newClientSuccess ? (
          <div className="p-6 flex flex-col items-center justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
            <p className="text-center text-lg font-medium text-gray-900">
              הלקוח נוצר בהצלחה!
            </p>
          </div>
        ) : (
          <form onSubmit={handleNewClientSubmit} className="space-y-4">
            {newClientError && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm">
                {newClientError}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                שם הלקוח <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={newClientForm.name}
                onChange={handleNewClientChange}
                className={`w-full px-3 py-2 border ${
                  newClientErrors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-primary focus:border-primary`}
              />
              {newClientErrors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {newClientErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                תפקיד <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={newClientForm.title}
                onChange={handleNewClientChange}
                className={`w-full px-3 py-2 border ${
                  newClientErrors.title ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-primary focus:border-primary`}
              />
              {newClientErrors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {newClientErrors.title}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                דוא״ל <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={newClientForm.email}
                onChange={handleNewClientChange}
                className={`w-full px-3 py-2 border ${
                  newClientErrors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-primary focus:border-primary`}
              />
              {newClientErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {newClientErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                טלפון נייד
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={newClientForm.mobile}
                onChange={handleNewClientChange}
                className={`w-full px-3 py-2 border ${
                  newClientErrors.mobile ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-primary focus:border-primary`}
              />
              {newClientErrors.mobile && (
                <p className="mt-1 text-sm text-red-600">
                  {newClientErrors.mobile}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
              <button
                type="button"
                onClick={closeNewClientModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                ביטול
              </button>
              <button
                type="submit"
                disabled={isNewClientSubmitting}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {isNewClientSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                    מעבד...
                  </span>
                ) : (
                  "צור לקוח"
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Campaign Confirmation Modal */}
      <Modal
        isOpen={showDeleteCampaignModal}
        onClose={closeDeleteCampaignModal}
        title="מחיקת קמפיין"
        size="sm"
      >
        {deleteCampaignSuccess ? (
          <div className="p-6 flex flex-col items-center justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
            <p className="text-center text-lg font-medium text-gray-900">
              הקמפיין נמחק בהצלחה!
            </p>
          </div>
        ) : (
          <div className="p-6">
            {deleteCampaignError && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm mb-4">
                {deleteCampaignError}
              </div>
            )}

            <div className="flex items-center justify-center mb-6">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>

            <p className="text-center text-base font-medium text-gray-900 mb-2">
              האם אתה בטוח שברצונך למחוק את הקמפיין{" "}
              <span className="font-bold">{campaignToDelete?.name}</span>?
            </p>
            <p className="text-center text-sm text-gray-600 mb-6">
              פעולה זו אינה ניתנת לביטול ותמחק את כל הנתונים הקשורים לקמפיין זה.
            </p>

            <div className="flex justify-center space-x-3 rtl:space-x-reverse">
              <button
                type="button"
                onClick={closeDeleteCampaignModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
              >
                ביטול
              </button>
              <button
                type="button"
                onClick={handleDeleteCampaign}
                disabled={isDeletingCampaign}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium"
              >
                {isDeletingCampaign ? (
                  <span className="flex items-center">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full ml-2"></span>
                    מוחק...
                  </span>
                ) : (
                  "מחק קמפיין"
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Campaign creation modal */}
      <Modal
        isOpen={showCampaignModal && !!selectedClient}
        onClose={closeCampaignModal}
        title={
          selectedClient
            ? `קמפיין חדש עבור ${selectedClient.name}`
            : "קמפיין חדש"
        }
        size="md"
      >
        {submitSuccess ? (
          <div className="p-6 flex flex-col items-center justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
            <p className="text-center text-lg font-medium text-gray-900">
              הקמפיין נוצר בהצלחה!
            </p>
          </div>
        ) : (
          <form onSubmit={handleCampaignSubmit} className="space-y-4">
            {campaignError && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm">
                {campaignError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                שם הקמפיין <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={campaignForm.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                תיאור
              </label>
              <textarea
                name="description"
                value={campaignForm.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  תאריך התחלה <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <input
                    type="date"
                    name="startDate"
                    value={campaignForm.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  תאריך סיום <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <input
                    type="date"
                    name="endDate"
                    value={campaignForm.endDate}
                    onChange={handleInputChange}
                    required
                    className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                תקציב (₪)
              </label>
              <input
                type="number"
                name="budget"
                value={campaignForm.budget}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
              <button
                type="button"
                onClick={closeCampaignModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                ביטול
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                    מעבד...
                  </span>
                ) : (
                  "יצירת קמפיין"
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
