'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { FiTwitter, FiLinkedin, FiArrowRight, FiArrowLeft, FiCommand, FiMail } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { PUBLIC_CONTACT_EMAIL, getWhatsAppWaMeUrl } from '@/core/data/publicContact';

export default function Footer() {
  const t = useTranslations('common.footer');
  const tNav = useTranslations('common.nav');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppWaMeUrl();

  const socialBase =
    'flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition-all hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:hover:text-white';

  return (
    <footer className="relative overflow-hidden border-t border-zinc-200 bg-zinc-50 font-sans text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-400">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />

      <div className="container relative z-10 mx-auto px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-8 lg:col-span-4">
            <Link href={`/${locale}/web/home`} className="block w-fit">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-xl font-bold text-white dark:bg-white dark:text-black">
                  {isArabic ? 'ف' : 'F'}
                </div>
                <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {isArabic ? 'مال تك' : 'Maal Tech'}
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{t('tagline')}</p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PUBLIC_CONTACT_EMAIL}`}
                className={socialBase}
                aria-label="Email"
                title={PUBLIC_CONTACT_EMAIL}
              >
                <FiMail className="h-5 w-5" />
              </a>
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${socialBase} hover:border-emerald-500/50 hover:text-[#25D366]`}
                  aria-label="WhatsApp"
                >
                  <SiWhatsapp className="h-5 w-5" />
                </a>
              ) : null}
              <a
                href="https://x.com/mohfintech"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBase}
                aria-label="Twitter"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohfintech/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBase}
                aria-label="LinkedIn"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="lg:col-span-2">
            <h4 className="mb-8 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
              {t('platform')}
            </h4>
            <ul className="space-y-4">
              {[
                { href: '/web/home', label: tNav('home') },
                { href: '/web/blog', label: tNav('blog') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="block text-sm text-zinc-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="mb-8 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              {t('company')}
            </h4>
            <ul className="space-y-4">
              {[
                { href: '/web/about', label: tNav('about') },
                { href: '/web/contact', label: tNav('contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="block text-sm text-zinc-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work together */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
                <FiCommand className="text-zinc-400" />
                {t('interestTitle')}
              </h4>
              <p className="mb-6 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{t('interestBody')}</p>
              <Link
                href={`/${locale}/web/contact`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-600 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {t('interestCta')}
                {isArabic ? <FiArrowLeft className="h-4 w-4" /> : <FiArrowRight className="h-4 w-4" />}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800 md:flex-row">
          <p className="text-center font-mono text-xs text-zinc-400 md:text-start">
            {t('copyright', { year: currentYear })}
          </p>
          <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1.5 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
              {t('status')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
