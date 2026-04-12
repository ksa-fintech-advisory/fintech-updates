'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import ProductsMegaMenu from './ProductsMegaMenu';
import CoursesMegaMenu from './CoursesMegaMenu';
import { getAllCourses } from '@/data/courseData';
import { ProfileAvatar } from '@/core/components/web/layout/ProfileAvatar';
import { FiChevronDown, FiMenu, FiX, FiGlobe, FiArrowRight } from 'react-icons/fi';

export default function Header() {
  const t = useTranslations();
  const th = useTranslations('common.header');
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

  const navItems:any = [
    { href: '', label: t('common.nav.home'), key: 'home' },
    { href: '/roadmap', label: t('common.nav.roadmap'), key: 'roadmap' },
    // { href: '/products', label: t("common.nav.products"), key: 'products', hasMegaMenu: true },
    // { href: '/courses', label: t('common.nav.courses'), key: 'courses', hasMegaMenu: true },
    // { href: '/updates', label: t('common.nav.updates'), key: 'updates' },
    { href: '/blog', label: t('common.nav.blog'), key: 'blog' },
    { href: '/about', label: t('common.nav.about'), key: 'about', isSpecial: true },
    { href: '/contact', label: t('common.nav.contact'), key: 'contact' },
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
    if (href === '') {
      return currentPath === '' || currentPath === '/';
    }
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Engineering Header: 
        - Sticky
        - Blurry (Glassmorphism)
        - High Contrast Borders 
      */}
      <header
        className={`glass-nav-header sticky top-0 w-full border-b pt-[max(0px,env(safe-area-inset-top))] md:z-50 ${mobileMenuOpen ? 'z-[70]' : 'z-50'}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[4.5rem] items-center justify-between py-1 sm:py-0">

            {/* --- Logo Section: Technical Brand --- */}
            <Link href={`/${locale}`} className="group flex items-center gap-3 outline-none">
              <ProfileAvatar
                size={40}
                alt={th('avatarAlt')}
                fallbackText={th('displayName')}
                variant="circle"
                className="shadow-sm transition-transform duration-200 group-hover:scale-105"
                priority
                authorNameFont
              />
              <div className="flex min-w-0 flex-col gap-1.5 sm:gap-2">
                <span className="truncate text-lg font-bold leading-snug tracking-tight text-grey-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  {isArabic ? 'مال تك' : 'Maal Tech'}
                </span>
                <span className="max-w-[10rem] truncate text-[12px]  uppercase leading-relaxed tracking-widest text-grey-500 sm:max-w-none">
                  {th('tagline')}
                </span>
              </div>
            </Link>

            {/* --- Desktop Navigation: The "Toolbar" --- */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item:any) => {
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
                        relative px-3 py-1.5 rounded-button text-sm font-medium transition-all duration-200 flex items-center gap-1.5 outline-none
                        ${active || isMegaMenuOpen
                          ? 'text-grey-900 dark:text-white bg-grey-100 dark:bg-grey-800'
                          : item.isSpecial
                            ? 'text-primary-700 dark:text-primary-300 bg-primary-50/50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-900/40 ring-1 ring-primary-500/20 shadow-sm'
                            : 'text-grey-500 dark:text-grey-400 hover:text-grey-900 dark:hover:text-white hover:bg-grey-50 dark:hover:bg-grey-900'
                        }
                      `}
                    >
                      {item.isSpecial && !active && (
                        <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        </span>
                      )}
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

            {/* --- Right: language + mobile menu (region picker hidden) --- */}
            <div className="flex shrink-0 items-center gap-2 md:ml-2 md:gap-3 md:pl-4 md:border-l md:border-grey-200 md:dark:border-grey-800">
              <Link
                href={`/${otherLocale}${currentPath}`}
                className="hidden md:inline-flex items-center gap-2 rounded-button border border-grey-200 bg-grey-100 px-3 py-1.5 text-xs  font-bold text-grey-600 transition-all hover:border-grey-400 dark:border-grey-800 dark:bg-grey-900 dark:text-grey-400 dark:hover:border-grey-600"
                aria-label="Switch Language"
              >
                <FiGlobe className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>{otherLocale.toUpperCase()}</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden rounded-button p-2 text-grey-600 transition-colors hover:bg-grey-100 dark:text-grey-400 dark:hover:bg-grey-800"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
      </header>

      {/* Mobile: panel below header (common mobile-web pattern — aligns with menu tap) */}
      {mobileMenuOpen ? (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={isArabic ? 'القائمة' : 'Menu'}
        >
          <button
            type="button"
            className="glass-nav-backdrop absolute inset-0 animate-mobile-nav-backdrop motion-reduce:animate-none motion-reduce:opacity-100"
            aria-label={isArabic ? 'إغلاق القائمة' : 'Close menu'}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="glass-nav-panel absolute inset-x-0 bottom-0 top-[calc(4.5rem+max(0px,env(safe-area-inset-top)))] flex min-h-0 flex-col overflow-hidden border-t animate-mobile-nav-panel motion-reduce:animate-none"
          >
            <nav
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]"
              aria-label={isArabic ? 'التنقل الرئيسي' : 'Primary navigation'}
            >
                <div className="glass-nav-inset space-y-2 rounded-2xl p-1.5">
                  {navItems.map((item: any) => (
                    <div key={item.key}>
                      {item.hasMegaMenu ? (
                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => setHoveredItem(hoveredItem === item.key ? null : item.key)}
                            className={`
                              flex min-h-[44px] w-full items-center justify-between rounded-xl px-3 py-2.5 text-start text-base font-semibold transition-colors
                              ${hoveredItem === item.key ? 'glass-nav-row-active text-grey-900 dark:text-white' : 'text-grey-700 dark:text-grey-300'}
                            `}
                          >
                            {item.label}
                            <FiChevronDown
                              className={`h-5 w-5 shrink-0 text-grey-400 transition-transform duration-200 ${hoveredItem === item.key ? 'rotate-180' : ''}`}
                              aria-hidden
                            />
                          </button>
                          <div
                            className={`${hoveredItem === item.key ? 'block' : 'hidden'} space-y-1 border-t border-grey-200/80 pt-2 dark:border-grey-700/80`}
                          >
                            {item.key === 'products' && (
                              <>
                                <Link
                                  href={`/${locale}/products/compliance-checker`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="glass-nav-link flex min-h-[44px] items-center rounded-xl px-3 py-2 text-sm text-grey-700 dark:text-grey-300"
                                >
                                  {isArabic ? 'فاحص الامتثال' : 'Compliance Checker'}
                                </Link>
                                <Link
                                  href={`/${locale}/products/fee-calculator`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="glass-nav-link flex min-h-[44px] items-center rounded-xl px-3 py-2 text-sm text-grey-700 dark:text-grey-300"
                                >
                                  {isArabic ? 'حاسبة الرسوم' : 'Fee Calculator'}
                                </Link>
                              </>
                            )}
                            {item.key === 'courses' &&
                              courses.slice(0, 3).map((course) => (
                                <Link
                                  key={course.id}
                                  href={`/${locale}/courses/${course.slug}`}
                                  className="glass-nav-link block rounded-xl px-3 py-2.5"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <div className="text-sm font-semibold text-grey-900 dark:text-grey-100">{course.title[lang]}</div>
                                  <div className="mt-0.5  text-xs text-grey-500">{course.modules} Modules</div>
                                </Link>
                              ))}
                            <Link
                              href={`/${locale}${item.href}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex min-h-[44px] items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wide text-primary-600 dark:text-primary-400"
                            >
                              {t('common.viewAll')} <FiArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={`/${locale}${item.href}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`glass-nav-link flex min-h-[44px] items-center rounded-xl px-3 py-2.5 text-base font-medium transition-colors ${
                            isActive(item.href)
                              ? 'glass-nav-row-active font-semibold text-grey-900 dark:text-white'
                              : item.isSpecial
                                ? 'text-primary-700 dark:text-primary-300 bg-primary-50/50 dark:bg-primary-500/10 ring-1 ring-primary-500/20'
                                : 'text-grey-700 dark:text-grey-300'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {item.isSpecial && !isActive(item.href) && (
                              <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                              </span>
                            )}
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/${otherLocale}${currentPath}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="glass-nav-inset mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-grey-800 dark:text-grey-200"
                >
                  <FiGlobe className="h-5 w-5 shrink-0 text-grey-500" aria-hidden />
                <span className="">{otherLocale.toUpperCase()}</span>
                  <span className="text-grey-500">{isArabic ? 'تبديل اللغة' : 'Language'}</span>
                </Link>
              </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}