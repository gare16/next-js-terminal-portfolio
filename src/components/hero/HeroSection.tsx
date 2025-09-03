"use client";

import { useTranslations } from "next-intl";
import { HeaderSection } from "./HeaderSection";
import TerminalSection from "./TerminalSection";

export function HeroSection() {
  const t = useTranslations("hero");

  const roles = t("roles").split(", ");
  return (
    <section
      className="w-full flex flex-col justify-center items-center px-6 md:px-12 text-center space-y-6 md:space-y-8"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      {/* Header + Animated tagline */}
      <HeaderSection greeting={t("greeting")} name={t("name")} roles={roles} />

      {/* Terminal Section */}
      <TerminalSection />

      {/* Subheading */}
      <p className="text-xs md:text-sm lg:text-md text-muted-foreground max-w-2xl">
        {t("subheading")}{" "}
        <span className="text-primary font-semibold">{t("react")}</span> &{" "}
        <span className="text-primary font-semibold">{t("nextjs")}</span>.
      </p>
    </section>
  );
}
