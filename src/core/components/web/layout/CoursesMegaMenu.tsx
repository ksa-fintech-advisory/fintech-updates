'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { StaggerContainer, StaggerItem } from '../home/HomeAnimations';
import { getAllCourses } from '@/data/courseData';
import {
  FiCode,
  FiShield,
  FiCpu,
  FiClock,
  FiLayers,
  FiArrowRight,
  FiArrowLeft,
  FiLock,
  FiTerminal
} from 'react-icons/fi';

// --- Helper: Icon Mapper ---
const CourseIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case '📚': return <FiCode className={className} />;
    case '⚖️': return <FiShield className={className} />;
    case '🔬': return <FiCpu className={className} />;
    default: return <FiTerminal className={className} />;
  }
};

interface CoursesMegaMenuProps {
  closeMenu?: () => void;
  courses: any[]
}

export default function CoursesMegaMenu({ closeMenu }: CoursesMegaMenuProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  const courses = getAllCourses();

  return (
    <div
      className="absolute top-full left-0 w-full z-50 border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Label */}
        <div className="flex items-center justify-between mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <FiTerminal />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                {isArabic ? 'الأكاديمية التقنية' : 'TECH_ACADEMY_HUB'}
              </h2>
              <p className="text-[10px] text-zinc-500 font-mono">
                {isArabic ? 'اختر مسارك التعليمي' : 'SELECT_LEARNING_PATH'}
              </p>
            </div>
          </div>
          <Link
            href={`/${locale}/web/courses`}
            onClick={closeMenu}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            {isArabic ? 'تصفح الكل' : 'View All'}
            {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
          </Link>
        </div>

        {/* Courses Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {courses.map((course) => (
            <StaggerItem key={course.id} className="h-full">
              <Link
                href={course.isComingSoon ? '#' : `/${locale}/web/courses/${course.slug}`}
                onClick={course.isComingSoon ? (e) => e.preventDefault() : closeMenu}
                className={`
                  group relative flex flex-col p-5 h-full rounded-2xl border transition-all duration-300
                  ${course.isComingSoon
                    ? 'border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 cursor-not-allowed opacity-80'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1'
                  }
                `}
              >
                {/* Coming Soon Overlay Pattern */}
                {course.isComingSoon && (
                  <div className="absolute inset-0 bg-[url('/patterns/diagonal-lines.png')] opacity-5 pointer-events-none"></div>
                )}

                <div className="flex justify-between items-start mb-4">
                  {/* Icon */}
                  <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-colors border
                      ${course.isComingSoon
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-200 dark:border-zinc-700'
                      : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600'
                    }
                   `}>
                    {course.isComingSoon ? <FiLock /> : <CourseIcon type={course.icon} />}
                  </div>

                  {/* Badges */}
                  {course.isComingSoon ? (
                    <span className="px-2 py-1 text-[10px] font-mono font-bold uppercase bg-zinc-200 dark:bg-zinc-800 text-zinc-500 rounded border border-zinc-300 dark:border-zinc-700">
                      {isArabic ? 'قريباً' : 'LOCKED'}
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-[10px] font-mono font-bold uppercase bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded border border-emerald-200 dark:border-emerald-800">
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={`font-bold text-base mb-2 transition-colors ${course.isComingSoon ? 'text-zinc-500' : 'text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                    }`}>
                    {course.title[lang]}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {course.description[lang]}
                  </p>
                </div>

                {/* Footer Metadata */}
                {!course.isComingSoon && (
                  <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-zinc-400">
                      <FiLayers />
                      <span>{course.modules} {isArabic ? 'وحدات' : 'MODS'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-zinc-400">
                      <FiClock />
                      <span>4h 20m</span>
                    </div>
                  </div>
                )}
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA Bar */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {isArabic ? 'النظام يعمل: جميع الدورات محدثة' : 'System Online: All courses updated for 2025'}
          </div>

          <Link
            href={`/${locale}/web/courses`}
            onClick={closeMenu}
            className="group px-6 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-blue-600 dark:hover:bg-blue-100 transition-all flex items-center gap-2"
          >
            {isArabic ? 'استعراض الكتالوج الكامل' : 'Browse Full Catalog'}
            {isArabic ? <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> : <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
          </Link>
        </div>

      </div>
    </div>
  );
}