"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { ImageUploader, ImageItem } from "./ImageUploader";

const ImageUploaderDemo = () => {
  // Sample initial images
  const initialImages: ImageItem[] = [
    {
      id: "1",
      url: "/images/top-1.jpg",
      altText: "Sample image 1",
      isMain: true,
    },
    {
      id: "2",
      url: "/images/top-2.jpg",
      altText: "Sample image 2",
    },
    {
      id: "3",
      url: "/images/top-3.jpg",
      altText: "Sample image 3",
    },
  ];

  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [layout, setLayout] = useState<"grid" | "horizontal">("grid");

  // Mock upload function (in a real app, this would send to your API)
  const handleUpload = async (files: File[]): Promise<ImageItem[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create image items from files
    return files.map((file) => ({
      id: `uploaded-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`,
      url: URL.createObjectURL(file),
      altText: file.name,
    }));
  };

  // Handle image list changes
  const handleImagesChange = (newImages: ImageItem[]) => {
    setImages(newImages);
  };

  // Reset demo
  const handleReset = () => {
    // Clean up any object URLs to prevent memory leaks
    images.forEach((img) => {
      if (img.url.startsWith("blob:")) {
        URL.revokeObjectURL(img.url);
      }
    });

    setImages(initialImages);
    toast.success("Demo reset");
  };

  // Toggle layout
  const toggleLayout = () => {
    setLayout((prev) => (prev === "grid" ? "horizontal" : "grid"));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Image Uploader Demo</h1>
        <p className="text-gray-600 mb-4">
          Drag and drop to upload and reorder images, set a main image, and edit
          alt text.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={toggleLayout}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Toggle Layout: {layout === "grid" ? "Grid" : "Horizontal"}
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Reset Demo
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <ImageUploader
          images={images}
          onImagesChange={handleImagesChange}
          onUpload={handleUpload}
          maxImages={10}
          layout={layout}
          allowReordering={true}
          allowMainImage={true}
        />
      </div>
    </div>
  );
};

export default ImageUploaderDemo;
