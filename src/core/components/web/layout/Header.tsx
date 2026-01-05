'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useRef } from 'react';
import ProductsMegaMenu from './ProductsMegaMenu';
import CoursesMegaMenu from './CoursesMegaMenu';
import RegionDropdown from './RegionDropdown';
import Logo from './Logo';
import { getAllCourses } from '@/data/courseData';




export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const courses = getAllCourses()
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const currentPath = pathname.replace(`/${locale}`, '');
  const isArabic = locale === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  const navItems = [
    { href: '/web/home', label: t('common.nav.home'), key: 'home' },
    { href: '/web/products', label: t("common.nav.products"), key: 'products', hasMegaMenu: true },
    { href: '/web/courses', label: t('common.nav.courses'), key: 'courses', hasMegaMenu: true },
    { href: '/web/updates', label: t('common.nav.updates'), key: 'updates' },
    { href: '/web/blog', label: t('common.nav.blog'), key: 'blog' },
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
    }, 200);
  };

  const isActive = (href: string) => {
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* --- Logo Section --- */}
          <Link href={`/${locale}/web/home`} className="group flex items-center gap-3">
            <div className="relative">
              <Logo size={40} className="group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                {locale === 'ar' ? 'مال تك' : 'Maal Tech'}
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase hidden sm:block">
                {locale === 'ar' ? 'التقنية المالية' : 'FinTech Platform'}
              </span>
            </div>
          </Link>

          {/* --- Desktop Navigation --- */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const isMegaMenuOpen = item.hasMegaMenu && hoveredItem === item.key;

              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.hasMegaMenu ? '#' : `/${locale}${item.href}`}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${active || isMegaMenuOpen
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                  >
                    {item.label}
                    {item.hasMegaMenu && (
                      <svg className={`w-3 h-3 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Mega Menu Portals */}
                  {item.key === 'products' && hoveredItem === 'products' && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-screen max-w-screen-xl px-4">
                      {/* Note: In your layout, MegaMenu is usually typically full width relative to header. 
                           For simplicity based on your previous code, I'm keeping your absolute positioning logic 
                           inside the MegaMenu component itself, but ensuring it triggers here. */}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* --- Right Actions --- */}
          <div className="flex items-center gap-2 md:gap-4">
            <RegionDropdown />

            <Link
              href={`/${otherLocale}${currentPath}`}
              className="hidden md:flex items-center justify-center w-9 h-9 text-sm font-bold text-gray-700 border border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
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

        {/* --- Mega Menus (Rendered outside nav for layout control) --- */}
        <div className="hidden md:block" onMouseEnter={() => handleMouseEnter('products')} onMouseLeave={handleMouseLeave}>
          {hoveredItem === 'products' && <ProductsMegaMenu closeMenu={() => setHoveredItem(null)} />}
        </div>
        <div className="hidden md:block" onMouseEnter={() => handleMouseEnter('courses')} onMouseLeave={handleMouseLeave}>
          {hoveredItem === 'courses' && <CoursesMegaMenu
            courses={courses}
            closeMenu={() => setHoveredItem(null)} />}
        </div>

        {/* --- Mobile Menu --- */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[85vh] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'}`}>
          <nav className="py-4 space-y-1 overflow-y-auto max-h-[80vh] px-2">
            {navItems.map((item) => (
              <div key={item.key}>
                {item.hasMegaMenu ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => setHoveredItem(hoveredItem === item.key ? null : item.key)}
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                    >
                      {item.label}
                      <svg className={`w-4 h-4 transition-transform ${hoveredItem === item.key ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>

                    {/* Mobile Accordion */}
                    <div className={`${hoveredItem === item.key ? 'block' : 'hidden'} pl-4 pr-2 space-y-2 pb-2`}>
                      {item.key === 'courses' && courses.slice(0, 4).map(course => (
                        <Link
                          key={course.id}
                          href={`/${locale}/web/courses/${course.slug}`}
                          className="block p-3 rounded-lg bg-gray-50 border border-gray-100 text-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="font-semibold text-gray-900">{course.title[lang]}</div>
                          <div className="text-xs text-gray-500 mt-1">{course.modules} Modules</div>
                        </Link>
                      ))}
                      {/* Add simple View All link */}
                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 hover:border-blue-300 hover:shadow-sm transition-all mt-2"
                      >
                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span className="text-sm font-bold text-blue-700 flex-1">{t('common.viewAll')}</span>
                        <svg className={`w-4 h-4 text-blue-600 ${isArabic ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                      href={`/${locale}${item.href}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                    >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}