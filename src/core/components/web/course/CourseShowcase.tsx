'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { getAllCourses, type CourseListing } from '@/data/courseData';
import { FiClock, FiBarChart, FiChevronRight, FiChevronLeft, FiLock } from 'react-icons/fi'; // تأكد من تثبيت react-icons

const DifficultyMeter = ({ level }: { level: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className={`h-1.5 w-4 rounded-full ${i <= level ? 'bg-primary-500' : 'bg-grey-200 dark:bg-grey-700'
          }`}
      />
    ))}
  </div>
);

export default function CourseShowcase() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const lang = isArabic ? 'ar' : 'en';
  const courses = getAllCourses();

  return (
    <section className="relative py-24 overflow-hidden bg-grey-50 dark:bg-dark-bg transition-colors duration-300">

      {/* Background Gradients (Atmospheric) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-900/10 dark:bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-900/10 dark:bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header: Clean & Direct */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:flex md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-grey-900 dark:text-white mb-4 tracking-tight">
              {isArabic ? 'الأكاديمية التقنية' : 'Fintech Academy'}
            </h2>
            <p className="text-lg text-grey-600 dark:text-grey-400">
              {isArabic
                ? 'مسارات تعليمية مكثفة مصممة للمهندسين ورواد الأعمال.'
                : 'Intensive learning paths designed for engineers and founders.'}
            </p>
          </div>

          {/* Subtle decoration line */}
          <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent via-grey-300 dark:via-grey-700 to-transparent mx-8 relative top-[-10px]" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course: CourseListing, index: number) => {
            // Mocking difficulty level if not in data (1-3)
            const difficultyLevel = 2;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group h-full"
              >
                <Link
                  href={course.isComingSoon ? '#' : `/${locale}/web/courses/${course.slug}`}
                  className={`block h-full relative ${course.isComingSoon ? 'cursor-not-allowed' : ''}`}
                  onClick={course.isComingSoon ? (e) => e.preventDefault() : undefined}
                >
                  <article className={`
                    h-full flex flex-col relative overflow-hidden rounded-2xl
                    bg-white dark:bg-dark-card
                    border border-grey-200 dark:border-dark-border
                    hover:border-primary-300 dark:hover:border-primary-700
                    hover:shadow-soft dark:hover:shadow-glow-primary
                    transition-all duration-300 ease-out
                    ${course.isComingSoon ? 'opacity-75 grayscale-[0.5]' : ''}
                  `}>

                    {/* Top Section: Gradient & Icon */}
                    <div className="relative p-6 pb-0">
                      <div className="flex justify-between items-start mb-6">
                        {/* Icon Box */}
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg ring-1 ring-white/10"
                          style={{ background: `linear-gradient(135deg, ${course.gradient.from}, ${course.gradient.to})` }}
                        >
                          {course.icon}
                        </div>

                        {/* Status Badge */}
                        {course.isComingSoon ? (
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-grey-100 dark:bg-grey-800 text-grey-500 border border-grey-200 dark:border-grey-700 flex items-center gap-1">
                            <FiLock className="w-3 h-3" />
                            {isArabic ? 'قريباً' : 'LOCKED'}
                          </span>
                        ) : (
                          <DifficultyMeter level={difficultyLevel} />
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-grey-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {course.title[lang]}
                      </h3>

                      <p className="text-sm text-grey-500 dark:text-grey-400 line-clamp-2 min-h-[2.5rem]">
                        {course.description[lang]}
                      </p>
                    </div>

                    {/* Middle Section: Tech Stack Tags */}
                    <div className="px-6 py-4 flex flex-wrap gap-2">
                      {course.topics[lang].slice(0, 3).map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold rounded bg-grey-50 dark:bg-grey-800/50 text-grey-600 dark:text-grey-400 border border-grey-100 dark:border-grey-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="mt-auto h-px bg-grey-100 dark:bg-grey-800 mx-6" />

                    {/* Bottom Section: Metrics & CTA */}
                    <div className="p-6 flex items-center justify-between">
                      {/* Metrics */}
                      <div className="flex items-center gap-4 text-xs font-mono text-grey-500 dark:text-grey-400">
                        <div className="flex items-center gap-1.5">
                          <FiBarChart className="w-3.5 h-3.5" />
                          <span>{course.modules} {isArabic ? 'وحدات' : 'Mods'}</span>
                        </div>
                        {/* Mocking duration if not present */}
                        <div className="flex items-center gap-1.5">
                          <FiClock className="w-3.5 h-3.5" />
                          <span>8h 30m</span>
                        </div>
                      </div>

                      {/* Price / CTA */}
                      <div className="flex items-center gap-3">
                        {!course.isComingSoon && course.price && (
                          <span className="font-mono font-bold text-grey-900 dark:text-white">
                            {course.price} <span className="text-xs text-grey-500">{course.currency[lang]}</span>
                          </span>
                        )}

                        <div className={`
                           w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                           ${course.isComingSoon
                            ? 'bg-grey-100 dark:bg-grey-800 text-grey-400'
                            : 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-500 group-hover:text-white'}
                         `}>
                          {isArabic ? <FiChevronLeft /> : <FiChevronRight />}
                        </div>
                      </div>
                    </div>

                    {/* Decorative Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}