/**
 * CMA Compliance Assessment Engine
 * Logic for generating questions, scoring answers, and producing readiness reports
 */

import type { ComplianceRule } from './types';
import { parseRiskLevel, isMandatory } from './types';
import type {
  AssessmentQuestion,
  AssessmentAnswer,
  AssessmentResult,
  ModuleScore,
  ComplianceGap,
  Recommendation,
  SelectedActivities,
  AnswerOption,
} from './assessment-types';
import { getStatusFromScore, scoreYesNoPartial } from './assessment-types';
import { getAllRules, getModuleSummaries, getRulesByModule } from './engine';

// ============================================
// Question Generation
// ============================================

/**
 * Module labels for display
 */
const MODULE_LABELS: Record<string, { en: string; ar: string }> = {
  'Licensing': { en: 'Licensing', ar: 'الترخيص' },
  'Governance': { en: 'Governance', ar: 'الحوكمة' },
  'Operations': { en: 'Operations', ar: 'العمليات' },
  'Reporting & Notifications': { en: 'Reporting & Notifications', ar: 'التقارير والإخطارات' },
  'Outsourcing & Third Parties': { en: 'Outsourcing & Third Parties', ar: 'الإسناد الخارجي والأطراف الثالثة' },
  'Data & Cybersecurity': { en: 'Data & Cybersecurity', ar: 'البيانات والأمن السيبراني' },
  'Capital & Financials': { en: 'Capital & Financials', ar: 'رأس المال والشؤون المالية' },
};

/**
 * Standard yes/no/partial options
 */
const YES_NO_PARTIAL_OPTIONS: AnswerOption[] = [
  { value: 'yes', label: { en: 'Yes, fully implemented', ar: 'نعم، مطبق بالكامل' }, score: 100 },
  { value: 'partial', label: { en: 'Partially implemented', ar: 'مطبق جزئياً' }, score: 50 },
  { value: 'no', label: { en: 'No, not implemented', ar: 'لا، غير مطبق' }, score: 0 },
];

/**
 * Convert a compliance rule into an assessment question
 */
function ruleToQuestion(rule: ComplianceRule): AssessmentQuestion {
  const riskLevel = parseRiskLevel(rule.risk_level);
  
  // Generate question text from the rule
  const questionEn = `Does your organization comply with the following requirement?\n\n"${rule.required_action.en}"`;
  const questionAr = `هل تلتزم مؤسستك بالمتطلب التالي؟\n\n"${rule.required_action.ar}"`;
  
  // Weight based on risk and mandatory status
  let weight = 5;
  if (riskLevel === 'High') weight += 3;
  else if (riskLevel === 'Medium') weight += 1;
  if (isMandatory(rule.enforcement_type)) weight += 2;
  
  return {
    id: `Q-${rule.rule_id}`,
    ruleId: rule.rule_id,
    module: rule.module.en,
    question: { en: questionEn, ar: questionAr },
    helpText: {
      en: `Reference: ${rule.article_reference.en}\n\n${rule.description.en}`,
      ar: `المرجع: ${rule.article_reference.ar}\n\n${rule.description.ar}`,
    },
    answerType: 'yes_no_partial',
    options: YES_NO_PARTIAL_OPTIONS,
    weight: Math.min(weight, 10),
    riskLevel,
    articleReference: rule.article_reference,
  };
}

/**
 * Get all questions for the assessment
 */
export function getAllQuestions(): AssessmentQuestion[] {
  return getAllRules().map(ruleToQuestion);
}

/**
 * Get questions filtered by module
 */
export function getQuestionsByModule(module: string): AssessmentQuestion[] {
  return getRulesByModule(module).map(ruleToQuestion);
}

/**
 * Get modules that should be included based on selected activities
 */
export function getRelevantModules(activities: SelectedActivities): string[] {
  // All fintechs need these core modules
  const coreModules = ['Licensing', 'Governance', 'Operations', 'Reporting & Notifications'];
  
  const additionalModules: string[] = [];
  
  // Data security is relevant for all
  additionalModules.push('Data & Cybersecurity');
  
  // If any capital-intensive activity is selected
  if (activities.dealing || activities.custody || activities.managing) {
    additionalModules.push('Capital & Financials');
  }
  
  // If arranging or managing
  if (activities.arranging || activities.managing) {
    additionalModules.push('Outsourcing & Third Parties');
  }
  
  return Array.from(new Set([...coreModules, ...additionalModules]));
}

/**
 * Get questions relevant to selected activities
 */
