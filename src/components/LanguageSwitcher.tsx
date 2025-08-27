"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2">
      <Link
        href={pathname.replace(/^\/(en|id)/, "/en")}
        className="px-3 py-1 rounded hover:bg-accent"
      >
        EN
      </Link>
      <Link
        href={pathname.replace(/^\/(en|id)/, "/id")}
        className="px-3 py-1 rounded hover:bg-accent"
      >
        ID
      </Link>
    </div>
  );
}
