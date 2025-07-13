import { AdFormData } from './types';

interface PersonalDetailsProps {
  form: Partial<AdFormData>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PersonalDetails({ form, onChange }: PersonalDetailsProps) {
  return (
    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
        פרטים אישיים
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Field */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="age"
          >
            גיל
          </label>
          <input
            id="age"
            name="age"
            type="number"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
            value={form.age}
            onChange={onChange}
            placeholder="הכנס גיל"
          />
        </div>

        {/* Country Field */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="country"
          >
            מדינה
          </label>
          <input
            id="country"
            name="country"
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
            value={form.country}
            onChange={onChange}
            placeholder="הכנס מדינה"
          />
        </div>

        {/* Other fields... */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="titsSize"
          >
            מידת חזה
          </label>
          <input
            id="titsSize"
            name="titsSize"
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
            value={form.titsSize}
            onChange={onChange}
            placeholder="הכנס מידת חזה"
          />
        </div>

        {/* Contact Fields */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="mobile"
          >
            מספר נייד
          </label>
          <input
            id="mobile"
            name="mobile"
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
            value={form.mobile}
            onChange={onChange}
            placeholder="הכנס מספר נייד"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="whatsapp"
          >
            מספר וואטסאפ
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
            value={form.whatsapp}
            onChange={onChange}
            placeholder="הכנס מספר וואטסאפ"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="telegram"
          >
            כתובת טלגרם
          </label>
          <input
            id="telegram"
            name="telegram"
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary dark:focus:border-primary transition-colors duration-200"
            value={form.telegram}
            onChange={onChange}
            placeholder="הכנס כתובת טלגרם"
          />
        </div>
      </div>
    </div>
  );
}
