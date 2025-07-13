import { GalleryItem } from "@/components/Common/Modal/ImageGalleryModal";

import { HotProfileProps } from "@/app/hooks/useHotProfiles";
import type { GalleryItem } from "@/components/Common/Modal/ImageGalleryModal";

export function getGalleryItems(profile: HotProfileProps): { items: GalleryItem[], defaultIndex: number } {
  if (!profile.media || profile.media.length === 0) {
    // If no media, return single image
    return {
      items: [{
        url: profile.imageUrl,
        type: "image" as const,
        altText: profile.name
      }],
      defaultIndex: 0
    };
  }

  // First find the default media item
  const defaultIndex = profile.media.findIndex(item => item.isDefault);
  
  // Convert media items to gallery items
  const items: GalleryItem[] = profile.media.map(item => ({
    url: item.url,
    type: item.fileType?.startsWith("video/") ? ("video" as const) : ("image" as const),
    altText: profile.name
  }));

  return {
    items,
    defaultIndex: defaultIndex !== -1 ? defaultIndex : 0
  };
}
