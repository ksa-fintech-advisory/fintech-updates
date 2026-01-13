'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { getFeaturedCourses } from '@/data/courseData';
import { FiCpu, FiTerminal, FiArrowRight, FiArrowLeft, FiCheck, FiHash } from 'react-icons/fi';

export default function FeaturedCourses() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  const featuredCourses = getFeaturedCourses();
  const featuredCourse = featuredCourses[0];

  if (!featuredCourse) {
    return null;
  }

  // Use the course gradient for subtle accents instead of full background
  const accentColor = featuredCourse.gradient.from;

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">

      {/* 1. Engineering Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header: Technical Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-start"
        >
          <span className="text-primary-600 dark:text-primary-400 font-mono text-xs font-bold uppercase tracking-widest mb-3 block">
            {isArabic ? '// الدورة_المميزة' : '// FEATURED_COURSE'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {isArabic ? 'المسار الموصى به' : 'Recommended Path'}
          </h2>
        </motion.div>

        {/* The "Spec Unit" Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Main Container */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col lg:flex-row">

            {/* Left Side: Content & Context */}
            <div className="lg:w-3/5 p-8 md:p-12 flex flex-col relative z-10">

              {/* Badge: System Chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-fit mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                  {featuredCourse.badge[lang]}
                </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight leading-tight">
                {featuredCourse.title[lang]}
              </h3>

              <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium mb-6">
                {featuredCourse.subtitle[lang]}
              </p>

              <p className="text-zinc-600 dark:text-zinc-500 leading-relaxed mb-10 max-w-xl">
                {featuredCourse.description[lang]}
              </p>

              {/* Data Grid: Price & Modules */}
              <div className="grid grid-cols-2 gap-6 mb-10 p-6 bg-zinc-50 dark:bg-black/20 rounded-lg border border-zinc-100 dark:border-zinc-800/50">
                <div>
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    {isArabic ? 'عدد الوحدات' : 'MODULES'}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white font-mono flex items-baseline gap-1">
                    {featuredCourse.modules}
                    <span className="text-sm font-normal text-zinc-500">.00</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    {isArabic ? 'الاستثمار' : 'INVESTMENT'}
                  </div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 font-mono flex items-baseline gap-1">
                    {featuredCourse.price}
                    <span className="text-sm font-normal text-zinc-500">{featuredCourse.currency[lang]}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/web/courses/${featuredCourse.slug}/register`}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 shadow-lg shadow-zinc-500/10"
                >
                  {isArabic ? 'حجز مقعد' : 'Start Learning'}
                  {isArabic ? <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> : <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
                </Link>

                <Link
                  href={`/${locale}/web/courses/${featuredCourse.slug}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-medium hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
                >
                  <FiTerminal className="w-5 h-5" />
                  {isArabic ? 'تفاصيل المنهج' : 'View Syllabus'}
                </Link>
              </div>
            </div>

            {/* Right Side: Visual Spec Sheet */}
            <div className="lg:w-2/5 bg-zinc-50 dark:bg-zinc-950/50 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">

              {/* Background accent glow */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none"
                style={{ backgroundColor: accentColor }}
              />

              {/* Icon Container */}
              <div className="relative z-10 w-24 h-24 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center text-5xl mb-10 mx-auto lg:mx-0">
                {/* Render icon with accent color */}
                <div style={{ color: accentColor }}>
                  {featuredCourse.icon}
                </div>
              </div>

              {/* Topics List: "Code Stack" Look */}
              <div className="relative z-10">
                <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  {isArabic ? 'التقنيات المستخدمة' : 'TECH_STACK'}
                </div>

                <div className="flex flex-col gap-3">
                  {featuredCourse.topics[lang].slice(0, 5).map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 font-mono"
                    >
                      <FiCheck className="w-4 h-4 text-emerald-500" />
                      <span>{topic}</span>
                    </div>
                  ))}
                  {featuredCourse.topics[lang].length > 5 && (
                    <div className="flex items-center gap-3 text-sm text-zinc-400 font-mono pl-7">
                      <span>+ {featuredCourse.topics[lang].length - 5} more libraries...</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Link */}
          <div className="mt-8 text-center lg:text-start">
            <Link
              href={`/${locale}/web/courses`}
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors border-b border-transparent hover:border-zinc-500 pb-0.5"
            >
              {isArabic ? 'تصفح الأرشيف الكامل' : 'Browse full curriculum'}
              {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}