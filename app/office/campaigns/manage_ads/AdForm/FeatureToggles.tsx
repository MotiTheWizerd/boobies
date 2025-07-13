interface FeatureTogglesProps {
  isHappyHour: boolean;
  isHot: boolean;
  isPremium: boolean;
  priority: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FeatureToggles({
  isHappyHour,
  isHot,
  isPremium,
  priority,
  onChange,
}: FeatureTogglesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer group">
        <input
          type="checkbox"
          name="isHappyHour"
          checked={isHappyHour}
          onChange={onChange}
          className="w-5 h-5 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-offset-gray-800"
        />
        <span className="mr-3 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
          Happy Hour
        </span>
      </label>
      <label className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer group">
        <input
          type="checkbox"
          name="isHot"
          checked={isHot}
          onChange={onChange}
          className="w-5 h-5 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-offset-gray-800"
        />
        <span className="mr-3 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
          חם 🔥
        </span>
      </label>
      <label className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer group">
        <input
          type="checkbox"
          name="isPremium"
          checked={isPremium}
          onChange={onChange}
          className="w-5 h-5 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-offset-gray-800"
        />
        <span className="mr-3 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
          פרימיום ⭐
        </span>
      </label>
      <label className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer group">
        <input
          type="checkbox"
          name="priority"
          checked={priority}
          onChange={onChange}
          className="w-5 h-5 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary dark:focus:ring-offset-gray-800"
        />
        <span className="mr-3 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
          עדיפות ⚡
        </span>
      </label>
    </div>
  );
}
