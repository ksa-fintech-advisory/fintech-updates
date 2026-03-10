import createMiddleware from 'next-intl/middleware';
import { routing } from '@/core/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const FINTECH_FUNDAMENTALS_PATH = '/web/courses/fintech-fundamentals';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // TODO: Remove this once you need to launch the whole website
  // Redirect any request under /[locale]/web to Fintech Fundamentals course (except the course itself)
  const webCourseMatch = pathname.match(/^\/(en|ar)(\/web)(?:\/|$)/);
  if (webCourseMatch) {
    const locale = webCourseMatch[1];
    const isCoursePath = pathname.includes(FINTECH_FUNDAMENTALS_PATH);
    if (!isCoursePath) {
      return NextResponse.redirect(new URL(`/${locale}${FINTECH_FUNDAMENTALS_PATH}`, request.url));
    }
  }

  // Check for auth token
  const token = request.cookies.get('auth-token')?.value;

  // Public paths that don't require auth
  const publicPaths = ['/web/*'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Redirect to dashboard if accessing login with token
  if (isPublicPath && token) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'ar';
    return NextResponse.redirect(new URL(`/${locale}/web/home`, request.url));
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
