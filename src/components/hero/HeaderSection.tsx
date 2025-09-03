"use client";

import { WordRotate } from "../magicui/word-rotate";

export function HeaderSection({
  greeting,
  name,
  roles,
}: {
  greeting: string;
  name: string;
  roles: string[];
}) {
  return (
    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight flex flex-wrap gap-3 md:gap-5 text-white">
      {greeting} <span className="text-primary">{name}</span>
      <WordRotate
        className="text-3xl md:text-5xl font-extrabold"
        words={roles}
      />
    </h1>
  );
}
