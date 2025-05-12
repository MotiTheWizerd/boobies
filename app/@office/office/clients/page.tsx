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
import { Client, Campaign } from "./types"; // IMPORT NEW TYPES
import PageHeader from "./components/PageHeader"; // IMPORT PageHeader
import ClientFilters from "./components/ClientFilters"; // IMPORT ClientFilters
import ClientTable from "./components/ClientTable"; // IMPORT ClientTable
import NewClientModal from "./components/NewClientModal"; // IMPORT NewClientModal
import NewCampaignModal from "./components/NewCampaignModal"; // IMPORT NewCampaignModal
import DeleteCampaignModal from "./components/DeleteCampaignModal"; // IMPORT DeleteCampaignModal

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

  // Add new client modal state
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  // Delete campaign confirmation modal state
  const [showDeleteCampaignModal, setShowDeleteCampaignModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(
    null
  );

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
    e.stopPropagation();
    if (openDropdownId === clientId) {
      setOpenDropdownId(null);
      return;
    }
    setOpenDropdownId(clientId);
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  // Handlers for filter changes - these will be passed to ClientFilters
  const handleSearchTermChange = (term: string) => setSearchTerm(term);
  const handleClientStatusChange = (status: "all" | "active" | "inactive") =>
    setClientStatus(status);
  const handleSortOrderChange = (order: "newest" | "oldest" | "name") =>
    setSortOrder(order);

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
    setSelectedClient(client);
    setShowCampaignModal(true);
  };

  const closeCampaignModal = () => {
    setShowCampaignModal(false);
    setSelectedClient(null);
  };

  const handleCampaignCreated = (newCampaign: Campaign) => {
    setClients((prevClients) =>
      prevClients.map((client) => {
        if (client.id === selectedClient?.id) {
          return {
            ...client,
            _count: {
              campaigns: (client._count?.campaigns || 0) + 1,
            },
          };
        }
        return client;
      })
    );
  };

  const openNewClientModal = () => {
    setShowNewClientModal(true);
  };

  const closeNewClientModal = () => {
    setShowNewClientModal(false);
  };

  const handleClientCreated = (newClient: Client) => {
    setClients((prevClients) => [newClient, ...prevClients]);
  };

  const openDeleteCampaignModal = (campaignId: string) => {
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
    } else {
      console.error("Campaign not found for deletion:", campaignId);
    }
  };

  const closeDeleteCampaignModal = () => {
    setShowDeleteCampaignModal(false);
    setTimeout(() => {
      setCampaignToDelete(null);
    }, 300);
  };

  const handleCampaignDeleted = (
    deletedCampaignId: string,
    clientId: string
  ) => {
    setClients((prevClients) =>
      prevClients.map((client) => {
        if (client.id === clientId) {
          const updatedCount = client._count
            ? {
                ...client._count,
                campaigns: Math.max(0, (client._count.campaigns || 1) - 1),
              }
            : { campaigns: 0 };
          const updatedCampaigns = client.campaigns
            ? client.campaigns.filter((c) => c.id !== deletedCampaignId)
            : [];
          return {
            ...client,
            _count: updatedCount,
            campaigns: updatedCampaigns,
          };
        }
        return client;
      })
    );
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
      {/* <style jsx>{dropdownStyles}</style> NO LONGER NEEDED HERE */}

      {/* USE PageHeader component */}
      <PageHeader
        title="לקוחות"
        subtitle="נהל את רשימת הלקוחות שלך"
        buttonText="לקוח חדש"
        onButtonClick={openNewClientModal}
      />

      {/* USE ClientFilters component */}
      <ClientFilters
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        clientStatus={clientStatus}
        onClientStatusChange={handleClientStatusChange}
        sortOrder={sortOrder}
        onSortOrderChange={handleSortOrderChange}
      />

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
        /* USE ClientTable component */
        <ClientTable
          clients={filteredAndSortedClients}
          isLoading={loading}
          error={error}
          searchTerm={searchTerm}
          openDropdownId={openDropdownId}
          onToggleDropdown={toggleDropdown}
          onCloseDropdown={closeDropdown}
          onOpenCampaignModal={openCampaignModal}
          onDeleteClient={handleDeleteClient}
          onOpenDeleteCampaignModal={openDeleteCampaignModal}
        />
      )}

      {/* USE NewClientModal component */}
      <NewClientModal
        isOpen={showNewClientModal}
        onClose={closeNewClientModal}
        onClientCreated={handleClientCreated}
      />

      {/* USE NewCampaignModal component */}
      <NewCampaignModal
        isOpen={showCampaignModal}
        onClose={closeCampaignModal}
        selectedClient={selectedClient}
        onCampaignCreated={handleCampaignCreated}
      />

      {/* USE DeleteCampaignModal component */}
      <DeleteCampaignModal
        isOpen={showDeleteCampaignModal}
        onClose={closeDeleteCampaignModal}
        campaignToDelete={campaignToDelete}
        onCampaignDeleted={handleCampaignDeleted}
      />
    </div>
  );
}
