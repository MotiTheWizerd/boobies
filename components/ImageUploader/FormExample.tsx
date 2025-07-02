"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { ImageUploader, ImageItem } from "./ImageUploader";

interface FormData {
  title: string;
  description: string;
  price: string;
  location: string;
  images: ImageItem[];
}

export const ImageUploaderFormExample = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image changes
  const handleImagesChange = (images: ImageItem[]) => {
    setFormData((prev) => ({
      ...prev,
      images,
    }));
  };

  // Mock upload function
  const handleUpload = async (files: File[]): Promise<ImageItem[]> => {
    // In a real app, you would upload these to your server/cloud storage
    // and get back URLs to the uploaded images
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate upload delay

    return files.map((file) => ({
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      url: URL.createObjectURL(file),
      altText: file.name,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.title) {
      toast.error("Please enter a title");
      return;
    }

    if (formData.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    // Check if a main image is set
    const hasMainImage = formData.images.some((img) => img.isMain);
    if (!hasMainImage) {
      toast.error("Please set a main image");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would send this data to your API
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay

      // Display success message
      toast.success("Form submitted successfully!");
      console.log("Form data submitted:", formData);

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        images: [],
      });
    } catch (error) {
      toast.error("An error occurred while submitting the form");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-transparent"
              placeholder="Enter listing title"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label htmlFor="price" className="block font-medium">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-transparent"
              placeholder="Enter price"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-transparent"
            placeholder="Enter location"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-700 bg-transparent"
            placeholder="Enter description"
          />
        </div>

        {/* Image Uploader */}
        <div className="space-y-2">
          <label className="block font-medium mb-2">
            Images <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Upload up to 10 images. Drag to reorder. Set one image as the main
            image.
          </p>

          <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <ImageUploader
              images={formData.images}
              onImagesChange={handleImagesChange}
              onUpload={handleUpload}
              maxImages={10}
              allowMainImage={true}
              layout="grid"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Listing"}
          </button>
        </div>
      </form>
    </div>
  );
};
