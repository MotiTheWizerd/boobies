import { useState, useEffect } from 'react';
import MultiSelectAreas from "@/components/Areas/MultiSelectAreas";

interface LocationSelectorProps {
  areaIds: (string | number)[];
  cityId: string | number;
  onAreaChange: (areaIds: (string | number)[]) => void;
  onCityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errors: { [key: string]: string };
}

export default function LocationSelector({
  areaIds,
  cityId,
  onAreaChange,
  onCityChange,
  errors,
}: LocationSelectorProps) {
  const [cities, setCities] = useState<Array<{ id: number; city_name: string }>>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch cities when area changes
  useEffect(() => {
    const fetchCities = async (areaId: string | number) => {
      try {
        setLoadingCities(true);
        const response = await fetch(`/api/cities/${areaId}`);
        if (!response.ok) throw new Error(`Failed to fetch cities: ${response.status}`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoadingCities(false);
      }
    };

    if (areaIds.length === 1) {
      fetchCities(areaIds[0]);
    } else {
      setCities([]);
    }
  }, [areaIds]);

  return (
    <>
      <div className="space-y-2">
        <MultiSelectAreas
          label="אזורים"
          id="areaIds"
          value={areaIds}
          onChange={onAreaChange}
          className="w-full"
          required
          placeholder="בחר אזורים..."
          maxSelections={5}
        />
        {errors.areaIds && (
          <div className="text-red-500 text-xs mt-1">{errors.areaIds}</div>
        )}
      </div>

      {areaIds.length === 1 && (
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="cityId"
          >
            עיר
          </label>
          <select
            id="cityId"
            name="cityId"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
            value={cityId}
            onChange={onCityChange}
            disabled={loadingCities}
          >
            <option value="">בחר עיר...</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.city_name}
              </option>
            ))}
          </select>
          {loadingCities && (
            <p className="text-sm text-gray-500">טוען ערים...</p>
          )}
        </div>
      )}
    </>
  );
}
