import { flushSync } from "react-dom";

export const changeTheme = async (toggleTheme: () => void) => {
  if (!document.startViewTransition) {
    toggleTheme();
    return;
  }

  // Use center of the viewport for animation origin
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;

  await document.startViewTransition(() => {
    flushSync(() => {
      toggleTheme(); // your custom toggle
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
};

type CommandHandler = (args: string[]) => Promise<string>;

export const createCommands = (
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
