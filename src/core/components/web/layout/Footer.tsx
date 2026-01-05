'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-grey-300 relative overflow-hidden border-t border-slate-800">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-900/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href={`/${locale}/web/home`} className="block">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-lg shadow-glow-primary">
                  {isArabic ? 'ف' : 'F'}
                </span>
                <span className="bg-gradient-to-r from-white to-grey-300 bg-clip-text text-transparent">
                  {isArabic ? 'مال تك' : 'Maal Tech'}
                </span>
              </h3>
            </Link>
            <p className="text-grey-400 leading-relaxed max-w-sm">
              {isArabic
                ? 'بوابتك لعالم التقنية المالية. مال تك تقدم رؤى شاملة وأخبار تنظيمية وتحليلات للسوق السعودي والخليجي والعربي.'
                : 'Your gateway to Middle Eastern FinTech. Maal Tech provides comprehensive insights, regulatory updates, and market analysis for the Saudi, GCC, and Arab world.'}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { name: 'Twitter', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
                { name: 'LinkedIn', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
                { name: 'GitHub', icon: <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /> }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-primary-600 text-grey-400 hover:text-white rounded-full transition-all duration-300 border border-slate-700 hover:border-primary-500 hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{social.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 relative inline-block">
              {isArabic ? 'المنصة' : 'Platform'}
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/web/home', label: t('common.nav.home') || 'Home' },
                { href: '/web/products', label: t('common.nav.products') || 'Products' },
                { href: '/web/courses', label: t('common.nav.courses') || 'Courses' },
                { href: '/web/updates', label: t('common.nav.updates') || 'Updates' },
                { href: '/web/blog', label: t('common.nav.blog') || 'Blog' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={`/${locale}${link.href}`}
                    className="text-grey-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-grey-600 rounded-full group-hover:bg-primary-500 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6 relative inline-block">
              {isArabic ? 'الشركة' : 'Company'}
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/web/about', label: t('common.nav.about') || 'About Us' },
                { href: '/web/contact', label: t('common.nav.contact') || 'Contact' },
                { href: '/web/privacy', label: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy' },
                { href: '/web/terms', label: isArabic ? 'الشروط والأحكام' : 'Terms of Service' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-grey-400 hover:text-accent-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-grey-600 rounded-full group-hover:bg-accent-500 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column (4 cols) */}
          <div className="lg:col-span-4 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
            <h4 className="text-white font-bold mb-2">
              {isArabic ? 'اشترك في النشرة البريدية' : 'Subscribe to Newsletter'}
            </h4>
            <p className="text-sm text-grey-400 mb-4">
              {isArabic
                ? 'احصل على آخر أخبار التقنية المالية والتحليلات مباشرة في بريدك الوارد.'
                : 'Get the latest fintech news and analysis delivered directly to your inbox.'}
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder={isArabic ? 'البريد الإلكتروني' : 'Email address'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-grey-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-light"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-grey-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary-900/20 hover:shadow-primary-900/40 hover:-translate-y-0.5">
                {isArabic ? 'اشترك الآن' : 'Subscribe Now'}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-grey-500">
            © {currentYear} {isArabic ? 'مال تك' : 'Maal Tech'}.
            {isArabic ? ' جميع الحقوق محفوظة.' : ' All rights reserved.'}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-600 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
              v1.0.0
            </span>
            <div className="flex items-center gap-2 text-sm text-grey-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {isArabic ? 'الأنظمة تعمل' : 'Systems Operational'}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
