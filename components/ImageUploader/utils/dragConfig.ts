import { DropAnimation, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

/**
 * Custom drop animation configuration for drag and drop
 */
export const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
  keyframes({ transform }) {
    return [
      { transform: CSS.Transform.toString(transform.initial) },
      {
        transform: CSS.Transform.toString({
          ...transform.final,
          scaleX: 1.02, // Slight scale for a more satisfying animation
          scaleY: 1.02,
        }),
      },
      {
        transform: CSS.Transform.toString(transform.final),
      },
    ];
  },
  easing: "cubic-bezier(0.25, 1, 0.5, 1)", // Fast-out, slow-in curve for smooth finish
  duration: 250, // Shorter duration for quicker animation
};
