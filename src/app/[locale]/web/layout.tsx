import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/core/i18n/config';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import { NotificationProvider } from '@/core/notifications/NotificationProvider';
import Header from '@/core/components/web/layout/Header';
import Footer from '@/core/components/web/layout/Footer';
import '@/core/theme/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Saudi FinTech Updates | Latest News & Insights',
    template: '%s | Saudi FinTech Updates',
  },
  description: 'Stay updated with the latest FinTech innovations, regulatory updates, and industry trends shaping Saudi Arabia\'s digital financial future. Comprehensive coverage of SAMA regulations, digital banking, blockchain, and payment technologies.',
  keywords: ['Saudi Arabia', 'FinTech', 'Digital Banking', 'SAMA', 'Mada', 'Payment Systems', 'Blockchain', 'Financial Technology', 'Vision 2030', 'Innovation'],
  authors: [{ name: 'FinTech Updates' }],
  creator: 'FinTech Updates',
  publisher: 'FinTech Updates',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ar': '/ar',
    },
  },
  openGraph: {
    title: 'Saudi FinTech Updates | Latest News & Insights',
    description: 'Your trusted source for comprehensive coverage of FinTech innovations and regulatory updates in Saudi Arabia.',
    url: '/',
    siteName: 'Saudi FinTech Updates',
    locale: 'en',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saudi FinTech Updates',
      },
    ],
  },
  robots: {
    index: true, // Website should be indexed
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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

  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-grey-50">
        <ThemeProvider>
          <NotificationProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </NextIntlClientProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
