import React from "react";
import Link from "next/link";
import { MoreVertical, Edit, Trash, Megaphone, Briefcase } from "lucide-react";
import { Client, Campaign } from "../types"; // Assuming types.ts is in the parent directory

interface ClientActionsDropdownProps {
  client: Client;
  isOpen: boolean;
  onToggleDropdown: (e: React.MouseEvent) => void;
  onOpenCampaignModal: (client: Client) => void;
  onDeleteClient: (clientId: string) => void;
  onOpenDeleteCampaignModal: (campaignId: string) => void;
  onCloseDropdown: () => void; // To close dropdown after an action
}

const dropdownStyles = `
  .dropdown-wrapper {
    position: relative;
  }
  
  .dropdown-menu {
    display: none;
    position: fixed; /* Changed from absolute for better positioning */
    z-index: 50; /* Ensure it's above other content */
    min-width: 16rem; /* 256px */
    padding: 0.5rem 0;
    background-color: var(--card); /* Theme-aware background */
    color: var(--card-foreground); /* Theme-aware text */
    border-radius: 0.375rem; /* rounded-md */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg */
    border: 1px solid var(--border); /* Theme-aware border */
  }
  
  .dropdown-trigger {
    cursor: pointer;
  }
  
  .dropdown-menu.active {
    display: block;
  }
`;

const ClientActionsDropdown: React.FC<ClientActionsDropdownProps> = ({
  client,
  isOpen,
  onToggleDropdown,
  onOpenCampaignModal,
  onDeleteClient,
  onOpenDeleteCampaignModal,
  onCloseDropdown,
}) => {
  // Stop propagation for menu items to prevent closing the dropdown unintentionally
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
    onCloseDropdown(); // Close dropdown after action
  };

  return (
    <div className="dropdown-wrapper">
      <style jsx>{dropdownStyles}</style>
      <button
        className="dropdown-trigger p-1 rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={onToggleDropdown}
      >
        <MoreVertical className="h-5 w-5 text-muted-foreground" />
      </button>
      <div
        className={`dropdown-menu ${isOpen ? "active" : ""}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu itself
      >
        <div className="py-1" role="menu" aria-orientation="vertical">
          <Link
            href={`/office/clients/${client.id}`}
            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted/50 w-full text-right rtl:text-left"
            onClick={(e) => handleActionClick(e, () => {})}
          >
            <Edit className="ml-2 rtl:mr-2 h-4 w-4" /> ערוך
          </Link>
          <button
            className="w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted/50 text-right rtl:text-left"
            onClick={(e) =>
              handleActionClick(e, () => onOpenCampaignModal(client))
            }
          >
            <Megaphone className="ml-2 rtl:mr-2 h-4 w-4" /> קמפיין חדש
          </button>
          <Link
            href={`/office/clients/${client.id}/campaigns`}
            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted/50 w-full text-right rtl:text-left"
            onClick={(e) => handleActionClick(e, () => {})}
          >
            <Briefcase className="ml-2 rtl:mr-2 h-4 w-4" /> כל הקמפיינים
          </Link>
          {client.campaigns && client.campaigns.length > 0 && (
            <>
              <div className="border-t border-border my-1"></div>
              <div className="px-4 py-2 text-xs text-muted-foreground font-medium">
                קמפיינים פעילים
              </div>
              {client.campaigns.slice(0, 3).map((campaign) => (
                <div
                  key={campaign.id}
                  className="px-4 py-2 hover:bg-muted/50 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground truncate max-w-[150px]">
                      {campaign.name}
                    </span>
                    <button
                      onClick={(e) =>
                        handleActionClick(
                          e,
                          () =>
                            campaign.id &&
                            onOpenDeleteCampaignModal(campaign.id)
                        )
                      }
                      className="text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity"
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
                  className="px-4 py-2 text-xs text-primary hover:text-primary/80 font-medium block text-center"
                  onClick={(e) => handleActionClick(e, () => {})}
                >
                  הצג {client.campaigns.length - 3} קמפיינים נוספים
                </Link>
              )}
            </>
          )}
          <div className="border-t border-border my-1"></div>
          <button
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 font-medium text-right rtl:text-left"
            onClick={(e) =>
              handleActionClick(e, () => onDeleteClient(client.id))
            }
          >
            <Trash className="ml-2 rtl:mr-2 h-4 w-4" /> מחק
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientActionsDropdown;
