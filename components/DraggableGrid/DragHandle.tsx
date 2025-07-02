import React from "react";
import styles from "./DraggableGrid.module.css";
import { useSortable } from "@dnd-kit/sortable";

interface DragHandleProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

export function DragHandle({ id, className, children }: DragHandleProps) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <div
      className={`${styles.dragHandle} ${className || ""}`}
      {...attributes}
      {...listeners}
    >
      {children || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="12" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="9" cy="6" r="1" />
          <circle cx="15" cy="6" r="1" />
          <circle cx="9" cy="18" r="1" />
          <circle cx="15" cy="18" r="1" />
        </svg>
      )}
    </div>
  );
} 