'use client';

import { motion } from 'framer-motion';
import { SkillBadge as SkillBadgeType } from '@/data/skillBadgesData';

interface SkillBadgeProps {
  badge: SkillBadgeType;
  locale: string;
  isEarned?: boolean;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function SkillBadge({
  badge,
  locale,
  isEarned = false,
  showDetails = true,
  size = 'md',
}: SkillBadgeProps) {
  const isArabic = locale === 'ar';
  const name = isArabic ? badge.name.ar : badge.name.en;
  const description = isArabic ? badge.description.ar : badge.description.en;
  const skills = isArabic ? badge.skills.ar : badge.skills.en;

  const sizeClasses = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-20 h-20 text-3xl',
    lg: 'w-24 h-24 text-4xl',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className={`relative group ${!isEarned ? 'grayscale opacity-60' : ''}`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Badge Icon */}
        <div className="relative">
          <div
            className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br ${badge.gradient} flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:shadow-xl ${
              isEarned ? 'group-hover:rotate-6' : ''
            }`}
          >
            <span className="drop-shadow-md">{badge.icon}</span>
          </div>

          {/* Earned checkmark */}
          {isEarned && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {/* Lock icon for unearned */}
          {!isEarned && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-grey-400 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {/* Glow effect for earned */}
          {isEarned && (
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${badge.gradient} blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}
            />
          )}
        </div>

        {/* Badge Info */}
        {showDetails && (
          <div className="mt-4">
            <h4 className="font-bold text-grey-900 text-sm">{name}</h4>
            <p className="text-xs text-grey-500 mt-1 max-w-[120px] line-clamp-2">{description}</p>
          </div>
        )}
      </div>

      {/* Hover tooltip with skills */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
        <div className="bg-grey-900 text-white px-4 py-3 rounded-xl shadow-xl min-w-[180px]">
          <p className="text-xs font-bold mb-2">{isArabic ? 'المهارات المكتسبة:' : 'Skills Earned:'}</p>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-white/10 rounded text-xs">
                {skill}
              </span>
            ))}
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-grey-900" />
        </div>
      </div>
    </motion.div>
  );
}
