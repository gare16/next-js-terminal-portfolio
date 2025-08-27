"use client";

import { WordRotate } from "../magicui/word-rotate";

export function HeaderSection() {
  return (
    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight flex flex-wrap gap-3 md:gap-5 text-background dark:text-foreground">
      Hi, I’m <span className="text-primary">Tegar</span>
      <WordRotate
        className="text-3xl md:text-5xl font-extrabold"
        words={[
          "Frontend Developer",
          "Problem Solver",
          "Tech Enthusiast",
          "Lifelong Learner",
        ]}
      />
    </h1>
  );
}
