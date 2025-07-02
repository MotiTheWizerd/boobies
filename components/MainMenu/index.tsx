"use client";
import React from "react";
import { motion } from "framer-motion";
import Menu, { MenuItemType } from "./Menu";

// Mock data for main menu items
const mainMenuItems: MenuItemType[] = [
  { id: 1, label: "ראשי", href: "/" },
  {
    id: 2,
    label: "בלעדי",
    href: "#",
    customHover: true,
    hasFireIcon: true,
    extraContent: { before: "חם", after: "בלעדי" },
  },
  // { id: 3, label: "נערות ליווי", href: "" },
  { id: 4, label: "שירותי ליווי", href: "/escorts" },
  { id: 6, label: "דירות דיסקרטיות", href: "/discreet-apartments" },
  { id: 7, label: "טופ 10", href: "#" },
  // { id: 8, label: "חדשות", href: "#" },
  // { id: 9, label: "תמונות", href: "#" },
  // { id: 10, label: "סרטונים", href: "#" },
  // { id: 11, label: "אתרים מובילים", href: "#" },
  // { id: 12, label: 'אתרים בחו"ל', href: "#" },
  { id: 13, label: "צור קשר", href: "#" },
];

const MainMenu = () => {
  // Animation for the fire icon
  const fireIconAnimation = {
    scale: [1, 1.2, 1],
    rotate: [-5, 5, -5, 5, 0],
  };

  const fireIconTransition = {
    duration: 1.5,
    repeat: Infinity,
    repeatDelay: 1,
  };

  // Custom fire icon component
  const FireIcon = () => (
    <motion.span
      className="fire-icon"
      animate={fireIconAnimation}
      transition={fireIconTransition}
    >
      🔥
    </motion.span>
  );

  // Render function for icons
  const renderIcon = (item: MenuItemType) => {
    if (item.hasFireIcon && item.extraContent) {
      return (
        <span className="flex items-center gap-1">
          <span>{item.extraContent.before}</span>
          <FireIcon />
          <span>{item.extraContent.after}</span>
        </span>
      );
    }
    return null;
  };

  return (
    <motion.nav
      className="menu-bar text-gray-900 dark:text-white py-3 shadow-lg relative z-30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.2,
        type: "spring",
        stiffness: 300,
      }}
      dir="rtl"
    >
      <div
        className="container mx-auto px-4"
        dir="rtl"
        style={{
          direction: "rtl",
          display: "flex",
        }}
      >
        <Menu menuItems={mainMenuItems} renderIcon={renderIcon} />
      </div>
    </motion.nav>
  );
};

export default MainMenu;
