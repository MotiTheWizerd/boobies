import { statusOptions, serviceTypeOptions } from './types';

interface StatusControlsProps {
  status: string;
  serviceType: 'INCALL' | 'OUTCALL' | 'MIXED';
  tags: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  errors: { [key: string]: string };
}

export default function StatusControls({
  status,
  serviceType,
  tags,
  onChange,
  errors,
}: StatusControlsProps) {
  return (
    <>
      {/* Status Field */}
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="status"
        >
          סטטוס <span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          name="status"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
          value={status}
          onChange={onChange}
          required
        >
          {statusOptions.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-white dark:bg-gray-700"
            >
              {opt.label}
            </option>
          ))}
        </select>
        {errors.status && (
          <div className="text-red-500 text-xs mt-1">{errors.status}</div>
        )}
      </div>

      {/* Tags Field */}
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="tags"
        >
          תגיות
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
          value={tags}
          onChange={onChange}
          placeholder="הכנס תגיות מופרדות בפסיקים (לדוגמה: מבצע, חורף, קיץ)"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          הפרד תגיות בעזרת פסיקים
        </p>
      </div>

      {/* Service Type Field */}
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="service_type"
        >
          סוג שירות
        </label>
        <select
          id="service_type"
          name="service_type"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
          value={serviceType}
          onChange={onChange}
          required
        >
          {serviceTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
