// Skill badges for each phase of the Fintech Fundamentals course
export interface SkillBadge {
  id: number;
  phaseId: number;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  icon: string;
  gradient: string;
  skills: {
    en: string[];
    ar: string[];
  };
}

export const skillBadges: SkillBadge[] = [
  {
    id: 1,
    phaseId: 1,
    name: { en: 'Foundation Master', ar: 'خبير الأساسيات' },
    description: {
      en: 'Understanding pre-monetary exchange systems and economic foundations',
      ar: 'فهم أنظمة التبادل قبل النقود والأسس الاقتصادية',
    },
    icon: '🏛️',
    gradient: 'from-amber-400 to-amber-600',
    skills: {
      en: ['Barter Systems', 'Economic History', 'Value Exchange'],
      ar: ['أنظمة المقايضة', 'التاريخ الاقتصادي', 'تبادل القيمة'],
    },
  },
  {
    id: 2,
    phaseId: 2,
    name: { en: 'Money Scholar', ar: 'عالم المال' },
    description: {
      en: 'Deep understanding of money concepts and monetary systems',
      ar: 'فهم عميق لمفاهيم المال والأنظمة النقدية',
    },
    icon: '💰',
    gradient: 'from-green-400 to-green-600',
    skills: {
      en: ['Monetary Theory', 'Currency Types', 'Value Storage'],
      ar: ['النظرية النقدية', 'أنواع العملات', 'تخزين القيمة'],
    },
  },
  {
    id: 3,
    phaseId: 3,
    name: { en: 'Ledger Expert', ar: 'خبير السجلات' },
    description: {
      en: 'Mastering accounting principles and ledger systems',
      ar: 'إتقان مبادئ المحاسبة وأنظمة السجلات',
    },
    icon: '📒',
    gradient: 'from-blue-400 to-blue-600',
    skills: {
      en: ['Double-Entry', 'Financial Records', 'Audit Trails'],
      ar: ['القيد المزدوج', 'السجلات المالية', 'مسارات التدقيق'],
    },
  },
  {
    id: 4,
    phaseId: 4,
    name: { en: 'Banking Insider', ar: 'خبير البنوك' },
    description: {
      en: 'Understanding how banks operate from the inside',
      ar: 'فهم كيفية عمل البنوك من الداخل',
    },
    icon: '🏦',
    gradient: 'from-indigo-400 to-indigo-600',
    skills: {
      en: ['Core Banking', 'Deposits', 'Lending', 'Risk Management'],
      ar: ['نظام البنوك الأساسي', 'الودائع', 'الإقراض', 'إدارة المخاطر'],
    },
  },
  {
    id: 5,
    phaseId: 5,
    name: { en: 'Payments Pro', ar: 'محترف المدفوعات' },
    description: {
      en: 'Expert knowledge in payment processing and systems',
      ar: 'معرفة متخصصة في معالجة المدفوعات والأنظمة',
    },
    icon: '💳',
    gradient: 'from-purple-400 to-purple-600',
    skills: {
      en: ['Payment Processing', 'Settlement', 'Clearing'],
      ar: ['معالجة المدفوعات', 'التسوية', 'المقاصة'],
    },
  },
  {
    id: 6,
    phaseId: 6,
    name: { en: 'Rails Architect', ar: 'مهندس شبكات الدفع' },
    description: {
      en: 'Understanding payment networks and infrastructure',
      ar: 'فهم شبكات الدفع والبنية التحتية',
    },
    icon: '🛤️',
    gradient: 'from-teal-400 to-teal-600',
    skills: {
      en: ['SWIFT', 'SARIE', 'mada', 'Card Networks'],
      ar: ['سويفت', 'ساري', 'مدى', 'شبكات البطاقات'],
    },
  },
  {
    id: 7,
    phaseId: 7,
    name: { en: 'Wallet Wizard', ar: 'ساحر المحافظ' },
    description: {
      en: 'Expertise in digital wallets and stored value',
      ar: 'خبرة في المحافظ الرقمية والقيمة المخزنة',
    },
    icon: '📱',
    gradient: 'from-pink-400 to-pink-600',
    skills: {
      en: ['Digital Wallets', 'Stored Value', 'Mobile Payments'],
      ar: ['المحافظ الرقمية', 'القيمة المخزنة', 'الدفع عبر الجوال'],
    },
  },
  {
    id: 8,
    phaseId: 8,
    name: { en: 'Compliance Guardian', ar: 'حارس الامتثال' },
    description: {
      en: 'Mastering regulatory compliance and risk management',
      ar: 'إتقان الامتثال التنظيمي وإدارة المخاطر',
    },
    icon: '⚖️',
    gradient: 'from-red-400 to-red-600',
    skills: {
      en: ['AML/KYC', 'SAMA Regulations', 'Risk Assessment'],
      ar: ['مكافحة غسل الأموال', 'لوائح ساما', 'تقييم المخاطر'],
    },
  },
  {
    id: 9,
    phaseId: 9,
    name: { en: 'Investment Sage', ar: 'حكيم الاستثمار' },
    description: {
      en: 'Understanding investment products and wealth management',
      ar: 'فهم المنتجات الاستثمارية وإدارة الثروات',
    },
    icon: '📈',
    gradient: 'from-emerald-400 to-emerald-600',
    skills: {
      en: ['Robo-Advisory', 'Portfolio Management', 'Securities'],
      ar: ['الاستشارات الآلية', 'إدارة المحافظ', 'الأوراق المالية'],
    },
  },
  {
    id: 10,
    phaseId: 10,
    name: { en: 'Crypto Pioneer', ar: 'رائد العملات الرقمية' },
    description: {
      en: 'Deep knowledge of blockchain and cryptocurrencies',
      ar: 'معرفة عميقة بالبلوكتشين والعملات الرقمية',
    },
    icon: '₿',
    gradient: 'from-orange-400 to-orange-600',
    skills: {
      en: ['Blockchain', 'DeFi', 'Smart Contracts', 'Tokenization'],
      ar: ['البلوكتشين', 'التمويل اللامركزي', 'العقود الذكية', 'الترميز'],
    },
  },
  {
    id: 11,
    phaseId: 11,
    name: { en: 'Fintech Architect', ar: 'مهندس التقنية المالية' },
    description: {
      en: 'Complete mastery of building fintech systems',
      ar: 'إتقان كامل لبناء أنظمة التقنية المالية',
    },
    icon: '🚀',
    gradient: 'from-violet-400 to-violet-600',
    skills: {
      en: ['System Design', 'API Integration', 'Security', 'Scalability'],
      ar: ['تصميم الأنظمة', 'تكامل الـ API', 'الأمان', 'قابلية التوسع'],
    },
  },
];

