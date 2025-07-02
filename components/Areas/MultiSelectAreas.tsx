"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
// Using simple SVG icons instead of heroicons for compatibility
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

interface Area {
  id: string | number;
  area_name: string;
}

interface MultiSelectAreasProps {
  value: (string | number)[]; // Array of selected area IDs
  onChange: (value: (string | number)[]) => void;
  label?: string;
  id?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  maxSelections?: number;
}

const MultiSelectAreas: React.FC<MultiSelectAreasProps> = ({
  value = [],
  onChange,
  label = "בחר אזורים",
  id = "multi-area-select",
  required = false,
  className = "w-full",
  disabled = false,
  placeholder = "בחר אזורים...",
  maxSelections,
}) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAreas = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/areas");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch areas");
        }
        const data: Area[] = await response.json();
        setAreas(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Error fetching areas:", message);
        setError(message);
        toast.error(`Failed to load areas: ${message}`);
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

  // Log the props and areas data for debugging
  console.log('MultiSelectAreas - Props:', { 
    value, 
    areas, 
    label, 
    disabled, 
    isLoading, 
    error 
  });

  const selectedAreas = areas.filter(area => {
    const isSelected = value.includes(area.id.toString()) || value.includes(Number(area.id));
    console.log(`Area ${area.id} (${area.area_name}):`, { 
      areaId: area.id, 
      value, 
      isSelected,
      typeOfAreaId: typeof area.id,
      valueTypes: value.map(v => typeof v)
    });
    return isSelected;
  });

  console.log('Selected Areas:', selectedAreas);
  
  const filteredAreas = areas.filter(area =>
    area.area_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleArea = (areaId: string | number) => {
    if (disabled) return;
    
    console.log('Toggling area:', { 
      areaId, 
      type: typeof areaId, 
      currentValue: value,
      includes: value.includes(areaId) || value.includes(areaId.toString()) || value.includes(Number(areaId))
    });

    if (value.includes(areaId) || value.includes(areaId.toString()) || value.includes(Number(areaId))) {
      // Remove area
      onChange(value.filter(id => id !== areaId));
    } else {
      // Add area (check max selections)
      if (maxSelections && value.length >= maxSelections) {
        toast.warning(`ניתן לבחור עד ${maxSelections} אזורים`);
        return;
      }
      onChange([...value, areaId]);
    }
  };

  const handleRemoveArea = (areaId: string | number) => {
    if (disabled) return;
    onChange(value.filter(id => id !== areaId));
  };

  const handleClearAll = () => {
    if (disabled) return;
    onChange([]);
  };

  const handleToggleDropdown = () => {
    if (disabled || isLoading || error) return;
    setIsOpen(!isOpen);
  };

  const isDisabled = disabled || isLoading || !!error || areas.length === 0;

  return (
    <div className={className} ref={dropdownRef}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
        {maxSelections && (
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
            (עד {maxSelections} אזורים)
          </span>
        )}
      </label>

      {/* Selected Areas Display */}
      {selectedAreas.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {selectedAreas.map((area) => (
              <div
                key={area.id}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full border border-blue-200 dark:border-blue-700 animate-in fade-in duration-200"
              >
                <span className="font-medium">{area.area_name}</span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => handleRemoveArea(area.id)}
                    className="ml-1 p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full transition-colors duration-150"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            {selectedAreas.length > 0 && !disabled && (
              <button
                type="button"
                onClick={handleClearAll}
                className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-150"
              >
                נקה הכל
              </button>
            )}
          </div>
        </div>
      )}

      {/* Dropdown Trigger */}
      <div className="relative">
        <button
          type="button"
          onClick={handleToggleDropdown}
          disabled={isDisabled}
          className={`
            relative w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
            rounded-lg px-4 py-3 text-right shadow-sm cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed
            hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-150
            ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
          `}
        >
          <span className="block truncate text-gray-900 dark:text-gray-100">
            {isLoading && "טוען אזורים..."}
            {error && "שגיאה בטעינת אזורים"}
            {!isLoading && !error && selectedAreas.length === 0 && placeholder}
            {!isLoading && !error && selectedAreas.length > 0 && 
              `נבחרו ${selectedAreas.length} אזורים`
            }
          </span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <ChevronDownIcon 
              className={`w-5 h-5 text-gray-400 transition-transform duration-150 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && !isDisabled && (
          <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg max-h-80 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-600">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="חפש אזור..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredAreas.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                  {searchTerm ? "לא נמצאו תוצאות" : "אין אזורים זמינים"}
                </div>
              ) : (
                filteredAreas.map((area) => {
                  const isSelected = value.includes(area.id);
                  const isMaxReached = maxSelections && value.length >= maxSelections && !isSelected;
                  
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => handleToggleArea(area.id)}
                      disabled={!!isMaxReached}
                      className={`
                        w-full px-4 py-3 text-right text-sm transition-colors duration-150
                        flex items-center justify-between
                        ${isSelected 
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                          : 'text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }
                        ${isMaxReached ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <span className="font-medium">{area.area_name}</span>
                      {isSelected && (
                        <CheckIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer with selection count */}
            {selectedAreas.length > 0 && (
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
                  <span>נבחרו {selectedAreas.length} אזורים</span>
                  {maxSelections && (
                    <span>מתוך {maxSelections} מקסימום</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          שגיאה: {error}
        </p>
      )}
    </div>
  );
};

export default MultiSelectAreas;
