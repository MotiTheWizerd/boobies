import React from "react";
import { Search, ChevronDown } from "lucide-react";

interface ClientFiltersProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  clientStatus: "all" | "active" | "inactive";
  onClientStatusChange: (status: "all" | "active" | "inactive") => void;
  sortOrder: "newest" | "oldest" | "name";
  onSortOrderChange: (order: "newest" | "oldest" | "name") => void;
}

const ClientFilters: React.FC<ClientFiltersProps> = ({
  searchTerm,
  onSearchTermChange,
  clientStatus,
  onClientStatusChange,
  sortOrder,
  onSortOrderChange,
}) => {
  return (
    <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none rtl:left-0 rtl:right-auto rtl:pl-3">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="search"
            className="block w-full py-2 pr-10 pl-4 text-sm text-foreground border border-border rounded-lg bg-background focus:ring-primary focus:border-primary rtl:pl-10 rtl:pr-4"
            placeholder="חיפוש לקוחות..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select
              className="appearance-none block text-sm py-2 px-3 pr-8 border border-border rounded-md bg-background text-foreground focus:ring-primary focus:border-primary rtl:pl-8 rtl:pr-3"
              value={clientStatus}
              onChange={(e) =>
                onClientStatusChange(
                  e.target.value as "all" | "active" | "inactive"
                )
              }
            >
              <option value="all">כל הלקוחות</option>
              <option value="active">פעילים</option>
              <option value="inactive">לא פעילים</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 rtl:right-0 rtl:left-auto rtl:pr-2">
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="relative">
            <select
              className="appearance-none block text-sm py-2 px-3 pr-8 border border-border rounded-md bg-background text-foreground focus:ring-primary focus:border-primary rtl:pl-8 rtl:pr-3"
              value={sortOrder}
              onChange={(e) =>
                onSortOrderChange(
                  e.target.value as "newest" | "oldest" | "name"
                )
              }
            >
              <option value="newest">חדשים ביותר</option>
              <option value="oldest">ישנים ביותר</option>
              <option value="name">לפי שם</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 rtl:right-0 rtl:left-auto rtl:pr-2">
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFilters;
