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

  // Apply class to <html> when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "neon"); // clear old classes
    root.classList.add(theme);
  }, [theme]);

  const toggle = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

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