// Certificate types
export interface Certificate {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  requiredBadges: number[];
  icon: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export const certificates: Certificate[] = [
  {
    id: 'fintech-fundamentals',
    name: {
      en: 'Fintech Fundamentals Certification',
      ar: 'شهادة أساسيات التقنية المالية',
    },
    description: {
      en: 'Complete certification for mastering all 11 phases of fintech fundamentals',
      ar: 'شهادة إتمام جميع مراحل أساسيات التقنية المالية الـ 11',
    },
    requiredBadges: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    icon: '🎓',
    level: 'platinum',
  },
  {
    id: 'payments-specialist',
    name: {
      en: 'Payments Specialist',
      ar: 'أخصائي المدفوعات',
    },
    description: {
      en: 'Specialized certification in payment systems and infrastructure',
      ar: 'شهادة متخصصة في أنظمة وبنية المدفوعات',
    },
    requiredBadges: [5, 6, 7],
    icon: '💳',
    level: 'gold',
  },
  {
    id: 'banking-professional',
    name: {
      en: 'Banking Professional',
      ar: 'محترف مصرفي',
    },
    description: {
      en: 'Professional certification in banking and financial operations',
      ar: 'شهادة مهنية في العمليات المصرفية والمالية',
    },
    requiredBadges: [3, 4, 8],
    icon: '🏦',
    level: 'gold',
  },
];

// Learning progress stats
export interface LearningStats {
  totalPhases: number;
  completedPhases: number;
  totalHours: number;
  completedHours: number;
  earnedBadges: number[];
  currentStreak: number;
  longestStreak: number;
  lastActivity: Date | null;
}

export const getDefaultLearningStats = (): LearningStats => ({
  totalPhases: 11,
  completedPhases: 0,
  totalHours: 60,
  completedHours: 0,
  earnedBadges: [],
  currentStreak: 0,
  longestStreak: 0,
  lastActivity: null,
});
