"use client";
import { Variants } from "framer-motion";

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// Slide animations
export const slideUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const slideDown: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const slideRight: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    x: -20,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const slideLeft: Variants = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    x: 20,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// Pop animation with bounce
export const popIn: Variants = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  exit: {
    scale: 0.7,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Card hover animations
export const cardHover = {
  scale: 1.02,
  y: -5,
  transition: { duration: 0.3 },
};

// Staggered animations for lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Profile card entrance animation
export const profileCardAnimation: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
    rotateZ: -2,
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotateZ: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    y: -8,
    boxShadow: "0px 15px 30px rgba(138, 43, 226, 0.3)",
    transition: { duration: 0.3 },
  },
};

// Button hover animation
export const buttonAnimation: Variants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 20px rgba(255, 105, 180, 0.5)",
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

// Page transition animation
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Shimmer animation for loading states
export const shimmer = {
  hidden: {
    backgroundPosition: "-150% 0",
  },
  visible: {
    backgroundPosition: "150% 0",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1.5,
      ease: "linear",
    },
  },
};
