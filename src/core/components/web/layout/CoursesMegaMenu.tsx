'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function CoursesMegaMenu({ closeMenu }: { closeMenu?: () => void }) {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const courses = [
    {
      title: isArabic ? 'أساسيات التقنية المالية' : 'Fintech Fundamentals',
      description: isArabic 
        ? 'رحلة شاملة من 11 مرحلة لفهم وبناء أنظمة التقنية المالية' 
        : 'A comprehensive 11-phase journey through financial technology',
      href: '/web/courses/fintech-fundamentals',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'bg-primary-50 text-primary-600',
      badge: isArabic ? 'مميز' : 'Featured',
      phases: 11,
    },
    // Placeholder for future courses
    {
      title: isArabic ? 'قريباً: تصميم واجهات الدفع' : 'Coming Soon: Payment UI Design',
      description: isArabic 
        ? 'تعلم تصميم واجهات مستخدم لتطبيقات الدفع الحديثة' 
        : 'Learn to design user interfaces for modern payment applications',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      color: 'bg-grey-100 text-grey-400',
      badge: isArabic ? 'قريباً' : 'Coming Soon',
      disabled: true,
    },
    {
      title: isArabic ? 'قريباً: الامتثال التنظيمي' : 'Coming Soon: Regulatory Compliance',
      description: isArabic 
        ? 'دليل شامل للوائح والمتطلبات التنظيمية في التقنية المالية' 
        : 'Complete guide to fintech regulations and compliance requirements',
      href: '#',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'bg-grey-100 text-grey-400',
      badge: isArabic ? 'قريباً' : 'Coming Soon',
      disabled: true,
    },
  ];

  return (
    <div className="absolute top-full left-0 w-full bg-white border-t border-grey-100 shadow-xl rounded-b-3xl overflow-hidden animate-slide-down transform origin-top z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Link
              key={index}
              href={course.disabled ? '#' : `/${locale}${course.href}`}
              onClick={course.disabled ? (e) => e.preventDefault() : closeMenu}
              className={`group flex gap-4 p-4 rounded-2xl transition-all duration-300 border ${
                course.disabled 
                  ? 'opacity-60 cursor-not-allowed border-grey-100 bg-grey-50' 
                  : 'hover:bg-grey-50 border-transparent hover:border-grey-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${!course.disabled ? 'group-hover:scale-110' : ''} ${course.color}`}>
                {course.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-bold truncate ${course.disabled ? 'text-grey-500' : 'text-grey-900 group-hover:text-primary'} transition-colors`}>
                    {course.title}
                  </h3>
                  {course.badge && (
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full shrink-0 ${
                      course.disabled 
                        ? 'bg-grey-200 text-grey-600' 
                        : 'bg-accent-100 text-accent-700'
                    }`}>
                      {course.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-grey-500 leading-relaxed font-medium">
                  {course.description}
                </p>
                {course.phases && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-primary-600 font-semibold">
                    <span>📚</span>
                    <span>{course.phases} {isArabic ? 'مراحل' : 'Phases'}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
          
          {/* Call to Action Box */}
          <div className="md:col-span-2 lg:col-span-3 mt-4 pt-6 border-t border-grey-100 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-xl gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shrink-0">
                🎓
              </span>
              <div>
                <p className="font-bold text-grey-900 text-sm">
                  {isArabic ? 'ابدأ رحلة التعلم' : 'Start Your Learning Journey'}
                </p>
                <p className="text-xs text-grey-500">
                  {isArabic ? 'دورات متخصصة في التقنية المالية' : 'Specialized courses in financial technology'}
                </p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Link
                href={`/${locale}/web/courses/fintech-fundamentals`}
                onClick={closeMenu}
                className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-primary-700 transition-all flex-1 md:flex-none text-center"
              >
                {isArabic ? 'ابدأ الآن' : 'Start Now'}
              </Link>
              <Link
                href={`/${locale}/web/contact`}
                onClick={closeMenu}
                className="px-4 py-2 bg-white text-primary-600 text-sm font-bold rounded-lg shadow-sm hover:shadow-md transition-all border border-primary-100 flex-1 md:flex-none text-center"
              >
                {isArabic ? 'استفسار' : 'Inquire'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
