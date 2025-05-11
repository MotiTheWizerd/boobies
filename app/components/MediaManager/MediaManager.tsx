"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  FiUpload,
  FiEdit2,
  FiX,
  FiCheck,
  FiTrash2,
  FiStar,
} from "react-icons/fi";
import styles from "./MediaManager.module.css";

type Media = {
  id: string;
  url: string;
  altText: string;
  isMain?: boolean;
};

type MediaManagerProps = {
  mediaItems: Media[];
  onUpload: (file: File) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onUpdateAlt: (id: string, altText: string) => Promise<void>;
  onSetMain: (id: string) => Promise<void>;
  allowMultiple?: boolean;
  maxItems?: number;
};

export default function MediaManager({
  mediaItems,
  onUpload,
  onDelete,
  onUpdateAlt,
  onSetMain,
  allowMultiple = true,
  maxItems = 10,
}: MediaManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed the max limit
    if (mediaItems.length + files.length > maxItems) {
      setError(`You can only upload a maximum of ${maxItems} images`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // For simplicity, we're handling one file at a time
      // In a real app, you might want to handle multiple files with Promise.all
      for (let i = 0; i < files.length; i++) {
        await onUpload(files[i]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload file");
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleEditClick = (item: Media) => {
    setEditingId(item.id);
    setEditText(item.altText);
  };

  const handleEditSave = async (id: string) => {
    try {
      await onUpdateAlt(id, editText);
      setEditingId(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update alt text"
      );
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await onDelete(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete image");
      }
    }
  };

  const handleSetMain = async (id: string) => {
    try {
      await onSetMain(id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to set as main image"
      );
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
        multiple={allowMultiple}
      />

      {mediaItems.length < maxItems && (
        <div className={styles.uploadArea} onClick={handleUploadClick}>
          <FiUpload className={styles.uploadIcon} />
          <p>Click to upload images</p>
          <p style={{ fontSize: "12px", color: "#64748b" }}>
            {allowMultiple
              ? "You can upload multiple images at once"
              : "Only one image allowed"}
          </p>
        </div>
      )}

      {error && <div className={styles.errorMessage}>{error}</div>}

      {isUploading && (
        <div className={styles.loadingSpinner}>
          <p>Uploading...</p>
        </div>
      )}

      <div className={styles.mediaGrid}>
        {mediaItems.map((item) => (
          <div key={item.id} className={styles.mediaItem}>
            {item.isMain && <div className={styles.mainBadge}>Main</div>}
            <div
              style={{ position: "relative", width: "100%", height: "150px" }}
            >
              <Image
                src={item.url}
                alt={item.altText || "Media item"}
                className={styles.mediaImage}
                fill
                sizes="(max-width: 640px) 150px, 200px"
                priority={item.isMain}
              />
            </div>

            {editingId === item.id ? (
              <div className={styles.editForm}>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Add alt text for better SEO"
                  rows={2}
                  style={{ width: "100%", padding: "6px", fontSize: "14px" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "8px",
                    gap: "8px",
                  }}
                >
                  <button
                    onClick={() => handleEditCancel()}
                    className={styles.controlButton}
                    aria-label="Cancel edit"
                  >
                    <FiX /> Cancel
                  </button>
                  <button
                    onClick={() => handleEditSave(item.id)}
                    className={styles.controlButton}
                    aria-label="Save alt text"
                  >
                    <FiCheck /> Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                {item.altText && (
                  <p className={styles.altText}>{item.altText}</p>
                )}
                <div className={styles.mediaControls}>
                  <button
                    onClick={() => handleEditClick(item)}
                    className={styles.controlButton}
                    aria-label="Edit alt text"
                  >
                    <FiEdit2 />
                  </button>
                  {!item.isMain && (
                    <button
                      onClick={() => handleSetMain(item.id)}
                      className={styles.controlButton}
                      aria-label="Set as main image"
                    >
                      <FiStar />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className={`${styles.controlButton} ${styles.deleteButton}`}
                    aria-label="Delete image"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
