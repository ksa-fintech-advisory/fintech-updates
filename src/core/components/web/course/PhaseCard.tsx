'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PhaseData } from '@/data/fintechFundamentalsData';

// Define gradient colors as CSS for each phase to avoid Tailwind compilation issues
const phaseGradients: Record<number, { from: string; to: string }> = {
  1: { from: '#10b981', to: '#0d9488' }, // emerald-500 to teal-600
  2: { from: '#f59e0b', to: '#ea580c' }, // amber-500 to orange-600
  3: { from: '#3b82f6', to: '#4f46e5' }, // blue-500 to indigo-600
  4: { from: '#8b5cf6', to: '#9333ea' }, // violet-500 to purple-600
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
  const gradientColors = phaseGradients[phase.id] || { from: '#6366f1', to: '#8b5cf6' };
  const gradientStyle = {
    background: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div
        className={`relative bg-white rounded-3xl p-6 md:p-8 shadow-soft hover:shadow-hard transition-all duration-500 border-2 ${phase.borderColor} hover:border-primary-300 overflow-hidden h-full flex flex-col`}
      >
        {/* Background Gradient on Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          style={gradientStyle}
        />

        {/* Phase Number Badge */}
        <div
          className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10`}
          style={gradientStyle}
        >
          {phase.id}
        </div>

        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl ${phase.bgColor} flex items-center justify-center text-4xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
        >
          {phase.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-grey-900 mb-2 transition-all duration-300">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-grey-500 mb-4 font-medium">{subtitle}</p>

        {/* Description */}
        <p className="text-grey-600 mb-6 leading-relaxed">{description}</p>

        {/* Topics List */}
        <ul className={`flex-1 space-y-2 mb-6 ${isArabic ? 'pr-4' : 'pl-4'}`}>
          {topicsList.map((topic, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-grey-700"
            >
              <span
                className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: gradientColors.from }}
              />
              <span className="text-sm">{topic}</span>
            </li>
          ))}
        </ul>

        {/* View Details Button */}
        <Link
          href={`/${locale}/web/courses/fintech-fundamentals/session/${phase.id}`}
          className="relative z-10 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
          style={gradientStyle}
        >
          <span>{viewDetailsText}</span>
          <span>←</span>
        </Link>

        {/* Decorative Corner */}
        <div
          className={`absolute -bottom-2 ${isArabic ? '-left-2' : '-right-2'} w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
          style={gradientStyle}
        />
      </div>
    </motion.div>
  );
}
