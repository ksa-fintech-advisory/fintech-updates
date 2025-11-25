'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const currentPath = pathname.replace(`/${locale}`, '');

  const navItems = [
    { href: '/web/home', label: t('common.nav.home') || 'Home' },
    { href: '/web/blog', label: t('common.nav.blog') || 'Blog' },
      { href: '/web/compliance', label: t('common.nav.compliance') || 'Compliance' },
      { href: '/web/about', label: t('common.nav.about') || 'About Us' },
    { href: '/web/contact', label: t('common.nav.contact') || 'Contact' },
  ];

  const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent) => {
      // Reserved for future modal navigation if needed
  };

    return (
      <header className="sticky top-0 z-50 w-full border-b border-grey-200 bg-white/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                  {/* Logo */}
                  <Link
                      href={`/${locale}/web/home`}
                      className="text-xl font-bold text-primary hover:text-primary-700 transition-colors"
                  >
                      <span className="bg-gradient-saudi bg-clip-text text-transparent">
                          {locale === 'ar' ? 'تحديثات التقنية المالية' : 'FinTech Updates'}
                      </span>
                  </Link>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex items-center gap-8">
                      {navItems.map((item) => (
                  <Link
                                  key={item.href}
                                  href={`/${locale}${item.href}`}
                                  className="text-grey-700 hover:text-primary transition-colors font-medium"
                  >
                                  {item.label}
                              </Link>
              ))}
            </nav>

            {/* Language Switcher */}
            <div className="flex items-center gap-4">
              <Link
                href={`/${otherLocale}${currentPath}`}
                className="px-3 py-1.5 text-sm font-medium text-grey-700 hover:text-primary border border-grey-300 rounded-lg hover:border-primary transition-colors"
              >
                {otherLocale.toUpperCase()}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-grey-700 hover:text-primary"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-grey-200 animate-slide-down">
                      {navItems.map((item) => (
                  <Link
                                  key={item.href}
                                  href={`/${locale}${item.href}`}
                                  className="block py-2 text-grey-700 hover:text-primary transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                  >
                                  {item.label}
                              </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
  );
}
