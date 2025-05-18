import React, { useState, useEffect } from "react";
import Modal from "@/components/Common/Modal";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Campaign } from "../types"; // Adjust path as necessary

interface DeleteCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignToDelete: Campaign | null;
  onCampaignDeleted: (deletedCampaignId: string, clientId: string) => void;
}

const DeleteCampaignModal: React.FC<DeleteCampaignModalProps> = ({
  isOpen,
  onClose,
  campaignToDelete,
  onCampaignDeleted,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !success) {
      setSubmitError(null); // Reset error when modal opens and not in success state
    } else if (!isOpen) {
      setSuccess(false); // Reset success when modal is closed
      setIsDeleting(false); // Reset deleting state
    }
  }, [isOpen, success]);

  const handleDelete = async () => {
    if (!campaignToDelete || !campaignToDelete.id) return;

    setIsDeleting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`/api/campaigns/${campaignToDelete.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete campaign");
      }
      onCampaignDeleted(campaignToDelete.id, campaignToDelete.clientId);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to delete campaign");
    } finally {
      // setIsDeleting(false); // Don't reset here, wait for modal close via useEffect
    }
  };

  if (!campaignToDelete && isOpen) {
    // This case should ideally not happen if parent logic is correct
    console.warn("DeleteCampaignModal opened without a campaignToDelete.");
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="מחיקת קמפיין" size="sm">
      {success ? (
        <div className="p-6 flex flex-col items-center justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
          <p className="text-center text-lg font-medium text-foreground">
            הקמפיין נמחק בהצלחה!
          </p>
        </div>
      ) : (
        <div className="p-6">
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700 px-4 py-3 rounded-md text-sm mb-4">
              {submitError}
            </div>
          )}
          <div className="flex items-center justify-center mb-6">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <p className="text-center text-base font-medium text-foreground mb-2">
            האם אתה בטוח שברצונך למחוק את הקמפיין{" "}
            <span className="font-bold">{campaignToDelete?.name}</span>?
          </p>
          <p className="text-center text-sm text-muted-foreground mb-6">
            פעולה זו אינה ניתנת לביטול ותמחק את כל הנתונים הקשורים לקמפיין זה.
          </p>
          <div className="flex justify-center space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted/50 font-medium"
            >
              ביטול
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium"
            >
              {isDeleting ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2 rtl:ml-2 rtl:mr-0"></span>
                  מוחק...
                </span>
              ) : (
                "מחק קמפיין"
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DeleteCampaignModal;
