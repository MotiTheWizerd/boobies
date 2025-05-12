import React from "react";
import { format } from "date-fns";
import { Mail, Phone } from "lucide-react";
import { Client } from "../types";
import ClientActionsDropdown from "./ClientActionsDropdown";

interface ClientRowProps {
  client: Client;
  openDropdownId: string | null;
  onToggleDropdown: (e: React.MouseEvent, clientId: string) => void;
  onCloseDropdown: () => void;
  onOpenCampaignModal: (client: Client) => void;
  onDeleteClient: (clientId: string) => void;
  onOpenDeleteCampaignModal: (campaignId: string) => void;
}

const ClientRow: React.FC<ClientRowProps> = ({
  client,
  openDropdownId,
  onToggleDropdown,
  onCloseDropdown,
  onOpenCampaignModal,
  onDeleteClient,
  onOpenDeleteCampaignModal,
}) => {
  return (
    <tr key={client.id} className="hover:bg-muted/50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium text-lg">
            {client.name.charAt(0)}
          </div>
          <div className="mr-6 rtl:ml-6 rtl:mr-0">
            <div className="text-sm font-semibold text-foreground">
              {client.name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-foreground">
          {client.title}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-foreground flex items-center">
          <Mail className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0 text-muted-foreground" />
          {client.email}
        </div>
        {client.mobile && (
          <div className="text-sm text-muted-foreground flex items-center mt-1">
            <Phone className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0 text-muted-foreground" />
            {client.mobile}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="flex items-center justify-center gap-2">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              (client._count?.campaigns || 0) > 0
                ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {client._count?.campaigns || 0}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenCampaignModal(client);
              onCloseDropdown(); // Close dropdown after action
            }}
            className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600 transition-colors font-medium py-1 px-2 rounded-md"
          >
            + קמפיין חדש
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-center font-medium">
        {format(new Date(client.createdAt), "yyyy-MM-dd")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
        <div className="flex justify-center">
          <ClientActionsDropdown
            client={client}
            isOpen={openDropdownId === client.id}
            onToggleDropdown={(e) => onToggleDropdown(e, client.id)}
            onCloseDropdown={onCloseDropdown}
            onOpenCampaignModal={onOpenCampaignModal}
            onDeleteClient={onDeleteClient}
            onOpenDeleteCampaignModal={onOpenDeleteCampaignModal}
          />
        </div>
      </td>
    </tr>
  );
};

export default ClientRow;
