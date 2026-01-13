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
import { FiChevronDown, FiMenu, FiX, FiGlobe, FiCommand, FiArrowRight } from 'react-icons/fi';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const courses = getAllCourses();
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
    }, 150);
  };

  const isActive = (href: string) => {
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  return (
    <>
      {/* Engineering Header: 
        - Sticky
        - Blurry (Glassmorphism)
        - High Contrast Borders 
      */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* --- Logo Section: Technical Brand --- */}
            <Link href={`/${locale}/web/home`} className="group flex items-center gap-3 outline-none">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black shadow-sm group-hover:scale-105 transition-transform duration-200">
                {/* Simplified Logo Concept if Component not available, else use <Logo /> */}
                <span className="font-bold text-lg">{isArabic ? 'ف' : 'F'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-zinc-900 dark:text-white leading-none tracking-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {isArabic ? 'مال تك' : 'Maal Tech'}
                </span>
                <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase mt-0.5">
                  {isArabic ? 'بنية تحتية' : 'INFRASTRUCTURE'}
                </span>
              </div>
            </Link>

            {/* --- Desktop Navigation: The "Toolbar" --- */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const isMegaMenuOpen = item.hasMegaMenu && hoveredItem === item.key;

                return (
                  <div
                    key={item.key}
                    className="relative group/nav"
                    onMouseEnter={() => handleMouseEnter(item.key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.hasMegaMenu ? '#' : `/${locale}${item.href}`}
                      className={`
                        relative px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5 outline-none
                        ${active || isMegaMenuOpen
                          ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
                        }
                      `}
                    >
                      {item.label}
                      {item.hasMegaMenu && (
                        <FiChevronDown
                          className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`}
                        />
                      )}
                    </Link>

                    {/* Active Indicator Dot */}
                    {active && (
                      <span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-600 dark:bg-primary-400 block" />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* --- Right Actions: System Controls --- */}
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">

              <div className="hidden md:block">
                <RegionDropdown />
              </div>

              <Link
                href={`/${otherLocale}${currentPath}`}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
                aria-label="Switch Language"
              >
                <FiGlobe className="w-3.5 h-3.5" />
                <span>{otherLocale.toUpperCase()}</span>
              </Link>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* --- Mega Menus (Desktop Overlay) --- */}
          <div className="hidden md:block relative z-50">
            {/* Positioning context wrapper */}
            <div className="absolute top-0 left-0 w-full" onMouseEnter={() => handleMouseEnter('products')} onMouseLeave={handleMouseLeave}>
              {hoveredItem === 'products' && (
                <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <ProductsMegaMenu closeMenu={() => setHoveredItem(null)} />
                </div>
              )}
            </div>
            <div className="absolute top-0 left-0 w-full" onMouseEnter={() => handleMouseEnter('courses')} onMouseLeave={handleMouseLeave}>
              {hoveredItem === 'courses' && (
                <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <CoursesMegaMenu courses={courses} closeMenu={() => setHoveredItem(null)} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Mobile Menu (Drawer) --- */}
        <div
          className={`
            md:hidden fixed inset-x-0 top-[65px] bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800
            transition-all duration-300 ease-in-out origin-top overflow-hidden
            ${mobileMenuOpen ? 'max-h-[85vh] opacity-100 shadow-xl' : 'max-h-0 opacity-0'}
          `}
        >
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[80vh]">
            {navItems.map((item) => (
              <div key={item.key}>
                {item.hasMegaMenu ? (
                  <div className="space-y-1 mb-2">
                    <button
                      onClick={() => setHoveredItem(hoveredItem === item.key ? null : item.key)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold
                        ${hoveredItem === item.key ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'}
                      `}
                    >
                      {item.label}
                      <FiChevronDown className={`w-4 h-4 transition-transform ${hoveredItem === item.key ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mobile Accordion Content */}
                    <div className={`${hoveredItem === item.key ? 'block' : 'hidden'} pl-4 pr-2 space-y-2 border-l-2 border-zinc-100 dark:border-zinc-800 ml-4`}>

                      {/* Products Sub-items (Manual or Map) */}
                      {item.key === 'products' && (
                        <>
                          <Link href={`/${locale}/web/products/compliance-checker`} onClick={() => setMobileMenuOpen(false)} className="block p-3 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 text-sm text-zinc-600 dark:text-zinc-300">
                            {isArabic ? 'فاحص الامتثال' : 'Compliance Checker'}
                          </Link>
                          <Link href={`/${locale}/web/products/fee-calculator`} onClick={() => setMobileMenuOpen(false)} className="block p-3 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 text-sm text-zinc-600 dark:text-zinc-300">
                            {isArabic ? 'حاسبة الرسوم' : 'Fee Calculator'}
                          </Link>
                        </>
                      )}

                      {/* Courses Sub-items */}
                      {item.key === 'courses' && courses.slice(0, 3).map(course => (
                        <Link
                          key={course.id}
                          href={`/${locale}/web/courses/${course.slug}`}
                          className="block p-3 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 group"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-primary-600">{course.title[lang]}</div>
                          <div className="text-xs text-zinc-400 font-mono mt-0.5">{course.modules} Modules</div>
                        </Link>
                      ))}

                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-3 text-xs font-bold text-primary-600 uppercase tracking-wide"
                      >
                        {t('common.viewAll')} <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/${locale}${item.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Actions Footer */}
            <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between px-4">
              <Link
                href={`/${otherLocale}${currentPath}`}
                className="flex items-center gap-2 text-sm font-mono font-bold text-zinc-500"
              >
                <FiGlobe /> {otherLocale.toUpperCase()}
              </Link>
            </div>

          </nav>
        </div>
      </header>
    </>
  );
}