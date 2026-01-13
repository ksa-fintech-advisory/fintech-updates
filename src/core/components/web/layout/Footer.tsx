'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { FiGithub, FiTwitter, FiLinkedin, FiArrowRight, FiArrowLeft, FiSend, FiCommand } from 'react-icons/fi';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-50 dark:bg-black text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 overflow-hidden font-sans">

      {/* 1. Global Engineering Grid Background (Consistent with other sections) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <Link href={`/${locale}/web/home`} className="block w-fit">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xl rounded-lg">
                  {isArabic ? 'ف' : 'F'}
                </div>
                <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  {isArabic ? 'مال تك' : 'Maal Tech'}
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-sm text-zinc-500 dark:text-zinc-400">
              {isArabic
                ? 'البنية التحتية المعرفية لقطاع التقنية المالية. نقدم الأدوات والبيانات اللازمة لبناء الجيل القادم من الخدمات المالية.'
                : 'The cognitive infrastructure for the Fintech sector. Providing the tools and data needed to build the next generation of financial services.'}
            </p>

            {/* Social Links - Minimalist Icons */}
            <div className="flex items-center gap-4">
              {[
                { name: 'Twitter', icon: <FiTwitter />, href: '#' },
                { name: 'LinkedIn', icon: <FiLinkedin />, href: '#' },
                { name: 'GitHub', icon: <FiGithub />, href: '#' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
              {isArabic ? 'المنصة' : 'PLATFORM'}
            </h4>
            <ul className="space-y-4">
              {[
                { href: '/web/home', label: t('common.nav.home') || 'Overview' },
                { href: '/web/products', label: t('common.nav.products') || 'Tools & APIs' },
                { href: '/web/courses', label: t('common.nav.courses') || 'Academy' },
                { href: '/web/updates', label: t('common.nav.updates') || 'Changelog' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-zinc-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
              {isArabic ? 'المؤسسة' : 'COMPANY'}
            </h4>
            <ul className="space-y-4">
              {[
                { href: '/web/about', label: t('common.nav.about') || 'About' },
                { href: '/web/contact', label: t('common.nav.contact') || 'Contact' },
                { href: '/web/privacy', label: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy' },
                { href: '/web/terms', label: isArabic ? 'الشروط والأحكام' : 'Terms of Service' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-zinc-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column (4 cols) - The "Terminal" Input */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                <FiCommand className="text-zinc-400" />
                {isArabic ? 'النشرة التقنية' : 'Stay Synced'}
              </h4>
              <p className="text-xs text-zinc-500 mb-6 leading-relaxed">
                {isArabic
                  ? 'اشترك للحصول على ملخصات تقنية حول تحديثات الـ API واللوائح الجديدة.'
                  : 'Get technical summaries on API updates, regulatory changes, and market shifts.'}
              </p>

              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={isArabic ? 'البريد الإلكتروني...' : 'user@domain.com'}
                  className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg pl-4 pr-12 py-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-mono"
                />
                <button
                  type="submit"
                  className="absolute inset-y-1 right-1 bg-zinc-900 dark:bg-zinc-800 hover:bg-primary-600 dark:hover:bg-primary-600 text-white rounded-md px-3 flex items-center justify-center transition-colors"
                  aria-label="Subscribe"
                >
                  {isArabic ? <FiArrowLeft className="w-4 h-4" /> : <FiArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar: System Status Style */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-xs text-zinc-400 font-mono">
              © {currentYear} Maal Tech Inc.
            </p>
            {/* Compliance Badges (Text Only to maintain cleanliness) */}
            <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">PCI-DSS Compliant</span>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">ISO 27001</span>
            </div>
          </div>

          {/* System Status Indicator */}
          <div className="flex items-center gap-3 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
              {isArabic ? 'الأنظمة تعمل: v2.4' : 'SYSTEMS OPERATIONAL'}
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}