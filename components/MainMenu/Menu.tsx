"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";

// Define the menu item type
export interface MenuItemType {
  id: number;
  label: string;
  href: string;
  className?: string;
  customHover?: boolean;
  hasFireIcon?: boolean;
  extraContent?: {
    before?: string;
    after?: string;
  };
}

interface MenuProps {
  menuItems: MenuItemType[];
  className?: string;
  rtl?: boolean;
  renderIcon?: (item: MenuItemType) => ReactNode;
}

const Menu = ({
  menuItems,
  className = "",
  rtl = true,
  renderIcon,
}: MenuProps) => {
  // Animation variants
  const menuContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.ul
      className={`flex items-center gap-6 text-sm overflow-x-auto pb-2 scrollbar-thin w-full flex-row-reverse ${
        rtl ? "rtl-nav" : ""
      } ${className}`}
      variants={menuContainer}
      initial="hidden"
      animate="visible"
      dir={rtl ? "rtl" : "ltr"}
    >
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          icon={item.hasFireIcon && renderIcon ? renderIcon(item) : undefined}
        />
      ))}
    </motion.ul>
  );
};

export default Menu;
