import React, { useState } from "react";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ImageCardProps } from "./types";
import styles from "./DraggableGrid.module.css";

export function ImageCard({
  image,
  allowMainImage,
  allowEditing,
  onDeleteImage,
  onEditAltText,
  isDraggable = true,
}: ImageCardProps) {
  const [editingText, setEditingText] = useState(image.altText || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Setup for draggable functionality only if draggable is enabled
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isItemDragging,
  } = useSortable({
    id: image.id,
    data: {
      type: "media",
      image,
    },
    disabled: !isDraggable,
  });

  // Apply drag transform styles
  const style =
    transform && isDraggable
      ? {
          transform: CSS.Transform.toString(transform),
          transition,
        }
      : {};

  // Item classes based on state
  const itemClasses = `
    ${styles.imageItem} 
    ${isItemDragging ? styles.dragging : ""} 
    ${allowMainImage && image.isMain ? styles.mainItem : ""}
    ${!isDraggable ? styles.overlayItem : ""}
    ${isHovering ? styles.hovering : ""}
  `;

  // Handle edit mode toggling
  const handleEditClick = () => {
    setIsEditing(true);
    setEditingText(image.altText || "");
  };

  // Handle saving edited text
  const handleSaveEdit = () => {
    onEditAltText?.(image.id, editingText);
    setIsEditing(false);
  };

  // Handle keyboard navigation for editing
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isEditing) {
      handleSaveEdit();
    } else if (e.key === "Escape" && isEditing) {
      setIsEditing(false);
    }
  };

  // Explicitly handle delete with a separate function
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onDeleteImage && image.id) {
      onDeleteImage(image.id);
    }
  };

  return (
    <div
      ref={isDraggable ? setNodeRef : undefined}
      style={style}
      className={itemClasses}
      data-type="image"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {allowMainImage && image.isMain && (
        <div className={styles.mainBadge} role="status" aria-label="Main image">
          Main
        </div>
      )}

      <div
        className={styles.imageContainer}
        {...(isDraggable ? listeners : {})}
        {...(isDraggable ? attributes : {})}
      >
        <Image
          src={image.url}
          alt={image.altText || "Uploaded image"}
          fill
          sizes="(max-width: 640px) 100px, (max-width: 768px) 150px, 200px"
          className={styles.image}
          draggable={false}
          priority={isItemDragging || (allowMainImage && image.isMain)}
        />

        {/* Delete button */}
        {isDraggable && (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDelete}
            aria-label="Delete image"
          >
            <FiTrash2 size={18} />
            <span className={styles.srOnly}>Delete</span>
          </button>
        )}
      </div>

      {/* Edit controls */}
      {allowEditing && isDraggable && (
        <div className={styles.controls}>
          {isEditing ? (
            <div className={styles.editForm}>
              <label htmlFor={`alt-text-${image.id}`} className={styles.srOnly}>
                Alt text for image
              </label>
              <input
                id={`alt-text-${image.id}`}
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add alt text for SEO"
                className={styles.altTextInput}
                autoFocus
              />
              <div className={styles.editButtons}>
                <button
                  onClick={() => setIsEditing(false)}
                  className={styles.cancelButton}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className={styles.saveButton}
                  type="button"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.editButtons}>
              <button
                className={styles.editButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick();
                }}
                aria-label="Edit alt text"
                type="button"
              >
                <FiEdit2 size={16} />
                <span className={styles.tooltipText}>Edit alt text</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
