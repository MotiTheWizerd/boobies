"use client";
import React from "react";
import Menu, { MenuItemType } from "./Menu";

// Define RTL-specific container style
const rtlContainerStyle = {
  direction: "rtl" as const,
  display: "flex",
  flexDirection: "row-reverse" as const,
  justifyContent: "center",
  width: "100%",
};

// Common class for all secondary menu items
const secondaryMenuItemClass =
  "text-purple-800 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-200 hover:underline";

// Mock data for secondary menu items
const secondaryMenuItems: MenuItemType[] = [
  {
    id: 1,
    label: "מודעות חדשות",
    href: "#",
    className: secondaryMenuItemClass,
  },
  { id: 2, label: "חיפוש", href: "#", className: secondaryMenuItemClass },
  { id: 3, label: "פרסום", href: "#", className: secondaryMenuItemClass },
  { id: 4, label: "הוסף מודעה", href: "#", className: secondaryMenuItemClass },
  { id: 5, label: "אנדרואיד", href: "#", className: secondaryMenuItemClass },
  { id: 6, label: "טלגרם", href: "#", className: secondaryMenuItemClass },
];

const SecondaryMenu = () => {
  return (
    <div
      className="secondary-menu py-2 dark:bg-gray-800 dark:border-gray-700"
      dir="rtl"
    >
      <div
        className="container mx-auto px-4 secondary-container"
        dir="rtl"
        style={rtlContainerStyle}
      >
        <Menu menuItems={secondaryMenuItems} className="justify-center" />
      </div>
    </div>
  );
};

export default SecondaryMenu;
