'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { StaggerContainer, StaggerItem } from '../home/HomeAnimations';
import { getAllCourses } from '@/data/courseData';

// --- Icons (Styled for Light Theme) ---
const TechIcon = ({ type, className }: { type: string; className?: string }) => {
  // Code/Dev Icon
  if (type === '📚') return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
  // Compliance/Shield Icon
  if (type === '⚖️') return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
  // Lab/Experimental Icon
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
};

// Define the shape of your course data
interface CourseProps {
  id: string;
  title: { [key: string]: string };
  slug: string;
  description: { [key: string]: string };
  isComingSoon: boolean;
  icon: string;
  modules: number;
}

interface CoursesMegaMenuProps {
  closeMenu?: () => void;
  courses: any[]
}

export default function CoursesMegaMenu({ closeMenu }: CoursesMegaMenuProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  const courses = getAllCourses()

  return (
    <div
      className="absolute top-full left-0 w-full border-t border-gray-100 shadow-xl z-50 bg-white/95 backdrop-blur-md"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6 py-8">

        {/* Header Label - Clean Corporate Style */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-4 w-1 bg-blue-600 rounded-full"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {isArabic ? 'المسارات التعليمية' : 'Academy Pathways'}
          </span>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <StaggerItem key={course.id} className="h-full">
              <Link
                href={course.isComingSoon ? '#' : `/${locale}/web/courses/${course.slug}`}
                onClick={course.isComingSoon ? (e) => e.preventDefault() : closeMenu}
                className={`group relative p-4 rounded-xl border transition-all duration-200 flex gap-4 h-full ${course.isComingSoon
                  ? 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-70' // Disabled Look
                  : 'border-white bg-white hover:border-blue-100 hover:bg-blue-50/30 hover:shadow-md' // Active Look
                  }`}
              >
                {/* Icon Box */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${course.isComingSoon
                    ? 'bg-gray-100 border-gray-200 text-gray-400'
                    : 'bg-blue-50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                    }`}
                >
                  <TechIcon type={course.icon} className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-bold text-sm truncate ${course.isComingSoon ? 'text-gray-500' : 'text-gray-900 group-hover:text-blue-700'
                      }`}>
                      {course.title[lang]}
                    </h3>

                    {/* Badge */}
                    {course.isComingSoon ? (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-gray-200 text-gray-600 rounded-full border border-gray-300">
                        {isArabic ? 'قريباً' : 'SOON'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                        DEV
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
                    {course.description[lang]}
                  </p>

                  {/* Metadata Footer */}
                  {!course.isComingSoon && (
                    <div className="flex items-center gap-4 border-t border-gray-100 pt-3 mt-auto">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>{course.modules} {isArabic ? 'وحدات' : 'MODULES'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>4H 20M</span>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All Courses Link */}
        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-end">
          <Link
            href={`/${locale}/web/courses`}
            onClick={closeMenu}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="font-bold text-sm">
              {isArabic ? 'عرض جميع الدورات' : 'View All Courses'}
            </span>
            <svg className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}