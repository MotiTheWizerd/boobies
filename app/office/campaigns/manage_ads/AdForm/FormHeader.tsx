interface FormHeaderProps {
  isEdit: boolean;
}

export default function FormHeader({ isEdit }: FormHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        {isEdit ? "עריכת מודעה" : "יצירת מודעה חדשה"}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {isEdit
          ? "ערוך את פרטי המודעה"
          : "מלא את הפרטים ליצירת מודעה חדשה במערכת"}
      </p>
    </div>
  );
}
