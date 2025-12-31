"use client";

import { Moon, SunDim, Sparkles } from "lucide-react";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: Props) => {
  const { theme, setTheme } = useTheme(); // update context agar mendukung neon
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const changeTheme = async (newTheme: "dark" | "light" | "neon") => {
    if (!buttonRef.current) return;

    // Dispatch theme change start event
    document.dispatchEvent(new CustomEvent('themeChangeStart'));

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme); // ganti theme sesuai pilihan dropdown
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    // Dispatch theme change end event after the transition completes
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('themeChangeEnd'));
    }, 700);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button ref={buttonRef} className={cn("p-2 rounded-full", className)}>
          {theme === "dark" ? (
            <SunDim />
          ) : theme === "light" ? (
            <Moon />
          ) : (
            <Sparkles />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={() => changeTheme("light")}>
          <Moon className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("dark")}>
          <SunDim className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("neon")}>
          <Sparkles className="mr-2 h-4 w-4" />
          Neon
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
