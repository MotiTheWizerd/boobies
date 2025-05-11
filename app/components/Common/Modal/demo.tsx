"use client";

import React, { useState } from "react";
import Modal from "./index";
import { PlusCircle } from "lucide-react";

interface DemoFormData {
  name: string;
  email: string;
}

export default function ModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<DemoFormData>({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    handleCloseModal();

    // Reset form after submission
    setFormData({ name: "", email: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Modal Component Demo</h2>

      <button
        onClick={handleOpenModal}
        className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        צור לקוח חדש
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="צור לקוח חדש"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              שם הלקוח
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="הכנס את שם הלקוח"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              אימייל
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="הכנס את האימייל של הלקוח"
            />
          </div>

          <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              ביטול
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  מעבד...
                </span>
              ) : (
                "שמור"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
