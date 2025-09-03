"use client";

import Link from "next/link";
import { Linkedin, Github } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const hero = useTranslations("hero");
  const social = useTranslations("terminal.social");
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo & About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-7xl mb-6">
            garee<span className="text-primary">.pro</span>
          </h1>
          <p className="text-sm md:text-md">
            {hero("greeting")}{" "}
            <span className="text-primary">{hero("name")}</span>!{" "}
            {hero("subheading")} {hero("react")} & {hero("nextjs")}
          </p>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <h3 className="font-semibold text-white mb-2">Connect</h3>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              href={social("links.github")}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              <Github size={20} />
            </Link>
            <Link
              href={social("links.linkedIn")}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <Linkedin size={20} />
            </Link>
          </div>
          <p className="text-sm mt-2">
            garee.pro © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
