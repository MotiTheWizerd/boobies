"use client";
import React, { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { MenuItemType } from "./Menu";

interface MenuItemProps {
  item: MenuItemType;
  icon?: ReactNode;
}

const MenuItem = ({ item, icon }: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { label, href, className = "", customHover = false } = item;

  // Animation variants
  const menuItem = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.li variants={menuItem}>
      <motion.a
        href={href}
        className={`hover:text-purple-600 dark:hover:text-purple-300 relative px-2 py-1 block whitespace-nowrap ${className}`}
        whileHover="hover"
        variants={menuItem}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {isHovered && !customHover && (
          <motion.span
            className="absolute inset-0 bg-purple-500/20 dark:bg-white/20 rounded-full -z-10"
            layoutId="menuHighlight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
        {icon ? (
          <span className="flex items-center gap-1">
            {label}
            {icon}
          </span>
        ) : (
          label
        )}
      </motion.a>
    </motion.li>
  );
};

export default MenuItem;
