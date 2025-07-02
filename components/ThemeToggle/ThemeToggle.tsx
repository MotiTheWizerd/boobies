"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Monitor } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, setTheme, isUsingSystemTheme, setUseSystemTheme } = useTheme();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-md ${
          theme === "light" && !isUsingSystemTheme
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        }`}
        title="Light Mode"
        aria-label="Switch to light mode"
      >
        <Sun size={18} />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-md ${
          theme === "dark" && !isUsingSystemTheme
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        }`}
        title="Dark Mode"
        aria-label="Switch to dark mode"
      >
        <Moon size={18} />
      </button>

      <button
        onClick={() => setUseSystemTheme(true)}
        className={`p-2 rounded-md ${
          isUsingSystemTheme
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        }`}
        title="System Theme"
        aria-label="Use system theme preference"
      >
        <Monitor size={18} />
      </button>
    </div>
  );
};
