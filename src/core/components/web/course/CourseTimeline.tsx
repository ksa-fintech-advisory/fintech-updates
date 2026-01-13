'use client';

import { motion } from 'framer-motion';
import { phasesData } from '@/data/fintechFundamentalsData';
import { FiLayers, FiTarget, FiMapPin, FiCheckCircle } from 'react-icons/fi';

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
    <section id="phases" className="py-24 bg-zinc-50 dark:bg-black relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">

      {/* 1. Engineering Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Subtle Gradient Spot for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="text-primary-600 dark:text-primary-400 font-mono text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30">
            {isArabic ? 'خارطة الطريق' : 'CURRICULUM_ROADMAP'}
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            {phasesTitle}
          </h2>

          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            {phasesSubtitle}
          </p>

          {/* Stats Toolbar - Clean & Unified */}
          <div className="inline-flex flex-wrap justify-center gap-px bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm">
            <div className="bg-white dark:bg-zinc-900 px-6 py-3 flex items-center gap-3">
              <FiLayers className="text-zinc-400" />
              <div className="flex flex-col text-start">
                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">{isArabic ? 'المحتوى' : 'CONTENT'}</span>
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{phasesData.length} {isArabic ? 'وحدات' : 'Modules'}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 px-6 py-3 flex items-center gap-3">
              <FiTarget className="text-zinc-400" />
              <div className="flex flex-col text-start">
                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">{isArabic ? 'المستوى' : 'LEVEL'}</span>
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{isArabic ? 'شامل' : 'All Levels'}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 px-6 py-3 flex items-center gap-3">
              <FiMapPin className="text-zinc-400" />
              <div className="flex flex-col text-start">
                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">{isArabic ? 'التركيز' : 'FOCUS'}</span>
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{isArabic ? 'السوق السعودي' : 'KSA Market'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Visual Pipeline (Desktop) - Replaces the thick rainbow bar */}
        <div className="hidden lg:block mb-16 px-4">
          <div className="relative max-w-5xl mx-auto">
            {/* The Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2" />

            {/* The Active Line (Animation) */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'circOut' }}
              className="absolute top-1/2 left-0 h-px bg-primary-500 -translate-y-1/2"
            />

            {/* The Nodes */}
            <div className="relative flex justify-between">
              {phasesData.map((phase) => (
                <div key={phase.id} className="relative group">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: phase.id * 0.2 }}
                    className="relative z-10 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-primary-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
                  >
                    {/* Inner Dot */}
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                  </motion.div>

                  {/* Label below node */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest group-hover:text-primary-600 transition-colors">
                      {isArabic ? `مرحلة 0${phase.id}` : `PHASE_0${phase.id}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
}