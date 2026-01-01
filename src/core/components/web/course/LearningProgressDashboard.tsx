'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { skillBadges } from '@/data/skillBadgesData';
import SkillBadge from './SkillBadge';

interface LearningProgressDashboardProps {
  locale: string;
  // In a real app, these would come from user data
  completedPhases?: number[];
  currentPhase?: number;
  totalHoursCompleted?: number;
  currentStreak?: number;
  enrollmentDate?: Date;
}

export default function LearningProgressDashboard({
  locale,
  completedPhases = [],
  currentPhase = 1,
  totalHoursCompleted = 0,
  currentStreak = 0,
  enrollmentDate = new Date(),
}: LearningProgressDashboardProps) {
  const isArabic = locale === 'ar';
  const totalPhases = 11;
  const totalHours = 60;
  const progressPercentage = (completedPhases.length / totalPhases) * 100;
  const hoursPercentage = (totalHoursCompleted / totalHours) * 100;
  const earnedBadges = completedPhases.map((p) => skillBadges.find((b) => b.phaseId === p)).filter(Boolean);

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 px-8 py-10 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-10" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
              📊
            </div>
            <div>
              <h2 className="text-2xl font-bold">{isArabic ? 'لوحة تقدم التعلم' : 'Learning Progress'}</h2>
              <p className="text-white/80 text-sm">
                {isArabic ? 'أساسيات التقنية المالية' : 'Fintech Fundamentals'}
              </p>
            </div>
          </div>

          {/* Main Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white/80">
                {isArabic ? 'التقدم الكلي' : 'Overall Progress'}
              </span>
              <span className="text-lg font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-white rounded-full"
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-white/70">
              <span>
                {completedPhases.length} / {totalPhases} {isArabic ? 'مراحل مكتملة' : 'phases completed'}
              </span>
              <span>
                {totalHoursCompleted} / {totalHours} {isArabic ? 'ساعات' : 'hours'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-8 py-6 border-b border-grey-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            icon="📚"
            value={completedPhases.length}
            label={isArabic ? 'مراحل مكتملة' : 'Phases Done'}
            color="bg-primary-50 text-primary-600"
          />
          <StatsCard
            icon="🏆"
            value={earnedBadges.length}
            label={isArabic ? 'شارات مكتسبة' : 'Badges Earned'}
            color="bg-accent-50 text-accent-600"
          />
          <StatsCard
            icon="⏱️"
            value={`${totalHoursCompleted}h`}
            label={isArabic ? 'وقت التعلم' : 'Time Spent'}
            color="bg-green-50 text-green-600"
          />
          <StatsCard
            icon="🔥"
            value={currentStreak}
            label={isArabic ? 'أيام متتالية' : 'Day Streak'}
            color="bg-orange-50 text-orange-600"
          />
        </div>
      </div>

      {/* Current Phase */}
      <div className="px-8 py-6 border-b border-grey-100">
        <h3 className="text-lg font-bold text-grey-900 mb-4">
          {isArabic ? 'المرحلة الحالية' : 'Current Phase'}
        </h3>
        <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-2xl border-2 border-primary-200">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg">
            {currentPhase}
          </div>
          <div className="flex-1">
            <p className="font-bold text-grey-900">
              {isArabic
                ? skillBadges[currentPhase - 1]?.name.ar
                : skillBadges[currentPhase - 1]?.name.en}
            </p>
            <p className="text-sm text-grey-600">
              {isArabic
                ? skillBadges[currentPhase - 1]?.description.ar
                : skillBadges[currentPhase - 1]?.description.en}
            </p>
          </div>
          <Link
            href={`/${locale}/web/courses/fintech-fundamentals#phase-${currentPhase}`}
            className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            {isArabic ? 'متابعة' : 'Continue'}
          </Link>
        </div>
      </div>

      {/* Phase Progress Timeline */}
      <div className="px-8 py-6 border-b border-grey-100">
        <h3 className="text-lg font-bold text-grey-900 mb-6">
          {isArabic ? 'تقدم المراحل' : 'Phase Progress'}
        </h3>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-grey-200 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
            />
          </div>

          {/* Phase Dots */}
          <div className="flex justify-between relative">
            {Array.from({ length: totalPhases }).map((_, index) => {
              const phaseNum = index + 1;
              const isCompleted = completedPhases.includes(phaseNum);
              const isCurrent = currentPhase === phaseNum;

              return (
                <motion.div
                  key={phaseNum}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg'
                        : isCurrent
                        ? 'bg-white border-4 border-primary-500 text-primary-600 shadow-lg'
                        : 'bg-grey-200 text-grey-500'
                    }`}
                  >
                    {isCompleted ? '✓' : phaseNum}
                  </div>
                  <span className={`text-xs mt-2 ${isCompleted || isCurrent ? 'text-primary-600 font-semibold' : 'text-grey-400'}`}>
                    {isArabic ? `م${phaseNum}` : `P${phaseNum}`}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Earned Badges */}
      <div className="px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-grey-900">
            {isArabic ? 'الشارات المكتسبة' : 'Earned Badges'}
          </h3>
          <span className="text-sm text-grey-500">
            {earnedBadges.length} / {totalPhases}
          </span>
        </div>

        {earnedBadges.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {earnedBadges.map(
              (badge) =>
                badge && (
                  <SkillBadge key={badge.id} badge={badge} locale={locale} isEarned={true} size="sm" showDetails={false} />
                )
            )}
          </div>
        ) : (
          <div className="text-center py-8 bg-grey-50 rounded-2xl">
            <div className="text-4xl mb-3">🎯</div>
            <p className="text-grey-600">
              {isArabic
                ? 'أكمل مرحلتك الأولى لكسب شارتك الأولى!'
                : 'Complete your first phase to earn your first badge!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatsCard({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: string | number;
  label: string;
  color: string;
}) {
  return (
    <div className="text-center p-4 rounded-2xl bg-grey-50 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 mx-auto rounded-xl ${color} flex items-center justify-center text-xl mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-grey-900">{value}</div>
      <div className="text-xs text-grey-500">{label}</div>
    </div>
  );
}
