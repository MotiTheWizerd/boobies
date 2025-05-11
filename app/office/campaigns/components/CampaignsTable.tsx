import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "../../components/ui/Badge";
import { FilePlus } from "lucide-react";
import DropdownMenu, { MenuItem } from "../../components/ui/DropdownMenu";
import { Edit, Trash, FilePlus as FilePlusIcon } from "lucide-react";

// Types from the parent component
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

interface CampaignActionsProps {
  campaign: Campaign;
  onDelete: (id: string) => void;
}

const CampaignActions = ({ campaign, onDelete }: CampaignActionsProps) => {
  const menuItems: MenuItem[] = [
    {
      icon: <Edit className="h-4 w-4" />,
      label: "צור מודעה חדשה",
      href: `/office/campaigns/${campaign.id}`,
    },
    {
      icon: <Edit className="h-4 w-4" />,
      label: "ערוך",
      href: `/office/campaigns/${campaign.id}`,
    },
    {
      icon: <FilePlusIcon className="h-4 w-4" />,
      label: "הוסף מודעות",
      href: `/office/campaigns/manage_ads/${campaign.id}`,
    },
    {
      icon: <Trash className="h-4 w-4" />,
      label: "מחק",
      onClick: () => onDelete(campaign.id),
      variant: "danger",
    },
  ];

  return <DropdownMenu items={menuItems} />;
};

interface CampaignsTableProps {
  campaigns: Campaign[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function CampaignsTable({
  campaigns,
  loading,
  onDelete,
}: CampaignsTableProps) {
  // Status badge colors
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">פעיל</Badge>;
      case "pending":
        return <Badge variant="warning">ממתין</Badge>;
      case "completed":
        return <Badge variant="secondary">הושלם</Badge>;
      default:
        return <Badge variant="default">לא ידוע</Badge>;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="min-w-full divide-y divide-border table-fixed">
          <thead className="bg-muted">
            <tr>
              <th
                scope="col"
                className="w-[25%] px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                שם קמפיין
              </th>
              <th
                scope="col"
                className="w-[20%] px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                לקוח
              </th>
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                סטטוס
              </th>
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                מודעות
              </th>
              <th
                scope="col"
                className="w-[15%] px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                תאריך יצירה
              </th>
              <th
                scope="col"
                className="w-[10%] px-6 py-3 text-center relative"
              >
                <span className="sr-only">פעולות</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {campaigns.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-muted-foreground font-medium"
                >
                  לא נמצאו קמפיינים
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium text-lg">
                        {campaign.campaign_name.charAt(0)}
                      </div>
                      <div className="mr-6">
                        <div className="text-sm font-semibold text-foreground">
                          {campaign.campaign_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">
                      {campaign.client.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {campaign.client.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {getStatusBadge(campaign.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success/20 text-success">
                        {campaign._count?.ads || 0}
                      </span>
                      <Link
                        href={`/office/campaigns/manage_ads/${campaign.id}`}
                        className="inline-flex items-center text-xs text-primary hover:text-primary/80"
                      >
                        <FilePlus className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground text-center font-medium">
                    {format(new Date(campaign.createdAt), "yyyy-MM-dd")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground text-center">
                    <div className="flex justify-center">
                      <CampaignActions
                        campaign={campaign}
                        onDelete={onDelete}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-card px-6 py-4 flex items-center justify-between border-t border-border">
        <div className="flex-1 flex justify-between items-center">
          <span className="text-sm text-muted-foreground font-medium">
            מציג <span className="font-semibold text-foreground">1</span> עד{" "}
            <span className="font-semibold text-foreground">
              {campaigns.length}
            </span>{" "}
            מתוך{" "}
            <span className="font-semibold text-foreground">
              {campaigns.length}
            </span>{" "}
            תוצאות
          </span>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <button
              disabled
              className="relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-muted-foreground bg-muted/50"
            >
              הקודם
            </button>
            <button
              disabled
              className="relative inline-flex items-center px-4 py-2 border border-border text-sm font-medium rounded-md text-muted-foreground bg-muted/50"
            >
              הבא
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
