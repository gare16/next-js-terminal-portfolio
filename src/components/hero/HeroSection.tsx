"use client";

import { HeaderSection } from "./HeaderSection";
import TerminalSection from "./TerminalSection";

export function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-12 text-center space-y-6 md:space-y-8">
      {/* Header + Animated tagline */}
      <HeaderSection />

      {/* Terminal Section */}
      <TerminalSection />

      {/* Subheading */}
      <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl">
        Building smooth web experiences with{" "}
        <span className="text-primary font-semibold">React</span> &{" "}
        <span className="text-primary font-semibold">Next.js</span>.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <a
          href="#projects"
          className="px-6 py-3 bg-primary text-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-primary text-primary rounded-xl hover:bg-primary/10 transition-colors duration-300"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}
