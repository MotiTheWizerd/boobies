import React from "react";
import { Client } from "../types";
import ClientRow from "./ClientRow";

interface ClientTableProps {
  clients: Client[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string; // For the 'no results' message
  openDropdownId: string | null;
  onToggleDropdown: (e: React.MouseEvent, clientId: string) => void;
  onCloseDropdown: () => void;
  onOpenCampaignModal: (client: Client) => void;
  onDeleteClient: (clientId: string) => void;
  onOpenDeleteCampaignModal: (campaignId: string) => void;
}

const ClientTable: React.FC<ClientTableProps> = ({
  clients,
  isLoading,
  error, // Added error to props
  searchTerm,
  openDropdownId,
  onToggleDropdown,
  onCloseDropdown,
  onOpenCampaignModal,
  onDeleteClient,
  onOpenDeleteCampaignModal,
}) => {
  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-sm p-8 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700 rounded-md p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="min-w-full divide-y divide-border table-fixed">
          <thead className="bg-muted/50">
            <tr>
              <th
                scope="col"
                className="w-[25%] px-6 py-3 text-right rtl:text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                שם
              </th>
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-right rtl:text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                תפקיד
              </th>
              <th
                scope="col"
                className="w-[25%] px-6 py-3 text-right rtl:text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                פרטי התקשרות
              </th>
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                קמפיינים
              </th>
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                נוצר ב
              </th>
              <th scope="col" className="w-[5%] px-6 py-3 text-center relative">
                <span className="sr-only">פעולות</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {clients.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-muted-foreground font-medium"
                >
                  לא נמצאו לקוחות{searchTerm ? ` עבור "${searchTerm}"` : ""}
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <ClientRow
                  key={client.id}
                  client={client}
                  openDropdownId={openDropdownId}
                  onToggleDropdown={onToggleDropdown}
                  onCloseDropdown={onCloseDropdown}
                  onOpenCampaignModal={onOpenCampaignModal}
                  onDeleteClient={onDeleteClient}
                  onOpenDeleteCampaignModal={onOpenDeleteCampaignModal}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Assuming pagination might be its own component later or part of this table for now */}
      <div className="bg-card px-6 py-4 flex items-center justify-between border-t border-border">
        <div className="flex-1 flex justify-between items-center">
          <span className="text-sm text-muted-foreground font-medium">
            מציג <span className="font-semibold text-foreground">1</span> עד{" "}
            <span className="font-semibold text-foreground">
              {clients.length}
            </span>{" "}
            מתוך{" "}
            {/* This should ideally come from a prop representing total available clients if pagination is server-side */}
            <span className="font-semibold text-foreground">
              {clients.length}
            </span>{" "}
            תוצאות
          </span>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <button
              disabled
              className="relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-muted-foreground bg-muted/50 cursor-not-allowed"
            >
              הקודם
            </button>
            <button
              disabled
              className="relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-muted-foreground bg-muted/50 cursor-not-allowed"
            >
              הבא
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTable;
