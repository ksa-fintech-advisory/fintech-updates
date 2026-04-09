import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
  localePrefix: 'always',
  // Add this to prevent browser language from overriding the default 'ar' locale
  localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
