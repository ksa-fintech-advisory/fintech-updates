import createMiddleware from 'next-intl/middleware';
import { routing } from '@/core/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for auth token
  const token = request.cookies.get('auth-token')?.value;

  // Public paths that don't require auth
  const publicPaths = ['/auth/login', '/auth/forgot-password', '/auth/reset-password'];
  const isPublicPath = publicPaths.some(path => pathname.includes(path));

  // Protected paths (dashboard)
  const isDashboardPath = pathname.includes('/dashboard');

  // Redirect to login if accessing dashboard without token
  if (isDashboardPath && !token) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'ar';
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }

  // Redirect to dashboard if accessing login with token
  if (isPublicPath && token) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'ar';
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|ar)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
