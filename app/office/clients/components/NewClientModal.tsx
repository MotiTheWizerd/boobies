import React, { useState, useEffect } from "react";
import Modal from "@/app/components/Common/Modal";
import { CheckCircle2 } from "lucide-react";

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientCreated: (newClient: any) => void; // Adjust 'any' to the actual Client type if available here
}

const NewClientModal: React.FC<NewClientModalProps> = ({
  isOpen,
  onClose,
  onClientCreated,
}) => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    // Reset form when modal is opened/closed or success state changes
    if (isOpen && !success) {
      setForm({
        name: "",
        title: "",
        email: "",
        mobile: "",
      });
      setErrors({});
      setSubmitError(null);
      // setSuccess(false); // Already handled by isOpen dependency or direct calls
    } else if (!isOpen) {
      // Reset success when modal is closed, so it shows form next time
      setSuccess(false);
    }
  }, [isOpen, success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "שם הלקוח הוא שדה חובה";
    if (!form.title.trim()) newErrors.title = "תפקיד הוא שדה חובה";
    if (!form.email.trim()) {
      newErrors.email = "דוא״ל הוא שדה חובה";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "כתובת דוא״ל לא תקינה";
    }
    if (form.mobile && !/^\d{9,10}$/.test(form.mobile.replace(/[-\s]/g, ""))) {
      newErrors.mobile = "מספר טלפון לא תקין";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "אירעה שגיאה בעת יצירת הלקוח");
      }
      onClientCreated(data); // Pass the created client back to the parent
      setSuccess(true);
      setTimeout(() => {
        onClose(); // Close modal after success message and delay
        // Success state will be reset by useEffect when isOpen becomes false
      }, 2000);
    } catch (err: any) {
      setSubmitError(err.message || "אירעה שגיאה בעת יצירת הלקוח");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="לקוח חדש" size="md">
      {success ? (
        <div className="p-6 flex flex-col items-center justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
          <p className="text-center text-lg font-medium text-foreground">
            הלקוח נוצר בהצלחה!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 p-1">
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700 px-4 py-3 rounded-md text-sm">
              {submitError}
            </div>
          )}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              שם הלקוח <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-primary focus:border-primary ${
                errors.name ? "border-red-500" : "border-border"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              תפקיד <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-primary focus:border-primary ${
                errors.title ? "border-red-500" : "border-border"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              דוא״ל <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-primary focus:border-primary ${
                errors.email ? "border-red-500" : "border-border"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              טלפון נייד
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={form.mobile}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-primary focus:border-primary ${
                errors.mobile ? "border-red-500" : "border-border"
              }`}
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted/50"
            >
              ביטול
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2 rtl:ml-2 rtl:mr-0"></span>
                  מעבד...
                </span>
              ) : (
                "צור לקוח"
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default NewClientModal;
