import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that combines classnames with Tailwind CSS.
 * It combines multiple class values and merges Tailwind CSS classes
 * to prevent class conflicts.
 * 
 * @param inputs - Class values to combine
 * @returns A merged string of classnames
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 