"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for Theme
type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme | null;
  isUsingSystemTheme: boolean;
  setUseSystemTheme: (useSystem: boolean) => void;
};

// Create Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize theme state to 'dark' by default
  const [theme, setThemeState] = useState<Theme>("dark");
  const [systemTheme, setSystemTheme] = useState<Theme | null>(null);
  const [isUsingSystemTheme, setUseSystemTheme] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Helper function to get system theme
  const getSystemTheme = (): Theme => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Set the theme and update localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      localStorage.setItem("useSystemTheme", "false");
    }
    setUseSystemTheme(false);
  };

  // Toggle using system theme
  const toggleUseSystemTheme = (useSystem: boolean) => {
    setUseSystemTheme(useSystem);
    if (typeof window !== "undefined") {
      localStorage.setItem("useSystemTheme", useSystem.toString());
      if (useSystem) {
        const newSystemTheme = getSystemTheme();
        setThemeState(newSystemTheme);
        localStorage.setItem("theme", newSystemTheme);
      }
    }
  };

  // Set up initial theme based on local storage or OS preference
  useEffect(() => {
    // Avoid hydration mismatch by only running this on the client
    if (typeof window !== "undefined") {
      // Check if user prefers to use system theme
      const useSystemPreference = localStorage.getItem("useSystemTheme");
      const shouldUseSystem = useSystemPreference === "true";

      if (shouldUseSystem) {
        const newSystemTheme = getSystemTheme();
        setThemeState(newSystemTheme);
        setSystemTheme(newSystemTheme);
        setUseSystemTheme(true);
      } else {
        // Check for saved theme preference
        const storedTheme = localStorage.getItem("theme") as Theme | null;
        if (storedTheme === "light" || storedTheme === "dark") {
          setThemeState(storedTheme);
        } else {
          // If no stored preference, use dark as default
          const defaultTheme = "dark";
          setThemeState(defaultTheme);
          localStorage.setItem("theme", defaultTheme);
        }
      }
      setMounted(true);
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        const newSystemTheme = getSystemTheme();
        setSystemTheme(newSystemTheme);

        // If user is using system theme, update the actual theme
        if (isUsingSystemTheme) {
          setThemeState(newSystemTheme);
          localStorage.setItem("theme", newSystemTheme);
        }
      };

      // Set initial system theme
      setSystemTheme(getSystemTheme());

      // Add listener for theme changes
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [isUsingSystemTheme]);

  // Update theme when it changes
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      const root = window.document.documentElement;
      // Remove both classes
      root.classList.remove("light", "dark");
      // Set the data-theme attribute instead of a class
      root.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  // Update the mounted check to not render children until ready
  if (!mounted) {
    return null; // Prevents rendering until mounted
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        systemTheme,
        isUsingSystemTheme,
        setUseSystemTheme: toggleUseSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
