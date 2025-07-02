"use client";

import React, { useState, useRef, useCallback } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "sonner";
import styles from "./ImageUploader.module.css";

// Import local types and utilities
import { ImageUploaderProps } from "./types";
import {
  processMediaItems,
  handleDragOver,
  handleDragLeave,
  handleFiles as processFiles,
  handleFileDrop,
} from "./utils";

// Import components
import {
  ImageCard,
  VideoCard,
  UploadArea,
  type MediaItem,
} from "../DraggableGrid";
import { DraggableGrid } from "../DraggableGrid";
import { dropAnimationConfig } from "./utils/dragConfig";

export type { ImageUploaderProps, MediaItem };

export function ImageUploader({
  images = [],
  onImagesChange,
  onUpload,
  maxImages = 10,
  maxImageSize = 15 * 1024 * 1024, // 15MB default for images
  maxVideoSize = 70 * 1024 * 1024, // 70MB default for videos
  layout = "grid",
  allowReordering = true,
  allowMainImage = true,
  allowEditing = false,
  acceptedFileTypes = "image/*,video/mp4,video/webm,video/ogg",
}: ImageUploaderProps) {
  // Process media items to ensure correct types
  const processedImages = processMediaItems(images);

  // Component state
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle files using the extracted utility function
  const handleFilesCallback = useCallback(
    (files: File[]) => {
      processFiles(files, {
        currentMediaItems: processedImages,
        maxImages,
        maxImageSize,
        maxVideoSize,
        onImagesChange,
        onUpload,
        allowMainImage,
        setIsUploading,
      });
    },
    [
      processedImages,
      maxImages,
      maxImageSize,
      maxVideoSize,
      onImagesChange,
      onUpload,
      allowMainImage,
    ]
  );

  // Handle drag over for file drop with the extracted utility
  const handleDragOverCallback = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      handleDragOver(e, setIsDragging);
    },
    [setIsDragging]
  );

  // Handle drag leave for file drop with the extracted utility
  const handleDragLeaveCallback = useCallback(() => {
    handleDragLeave(setIsDragging);
  }, [setIsDragging]);

  // Handle dropping files with the extracted utility
  const handleDropCallback = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      handleFileDrop(e, handleFilesCallback, setIsDragging);
    },
    [handleFilesCallback, setIsDragging]
  );

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFilesCallback(files);

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove an image
  const handleDeleteMedia = (id: string) => {
    // Revoke object URL if it's a local file
    const mediaToRemove = processedImages.find((media) => media.id === id);
    if (mediaToRemove && mediaToRemove.url.startsWith("blob:")) {
      URL.revokeObjectURL(mediaToRemove.url);
    }

    const updatedMedia = processedImages.filter((media) => media.id !== id);

    // If we removed the main image and there are still other images, set the first one as main
    if (allowMainImage && mediaToRemove?.isMain && updatedMedia.length > 0) {
      const newImages = updatedMedia.map((media, index) => ({
        ...media,
        isMain: index === 0, // First image becomes the main image
      }));
      onImagesChange(newImages);
    } else {
      onImagesChange(updatedMedia);
    }

    toast.success("Media removed");
  };

  // Edit alt text or description
  const handleEditText = (id: string, text: string) => {
    const updatedMedia = processedImages.map((media) =>
      media.id === id ? { ...media, altText: text } : media
    );
    onImagesChange(updatedMedia);

    const item = processedImages.find((media) => media.id === id);
    const mediaType = item?.type === "image" ? "Alt text" : "Description";
    toast.success(`${mediaType} updated`);
  };

  // Open file dialog
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle reordering of images
  const handleReorder = (reorderedItems: MediaItem[]) => {
    // If we need to update the main image after reordering
    if (allowMainImage) {
      const updatedMedia = reorderedItems.map((media, index) => ({
        ...media,
        isMain: index === 0, // First image becomes the main image
      }));
      onImagesChange(updatedMedia);
    } else {
      onImagesChange(reorderedItems);
    }
  };

  // Render a single media item based on type
  const renderMediaItem = (media: MediaItem) => {
    return media.type === "video" ? (
      <VideoCard
        key={media.id}
        video={media}
        allowMainImage={allowMainImage}
        allowEditing={allowEditing}
        onDeleteVideo={handleDeleteMedia}
        onEditDescription={handleEditText}
      />
    ) : (
      <ImageCard
        key={media.id}
        image={media}
        allowMainImage={allowMainImage}
        allowEditing={allowEditing}
        onDeleteImage={handleDeleteMedia}
        onEditAltText={handleEditText}
      />
    );
  };

  // Render overlay item for drag preview
  const renderOverlayItem = (media: MediaItem) => {
    return media.type === "video" ? (
      <VideoCard
        video={media}
        allowMainImage={allowMainImage}
        allowEditing={false}
        onDeleteVideo={() => {}}
        isDraggable={false}
      />
    ) : (
      <ImageCard
        image={media}
        allowMainImage={allowMainImage}
        allowEditing={false}
        onDeleteImage={() => {}}
        isDraggable={false}
      />
    );
  };

  return (
    <div className={styles.container}>
      {/* Upload area component */}
      <UploadArea
        isDragging={isDragging}
        processedImagesCount={processedImages.length}
        maxImages={maxImages}
        onDragOver={handleDragOverCallback}
        onDragLeave={handleDragLeaveCallback}
        onDrop={handleDropCallback}
        onClick={handleUploadClick}
        fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
        onFileChange={handleFileChange}
        acceptedFileTypes={acceptedFileTypes}
        className={styles.uploadArea}
        uploadIconClassName={styles.uploadIcon}
        uploadTextClassName={styles.uploadText}
        uploadInfoClassName={styles.uploadInfo}
        fileInputClassName={styles.fileInput}
      />

      {isUploading && (
        <div className={styles.uploadingIndicator}>
          <p>Uploading media...</p>
        </div>
      )}

      {/* Media grid with drag and drop */}
      {processedImages.length > 0 && (
        <DraggableGrid
          items={processedImages}
          onReorder={handleReorder}
          renderItem={renderMediaItem}
          renderOverlay={renderOverlayItem}
          layout={layout}
          enableSorting={allowReordering}
          dropAnimation={dropAnimationConfig}
          className={styles.mediaContainer}
          itemClassName={styles.imageGrid}
          helperText={
            allowMainImage
              ? "The first item will be set as the main media. Drag to reorder."
              : undefined
          }
        />
      )}

      {/* Empty state */}
      {processedImages.length === 0 && !isUploading && (
        <div className={styles.emptyState}>
          <FiImage size={48} className={styles.emptyIcon} />
          <p>No media uploaded yet</p>
        </div>
      )}
    </div>
  );
}
