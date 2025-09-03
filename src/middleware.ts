import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const localeFromCookie = req.cookies.get("locale")?.value;
  const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localeDetection: false,
  });

  // Only redirect root `/` to default locale
  if (pathname === "/") {
    const locale = localeFromCookie || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // For other paths, just let next-intl handle
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
