// Fintech Fundamentals Course Data
// Icons, colors, and metadata for each phase

export interface PhaseData {
  id: number;
  icon: string;
  gradient: string;
  borderColor: string;
  bgColor: string;
}

export const phasesData: PhaseData[] = [
  {
    id: 1,
    icon: '🏦',
    gradient: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-200',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 2,
    icon: '⚖️',
    gradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
  },
  {
    id: 3,
    icon: '💳',
    gradient: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
  },
  {
    id: 4,
    icon: '🚀',
    gradient: 'from-violet-500 to-purple-600',
    borderColor: 'border-violet-200',
    bgColor: 'bg-violet-50',
  },
];

export const getTotalHours = (): number => {
  // Total hours is no longer displayed to students
  return 0;
};

export const getDifficultyLabel = (difficulty: string, isArabic: boolean): string => {
  // Deprecated: Course is now for all levels
  return isArabic ? 'لجميع المستويات' : 'For All Levels';
};
