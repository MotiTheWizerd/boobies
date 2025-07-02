/**
 * Utilities for generating unique IDs
 */

/**
 * Generate a unique ID for media items
 * Combines timestamp and random string for uniqueness
 * @returns A unique string ID
 */
export function generateUniqueId(): string {
  return `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
