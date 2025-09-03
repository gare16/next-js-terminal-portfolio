"use client";

import { GridBeams } from "@/components/magicui/grid-beams";
import { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "light" | "dark" | "neon";

const ThemeContext = createContext<{
  theme: ThemeMode;
  toggle: () => void;
  setTheme: (mode: ThemeMode) => void;
}>({
  theme: "light",
  toggle: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [isMounted, setIsMounted] = useState(false);

  // Set initial theme from localStorage after component mounts
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    if (savedTheme && ["light", "dark", "neon"].includes(savedTheme)) {
      setThemeState(savedTheme);
    } else {
      // Optional: set default based on system preference if no saved theme
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme = systemPrefersDark ? "dark" : "light";
      setThemeState(defaultTheme);
      localStorage.setItem("theme", defaultTheme);
    }
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark", "neon");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme, isMounted]);

  const toggle = () => {
    setThemeState((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      return newTheme;
    });
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  // Prevent rendering until we've read from localStorage
  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      <GridBeams
        gridSize={0}
        gridColor="rgba(255, 255, 255, 0.2)"
        rayCount={20}
        rayOpacity={1}
        raySpeed={1}
        rayLength="50vh"
        gridFadeStart={10}
        gridFadeEnd={80}
        className="h-full w-full bg-background"
      >
        {children}
      </GridBeams>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
