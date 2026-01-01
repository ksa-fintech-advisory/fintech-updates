'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { skillBadges, certificates } from '@/data/skillBadgesData';
import SkillBadge from './SkillBadge';

interface BadgesShowcaseProps {
  locale: string;
}

export default function BadgesShowcase({ locale }: BadgesShowcaseProps) {
  const isArabic = locale === 'ar';

  return (
    <section className="py-20 bg-gradient-to-b from-grey-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-accent-100 to-transparent rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-primary-100 to-transparent rounded-full blur-3xl opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 text-accent-700 text-sm font-semibold mb-4">
            <span>🏆</span>
            {isArabic ? 'شارات المهارات والشهادات' : 'Skill Badges & Certificates'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4">
            {isArabic ? 'اكسب شارات إتقان كل مرحلة' : 'Earn Badges for Each Phase'}
          </h2>
          <p className="text-xl text-grey-600 max-w-2xl mx-auto">
            {isArabic
              ? 'أكمل كل مرحلة واحصل على شارات مهارات معترف بها وشهادات قابلة للمشاركة'
              : 'Complete each phase and earn recognized skill badges and shareable certificates'}
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            {skillBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <SkillBadge
                  badge={badge}
                  locale={locale}
                  isEarned={false} // Will be dynamic later
                  size="md"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certificates Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-grey-900 text-center mb-8">
            {isArabic ? 'الشهادات المتاحة' : 'Available Certificates'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert, index) => {
              const levelColors = {
                bronze: 'from-amber-600 to-amber-800',
                silver: 'from-grey-400 to-grey-600',
                gold: 'from-yellow-400 to-yellow-600',
                platinum: 'from-violet-400 to-violet-600',
              };

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-hard transition-all duration-300 border border-grey-100 hover:border-primary-200"
                >
                  {/* Level Badge */}
                  <div
                    className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${levelColors[cert.level]}`}
                  >
                    {cert.level.charAt(0).toUpperCase() + cert.level.slice(1)}
                  </div>

                  {/* Icon */}
                  <div className="text-5xl mb-4">{cert.icon}</div>

                  {/* Name */}
                  <h4 className="text-lg font-bold text-grey-900 mb-2 group-hover:text-primary transition-colors">
                    {isArabic ? cert.name.ar : cert.name.en}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-grey-600 mb-4">
                    {isArabic ? cert.description.ar : cert.description.en}
                  </p>

                  {/* Required Badges */}
                  <div className="flex items-center gap-2 text-xs text-grey-500">
                    <span>🏅</span>
                    <span>
                      {cert.requiredBadges.length} {isArabic ? 'شارات مطلوبة' : 'badges required'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/web/courses/fintech-fundamentals/register`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-200 hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105"
          >
            {isArabic ? 'ابدأ رحلتك واكسب الشارات' : 'Start Your Journey & Earn Badges'}
            <svg
              className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`}
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
