'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { getAllCourses, type CourseListing } from '@/data/courseData';

export default function CourseShowcase() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const lang = isArabic ? 'ar' : 'en';

  // Get courses from data source
  const courses = getAllCourses();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-50 to-transparent rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-accent-50 to-transparent rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4">
            {isArabic ? 'دوراتنا التدريبية' : 'Our Courses'}
          </h2>
          <p className="text-xl text-grey-600 max-w-2xl mx-auto">
            {isArabic
              ? 'برامج تعليمية شاملة مصممة لبناء خبراء التقنية المالية'
              : 'Comprehensive educational programs designed to build fintech experts'}
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-accent-400 to-primary-400 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {courses.map((course: CourseListing, index: number) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link
                href={course.isComingSoon ? '#' : `/${locale}/web/courses/${course.slug}`}
                className={`block h-full ${course.isComingSoon ? 'cursor-not-allowed' : ''}`}
                onClick={course.isComingSoon ? (e) => e.preventDefault() : undefined}
              >
                <div
                  className={`relative bg-white rounded-3xl p-8 shadow-soft hover:shadow-hard transition-all duration-500 border-2 border-grey-100 hover:border-primary-200 h-full flex flex-col ${
                    course.isComingSoon ? 'opacity-70' : ''
                  }`}
                >
                  {/* Badge */}
                  <div
                    className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} px-3 py-1 rounded-full text-xs font-bold ${
                      course.isComingSoon
                        ? 'bg-grey-200 text-grey-600'
                        : 'bg-gradient-to-r from-accent-500 to-accent-600 text-white'
                    }`}
                  >
                    {course.badge[lang]}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-white mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${course.gradient.from}, ${course.gradient.to})` }}
                  >
                    {course.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-grey-900 mb-3 group-hover:text-primary transition-colors">
                    {course.title[lang]}
                  </h3>

                  {/* Description */}
                  <p className="text-grey-600 mb-6 flex-grow">{course.description[lang]}</p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-grey-50 rounded-lg text-sm">
                      <span>📚</span>
                      <span className="font-semibold text-grey-700">{course.modules}</span>
                      <span className="text-grey-500">{isArabic ? 'وحدات' : 'Modules'}</span>
                    </div>
                    {course.price && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-50 rounded-lg text-sm">
                        <span className="font-bold text-accent-700">{course.price} {course.currency[lang]}</span>
                      </div>
                    )}
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.topics[lang].map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className={`flex items-center gap-2 font-semibold ${
                      course.isComingSoon ? 'text-grey-400' : 'text-primary-600 group-hover:text-primary-700'
                    }`}
                  >
                    {course.isComingSoon ? (
                      <>
                        <span>{isArabic ? 'قريباً' : 'Coming Soon'}</span>
                        <span>🔔</span>
                      </>
                    ) : (
                      <>
                        <span>{isArabic ? 'عرض الدورة' : 'View Course'}</span>
                        <svg
                          className={`w-5 h-5 transition-transform ${isArabic ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
