'use client';

import { motion } from 'framer-motion';
import { phasesData } from '@/data/fintechFundamentalsData';

interface CourseTimelineProps {
  locale: string;
  phasesTitle: string;
  phasesSubtitle: string;
  children: React.ReactNode;
}

export default function CourseTimeline({
  locale,
  phasesTitle,
  phasesSubtitle,
  children,
}: CourseTimelineProps) {
  const isArabic = locale === 'ar';

  return (
    <section id="phases" className="py-24 bg-grey-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-100 to-transparent rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent-100 to-transparent rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4">
            {phasesTitle}
          </h2>
          <p className="text-xl text-grey-600 mb-6">{phasesSubtitle}</p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-accent-400 to-primary-400 mx-auto rounded-full mb-8" />
          
          {/* Stats Bar */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-grey-600">
              <span className="text-2xl">📚</span>
              <span className="font-semibold">{phasesData.length}</span>
              <span>{isArabic ? 'وحدات' : 'Modules'}</span>
            </div>
            <div className="flex items-center gap-2 text-grey-600">
              <span className="text-2xl">🎯</span>
              <span>{isArabic ? 'مناسب لجميع المستويات' : 'For All Levels'}</span>
            </div>
            <div className="flex items-center gap-2 text-grey-600">
              <span className="text-2xl">🇸🇦</span>
              <span>{isArabic ? 'مخصص للسوق السعودي' : 'Saudi Market Focused'}</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline Progress Bar (Desktop) */}
        <div className="hidden lg:block mb-12">
          <div className="relative max-w-5xl mx-auto">
            <div className="h-2 bg-grey-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"
              />
            </div>
            <div className="flex justify-between mt-2">
              {phasesData.map((phase) => (
                <motion.div
                  key={phase.id}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: phase.id * 0.1 }}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${phase.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg`}
                >
                  {phase.id}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Phase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {children}
        </div>
      </div>
    </section>
  );
}
