import React, { useState, useEffect } from "react";
import Modal from "@/app/components/Common/Modal";
import { CheckCircle2, Calendar } from "lucide-react";
import { Client } from "../types"; // Adjust path as necessary
import { format } from "date-fns";

interface NewCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClient: Client | null;
  onCampaignCreated: (newCampaign: any) => void; // Adjust 'any' to Campaign type
}

const NewCampaignModal: React.FC<NewCampaignModalProps> = ({
  isOpen,
  onClose,
  selectedClient,
  onCampaignCreated,
}) => {
  const initialFormState = {
    name: "",
    description: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      "yyyy-MM-dd"
    ),
    budget: 0,
    status: "draft", // Default status
  };
  const [form, setForm] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !success) {
      setForm(initialFormState); // Reset form when modal opens and not in success state
      setSubmitError(null);
    } else if (!isOpen) {
      setSuccess(false); // Reset success when modal is closed
    }
  }, [isOpen, success, initialFormState]); // initialFormState added to dep array due to eslint exhaustive-deps

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "budget" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) {
      setSubmitError("לא נבחר לקוח.");
      return;
    }
    if (!form.name.trim()) {
      setSubmitError("שם הקמפיין נדרש.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const campaignData = {
      campaign_name: form.name.trim(), // Ensure field name matches backend expectation
      clientId: selectedClient.id,
      description: form.description.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      budget: form.budget,
      status: form.status,
    };

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "אירעה שגיאה בעת יצירת הקמפיין");
      }
      onCampaignCreated(data); // Pass created campaign to parent
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setSubmitError(err.message || "אירעה שגיאה בעת יצירת הקמפיין");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedClient) return null; // Or some placeholder if the modal is open without a client

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`קמפיין חדש עבור ${selectedClient.name}`}
      size="md"
    >
      {success ? (
        <div className="p-6 flex flex-col items-center justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
          <p className="text-center text-lg font-medium text-foreground">
            הקמפיין נוצר בהצלחה!
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
              שם הקמפיין <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              תיאור
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                תאריך התחלה <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none rtl:left-0 rtl:right-auto rtl:pl-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 pr-10 rtl:pl-10 rtl:pr-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                תאריך סיום <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none rtl:left-0 rtl:right-auto rtl:pl-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 pr-10 rtl:pl-10 rtl:pr-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              תקציב (₪)
            </label>
            <input
              id="budget"
              name="budget"
              type="number"
              value={form.budget}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-primary focus:border-primary"
            />
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
                "יצירת קמפיין"
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default NewCampaignModal;
