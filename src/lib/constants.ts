import { useTranslations } from "next-intl";

const TERMINAL_CONFIG = {
  cursorBlink: true,
  cursorStyle: "bar",
  fontSize: 15,
  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
  cursor: "#ff2056",
  scrollback: 2000,
} as const;

const PROMPT = "\x1b[32mλ\x1b[32m \x1b[36m ~ \x1b[0m ";

const GetIntroText = () => {
  const t = useTranslations("terminal");
  const s = t("intro").split(",");
  return s;
};

export { TERMINAL_CONFIG, PROMPT, GetIntroText };
