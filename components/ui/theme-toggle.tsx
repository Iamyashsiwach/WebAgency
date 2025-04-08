"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { NavbarButton } from "@/components/ui/resizable-navbar"; // Use NavbarButton

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    // Use NavbarButton as a button, adjust styling as needed
    <NavbarButton
      as="button"
      variant="secondary" // Use secondary or adjust as needed
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center p-0" // Adjust size/padding
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </NavbarButton>
  );
} 