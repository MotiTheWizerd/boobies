import React from "react";
import { Search, ChevronDown } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: "newest" | "oldest" | "name";
  setSortBy: (sort: "newest" | "oldest" | "name") => void;
  statusFilter: "all" | "active" | "pending" | "completed";
  setStatusFilter: (status: "all" | "active" | "pending" | "completed") => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg border border-border shadow-sm">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="search"
            className="block w-full py-2 pr-10 pl-4 text-sm text-foreground bg-background border border-input rounded-lg focus:ring-primary focus:border-primary"
            placeholder="חיפוש קמפיינים..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select
              className="appearance-none block text-sm py-2 px-3 pr-8 border border-input rounded-md bg-background text-foreground"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as "all" | "active" | "pending" | "completed"
                )
              }
            >
              <option value="all">כל הקמפיינים</option>
              <option value="active">פעילים</option>
              <option value="pending">ממתינים</option>
              <option value="completed">הושלמו</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="relative">
            <select
              className="appearance-none block text-sm py-2 px-3 pr-8 border border-input rounded-md bg-background text-foreground"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "newest" | "oldest" | "name")
              }
            >
              <option value="newest">חדשים ביותר</option>
              <option value="oldest">ישנים ביותר</option>
              <option value="name">לפי שם</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
