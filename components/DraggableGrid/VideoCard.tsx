import React, { useState, useRef } from "react";
import { FiEdit2, FiPlay, FiPause, FiFilm, FiTrash2 } from "react-icons/fi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { VideoCardProps } from "./types";
import styles from "./DraggableGrid.module.css";

export function VideoCard({
  video,
  allowMainImage,
  allowEditing,
  onDeleteVideo,
  onEditDescription,
  isDraggable = true,
}: VideoCardProps) {
  const [editingText, setEditingText] = useState(video.altText || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Setup sortable functionality only if draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isItemDragging,
  } = useSortable({
    id: video.id,
    data: {
      type: "media",
      video,
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

  // Class names based on current state
  const itemClasses = `
    ${styles.imageItem} 
    ${styles.videoItem}
    ${isItemDragging ? styles.dragging : ""} 
    ${allowMainImage && video.isMain ? styles.mainItem : ""}
    ${!isDraggable ? styles.overlayItem : ""}
    ${isHovering ? styles.hovering : ""}
  `;

  // Video playback controls
  const togglePlayback = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }

    setIsPlaying(!isPlaying);
  };

  // Video playback event handlers
  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Handle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
    setEditingText(video.altText || "");
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (onEditDescription) {
      onEditDescription(video.id, editingText);
    }
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

  // Handle delete
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Stop video if playing before delete
    if (isPlaying && videoRef.current) {
      videoRef.current.pause();
    }

    if (onDeleteVideo && video.id) {
      onDeleteVideo(video.id);
    }
  };

  return (
    <div
      ref={isDraggable ? setNodeRef : undefined}
      style={style}
      className={itemClasses}
      data-type="video"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {allowMainImage && video.isMain && (
        <div className={styles.mainBadge} role="status" aria-label="Main video">
          Main
        </div>
      )}

      <div
        className={styles.imageContainer}
        {...(isDraggable ? listeners : {})}
        {...(isDraggable ? attributes : {})}
      >
        <div
          className={`${styles.videoWrapper} ${
            isPlaying ? styles.playing : ""
          }`}
        >
          <video
            ref={videoRef}
            src={video.url}
            className={styles.video}
            preload="metadata"
            onEnded={handleVideoEnd}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            playsInline
            muted // Muted for better UX in gallery context
          />

          {/* Play/Pause button */}
          <button
            type="button"
            onClick={togglePlayback}
            className={`${styles.videoPlayButton} ${
              isPlaying ? styles.fadeOut : ""
            }`}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
          </button>

          {/* Video indicator */}
          <div className={styles.videoDuration}>
            <FiFilm size={14} />
            <span>Video</span>
          </div>
        </div>

        {/* Delete button */}
        {isDraggable && (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDelete}
            aria-label="Delete video"
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
              <label
                htmlFor={`description-${video.id}`}
                className={styles.srOnly}
              >
                Description for video
              </label>
              <input
                id={`description-${video.id}`}
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add video description"
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
                aria-label="Edit video description"
                type="button"
              >
                <FiEdit2 size={16} />
                <span className={styles.tooltipText}>Edit description</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
