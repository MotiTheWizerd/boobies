import React, { ReactNode, forwardRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./DraggableGrid.module.css";

export interface SortableItemProps {
  id: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  isDraggableItem?: boolean;
  customHandleSelector?: string;
}

export const SortableItem = forwardRef<HTMLDivElement, SortableItemProps>(
  (
    {
      id,
      children,
      className,
      disabled = false,
      isDraggableItem = true,
      customHandleSelector,
    }: SortableItemProps,
    ref
  ) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id,
      disabled: disabled || !isDraggableItem,
    });

    // Apply drag transform styles
    const style = transform && isDraggableItem
      ? {
          transform: CSS.Transform.toString(transform),
          transition,
        }
      : undefined;

    // Item classes based on state
    const itemClasses = `
      ${styles.item}
      ${isDragging ? styles.dragging : ""}
      ${!isDraggableItem ? styles.overlayItem : ""}
      ${className || ""}
    `;

    // Handle event listeners based on custom handle selector
    const getEventHandlers = () => {
      if (!isDraggableItem) return {};
      if (customHandleSelector) return {}; // Handles will be applied via delegate
      return listeners;
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={itemClasses}
        {...(isDraggableItem ? attributes : {})}
        {...getEventHandlers()}
        data-draggable-item={isDraggableItem.toString()}
      >
        {children}
      </div>
    );
  }
);

SortableItem.displayName = "SortableItem"; 