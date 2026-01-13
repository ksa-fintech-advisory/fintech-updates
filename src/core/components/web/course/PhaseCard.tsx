'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PhaseData } from '@/data/fintechFundamentalsData';
import { FiArrowRight, FiArrowLeft, FiHash, FiCode } from 'react-icons/fi';

// Define subtle accent colors instead of heavy gradients
const phaseColors: Record<number, string> = {
  1: '#10b981', // Emerald
  2: '#f59e0b', // Amber
  3: '#3b82f6', // Blue
  4: '#8b5cf6', // Violet
};

interface PhaseCardProps {
  phase: PhaseData;
  title: string;
  subtitle: string;
  description: string;
  topicsList: string[];
  viewDetailsText: string;
  index: number;
  isArabic: boolean;
  locale: string;
}

export default function PhaseCard({
  phase,
  title,
  subtitle,
  description,
  topicsList,
  viewDetailsText,
  index,
  isArabic,
  locale,
}: PhaseCardProps) {
  // Use specific color or fallback to primary
  const accentColor = phaseColors[phase.id] || '#6366f1';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Link
        href={`/${locale}/web/courses/fintech-fundamentals/session/${phase.id}`}
        className="block h-full outline-none group"
      >
        <article className="relative flex flex-col h-full bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/50">

          {/* Top Colored Line (Technical Indicator) */}
          <div
            className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
            style={{ backgroundColor: accentColor }}
          />

          <div className="p-6 md:p-8 flex flex-col h-full">

            {/* Header: Number & Icon */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold tracking-widest text-zinc-400 uppercase mb-1">
                  {isArabic ? `// المرحلة_0${phase.id}` : `// PHASE_0${phase.id}`}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {title}
                </h3>
              </div>

              {/* Icon Container - Clean & Monochrome until hover */}
              <div
                className="w-12 h-12 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 grayscale group-hover:grayscale-0"
                style={{ color: accentColor }} // Apply color to text only on hover effect usually, but here keeping it subtle
              >
                {/* Assuming phase.icon is an emoji/string. If it's a component, this renders fine. */}
                <span className="group-hover:drop-shadow-md">{phase.icon}</span>
              </div>
            </div>

            {/* Subtitle */}
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 w-fit">
              <FiCode className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{subtitle}</span>
            </div>

            {/* Description */}
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-6">
              {description}
            </p>

            {/* Topics List - Technical Style */}
            <div className="flex-1">
              <span className="block text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4 font-mono">
                {isArabic ? 'المفاهيم الأساسية:' : 'Key Concepts:'}
              </span>
              <ul className="space-y-2.5">
                {topicsList.slice(0, 4).map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-3 group/item">
                    <div
                      className="mt-1.5 w-1.5 h-1.5 rounded-sm flex-shrink-0 transition-colors duration-300 group-hover:bg-current"
                      style={{ backgroundColor: `${accentColor}80` }} // 50% opacity default
                    />
                    <span className="text-sm text-zinc-600 dark:text-zinc-300 group-hover/item:text-zinc-900 dark:group-hover/item:text-white transition-colors">
                      {topic}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Action */}
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span
                className="text-sm font-semibold transition-colors duration-300 flex items-center gap-2"
                style={{ color: accentColor }}
              >
                {viewDetailsText}
              </span>

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white`}
              >
                {isArabic ? (
                  <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </div>
            </div>

          </div>

          {/* Hover Glow Background - Extremely subtle */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] dark:group-hover:opacity-[0.05] pointer-events-none transition-opacity duration-500"
            style={{ backgroundColor: accentColor }}
          />
        </article>
      </Link>
    </motion.div>
  );
}