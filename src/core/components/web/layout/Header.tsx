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
    { href: '/web/technology', label: t('common.nav.guides') || 'Technology' },
    { href: '/web/compliance', label: t('common.nav.compliance') || 'Compliance' },
    { href: '/web/about', label: t('common.nav.about') || 'About Us' },
    { href: '/web/contact', label: t('common.nav.contact') || 'Contact' },
  ];

  const isActive = (href: string) => {
    // Check if current path matches the nav item
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-grey-200 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with Animation */}
          <Link
            href={`/${locale}/web/home`}
            className="group text-xl font-bold transition-all duration-300"
          >
            <span className="bg-gradient-saudi bg-clip-text text-transparent group-hover:scale-105 inline-block transition-transform">
              {locale === 'ar' ? 'تحديثات التقنية المالية' : 'FinTech Updates'}
            </span>
          </Link>

          {/* Desktop Navigation with Enhanced Active States */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${active
                      ? 'text-primary bg-primary-50'
                      : 'text-grey-700 hover:text-primary hover:bg-grey-50'
                    }`}
                >
                  {item.label}

                  {/* Active Indicator - Animated Underline */}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-saudi rounded-full animate-pulse"></span>
                  )}

                  {/* Hover Effect - Dot */}
                  <span className={`absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full transition-all duration-300 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                    }`}></span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side - Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Enhanced Language Switcher */}
            <Link
              href={`/${otherLocale}${currentPath}`}
              className="group relative px-4 py-2 text-sm font-bold text-grey-700 hover:text-white border-2 border-primary rounded-xl hover:bg-primary transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              {/* Background Animation */}
              <span className="absolute inset-0 bg-gradient-saudi opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                {otherLocale.toUpperCase()}
              </span>
            </Link>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative p-2 text-grey-700 hover:text-primary transition-colors group"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                {/* Animated Hamburger Icon */}
                <span className={`absolute top-1 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 top-2.5' : 'rotate-0'
                  }`}></span>
                <span className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                <span className={`absolute top-4 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 top-2.5' : 'rotate-0'
                  }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <nav className="py-4 border-t border-grey-200 space-y-1">
            {navItems.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:translate-x-2 animate-slide-up ${active
                      ? 'text-primary bg-primary-50 border-l-4 border-primary'
                      : 'text-grey-700 hover:text-primary hover:bg-grey-50'
                    }`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {active && (
                      <svg className="w-5 h-5 text-primary animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
