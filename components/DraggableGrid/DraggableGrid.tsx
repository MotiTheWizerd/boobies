"use client";

import React, { ReactNode } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  closestCenter,
  DragOverlay,
  DropAnimation,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createDndSensors } from "../../app/utils/dnd";
import styles from "./DraggableGrid.module.css";

export type GridLayout = "grid" | "horizontal";

export interface DraggableItem {
  id: string;
  [key: string]: any;
}

export interface DraggableGridProps<T extends DraggableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T) => ReactNode;
  renderOverlay?: (item: T) => ReactNode;
  className?: string;
  itemClassName?: string;
  layout?: GridLayout;
  enableSorting?: boolean;
  dropAnimation?: DropAnimation;
  helperText?: string;
}

export function DraggableGrid<T extends DraggableItem>({
  items,
  onReorder,
  renderItem,
  renderOverlay,
  className,
  itemClassName,
  layout = "grid",
  enableSorting = true,
  dropAnimation,
  helperText,
}: DraggableGridProps<T>) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // Use the global sensors utility
  const sensors = createDndSensors();

  // Get the active item for the drag overlay
  const activeItem = activeId
    ? items.find((item) => item.id === activeId)
    : null;

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (enableSorting && over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = [...items];
        const [movedItem] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, movedItem);
        onReorder(newItems);
      }
    }
  };

  return (
    <div className={className || styles.container}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        autoScroll={true}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={
            layout === "grid"
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }
        >
          {helperText && <div className={styles.helperText}>{helperText}</div>}
          
          <div
            className={`${styles.grid} ${
              layout === "horizontal" ? styles.horizontal : ""
            } ${itemClassName || ""}`}
          >
            {items.map((item) => renderItem(item))}
          </div>
        </SortableContext>

        {/* Drag Overlay for improved visual feedback */}
        <DragOverlay
          dropAnimation={dropAnimation}
          className={styles.dragOverlay}
          zIndex={1000}
        >
          {activeItem && renderOverlay ? renderOverlay(activeItem) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
} 