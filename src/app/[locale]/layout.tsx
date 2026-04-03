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
    default: 'Maal Tech | مال تك',
    template: '%s | Maal Tech',
  },
  description: 'Your gateway to Middle Eastern FinTech - Maal Tech covers innovations, regulations, and trends across the Arab world. From Saudi Arabia to the UAE, Egypt, and beyond. Comprehensive insights on digital banking, blockchain, payments, and financial technology.',
  keywords: ['Saudi Arabia', 'FinTech', 'Digital Banking', 'SAMA', 'Mada', 'Payment Systems', 'Blockchain', 'Financial Technology', 'Vision 2030', 'Innovation'],
  authors: [{ name: 'Maal Tech Team' }],
  creator: 'Maal Tech',
  publisher: 'Maal Tech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://arab-fintech.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ar': '/ar',
    },
  },
  openGraph: {
    title: 'Maal Tech | مال تك',
    description: 'Your gateway to Middle Eastern FinTech - covering innovations, regulations, and trends across the Arab world.',
    url: '/',
    siteName: 'Maal Tech',
    locale: 'en',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Maal Tech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maal Tech | مال تك',
    description: 'Your gateway to Middle Eastern FinTech - covering innovations, regulations, and trends across the Arab world.',
    images: ['/og-image.png'],
    creator: '@MaalTech',
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

  const messages = (await import(`../../../messages/${locale}.json`)).default;
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
