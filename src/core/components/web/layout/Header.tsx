'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import ProductsMegaMenu from './ProductsMegaMenu';
import CoursesMegaMenu from './CoursesMegaMenu';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const currentPath = pathname.replace(`/${locale}`, '');
  const isArabic = locale === 'ar';

  const navItems = [
    { href: '/web/home', label: t('common.nav.home'), key: 'home' },
    { href: '/web/products', label:t("common.nav.products"), key: 'products', hasMegaMenu: true },
    { href: '/web/courses', label: t('common.nav.courses'), key: 'courses', hasMegaMenu: true },
    { href: '/web/updates', label: t('common.nav.updates'), key: 'updates' },
    { href: '/web/blog', label: t('common.nav.blog'), key: 'blog' },
    // { href: '/web/technology', label: t('common.nav.technology')},
    // { href: '/web/compliance', label: t('common.nav.compliance')},
    { href: '/web/about', label: t('common.nav.about'), key: 'about' },
    { href: '/web/contact', label: t('common.nav.contact'), key: 'contact' },
  ];

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredItem(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200); // Small delay to prevent flickering
  };

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
              const isMegaMenuOpen = item.hasMegaMenu && hoveredItem === item.key;

              return (
                <div
                  key={item.key}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.hasMegaMenu ? '#' : `/${locale}${item.href}`}
                    className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-1 ${active || isMegaMenuOpen
                      ? 'text-primary bg-primary-50'
                      : 'text-grey-700 hover:text-primary hover:bg-grey-50'
                      }`}
                  >
                    {item.label}
                    {item.hasMegaMenu && (
                      <svg className={`w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}

                    {/* Active Indicator - Animated Underline */}
                    {active && !item.hasMegaMenu && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-saudi rounded-full animate-pulse"></span>
                    )}

                    {/* Hover Effect - Dot */}
                    <span className={`absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full transition-all duration-300 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                      }`}></span>
                  </Link>
                </div>
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

        {/* Mega Menus Rendered Here for Full Width - Desktop Only */}
        <div
          className="hidden md:block"
          onMouseEnter={() => handleMouseEnter('products')}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredItem === 'products' && (
            <ProductsMegaMenu closeMenu={() => setHoveredItem(null)} />
          )}
        </div>
        <div
          className="hidden md:block"
          onMouseEnter={() => handleMouseEnter('courses')}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredItem === 'courses' && (
            <CoursesMegaMenu closeMenu={() => setHoveredItem(null)} />
          )}
        </div>

        {/* Enhanced Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <nav className="py-4 border-t border-grey-200 space-y-1 overflow-y-auto max-h-[70vh]">
            {navItems.map((item, idx) => {
              const active = isActive(item.href);

              if (item.hasMegaMenu) {
                return (
                  <div key={item.key} className="space-y-1">
                    <button
                      onClick={() => setHoveredItem(hoveredItem === item.key ? null : item.key)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${hoveredItem === item.key
                          ? 'text-primary bg-primary-50'
                          : 'text-grey-700 hover:text-primary hover:bg-grey-50'
                        }`}
                    >
                      <span>{item.label}</span>
                      <svg className={`w-4 h-4 transition-transform duration-300 ${hoveredItem === item.key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Mobile Submenu */}
                    <div className={`transition-all duration-300 overflow-hidden ${hoveredItem === item.key ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="mx-4 py-2 bg-grey-50 rounded-xl border border-grey-100">
                        {item.key === 'products' && (
                          <>
                            <Link href={`/${locale}/web/products/fee-calculator`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-grey-700 hover:text-primary hover:bg-white rounded-lg mx-2 transition-colors">
                              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">💰</span>
                              <span className="font-medium">{isArabic ? 'حاسبة الرسوم' : 'Fee Calculator'}</span>
                            </Link>
                            <Link href={`/${locale}/web/products/compliance-checker`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-grey-700 hover:text-primary hover:bg-white rounded-lg mx-2 transition-colors">
                              <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-sm">✓</span>
                              <span className="font-medium">{isArabic ? 'فاحص الامتثال' : 'Compliance Checker'}</span>
                            </Link>
                            <Link href={`/${locale}/web/products/market-analysis`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-grey-700 hover:text-primary hover:bg-white rounded-lg mx-2 transition-colors">
                              <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm">📊</span>
                              <span className="font-medium">{isArabic ? 'تحليل السوق' : 'Market Analysis'}</span>
                            </Link>
                            <div className="border-t border-grey-200 mt-2 pt-2 mx-2">
                              <Link href={`/${locale}/web/products`} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 py-2 text-primary font-semibold text-sm">
                                {isArabic ? 'عرض كل المنتجات' : 'View All Products'}
                                <svg className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </>
                        )}
                        {item.key === 'courses' && (
                          <>
                            <Link href={`/${locale}/web/courses/fintech-fundamentals`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-grey-700 hover:text-primary hover:bg-white rounded-lg mx-2 transition-colors">
                              <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm">📚</span>
                              <div>
                                <span className="font-medium block">{isArabic ? 'أساسيات التقنية المالية' : 'Fintech Fundamentals'}</span>
                                <span className="text-xs text-grey-500">{isArabic ? '11 مرحلة • 250 ر.س' : '11 Phases • 250 SAR'}</span>
                              </div>
                            </Link>
                            <div className="border-t border-grey-200 mt-2 pt-2 mx-2">
                              <Link href={`/${locale}/web/courses`} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 py-2 text-primary font-semibold text-sm">
                                {isArabic ? 'عرض كل الدورات' : 'View All Courses'}
                                <svg className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${active
                      ? 'text-primary bg-primary-50 border-l-4 border-primary'
                      : 'text-grey-700 hover:text-primary hover:bg-grey-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {active && (
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
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
