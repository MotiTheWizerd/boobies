"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const {
    theme,
    setTheme,
    systemTheme,
    isUsingSystemTheme,
    setUseSystemTheme,
  } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle between light and dark only
  const toggleTheme = () => {
    if (isUsingSystemTheme) {
      // If currently using system theme, switch to explicit theme (opposite of system)
      setTheme(systemTheme === "light" ? "dark" : "light");
    } else {
      // Just toggle the current theme
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMenu(false);
    };

    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  // Add a mounted check before rendering
  if (!mounted) return null;

  return (
    <div className="relative">
      {mounted && (
        <motion.button
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleTheme}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowMenu(!showMenu);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <SunIcon className="h-5 w-5 text-amber-500" />
          ) : (
            <MoonIcon className="h-5 w-5 text-indigo-400" />
          )}
        </motion.button>
      )}

      {/* Theme selection menu */}
      {showMenu && (
        <motion.div
          className="absolute top-full right-0 mt-2 p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col text-sm text-gray-800 dark:text-gray-200 space-y-2">
            <button
              onClick={() => {
                setTheme("light");
                setShowMenu(false);
              }}
              className={`flex items-center px-3 py-2 rounded-md ${
                theme === "light" && !isUsingSystemTheme
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <SunIcon className="h-4 w-4 text-amber-500 mr-2" />
              <span>Light</span>
            </button>
            <button
              onClick={() => {
                setTheme("dark");
                setShowMenu(false);
              }}
              className={`flex items-center px-3 py-2 rounded-md ${
                theme === "dark" && !isUsingSystemTheme
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <MoonIcon className="h-4 w-4 text-indigo-400 mr-2" />
              <span>Dark</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const SunIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
);

const MoonIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    />
  </svg>
);

const SystemIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
    />
  </svg>
);

export default ThemeToggle;
