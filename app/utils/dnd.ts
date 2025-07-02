import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

/**
 * Creates a standard set of sensors for drag-and-drop functionality
 * Configured for responsive and accessible dragging
 *
 * @returns Ready-to-use sensors for DndContext
 */
export function createDndSensors() {
  return useSensors(
    useSensor(PointerSensor, {
      // Make dragging more responsive
      activationConstraint: {
        distance: 1, // Even smaller distance for easier activation
        tolerance: 5,
        delay: 0, // No delay for immediate response
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
}
