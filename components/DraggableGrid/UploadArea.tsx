import React, { RefObject } from "react";
import { FiUpload } from "react-icons/fi";
import styles from "./DraggableGrid.module.css";

interface UploadAreaProps {
  isDragging: boolean;
  processedImagesCount: number;
  maxImages: number;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => Promise<void>;
  onClick: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  acceptedFileTypes: string;
  className?: string;
  uploadIconClassName?: string;
  uploadTextClassName?: string;
  uploadInfoClassName?: string;
  fileInputClassName?: string;
}

export function UploadArea({
  isDragging,
  processedImagesCount,
  maxImages,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  fileInputRef,
  onFileChange,
  acceptedFileTypes,
  className,
  uploadIconClassName,
  uploadTextClassName,
  uploadInfoClassName,
  fileInputClassName,
}: UploadAreaProps) {
  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Trigger click on Enter or Space
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevent scrolling on space
      onClick();
    }
  };

  const uploadInstruction = isDragging
    ? "Drop files here"
    : processedImagesCount === 0
    ? "Drag & drop images or videos here or click to browse"
    : "Add more media";

  const uploadStatus =
    processedImagesCount > 0
      ? `${processedImagesCount}/${maxImages} files uploaded`
      : `Upload up to ${maxImages} files (images or videos)`;

  const acceptedTypesDescription = acceptedFileTypes
    .split(",")
    .map((type) => type.replace("*", "files"))
    .join(", ")
    .replace(/\/files/g, " files");

  return (
    <div
      className={`${className || styles.uploadArea} ${
        isDragging ? styles.dragging : ""
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Upload media: ${uploadInstruction}`}
      aria-describedby="upload-description"
    >
      <FiUpload
        className={uploadIconClassName || styles.uploadIcon}
        aria-hidden="true"
      />
      <p className={uploadTextClassName || styles.uploadText}>
        {uploadInstruction}
      </p>
      <p
        id="upload-description"
        className={uploadInfoClassName || styles.uploadInfo}
      >
        {uploadStatus}
      </p>
      <p className={styles.uploadInfoSecondary}>
        Accepted formats: {acceptedTypesDescription}
      </p>

      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept={acceptedFileTypes}
        multiple
        className={fileInputClassName || styles.fileInput}
        aria-label="File upload input"
        tabIndex={-1} // Hide from tab order as we're using the container as the interactive element
      />
    </div>
  );
}
