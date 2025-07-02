import { MediaItem } from "../types";
import { inferMediaType } from "./mediaTypes";

/**
 * Process media items to ensure they have the correct type property set
 * @param mediaItems Array of media items to process
 * @returns Processed media items with proper type values
 */
export function processMediaItems(mediaItems: MediaItem[]): MediaItem[] {
  return mediaItems.map((item) => {
    // If type is already set correctly, use it
    if (item.type === "image" || item.type === "video") {
      return item;
    }

    // Try to infer type from URL for files without explicit type
    const inferredType = inferMediaType(item.url);

    return {
      ...item,
      type: inferredType,
    };
  });
}

/**
 * Update media items after reordering to ensure main image is correctly set
 * @param mediaItems Array of reordered media items
 * @param allowMainImage Whether to update the main image
 * @returns Updated media items with isMain flag properly set
 */
export function updateMediaAfterReorder(
  mediaItems: MediaItem[],
  allowMainImage: boolean
): MediaItem[] {
  if (!allowMainImage || mediaItems.length === 0) {
    return mediaItems;
  }

  return mediaItems.map((media, index) => ({
    ...media,
    isMain: index === 0, // First image is always the main image
  }));
}
