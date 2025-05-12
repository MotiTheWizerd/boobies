"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";

// Assuming the API returns an array of objects like { id: string | number, name: string }
// Adjust this interface based on the actual API response structure
interface Area {
  id: string | number;
  area_name: string;
}

// --- Add Props Interface ---
interface AreasProps {
  value: string | number; // The currently selected area ID
  onChange: (value: string | number) => void; // Function to call when selection changes
  label?: string; // Optional label
  id?: string; // Optional ID for the select element
  area_name?: string; // Optional name for the select element
  required?: boolean; // Optional required flag
  className?: string; // Optional className for the wrapper div
  disabled?: boolean; // Allow disabling from parent
}

const Areas: React.FC<AreasProps> = ({
  value,
  onChange,
  label = "Select Area",
  id = "area-select",
  area_name = "area",
  required = false,
  className = "w-full max-w-xs", // Default class if none provided
  disabled: parentDisabled = false, // Renamed to avoid conflict with internal disabled logic
}) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(event.target.value);
  };

  const isDisabled =
    parentDisabled || isLoading || !!error || areas.length === 0;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={area_name}
        value={value}
        onChange={handleSelectionChange}
        disabled={isDisabled}
        required={required}
        className={`
          block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          sm:text-sm rounded-md
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-gray-100
          disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed
        `}
      >
        {isLoading && (
          <option value="" disabled>
            טוען אזורים...
          </option>
        )}
        {error && (
          <option value="" disabled>
            שגיאה בטעינת אזורים
          </option>
        )}
        {!isLoading && !error && areas.length === 0 && (
          <option value="" disabled>
            לא נמצאו אזורים
          </option>
        )}
        {!isLoading && !error && areas.length > 0 && (
          <>
            <option value="" disabled={value !== ""}>
              -- בחר אזור --
            </option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.area_name}
              </option>
            ))}
          </>
        )}
      </select>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          שגיאה: {error}
        </p>
      )}
    </div>
  );
};

export default Areas;
