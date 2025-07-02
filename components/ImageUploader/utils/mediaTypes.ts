/**
 * Utilities for media type detection and handling
 */

/**
 * Infer media type from URL or file extension
 * @param url The URL or file path to analyze
 * @returns "image" or "video" based on detection
 */
export function inferMediaType(url: string): "image" | "video" {
  // Check common video extensions
  if (url.match(/\.(mp4|webm|ogg|mov|avi)$/i)) {
    return "video";
  }

  // Check for video MIME type in data URLs
  if (url.startsWith("data:video/")) {
    return "video";
  }

  // Default to image for other cases
  return "image";
}

/**
 * Determine if a URL points to a video
 * @param url The URL to check
 * @param declaredType Optional explicitly declared type
 * @param fileObj Optional File object for MIME type checking
 * @returns boolean indicating if the content is video
 */
export function isVideoUrl(
  url: string,
  declaredType?: string,
  fileObj?: File | null
): boolean {
  // First check the declared type
  if (declaredType === "video") {
    return true;
  }

  // Then check the file object if available
  if (fileObj && fileObj.type.startsWith("video/")) {
    return true;
  }

  // Then check the URL patterns
  return (
    url.match(/\.(mp4|webm|ogg|mov|avi)$/i) !== null ||
    url.startsWith("data:video/")
  );
}
