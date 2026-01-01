// Fintech Fundamentals Course Data
// Icons, colors, and metadata for each phase

export interface PhaseData {
  id: number;
  icon: string;
  gradient: string;
  borderColor: string;
  bgColor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
}

export const phasesData: PhaseData[] = [
  {
    id: 1,
    icon: '🏛️',
    gradient: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-200',
    bgColor: 'bg-emerald-50',
    difficulty: 'beginner',
    estimatedHours: 3,
  },
  {
    id: 2,
    icon: '💰',
    gradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
    difficulty: 'beginner',
    estimatedHours: 4,
  },
  {
    id: 3,
    icon: '📒',
    gradient: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    difficulty: 'beginner',
    estimatedHours: 5,
  },
  {
    id: 4,
    icon: '🏦',
    gradient: 'from-slate-600 to-zinc-700',
    borderColor: 'border-slate-200',
    bgColor: 'bg-slate-50',
    difficulty: 'intermediate',
    estimatedHours: 6,
  },
  {
    id: 5,
    icon: '💳',
    gradient: 'from-violet-500 to-purple-600',
    borderColor: 'border-violet-200',
    bgColor: 'bg-violet-50',
    difficulty: 'intermediate',
    estimatedHours: 5,
  },
  {
    id: 6,
    icon: '🌐',
    gradient: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-200',
    bgColor: 'bg-cyan-50',
    difficulty: 'intermediate',
    estimatedHours: 6,
  },
  {
    id: 7,
    icon: '📱',
    gradient: 'from-pink-500 to-rose-600',
    borderColor: 'border-pink-200',
    bgColor: 'bg-pink-50',
    difficulty: 'intermediate',
    estimatedHours: 4,
  },
  {
    id: 8,
    icon: '⚖️',
    gradient: 'from-red-500 to-rose-700',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    difficulty: 'advanced',
    estimatedHours: 7,
  },
  {
    id: 9,
    icon: '📈',
    gradient: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    difficulty: 'intermediate',
    estimatedHours: 5,
  },
  {
    id: 10,
    icon: '₿',
    gradient: 'from-orange-500 to-yellow-600',
    borderColor: 'border-orange-200',
    bgColor: 'bg-orange-50',
    difficulty: 'advanced',
    estimatedHours: 6,
  },
  {
    id: 11,
    icon: '🔧',
    gradient: 'from-primary-500 to-primary-700',
    borderColor: 'border-primary-200',
    bgColor: 'bg-primary-50',
    difficulty: 'advanced',
    estimatedHours: 8,
  },
];

export const getTotalHours = (): number => {
  return phasesData.reduce((acc, phase) => acc + phase.estimatedHours, 0);
};

export const getDifficultyLabel = (difficulty: PhaseData['difficulty'], isArabic: boolean): string => {
  const labels = {
    beginner: { en: 'Beginner', ar: 'مبتدئ' },
    intermediate: { en: 'Intermediate', ar: 'متوسط' },
    advanced: { en: 'Advanced', ar: 'متقدم' },
  };
  return isArabic ? labels[difficulty].ar : labels[difficulty].en;
};
