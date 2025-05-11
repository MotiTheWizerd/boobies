"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  hideCloseButton?: boolean;
  preventClose?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  hideCloseButton = false,
  preventClose = false,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !preventClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent scrolling while modal is open
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = ""; // Restore scrolling when modal is closed
    };
  }, [isOpen, onClose, preventClose]);

  // Handle click outside modal to close
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node) &&
      !preventClose
    ) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleOutsideClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      
      {/* Modal content */}
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} overflow-hidden relative border border-gray-300 z-10`}
      >
        {title && (
          <div className="p-4 border-b border-gray-300 flex justify-between items-center bg-gray-50">
            <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            {!hideCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
        
        <div className="p-5 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
} 