"use client";

import React, { useState, useCallback } from "react";
import Modal from "./index";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GalleryErrorBoundary } from "./GalleryErrorBoundary";

export interface GalleryItem {
  url: string;
  type: "image" | "video";
  altText?: string;
}

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  initialIndex?: number;
}

// Validate gallery item
function isValidGalleryItem(item: GalleryItem): boolean {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.url === 'string' &&
    (item.type === 'image' || item.type === 'video') &&
    (item.altText === undefined || typeof item.altText === 'string')
  );
}

export default function ImageGalleryModal({
  isOpen,
  onClose,
  items = [],
  initialIndex = 0,
}: ImageGalleryModalProps) {
  // All hooks need to be called before any conditional returns
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Ensure initialIndex is within bounds
    return Math.min(Math.max(0, initialIndex), Math.max(0, items.length - 1));
  });

  const handleNext = useCallback(() => {
    if (!items.length) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    if (!items.length) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          handlePrev();
          break;
        case "ArrowRight":
          handleNext();
          break;
        default:
          break;
      }
    },
    [handleNext, handlePrev]
  );

  // Reset currentIndex when items change
  React.useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, Math.max(0, items.length - 1)));
  }, [items.length]);

  // After all hooks, we can have conditional logic
  if (!items.length || !isOpen) {
    return null;
  }

  const currentItem = items[currentIndex];

  // Initialize before returning the UI
  if (!items.length || !isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      preventClose={false}
      hideCloseButton={false}
    >
      <GalleryErrorBoundary>
        <div
          className="relative h-[80vh] w-full"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
          aria-label="Previous image"
        >
          <FaChevronRight className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
          aria-label="Next image"
        >
          <FaChevronLeft className="h-6 w-6" />
        </button>

        {/* Media Display */}
        <div className="relative h-full w-full">
          {isValidGalleryItem(currentItem) ? (
            currentItem.type === "video" ? (
              <video
                key={currentItem.url}
                src={currentItem.url}
                controls
                className="h-full w-full object-contain"
                onError={(e) => console.error("Video load error:", e)}
              />
            ) : (
              <Image
                key={currentItem.url}
                src={currentItem.url}
                alt={currentItem.altText || ""}
                fill
                className="object-contain"
                quality={100}
                priority
                onError={(e) => console.error("Image load error:", e)}
              />
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-500">
              Media not available
            </div>
          )}
        </div>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
          {currentIndex + 1} / {items.length}
        </div>
      </div>
      </GalleryErrorBoundary>
    </Modal>
  );
}
