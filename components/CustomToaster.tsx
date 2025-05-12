"use client";

import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "./ThemeToggle/ThemeProvider";
import { useEffect, useState } from "react";

export function CustomToaster() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toaster after component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SonnerToaster
      position="top-center"
      theme={theme as "light" | "dark"}
      closeButton
      className="sonner-theme-custom"
    />
  );
}
