'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { getFeaturedCourses, type CourseListing } from '@/data/courseData';

export default function FeaturedCourses() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  // Get featured course from data source
  const featuredCourses = getFeaturedCourses();
  const featuredCourse = featuredCourses[0]; // Get the first featured course

  if (!featuredCourse) {
    return null; // No featured course available
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-50 to-transparent rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent-50 to-transparent rounded-full blur-3xl opacity-60" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-4">
            <span>🎓</span>
            {isArabic ? 'تعلم معنا' : 'Learn With Us'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4">
            {isArabic ? 'دوراتنا التعليمية' : 'Our Courses'}
          </h2>
          <p className="text-xl text-grey-600 max-w-2xl mx-auto">
            {isArabic
              ? 'برامج تعليمية متخصصة لبناء خبراء التقنية المالية'
              : 'Specialized programs to build fintech experts'}
          </p>
        </motion.div>

        {/* Featured Course Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-grey-900 via-grey-800 to-grey-900 rounded-[2rem] overflow-hidden shadow-2xl">
            {/* Background Gradient Orbs */}
            <div
              className={`absolute top-0 ${isArabic ? 'left-0' : 'right-0'} w-[400px] h-[400px] rounded-full blur-[100px] opacity-30`}
              style={{ background: `linear-gradient(135deg, ${featuredCourse.gradient.from}, ${featuredCourse.gradient.to})` }}
            />
            <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-accent-500 rounded-full blur-[80px] opacity-20" />

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Text Content */}
                <div className={`${isArabic ? 'lg:order-2' : ''}`}>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 text-accent-300 text-sm font-semibold mb-6">
                    <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                    {featuredCourse.badge[lang]}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {featuredCourse.title[lang]}
                  </h3>
                  <p className="text-xl text-white/80 font-light mb-4">
                    {featuredCourse.subtitle[lang]}
                  </p>
                  <p className="text-white/60 leading-relaxed mb-8">
                    {featuredCourse.description[lang]}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{featuredCourse.modules}</div>
                      <div className="text-sm text-white/60">{isArabic ? 'وحدات' : 'Modules'}</div>
                    </div>
                    <div className="w-px bg-white/20" />
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent-400">
                        {featuredCourse.price} <span className="text-xl">{featuredCourse.currency[lang]}</span>
                      </div>
                      <div className="text-sm text-white/60">{isArabic ? 'السعر' : 'Price'}</div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/${locale}/web/courses/${featuredCourse.slug}/register`}
                      className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/30 transition-all duration-300 transform hover:scale-105"
                    >
                      {isArabic ? 'سجل الآن' : 'Register Now'}
                      <svg
                        className={`w-5 h-5 transition-transform ${isArabic ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <Link
                      href={`/${locale}/web/courses/${featuredCourse.slug}`}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-300"
                    >
                      {isArabic ? 'عرض التفاصيل' : 'View Details'}
                    </Link>
                  </div>
                </div>

                {/* Visual Side */}
                <div className={`${isArabic ? 'lg:order-1' : ''}`}>
                  {/* Phase Preview Cards */}
                  <div className="relative">
                    {/* Main Icon */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-32 h-32 mx-auto rounded-3xl flex items-center justify-center text-6xl text-white shadow-2xl mb-8"
                      style={{
                        background: `linear-gradient(135deg, ${featuredCourse.gradient.from}, ${featuredCourse.gradient.to})`,
                        boxShadow: `0 25px 50px -12px ${featuredCourse.gradient.from}66`
                      }}
                    >
                      {featuredCourse.icon}
                    </motion.div>

                    {/* Topic Pills */}
                    <div className="flex flex-wrap justify-center gap-3">
                      {featuredCourse.topics[lang].map((topic, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-white/80 font-medium backdrop-blur-sm"
                        >
                          {topic}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* View All Courses Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/web/courses`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors group"
          >
            {isArabic ? 'عرض جميع الدورات' : 'View All Courses'}
            <svg
              className={`w-5 h-5 transition-transform ${isArabic ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
