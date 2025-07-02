/**
 * Types for the ImageUploader component
 */

import { type MediaItem } from "../DraggableGrid";

/**
 * Props for the ImageUploader component
 */
export interface ImageUploaderProps {
  images: MediaItem[];
  onImagesChange: (images: MediaItem[]) => void;
  onUpload?: (files: File[]) => Promise<MediaItem[]>;
  maxImages?: number;
  maxImageSize?: number; // Maximum image size in bytes
  maxVideoSize?: number; // Maximum video size in bytes
  layout?: "grid" | "horizontal";
  allowReordering?: boolean;
  allowMainImage?: boolean;
  allowEditing?: boolean;
  acceptedFileTypes?: string;
}
