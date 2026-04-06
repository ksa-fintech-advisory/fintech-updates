import createMiddleware from 'next-intl/middleware';
import { routing } from '@/core/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for auth token
  const token = request.cookies.get('auth-token')?.value;

  // All locale-prefixed marketing routes are public
  const isPublicPath = /^\/(en|ar)(\/|$)/.test(pathname);

  // // Protected paths (dashboard)
  // const isDashboardPath = pathname.includes('/dashboard');

  // // Redirect to login if accessing dashboard without token
  // if (isDashboardPath && !token) {
  //   const locale = request.cookies.get('NEXT_LOCALE')?.value || 'ar';
  //   return NextResponse.redirect(new URL(`/${locale}`, request.url));
  // }

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