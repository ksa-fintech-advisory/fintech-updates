/**
 * CMA Compliance Assessment Types
 * TypeScript interfaces for the self-assessment questionnaire feature
 */

import type { BilingualText, RiskLevel, ComplianceModule } from './types';

// ============================================
// Question Types
// ============================================

/**
 * Types of answers supported by the questionnaire
 */
export type AnswerType = 'yes_no' | 'yes_no_partial' | 'scale' | 'multi_select';

/**
 * Answer option for multi-select or scale questions
 */
export interface AnswerOption {
  value: string;
  label: BilingualText;
  score: number; // 0-100 contribution to compliance score
}

/**
 * A single assessment question derived from a compliance rule
 */
export interface AssessmentQuestion {
  id: string;
  ruleId: string;
  module: string;
  question: BilingualText;
  helpText?: BilingualText;
  answerType: AnswerType;
  options?: AnswerOption[];
  weight: number; // Importance weight (1-10)
  riskLevel: RiskLevel;
  articleReference: BilingualText;
}

/**
 * User's answer to a question
 */
export interface AssessmentAnswer {
  questionId: string;
  ruleId: string;
  value: string | string[];
  score: number; // Calculated score for this answer
  notes?: string;
}

// ============================================
// Assessment State Types
// ============================================

/**
 * Selected business activities for the assessment
 */
export interface SelectedActivities {
  dealing: boolean;
  custody: boolean;
  managing: boolean;
  arranging: boolean;
  advising: boolean;
}

/**
 * Current state of the assessment wizard
 */
export interface AssessmentState {
  currentStep: 'activities' | 'questions' | 'report';
  selectedActivities: SelectedActivities;
  currentModuleIndex: number;
  answers: AssessmentAnswer[];
  startedAt: string;
  completedAt?: string;
}

// ============================================
// Results Types
// ============================================

/**
 * Compliance gap identified from the assessment
 */
export interface ComplianceGap {
  ruleId: string;
  module: string;
  description: BilingualText;
  severity: RiskLevel;
  currentScore: number;
  requiredAction: BilingualText;
  evidence: BilingualText[];
}

/**
 * Module-level score breakdown
 */
export interface ModuleScore {
  module: string;
  moduleLabel: BilingualText;
  score: number; // 0-100
  totalQuestions: number;
  answeredQuestions: number;
  gaps: ComplianceGap[];
  status: 'compliant' | 'partial' | 'non_compliant';
}

/**
 * Prioritized recommendation
 */
export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  module: string;
  action: BilingualText;
  relatedRuleIds: string[];
  estimatedEffort: 'low' | 'medium' | 'high';
}

/**
 * Complete assessment result
 */
export interface AssessmentResult {
  // Summary
  overallScore: number; // 0-100
  overallStatus: 'compliant' | 'partial' | 'non_compliant';
  
  // Breakdown
  moduleScores: ModuleScore[];
  totalGaps: number;
  highRiskGaps: number;
  
  // Recommendations
  recommendations: Recommendation[];
  
  // Metadata
  selectedActivities: SelectedActivities;
  completedAt: string;
  totalQuestions: number;
  answeredQuestions: number;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Get status label based on score
 */
export function getStatusFromScore(score: number): 'compliant' | 'partial' | 'non_compliant' {
  if (score >= 80) return 'compliant';
  if (score >= 50) return 'partial';
  return 'non_compliant';
}

/**
 * Get status display info
 */
export function getStatusDisplay(status: 'compliant' | 'partial' | 'non_compliant', locale: 'en' | 'ar') {
  const displays = {
    compliant: {
      label: { en: 'Compliant', ar: 'ملتزم' },
      color: 'text-green-600',
      bg: 'bg-green-100',
      border: 'border-green-200',
    },
    partial: {
      label: { en: 'Partially Compliant', ar: 'ملتزم جزئياً' },
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      border: 'border-yellow-200',
    },
    non_compliant: {
      label: { en: 'Non-Compliant', ar: 'غير ملتزم' },
      color: 'text-red-600',
      bg: 'bg-red-100',
      border: 'border-red-200',
    },
  };
  
  return {
    ...displays[status],
    labelText: displays[status].label[locale],
  };
}

/**
 * Calculate score from yes/no/partial answer
 */
export function scoreYesNoPartial(value: string): number {
  switch (value) {
    case 'yes': return 100;
    case 'partial': return 50;
    case 'no': return 0;
    default: return 0;
  }
}

/**
 * Default selected activities (all false)
 */
export const DEFAULT_ACTIVITIES: SelectedActivities = {
  dealing: false,
  custody: false,
  managing: false,
  arranging: false,
  advising: false,
};

/**
 * Initial assessment state
 */
export const INITIAL_ASSESSMENT_STATE: AssessmentState = {
  currentStep: 'activities',
  selectedActivities: DEFAULT_ACTIVITIES,
  currentModuleIndex: 0,
  answers: [],
  startedAt: new Date().toISOString(),
};