export function getQuestionsForActivities(activities: SelectedActivities): AssessmentQuestion[] {
  const relevantModules = getRelevantModules(activities);
  const allQuestions = getAllQuestions();
  
  return allQuestions.filter(q => relevantModules.includes(q.module));
}

/**
 * Group questions by module for wizard steps
 */
export function groupQuestionsByModule(questions: AssessmentQuestion[]): Map<string, AssessmentQuestion[]> {
  const grouped = new Map<string, AssessmentQuestion[]>();
  
  questions.forEach(q => {
    const existing = grouped.get(q.module) || [];
    grouped.set(q.module, [...existing, q]);
  });
  
  return grouped;
}

// ============================================
// Scoring Logic
// ============================================

/**
 * Score a single answer
 */
export function scoreAnswer(question: AssessmentQuestion, value: string | string[]): number {
  if (question.answerType === 'yes_no_partial' || question.answerType === 'yes_no') {
    return scoreYesNoPartial(value as string);
  }
  
  if (question.answerType === 'multi_select' && question.options) {
    const selectedValues = Array.isArray(value) ? value : [value];
    const totalScore = selectedValues.reduce((sum, v) => {
      const option = question.options?.find(o => o.value === v);
      return sum + (option?.score || 0);
    }, 0);
    return Math.min(totalScore, 100);
  }
  
  if (question.answerType === 'scale' && question.options) {
    const option = question.options.find(o => o.value === value);
    return option?.score || 0;
  }
  
  return 0;
}

/**
 * Calculate weighted average score
 */
function calculateWeightedScore(answers: AssessmentAnswer[], questions: AssessmentQuestion[]): number {
  if (answers.length === 0) return 0;
  
  let totalWeight = 0;
  let weightedScore = 0;
  
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      totalWeight += question.weight;
      weightedScore += answer.score * question.weight;
    }
  });
  
  return totalWeight > 0 ? Math.round(weightedScore / totalWeight) : 0;
}

// ============================================
// Gap Analysis
// ============================================

/**
 * Identify compliance gaps from answers
 */
function identifyGaps(answers: AssessmentAnswer[], questions: AssessmentQuestion[]): ComplianceGap[] {
  const gaps: ComplianceGap[] = [];
  
  answers.forEach(answer => {
    // Consider anything below 100 as a gap (partial or non-compliant)
    if (answer.score < 100) {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        const rule = getAllRules().find(r => r.rule_id === answer.ruleId);
        if (rule) {
          gaps.push({
            ruleId: answer.ruleId,
            module: question.module,
            description: rule.description,
            severity: question.riskLevel,
            currentScore: answer.score,
            requiredAction: rule.required_action,
            evidence: rule.evidence,
          });
        }
      }
    }
  });
  
  // Sort by severity (High first) then by score (lowest first)
  return gaps.sort((a, b) => {
    const severityOrder = { High: 0, Medium: 1, Low: 2 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return a.currentScore - b.currentScore;
  });
}

// ============================================
// Recommendations
// ============================================

/**
 * Generate prioritized recommendations from gaps
 */
function generateRecommendations(gaps: ComplianceGap[]): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  // Group gaps by module
  const gapsByModule = new Map<string, ComplianceGap[]>();
  gaps.forEach(gap => {
    const existing = gapsByModule.get(gap.module) || [];
    gapsByModule.set(gap.module, [...existing, gap]);
  });
  
  // Generate recommendations for each module
  gapsByModule.forEach((moduleGaps, module) => {
    const highRiskGaps = moduleGaps.filter(g => g.severity === 'High');
    const nonCompliantGaps = moduleGaps.filter(g => g.currentScore === 0);
    
    // High priority: High risk and non-compliant
    if (highRiskGaps.length > 0 && nonCompliantGaps.some(g => g.severity === 'High')) {
      recommendations.push({
        priority: 'high',
        module,
        action: {
          en: `Address ${highRiskGaps.length} high-risk compliance gap(s) in ${module}. These are critical for regulatory approval.`,
          ar: `معالجة ${highRiskGaps.length} فجوة امتثال عالية المخاطر في ${MODULE_LABELS[module]?.ar || module}. هذه ضرورية للموافقة التنظيمية.`,
        },
        relatedRuleIds: highRiskGaps.map(g => g.ruleId),
        estimatedEffort: 'high',
      });
    }
    
    // Medium priority: Partial compliance issues
    const partialGaps = moduleGaps.filter(g => g.currentScore === 50);
    if (partialGaps.length > 0) {
      recommendations.push({
        priority: 'medium',
        module,
        action: {
          en: `Complete ${partialGaps.length} partially implemented requirement(s) in ${module}.`,
          ar: `إكمال ${partialGaps.length} متطلب(ات) مطبقة جزئياً في ${MODULE_LABELS[module]?.ar || module}.`,
        },
        relatedRuleIds: partialGaps.map(g => g.ruleId),
        estimatedEffort: 'medium',
      });
    }
    
    // Low priority: Low risk non-compliance
    const lowRiskGaps = moduleGaps.filter(g => g.severity === 'Low' && g.currentScore === 0);
    if (lowRiskGaps.length > 0) {
      recommendations.push({
        priority: 'low',
        module,
        action: {
          en: `Implement ${lowRiskGaps.length} low-risk requirement(s) in ${module} to achieve full compliance.`,
          ar: `تطبيق ${lowRiskGaps.length} متطلب(ات) منخفضة المخاطر في ${MODULE_LABELS[module]?.ar || module} لتحقيق الامتثال الكامل.`,
        },
        relatedRuleIds: lowRiskGaps.map(g => g.ruleId),
        estimatedEffort: 'low',
      });
    }
  });
  
  // Sort by priority
  return recommendations.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });
}

