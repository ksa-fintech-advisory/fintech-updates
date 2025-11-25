import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/core/i18n/config';
import { ThemeProvider } from '@/core/theme/ThemeProvider';

import { NotificationProvider } from '@/core/notifications/NotificationProvider';
import '@/core/theme/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Admin Panel - Finance Dashboard',
    template: '%s | Admin Panel',
  },
  description: 'Enterprise-level finance institution admin panel for managing customers, transactions, portfolios, and financial operations.',
  keywords: ['finance', 'admin panel', 'dashboard', 'fintech', 'banking', 'portfolio management'],
  authors: [{ name: 'AWQEF Group' }],
  creator: 'AWQEF Group',
  publisher: 'AWQEF Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ar': '/ar',
    },
  },
  openGraph: {
    title: 'Admin Panel - Finance Dashboard',
    description: 'Enterprise-level finance institution admin panel',
    url: '/',
    siteName: 'Admin Panel',
    locale: 'en',
    type: 'website',
  },
  robots: {
    index: false, // Admin panel should not be indexed
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192x192.png' },
    ],
  },
  manifest: '/manifest.json',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

 
  const messages = (await import(`../../../messages/${locale}.json`)).default;

 
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <NotificationProvider>
                <NextIntlClientProvider messages={messages} locale={locale}>
                  {children}
                </NextIntlClientProvider>
              </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
