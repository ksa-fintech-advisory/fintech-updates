import type { Metadata } from 'next';
import { Amiri_Quran, IBM_Plex_Sans_Arabic, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/core/i18n/config';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import Header from '@/core/components/web/layout/Header';
import Footer from '@/core/components/web/layout/Footer';
import { getSiteUrl } from '@/core/seo/site';
import { JsonLd } from '@/core/seo/JsonLd';
import { siteWideGraphJsonLd } from '@/core/seo/structuredData';
import SiteJsonLd from '@/core/components/web/seo/SiteJsonLd';
import '@/core/theme/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans-arabic',
  display: 'swap',
});

/** Quranic Naskh — used sparingly (e.g. hero name in Arabic). */
const amiriQuran = Amiri_Quran({
  weight: '400',
  subsets: ['arabic', 'latin'],
  variable: '--font-amiri-quran',
  display: 'swap',
});

const fav = '/favicon_io';

export const metadata: Metadata = {
  title: {
    default: 'Maal Tech | مال تك',
    template: '%s | Maal Tech',
  },
  description:
    'Maal Tech — Mohammed Abdo: FinTech consulting, architecture, and mentorship for Saudi Arabia and the Arab world. Blog, free learner roadmap, PDPL/GCC regulatory context, and contact.',
  keywords: [
    'FinTech',
    'Saudi Arabia',
    'KSA',
    'SAMA',
    'PDPL',
    'GCC',
    'digital banking',
    'payments',
    'compliance',
    'FinTech consulting',
    'مال تك',
    'التقنية المالية',
  ],
  authors: [{ name: 'Mohammed Abdo', url: 'https://www.linkedin.com/in/mohfintech/' }],
  creator: 'Mohammed Abdo',
  publisher: 'Maal Tech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getSiteUrl()),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      ar: '/ar',
      'x-default': '/en',
    },
  },
  openGraph: {
    title: 'Maal Tech | مال تك',
    description:
      'FinTech consulting, writing, and a free learner roadmap — for teams building regulated products in the Arab world.',
    url: '/',
    siteName: 'Maal Tech',
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
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
    description:
      'FinTech consulting, writing, and a free learner roadmap — for teams building regulated products in the Arab world.',
    images: ['/og-image.png'],
    creator: '@mohfintech',
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
      { url: '/favicon.ico' },
      { url: `${fav}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
      { url: `${fav}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${fav}/android-chrome-192x192.png`, sizes: '192x192', type: 'image/png' },
      { url: `${fav}/android-chrome-512x512.png`, sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: `${fav}/apple-touch-icon.png`, type: 'image/png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon.ico' }],
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
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={`${inter.variable} ${ibmPlexSansArabic.variable} ${amiriQuran.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-grey-50">
        <JsonLd data={siteWideGraphJsonLd(getSiteUrl())} />
        <SiteJsonLd />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
