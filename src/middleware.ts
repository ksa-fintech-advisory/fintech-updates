import createMiddleware from 'next-intl/middleware';
import { routing } from '@/core/i18n/routing';
import { MAINTENANCE_MODE } from '@/core/config/maintenance';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const LOCALE_HOME = /^\/(en|ar)$/;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (MAINTENANCE_MODE) {
    const localeMatch = pathname.match(/^\/(en|ar)/);
    const locale = localeMatch?.[1] ?? request.cookies.get('NEXT_LOCALE')?.value ?? 'ar';

    if (!LOCALE_HOME.test(pathname)) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    return intlMiddleware(request);
  }

  // Check for auth token
  const token = request.cookies.get('auth-token')?.value;

  // All locale-prefixed marketing routes are public
  const isPublicPath = /^\/(en|ar)(\/|$)/.test(pathname);

  // Redirect to dashboard if accessing login with token
  if (isPublicPath && token) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'ar';
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(en|ar)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};