import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./modules/translations/i18n/routing";
import { decryptData } from "@/modules/common/lib/encryption";

const PUBLIC_PATHS = ["/sign-in", "/sign-up"];
const PROTECTED_PATHS = ["/dashboard", "/profile"];

const i18nMiddleware = createMiddleware(routing);

function getIsAuthenticated(request: NextRequest): boolean {
  try {
    const authCookie = request.cookies.get("auth-storage");
    if (!authCookie?.value) return false;

    const decrypted = decryptData(authCookie.value);
    const authData = JSON.parse(decrypted);
    return !!authData?.state?.user;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  const i18nResponse = await i18nMiddleware(request);

  if (pathnameIsMissingLocale) {
    return i18nResponse;
  }

  const isAuthenticated = getIsAuthenticated(request);

  const pathWithoutLocale = pathname.replace(/^\/(?:en|es)/, "");

  if (
    isAuthenticated &&
    PUBLIC_PATHS.some((p) => pathWithoutLocale.startsWith(p))
  ) {
    const locale = pathname.startsWith("/es") ? "es" : "en";
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  if (
    !isAuthenticated &&
    PROTECTED_PATHS.some((p) => pathWithoutLocale.startsWith(p))
  ) {
    const locale = pathname.startsWith("/es") ? "es" : "en";
    return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
  }

  return i18nResponse;
}

export const config = {
  matcher: ["/", "/(es|en)/:path*"],
};
