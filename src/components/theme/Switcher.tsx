"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@components/ui/button";

export function Switcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (!theme) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="hover:scale-105 transition-transform duration-300 active:scale-95"
    >
      <Sun className="h-[1.3rem] w-[1.3rem] sm:h-[1.5rem] sm:w-[1.5rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.3rem] w-[1.3rem] sm:h-[1.5rem] sm:w-[1.5rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  );
}