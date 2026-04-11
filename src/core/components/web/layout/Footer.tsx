'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { FiTwitter, FiLinkedin, FiArrowRight, FiArrowLeft, FiCommand, FiMail, FiChevronRight } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { PUBLIC_CONTACT_EMAIL, getPublicMailtoHref, getWhatsAppWaMeUrl } from '@/core/data/publicContact';
import { ProfileAvatar } from '@/core/components/web/layout/ProfileAvatar';
import { AuthorNameText } from '@/core/components/web/layout/AuthorNameText';

export default function Footer() {
  const t = useTranslations('common.footer');
  const tNav = useTranslations('common.nav');
  const th = useTranslations('common.header');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppWaMeUrl();

  const socialBase =
    'flex h-10 w-10 items-center justify-center rounded-xl border border-grey-200 text-grey-500 transition-all hover:border-grey-400 hover:bg-white hover:text-grey-900 dark:border-grey-800 dark:text-grey-400 dark:hover:border-grey-600 dark:hover:bg-grey-900 dark:hover:text-white';

  const footerLinks = [
    { href: '', label: tNav('home') },
    { href: '/roadmap', label: tNav('roadmap') },
    { href: '/blog', label: tNav('blog') },
  ];

  const companyLinks = [
    { href: '/about', label: tNav('about') },
    { href: '/contact', label: tNav('contact') },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-grey-200 bg-gradient-to-b from-grey-50 to-grey-100/80 font-sans text-grey-600 dark:border-grey-800 dark:from-grey-950 dark:to-black dark:text-grey-400">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 dark:opacity-40"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 pb-12 pt-16 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:mb-16 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-4">
            <Link href={`/${locale}`} className="group flex w-fit items-center gap-3 outline-none">
              <ProfileAvatar
                size={48}
                alt={th('avatarAlt')}
                fallbackText={th('displayName')}
                variant="circle"
                className="shadow-md ring-2 ring-white transition-transform duration-200 group-hover:scale-105 dark:ring-grey-900"
                authorNameFont
              />
              <div className="min-w-0 text-start">
                <span className="block text-lg font-bold tracking-tight text-grey-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  {isArabic ? 'مال تك' : 'Maal Tech'}
                </span>
                <span className="mt-0.5 block max-w-[16rem] text-[12px] font-semibold uppercase tracking-[0.18em] text-grey-400 dark:text-grey-500">
                  {th('tagline')}
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-grey-600 dark:text-grey-400">{t('tagline')}</p>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={getPublicMailtoHref()}
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

          {/* Explore — flex-row-reverse on links broke RTL: row-reverse puts main-start on physical left while headers use row (main-start = inline-start = right). Use dir + normal row so headers and links share the same edge. */}
          <div className="flex min-w-0 flex-col items-stretch text-start lg:col-span-2">
            <div className="mb-6 w-full">
              <h4 className="flex w-full items-start justify-start gap-2 text-grey-900 dark:text-white">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600"
                  aria-hidden
                />
                <span className="flex min-w-0 flex-col gap-1 leading-tight">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest">{t('platform')}</span>
                  <span className="text-[11px] font-medium uppercase tracking-wide text-grey-400 dark:text-grey-500">
                    {t('platformLead')}
                  </span>
                </span>
              </h4>
            </div>
            <ul className="w-full space-y-1">
              {footerLinks.map((link) => (
                <li key={link.href || 'home'} className="w-full">
                  <Link
                    href={`/${locale}${link.href}`}
                    className="group flex w-full items-center justify-start gap-1.5 py-1.5 text-sm text-grey-600 transition-colors hover:text-primary-600 dark:text-grey-400 dark:hover:text-primary-400"
                  >
                    <span className="min-w-0">{link.label}</span>
                    <FiChevronRight
                      className="h-3.5 w-3.5 shrink-0 text-grey-400 opacity-0 transition-all group-hover:opacity-100 ltr:group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 dark:text-grey-500"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex min-w-0 flex-col items-stretch text-start lg:col-span-2">
            <div className="mb-6 w-full">
              <h4 className="flex w-full items-start justify-start gap-2 text-grey-900 dark:text-white">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-grey-400 dark:bg-grey-500"
                  aria-hidden
                />
                <span className="flex min-w-0 flex-col gap-1 leading-tight">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest">{t('company')}</span>
                  <span className="text-[11px] font-medium uppercase tracking-wide text-grey-400 dark:text-grey-500">
                    {t('companyLead')}
                  </span>
                </span>
              </h4>
            </div>
            <ul className="w-full space-y-1">
              {companyLinks.map((link) => (
                <li key={link.href} className="w-full">
                  <Link
                    href={`/${locale}${link.href}`}
                    className="group flex w-full items-center justify-start gap-1.5 py-1.5 text-sm text-grey-600 transition-colors hover:text-primary-600 dark:text-grey-400 dark:hover:text-primary-400"
                  >
                    <span className="min-w-0">{link.label}</span>
                    <FiChevronRight
                      className="h-3.5 w-3.5 shrink-0 text-grey-400 opacity-0 transition-all group-hover:opacity-100 ltr:group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 dark:text-grey-500"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-2xl border border-grey-200/90 bg-white p-6 shadow-sm ring-1 ring-grey-900/[0.04] dark:border-grey-700/80 dark:bg-grey-900/60 dark:ring-white/[0.06]">
              <div
                className="pointer-events-none absolute -end-16 -top-16 h-40 w-40 rounded-full bg-primary-500/10 blur-3xl dark:bg-primary-400/10"
                aria-hidden
              />
              <h4 className="relative mb-2 flex items-center gap-2 text-sm font-bold text-grey-900 dark:text-white">
                <FiCommand className="text-primary-600 dark:text-primary-400" aria-hidden />
                {t('interestTitle')}
              </h4>
              <p className="relative mb-6 text-xs leading-relaxed text-grey-600 dark:text-grey-400">{t('interestBody')}</p>
              <Link
                href={`/${locale}/contact`}
                className="relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-grey-900 px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-grey-800 dark:bg-white dark:text-grey-900 dark:hover:bg-grey-200"
              >
                {t('interestCta')}
                {isArabic ? <FiArrowLeft className="h-4 w-4" aria-hidden /> : <FiArrowRight className="h-4 w-4" aria-hidden />}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-grey-200/80 pt-8 dark:border-grey-800/80">
          <p className="text-center text-sm text-grey-500 dark:text-grey-500 md:text-start">
            {t.rich('copyright', {
              year: currentYear,
              author: (chunks) => <AuthorNameText isArabic={isArabic}>{chunks}</AuthorNameText>,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
