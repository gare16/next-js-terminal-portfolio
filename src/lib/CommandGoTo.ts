import { redirect } from "next/navigation";
import { CommandHandler } from "./ChangeTheme";

export const createCommandsGoTo = (): Record<string, CommandHandler> => ({
  go: async (args: string[]) => {
    const argumet = args[0];

    if (argumet === "projects") {
      setTimeout(() => {
        redirect("/projects");
      }, 1000);
      return `Directing to projects...`;
    }

    return `Invalid path. 
Available: projects`;
  },
});
