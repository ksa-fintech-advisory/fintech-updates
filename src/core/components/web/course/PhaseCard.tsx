'use client';

import { motion } from 'framer-motion';
import { PhaseData, getDifficultyLabel } from '@/data/fintechFundamentalsData';

interface PhaseCardProps {
  phase: PhaseData;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  index: number;
  isArabic: boolean;
}

export default function PhaseCard({
  phase,
  title,
  subtitle,
  description,
  topics,
  index,
  isArabic,
}: PhaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div
        className={`relative bg-white rounded-3xl p-6 md:p-8 shadow-soft hover:shadow-hard transition-all duration-500 border-2 ${phase.borderColor} hover:border-primary-300 overflow-hidden h-full`}
      >
        {/* Background Gradient on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Phase Number Badge */}
        <div
          className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'} w-10 h-10 rounded-full bg-gradient-to-br ${phase.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
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
        <h3
          className={`text-xl md:text-2xl font-bold text-grey-900 mb-2 bg-gradient-to-r ${phase.gradient} bg-clip-text group-hover:text-transparent transition-all duration-300`}
        >
          {title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-grey-500 mb-4 font-medium">{subtitle}</p>

        {/* Description */}
        <p className="text-grey-600 mb-6 leading-relaxed">{description}</p>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-6">
          {topics.map((topic, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 text-xs font-medium rounded-full ${phase.bgColor} text-grey-700 border ${phase.borderColor}`}
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-grey-100">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              phase.difficulty === 'beginner'
                ? 'bg-green-100 text-green-700'
                : phase.difficulty === 'intermediate'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {getDifficultyLabel(phase.difficulty, isArabic)}
          </span>
          <span className="text-sm text-grey-500">
            {phase.estimatedHours} {isArabic ? 'ساعات' : 'hours'}
          </span>
        </div>

        {/* Decorative Corner */}
        <div
          className={`absolute -bottom-2 ${isArabic ? '-left-2' : '-right-2'} w-24 h-24 bg-gradient-to-br ${phase.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        />
      </div>
    </motion.div>
  );
}
