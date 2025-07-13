"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

// Simple icons for the component
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

interface Area {
  id: string | number;
  area_name: string;
}

interface AreaSelectorProps {
  selectedAreaId?: string | number | null;
  onChange?: (areaId: string | number | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const AreaSelector: React.FC<AreaSelectorProps> = ({
  selectedAreaId = null,
  onChange,
  placeholder = "בחר אזור...",
  className = "",
  disabled = false,
}) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch areas from API
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch("/api/areas");
        if (!response.ok) {
          throw new Error("Failed to fetch areas");
        }
        
        const data = await response.json();
        console.log('Fetched areas:', data);
        setAreas(data || []);
      } catch (err: any) {
        console.error("Error fetching areas:", err);
        setError(err.message || "Failed to load areas");
        toast.error("שגיאה בטעינת האזורים");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAreas();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const selectedArea = areas.find(area => area.id?.toString() === selectedAreaId?.toString());
  const filteredAreas = areas.filter(area =>
    area.area_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleDropdown = () => {
    if (disabled || isLoading || error) return;
    setIsOpen(!isOpen);
  };

  const handleSelectArea = (areaId: string | number) => {
    if (disabled) return;
    
    console.log('Selected area:', areaId);
    onChange?.(areaId);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onChange?.(null);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Main trigger button */}
      <button
        type="button"
        onClick={handleToggleDropdown}
        disabled={disabled || isLoading || !!error}
        className={`
          relative w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          rounded-xl px-4 py-3 text-right shadow-sm transition-all duration-200
          hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
          ${disabled || isLoading || !!error 
            ? 'cursor-not-allowed opacity-50' 
            : 'cursor-pointer'
          }
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" dir="rtl">
            <MapPinIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <span className={`text-sm font-medium ${
              selectedArea 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {isLoading ? "טוען אזורים..." : 
               error ? "שגיאה בטעינה" :
               selectedArea ? selectedArea.area_name : placeholder}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedArea && !disabled && (
              <button
                type="button"
                onClick={handleClearSelection}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                title="נקה בחירה"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <ChevronDownIcon 
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </div>
        </div>
      </button>

      {/* Dropdown menu */}
      {isOpen && !error && areas.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden">
          {/* Search input */}
          <div className="p-3 border-b border-gray-100 dark:border-gray-700">
            <div className="relative" dir="rtl">
              <MapPinIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="חפש אזור..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 pr-10 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                dir="rtl"
              />
            </div>
          </div>

          {/* Areas list */}
          <div className="max-h-64 overflow-y-auto">
            {filteredAreas.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                לא נמצאו אזורים
              </div>
            ) : (
              filteredAreas.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => handleSelectArea(area.id)}
                  className={`
                    w-full px-4 py-3 text-right text-sm transition-colors duration-150
                    hover:bg-gray-50 dark:hover:bg-gray-700
                    ${selectedArea?.id?.toString() === area.id?.toString()
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-900 dark:text-white'
                    }
                  `}
                >
                  <div className="flex flex-row-reverse items-center w-full">
                    <div className="flex items-center gap-2 flex-grow">
                      <MapPinIcon className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{area.area_name}</span>
                    </div>
                    {selectedArea?.id?.toString() === area.id?.toString() && (
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 ml-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AreaSelector;
