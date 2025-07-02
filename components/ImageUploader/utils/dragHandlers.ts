import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner";
import { MediaItem } from "../types";
import { updateMediaAfterReorder } from "./mediaProcessing";

/**
 * Interface for drag start handler props
 */
export interface DragStartHandlerProps {
  setActiveId: (id: string | null) => void;
}

/**
 * Interface for drag end handler props
 */
export interface DragEndHandlerProps {
  mediaItems: MediaItem[];
  allowMainImage: boolean;
  onImagesChange: (images: MediaItem[]) => void;
  setActiveId: (id: string | null) => void;
}

/**
 * Handle drag start event
 * @param event The drag start event
 * @param props Props containing state setters
 */
export function handleDragStart(
  event: DragStartEvent,
  { setActiveId }: DragStartHandlerProps
) {
  const { active } = event;

  // Ensure we have the active ID as a string
  const id = active.id.toString();
  setActiveId(id);

  // Log successful drag start for debugging
  console.log("Drag started for item:", id);
}

/**
 * Handle drag end event
 * @param event The drag end event
 * @param props Props containing state and callbacks
 */
export function handleDragEnd(
  event: DragEndEvent,
  {
    mediaItems,
    allowMainImage,
    onImagesChange,
    setActiveId,
  }: DragEndHandlerProps
) {
  const { active, over } = event;
  setActiveId(null);

  // Only perform the reordering if we have a valid drop target
  if (over && active.id !== over.id) {
    const oldIndex = mediaItems.findIndex((item) => item.id === active.id);
    const newIndex = mediaItems.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      console.log(`Moving image from index ${oldIndex} to ${newIndex}`);
      let newImages = arrayMove(mediaItems, oldIndex, newIndex);

      // Apply main image logic
      newImages = updateMediaAfterReorder(newImages, allowMainImage);
      onImagesChange(newImages);

      // Provide visual feedback of the change
      toast.success("Image order updated");
    }
  }
}

/**
 * Handle drag over for file drop
 * @param e The drag event
 * @param setIsDragging State setter for drag indicator
 */
export function handleDragOver(
  e: React.DragEvent<HTMLDivElement>,
  setIsDragging: (isDragging: boolean) => void
) {
  e.preventDefault();
  setIsDragging(true);
}

/**
 * Handle drag leave for file drop
 * @param setIsDragging State setter for drag indicator
 */
export function handleDragLeave(setIsDragging: (isDragging: boolean) => void) {
  setIsDragging(false);
}
