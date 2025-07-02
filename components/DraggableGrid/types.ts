/**
 * Common types for DraggableGrid components
 */

/**
 * Media item representation
 */
export interface MediaItem {
  id: string;
  url: string;
  altText: string;
  isMain?: boolean;
  file?: File;
  type: "image" | "video";
  thumbnailUrl?: string;
}

/**
 * Props for cards with media items
 */
export interface MediaCardProps {
  allowMainImage: boolean;
  allowEditing: boolean;
  isDraggable?: boolean;
}

export interface ImageCardProps extends MediaCardProps {
  image: MediaItem;
  onDeleteImage: (id: string) => void;
  onEditAltText?: (id: string, text: string) => void;
}

export interface VideoCardProps extends MediaCardProps {
  video: MediaItem;
  onDeleteVideo: (id: string) => void;
  onEditDescription?: (id: string, text: string) => void;
}
