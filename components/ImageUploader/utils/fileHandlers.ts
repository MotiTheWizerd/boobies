import { toast } from "sonner";
import { MediaItem } from "../types";
import { generateUniqueId } from "./idGenerator";
import { updateMediaAfterReorder } from "./mediaProcessing";

/**
 * Interface for file handler props
 */
export interface FileHandlerProps {
  currentMediaItems: MediaItem[];
  maxImages: number;
  maxImageSize?: number; // Maximum image size in bytes
  maxVideoSize?: number; // Maximum video size in bytes
  onImagesChange: (images: MediaItem[]) => void;
  onUpload?: (files: File[]) => Promise<MediaItem[]>;
  allowMainImage: boolean;
  setIsUploading: (isUploading: boolean) => void;
}

// Convert bytes to readable format (MB)
const formatFileSize = (bytes: number): string => {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(2)} MB` : `${(bytes / 1024).toFixed(2)} KB`;
};

// Extract clean filename from path or URL
const extractFilename = (path: string): string => {
  // Check if it's a string
  if (typeof path !== "string") return "Unknown file";

  // Remove URL parameters
  const pathWithoutParams = path.split("?")[0];

  // Get the last part after slash
  const filename = pathWithoutParams.split(/[\/\\]/).pop() || path;

  // Truncate if too long (for UI purposes)
  return filename.length > 30 ? filename.substring(0, 27) + "..." : filename;
};

/**
 * Handle file processing for upload or local preview
 * @param files Files to process
 * @param props Props containing component state and callbacks
 */
export async function handleFiles(
  files: File[],
  {
    currentMediaItems,
    maxImages,
    maxImageSize,
    maxVideoSize,
    onImagesChange,
    onUpload,
    allowMainImage,
    setIsUploading,
  }: FileHandlerProps
) {
  // Ensure we're working with valid files
  if (!files || !Array.isArray(files) || files.length === 0) {
    toast.error("No valid files selected");
    return;
  }

  // Filter for accepted file types
  const acceptedFiles = files.filter(
    (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
  );

  // Debug logging for file types
  console.log(
    "Accepted Files:",
    acceptedFiles.map((file) => ({
      name: file.name,
      type: file.type,
      isVideo: file.type.startsWith("video/"),
    }))
  );

  // Check if adding these files would exceed the max limit
  if (currentMediaItems.length + acceptedFiles.length > maxImages) {
    toast.error(`You can only upload a maximum of ${maxImages} media files`);
    return;
  }

  if (acceptedFiles.length === 0) {
    toast.error("Please select valid image or video files");
    return;
  }

  // Validate file sizes if limits are provided
  const oversizedFiles: {
    name: string;
    size: string;
    type: string;
    sizeInBytes: number;
  }[] = [];

  if (maxImageSize || maxVideoSize) {
    acceptedFiles.forEach((file) => {
      const isVideo = file.type.startsWith("video/");

      if (isVideo && maxVideoSize && file.size > maxVideoSize) {
        oversizedFiles.push({
          name: file.name,
          size: formatFileSize(file.size),
          type: "video",
          sizeInBytes: file.size,
        });
      } else if (!isVideo && maxImageSize && file.size > maxImageSize) {
        oversizedFiles.push({
          name: file.name,
          size: formatFileSize(file.size),
          type: "image",
          sizeInBytes: file.size,
        });
      }
    });
  }

  // Show error and return if any files exceed size limits
  if (oversizedFiles.length > 0) {
    const maxImageSizeFormatted = maxImageSize
      ? formatFileSize(maxImageSize)
      : "N/A";
    const maxVideoSizeFormatted = maxVideoSize
      ? formatFileSize(maxVideoSize)
      : "N/A";

    // For better UX, if there are many files, group them
    if (oversizedFiles.length > 2) {
      const videoCount = oversizedFiles.filter(
        (f) => f.type === "video"
      ).length;
      const imageCount = oversizedFiles.length - videoCount;

      let message = "Size limit exceeded: ";

      if (imageCount > 0) {
        message += `${imageCount} image${
          imageCount > 1 ? "s" : ""
        } (max: ${maxImageSizeFormatted})`;
      }

      if (videoCount > 0) {
        if (imageCount > 0) message += " and ";
        message += `${videoCount} video${
          videoCount > 1 ? "s" : ""
        } (max: ${maxVideoSizeFormatted})`;
      }

      toast.error(message);
    } else {
      // Show individual messages for small number of files
      oversizedFiles.forEach((file) => {
        const fileName = extractFilename(file.name);
        const limit =
          file.type === "video" ? maxVideoSizeFormatted : maxImageSizeFormatted;

        // Calculate how much the file exceeds the limit
        const maxSize = file.type === "video" ? maxVideoSize : maxImageSize;
        const exceededBy = maxSize
          ? formatFileSize(file.sizeInBytes - maxSize)
          : "";
        const exceededMessage =
          maxSize && file.sizeInBytes > maxSize * 1.1
            ? ` (${exceededBy} over limit)`
            : "";

        toast.error(
          `File "${fileName}" (${file.size})${exceededMessage} exceeds the ${file.type} limit of ${limit}`
        );
      });
    }

    return;
  }

  setIsUploading(true);

  try {
    if (onUpload) {
      // Use the provided upload handler
      const newMediaItems = await onUpload(acceptedFiles);

      // Debug original items returned from upload handler
      console.log(
        "Items from upload handler:",
        newMediaItems.map((item) => ({
          id: item.id,
          type: item.type,
          url: item.url.substring(0, 30) + "...",
        }))
      );

      // Make sure each media item has the correct type set
      const correctedMediaItems = newMediaItems.map((item, index) => {
        const correspondingFile = acceptedFiles[index];

        // If the file exists and is a video but the type wasn't set correctly
        if (
          correspondingFile &&
          correspondingFile.type.startsWith("video/") &&
          item.type !== "video"
        ) {
          console.log(
            "Correcting media type to video for:",
            correspondingFile.name
          );
          return {
            ...item,
            type: "video" as const, // Use const assertion to ensure correct type
          };
        }

        return item;
      });

      let updatedMedia = [...currentMediaItems, ...correctedMediaItems];

      // Debug corrected items
      console.log(
        "Corrected media items:",
        correctedMediaItems.map((item) => ({
          id: item.id,
          type: item.type,
          isVideo: item.type === "video",
        }))
      );

      // Update main image if needed
      updatedMedia = updateMediaAfterReorder(
        updatedMedia,
        allowMainImage && currentMediaItems.length === 0
      );

      onImagesChange(updatedMedia);
    } else {
      // Local preview only
      const newMediaItems: MediaItem[] = await Promise.all(
        acceptedFiles.map(async (file, index) => {
          const url = URL.createObjectURL(file);
          const isVideo = file.type.startsWith("video/");

          console.log("Creating media item:", {
            filename: file.name,
            fileType: file.type,
            isVideo,
            mediaType: isVideo ? "video" : "image",
          });

          return {
            id: generateUniqueId(),
            url,
            altText: file.name,
            file,
            type: isVideo ? ("video" as const) : ("image" as const),
            isMain: currentMediaItems.length === 0 && index === 0, // Set first image as main
          };
        })
      );

      let updatedMedia = [...currentMediaItems, ...newMediaItems];

      // Log media items after processing for debugging
      console.log(
        "Media items before update:",
        updatedMedia.map((item) => ({
          id: item.id,
          type: item.type,
          isVideo: item.type === "video",
          filename: item.file?.name || "N/A",
        }))
      );

      // Update main image if needed
      updatedMedia = updateMediaAfterReorder(
        updatedMedia,
        allowMainImage && currentMediaItems.length === 0
      );

      onImagesChange(updatedMedia);
    }

    const videoCount = acceptedFiles.filter((file) =>
      file.type.startsWith("video/")
    ).length;
    const imageCount = acceptedFiles.length - videoCount;

    let message = "";
    if (imageCount > 0 && videoCount > 0) {
      message = `${imageCount} image${
        imageCount > 1 ? "s" : ""
      } and ${videoCount} video${videoCount > 1 ? "s" : ""} added`;
    } else if (imageCount > 0) {
      message = `${imageCount} image${imageCount > 1 ? "s" : ""} added`;
    } else {
      message = `${videoCount} video${videoCount > 1 ? "s" : ""} added`;
    }

    toast.success(message);
  } catch (error) {
    toast.error("Failed to upload media files");
    console.error(error);
  } finally {
    setIsUploading(false);
  }
}

/**
 * Handle dropping files from drag and drop
 * @param e Drag event
 * @param handleFilesFunc Reference to the handleFiles function
 * @param setIsDragging State setter for drag indicator
 */
export function handleFileDrop(
  e: React.DragEvent<HTMLDivElement>,
  handleFilesFunc: (files: File[]) => void,
  setIsDragging: (isDragging: boolean) => void
) {
  e.preventDefault();
  setIsDragging(false);
  const files = Array.from(e.dataTransfer.files);
  handleFilesFunc(files);
}
