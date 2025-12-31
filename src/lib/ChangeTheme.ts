import { flushSync } from "react-dom";

export const changeTheme = async (toggleTheme: () => void) => {
  if (!document.startViewTransition) {
    // Dispatch theme change start event
    document.dispatchEvent(new CustomEvent('themeChangeStart'));
    toggleTheme();
    // Dispatch theme change end event after a short delay
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('themeChangeEnd'));
    }, 300);
    return;
  }

  // Dispatch theme change start event
  document.dispatchEvent(new CustomEvent('themeChangeStart'));

  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;

  await document.startViewTransition(() => {
    flushSync(() => {
      toggleTheme();
    });
  }).ready;

  const left = x;
  const top = y;
  const right = window.innerWidth - left;
  const bottom = window.innerHeight - top;
  const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
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

export type CommandHandler = (args: string[]) => Promise<string>;

export const createCommandsTheme = (
  setTheme: (mode: "light" | "dark" | "neon") => void
): Record<string, CommandHandler> => ({
  theme: async (args: string[]) => {
    const themeName = args[0] || "toggle";

    if (themeName === "dark") {
      await changeTheme(() => setTheme("dark"));
      return `Theme set to dark mode`;
    }

    if (themeName === "neon") {
      await changeTheme(() => setTheme("neon"));
      return `Theme set to neon mode`;
    }

    if (themeName === "light") {
      await changeTheme(() => setTheme("light"));
      return `Theme set to light mode`;
    }

    return `Invalid theme.
Available: light, dark, neon`;
  },
});