// ============================================
// Result Calculation
// ============================================

/**
 * Calculate module-level scores
 */
function calculateModuleScores(
  answers: AssessmentAnswer[],
  questions: AssessmentQuestion[],
  gaps: ComplianceGap[]
): ModuleScore[] {
  const modules = Array.from(new Set(questions.map(q => q.module)));
  
  return modules.map(module => {
    const moduleQuestions = questions.filter(q => q.module === module);
    const moduleAnswers = answers.filter(a => 
      moduleQuestions.some(q => q.id === a.questionId)
    );
    const moduleGaps = gaps.filter(g => g.module === module);
    
    const score = calculateWeightedScore(moduleAnswers, moduleQuestions);
    
    return {
      module,
      moduleLabel: MODULE_LABELS[module] || { en: module, ar: module },
      score,
      totalQuestions: moduleQuestions.length,
      answeredQuestions: moduleAnswers.length,
      gaps: moduleGaps,
      status: getStatusFromScore(score),
    };
  });
}

/**
 * Calculate complete assessment result
 */
export function calculateAssessmentResult(
  answers: AssessmentAnswer[],
  selectedActivities: SelectedActivities
): AssessmentResult {
  const questions = getQuestionsForActivities(selectedActivities);
  const gaps = identifyGaps(answers, questions);
  const moduleScores = calculateModuleScores(answers, questions, gaps);
  const recommendations = generateRecommendations(gaps);
  
  const overallScore = calculateWeightedScore(answers, questions);
  
  return {
    overallScore,
    overallStatus: getStatusFromScore(overallScore),
    moduleScores,
    totalGaps: gaps.length,
    highRiskGaps: gaps.filter(g => g.severity === 'High').length,
    recommendations,
    selectedActivities,
    completedAt: new Date().toISOString(),
    totalQuestions: questions.length,
    answeredQuestions: answers.length,
  };
}

/**
 * Get progress percentage
 */
export function getProgress(answeredCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.round((answeredCount / totalCount) * 100);
}

/**
 * Get activity labels
 */
export function getActivityLabels(): Record<keyof SelectedActivities, { en: string; ar: string; description: { en: string; ar: string } }> {
  return {
    dealing: {
      en: 'Dealing',
      ar: 'التعامل',
      description: {
        en: 'Buying, selling, or trading securities as principal or agent',
        ar: 'شراء أو بيع أو تداول الأوراق المالية بصفة أصيل أو وكيل',
      },
    },
    custody: {
      en: 'Custody',
      ar: 'الحفظ',
      description: {
        en: 'Safekeeping and administration of securities',
        ar: 'حفظ وإدارة الأوراق المالية',
      },
    },
    managing: {
      en: 'Managing',
      ar: 'الإدارة',
      description: {
        en: 'Managing securities including investment management and fund operations',
        ar: 'إدارة الأوراق المالية بما في ذلك إدارة الاستثمارات وعمليات الصناديق',
      },
    },
    arranging: {
      en: 'Arranging',
      ar: 'الترتيب',
      description: {
        en: 'Arranging deals in securities and credit arrangements',
        ar: 'ترتيب صفقات الأوراق المالية وترتيبات الائتمان',
      },
    },
    advising: {
      en: 'Advising',
      ar: 'تقديم المشورة',
      description: {
        en: 'Advising on securities transactions',
        ar: 'تقديم المشورة بشأن معاملات الأوراق المالية',
      },
    },
  };
}
