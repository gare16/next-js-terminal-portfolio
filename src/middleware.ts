import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip public files, api routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const pathnameIsMissingLocale =
    pathname === "/" || !/^\/(en|id)(\/|$)/.test(pathname);

  if (pathnameIsMissingLocale) {
    const locale = "en"; // default locale
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }
}
