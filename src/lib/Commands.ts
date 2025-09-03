import { useTranslations } from "next-intl";
import { getDate, getUptime, handleCalc, handleEcho } from "./utils";

export const useCommands = () => {
  const t = useTranslations("terminal");
  const res = useTranslations("terminal.resume");
  const soc = useTranslations("terminal.social");

  const COMMANDS = {
    help: () => t("help").replace(/,/g, "\n"),

    uptime: (() => {
      const startTime = Date.now();
      return () => getUptime(startTime);
    })(),

    about: () => t("about"),

    skills: () => t("skills"),

    projects: () => t("projects").replace(/,/g, "\n"),

    experience: () => t("experience"),

    education: () => t("education"),

    contact: () => t("contact"),

    social: () =>
      `Media Social:\n Github: \x1b[38;5;45m\x1b]8;;${soc(
        "links.github"
      )}\x07Here\x1b]8;;\x07\x1b[0m \n LinkedIn: \x1b[38;5;45m\x1b]8;;${soc(
        "links.linkedIn"
      )}\x07Here\x1b]8;;\x07\x1b[0m`,

    resume: () =>
      `${res("full")}\x1b[38;5;45m\x1b]8;;${res(
        "download"
      )}\x07Here\x1b]8;;\x07\x1b[0m`,

    date: () => getDate(),

    quote: () => t("quote"),

    joke: () => t("joke"),
    echo: (text: string) => handleEcho(text),

    calc: (expression: string) => handleCalc(expression),
  };

  return COMMANDS;
};
