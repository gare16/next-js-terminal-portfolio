"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "../magicui/animated-theme-toggler";
import { setCookie } from "@/lib/SetCookies";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Deteksi locale aktif
  const currentLocale = pathname.startsWith("/id") ? "id" : "en";

  const changeLanguage = async (locale: string) => {
    await setCookie("locale", locale);

    // Ganti locale di pathname
    const newPath = pathname.replace(/^\/(en|id)/, `/${locale}`);
    router.push(newPath);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/10 backdrop-blur-lg border-b-[0.1px] border-primary z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href={`/${currentLocale}`} className="text-xl font-bold">
          garee<span className="text-primary">.pro</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {/* Language Switcher */}
          <div className="flex gap-2">
            <button
              className={`px-2 py-1 rounded ${
                currentLocale === "en"
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              }`}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <button
              className={`px-2 py-1 rounded ${
                currentLocale === "id"
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              }`}
              onClick={() => changeLanguage("id")}
            >
              ID
            </button>
          </div>

          {/* Dark Mode */}
          <AnimatedThemeToggler />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded hover:bg-accent"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-background border-t p-4 flex flex-col gap-4">
          {/* Language Switcher */}
          <div className="flex gap-2">
            <button
              className={`px-2 py-1 rounded ${
                currentLocale === "en"
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              }`}
              onClick={async () => {
                await changeLanguage("en");
                setOpen(false);
              }}
            >
              EN
            </button>
            <button
              className={`px-2 py-1 rounded ${
                currentLocale === "id"
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              }`}
              onClick={async () => {
                await changeLanguage("id");
                setOpen(false);
              }}
            >
              ID
            </button>
            {/* Dark Mode */}
            <AnimatedThemeToggler />
          </div>
        </div>
      )}
    </nav>
  );
}
