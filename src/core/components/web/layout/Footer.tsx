'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    site: [
      { href: '/web/home', label: t('common.nav.home') || 'Home' },
      { href: '/web/blog', label: t('common.nav.blog') || 'Blog' },
      { href: '/web/contact', label: t('common.nav.contact') || 'Contact' },
    ],
    social: [
      { name: 'Twitter', href: '#', icon: '𝕏' },
      { name: 'LinkedIn', href: '#', icon: 'in' },
      { name: 'GitHub', href: '#', icon: 'gh' },
    ],
  };

  return (
    <footer className="bg-grey-900 text-grey-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                {locale === 'ar' ? 'تحديثات التقنية المالية' : 'FinTech Updates'}
              </span>
            </h3>
            <p className="text-sm text-grey-400">
              {locale === 'ar' 
                ? 'مصدرك الموثوق لأخبار التقنية المالية في السعودية'
                : 'Your trusted source for Saudi FinTech news'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              {footerLinks.site.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-grey-400 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              {locale === 'ar' ? 'تابعنا' : 'Follow Us'}
            </h4>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center bg-grey-800 hover:bg-primary rounded-lg transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-sm font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-grey-800 mt-8 pt-8 text-center">
          <p className="text-sm text-grey-500">
            © {currentYear} {locale === 'ar' ?  'تحديثات التقنية المالية' : 'FinTech Updates'}. 
            {locale === 'ar' ? ' جميع الحقوق محفوظة.' : ' All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
