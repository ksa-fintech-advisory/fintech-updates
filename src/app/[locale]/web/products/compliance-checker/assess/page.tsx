'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  getQuestionsForActivities,
  groupQuestionsByModule,
  scoreAnswer,
  calculateAssessmentResult,
  getActivityLabels,
  getRelevantModules,
} from '@/services/compliance-checker/assessment-engine';
import type {
  AssessmentQuestion,
  AssessmentAnswer,
  AssessmentResult,
  SelectedActivities,
  AssessmentState,
  ModuleScore,
} from '@/services/compliance-checker/assessment-types';
import { INITIAL_ASSESSMENT_STATE, getStatusDisplay } from '@/services/compliance-checker/assessment-types';

// ============================================
// Activity Selection Step
// ============================================

function ActivitySelectionStep({
  activities,
  onUpdate,
  onNext,
  locale,
}: {
  activities: SelectedActivities;
  onUpdate: (activities: SelectedActivities) => void;
  onNext: () => void;
  locale: string;
}) {
  const isArabic = locale === 'ar';
  const activityLabels = getActivityLabels();
  const hasSelection = Object.values(activities).some(Boolean);
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
          {isArabic ? 'الخطوة 1 من 3' : 'Step 1 of 3'}
        </div>
        <h2 className="text-2xl font-bold text-grey-900 mb-2">
          {isArabic ? 'حدد أنشطة عملك' : 'Select Your Business Activities'}
        </h2>
        <p className="text-grey-500">
          {isArabic 
            ? 'اختر الأنشطة المرخصة التي تمارسها أو تنوي ممارستها' 
            : 'Choose the licensed activities you conduct or plan to conduct'}
        </p>
      </div>
      
      <div className="space-y-3 mb-8">
        {(Object.keys(activityLabels) as (keyof SelectedActivities)[]).map((key) => {
          const label = activityLabels[key];
          const isSelected = activities[key];
          
          return (
            <button
              key={key}
              onClick={() => onUpdate({ ...activities, [key]: !isSelected })}
              className={`w-full p-4 rounded-xl border-2 text-start transition-all ${
                isSelected
                  ? 'border-green-500 bg-green-50'
                  : 'border-grey-200 hover:border-green-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-green-500 bg-green-500' : 'border-grey-300'
                }`}>
                  {isSelected && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-grey-900">
                    {label[locale as 'en' | 'ar']}
                  </div>
                  <div className="text-sm text-grey-500">
                    {label.description[locale as 'en' | 'ar']}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <button
        onClick={onNext}
        disabled={!hasSelection}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
          hasSelection 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-grey-300 cursor-not-allowed'
        }`}
      >
        {isArabic ? 'التالي: أسئلة الامتثال' : 'Next: Compliance Questions'}
      </button>
    </div>
  );
}

// ============================================
// Questions Step
// ============================================

function QuestionsStep({
  questions,
  answers,
  onAnswer,
  onBack,
  onComplete,
  locale,
}: {
  questions: AssessmentQuestion[];
  answers: AssessmentAnswer[];
  onAnswer: (answer: AssessmentAnswer) => void;
  onBack: () => void;
  onComplete: () => void;
  locale: string;
}) {
  const isArabic = locale === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);
  
  const handleAnswer = (value: string) => {
    if (!currentQuestion) return;
    
    const score = scoreAnswer(currentQuestion, value);
    onAnswer({
      questionId: currentQuestion.id,
      ruleId: currentQuestion.ruleId,
      value,
      score,
    });
    

  };
  
  if (!currentQuestion) return null;
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-grey-500 mb-2">
          <span>
            {isArabic 
              ? `السؤال ${currentIndex + 1} من ${questions.length}` 
              : `Question ${currentIndex + 1} of ${questions.length}`}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-grey-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Module Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
          {currentQuestion.module}
        </span>
        <span className={`ms-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
          currentQuestion.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
          currentQuestion.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>
          {currentQuestion.riskLevel} Risk
        </span>
      </div>
      
      {/* Question */}
      <div className="bg-white rounded-2xl p-6 border border-grey-100 mb-6">
        <h3 className="text-lg font-semibold text-grey-900 mb-4 whitespace-pre-line">
          {currentQuestion.question[locale as 'en' | 'ar']}
        </h3>
        
        {currentQuestion.helpText && (
          <div className="text-sm text-grey-500 bg-grey-50 rounded-lg p-3 whitespace-pre-line">
            {currentQuestion.helpText[locale as 'en' | 'ar']}
          </div>
        )}
      </div>
      
      {/* Answer Options */}
      <div className="space-y-3 mb-8">
        {currentQuestion.options?.map((option) => {
          const isSelected = currentAnswer?.value === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`w-full p-4 rounded-xl border-2 text-start transition-all ${
                isSelected
                  ? 'border-green-500 bg-green-50'
                  : 'border-grey-200 hover:border-green-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-green-500 bg-green-500' : 'border-grey-300'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-medium text-grey-900">
                  {option.label[locale as 'en' | 'ar']}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={() => currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : onBack()}
          className="flex-1 py-3 rounded-xl border border-grey-200 text-grey-700 font-medium hover:bg-grey-50"
        >
          {isArabic ? 'السابق' : 'Previous'}
        </button>
        
        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            disabled={!currentAnswer}
            className={`flex-1 py-3 rounded-xl font-medium ${
              currentAnswer 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-grey-200 text-grey-400 cursor-not-allowed'
            }`}
          >
            {isArabic ? 'التالي' : 'Next'}
          </button>
        ) : (
          <button
            onClick={onComplete}
            disabled={answers.length < questions.length}
            className={`flex-1 py-3 rounded-xl font-bold ${
              answers.length >= questions.length
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-grey-200 text-grey-400 cursor-not-allowed'
            }`}
          >
            {isArabic ? 'عرض التقرير' : 'View Report'}
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================
// Module Result Item (Accordion)
// ============================================

function ModuleResultItem({
  module,
  locale
}: {
  module: ModuleScore;
  locale: string;
}) {
  const isArabic = locale === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const moduleStatus = getStatusDisplay(module.status, locale as 'en' | 'ar');
  const hasGaps = module.gaps.length > 0;

  return (
    <div className="border-b border-grey-100 last:border-0 pb-6 last:pb-0">
      <button
        onClick={() => hasGaps && setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-4 text-start transition-colors ${hasGaps ? 'cursor-pointer hover:bg-grey-50 rounded-xl p-2 -mx-2' : ''
          }`}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-grey-900">
              {module.moduleLabel[locale as 'en' | 'ar']}
            </span>
            <span className={`text-sm font-medium ${moduleStatus.color}`}>
              {module.score}%
            </span>
          </div>
          <div className="h-2 bg-grey-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${module.score >= 80 ? 'bg-green-500' :
                  module.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              style={{ width: `${module.score}%` }}
            />
          </div>
        </div>

        {hasGaps && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full whitespace-nowrap">
              {module.gaps.length} {isArabic ? 'فجوة' : 'gaps'}
            </span>
            <svg
              className={`w-5 h-5 text-grey-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </button>

      {/* Gaps Detail (Accordion Content) */}
      {hasGaps && isOpen && (
        <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {module.gaps.map((gap, i) => (
            <div key={`${gap.ruleId}-${i}`} className="bg-red-50 rounded-xl p-4 border border-red-100">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${gap.severity === 'High' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                <div className="flex-1 space-y-2">
                  <div>
                    <span className="text-xs font-bold uppercase text-red-800 bg-red-200 px-1.5 py-0.5 rounded">
                      {isArabic ? 'الفجوة' : 'Gap'}
                    </span>
                    <p className="text-sm font-medium text-grey-900 mt-1">
                      {gap.description[locale as 'en' | 'ar']}
                    </p>
                  </div>

                  <div className="bg-white/60 rounded-lg p-3 text-sm">
                    <span className="font-bold text-red-700 block mb-1">
                      {isArabic ? 'الإجراء المطلوب:' : 'Required Action:'}
                    </span>
                    <p className="text-grey-700">
                      {gap.requiredAction[locale as 'en' | 'ar']}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// Report Step
// ============================================

function ReportStep({
  result,
  onRestart,
  locale,
}: {
  result: AssessmentResult;
  onRestart: () => void;
  locale: string;
}) {
  const isArabic = locale === 'ar';
  const statusDisplay = getStatusDisplay(result.overallStatus, locale as 'en' | 'ar');
  
  // Score gauge color
  const scoreColor = result.overallScore >= 80 ? 'text-green-600' : 
                     result.overallScore >= 50 ? 'text-yellow-600' : 'text-red-600';
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
          {isArabic ? 'تقرير الجاهزية' : 'Readiness Report'}
        </div>
        <h2 className="text-2xl font-bold text-grey-900 mb-2">
          {isArabic ? 'نتائج تقييم الامتثال' : 'Compliance Assessment Results'}
        </h2>
      </div>
      
      {/* Overall Score Card */}
      <div className="bg-white rounded-3xl p-8 border border-grey-100 shadow-lg mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Score Circle */}
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={result.overallScore >= 80 ? '#22c55e' : result.overallScore >= 50 ? '#eab308' : '#ef4444'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${result.overallScore * 4.4} 440`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-black ${scoreColor}`}>
                {result.overallScore}%
              </span>
              <span className="text-sm text-grey-500">
                {isArabic ? 'النتيجة الإجمالية' : 'Overall Score'}
              </span>
            </div>
          </div>
          
          {/* Status & Summary */}
          <div className="flex-1 text-center md:text-start">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusDisplay.bg} ${statusDisplay.border} border mb-4`}>
              <span className={`font-bold ${statusDisplay.color}`}>
                {statusDisplay.labelText}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center p-3 bg-grey-50 rounded-xl">
                <div className="text-2xl font-bold text-grey-900">{result.totalGaps}</div>
                <div className="text-xs text-grey-500">{isArabic ? 'إجمالي الفجوات' : 'Total Gaps'}</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-xl">
                <div className="text-2xl font-bold text-red-600">{result.highRiskGaps}</div>
                <div className="text-xs text-grey-500">{isArabic ? 'عالية المخاطر' : 'High Risk'}</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{result.answeredQuestions}</div>
                <div className="text-xs text-grey-500">{isArabic ? 'أسئلة مجابة' : 'Answered'}</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{result.moduleScores.length}</div>
                <div className="text-xs text-grey-500">{isArabic ? 'وحدات' : 'Modules'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Module Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-grey-100 mb-8">
        <h3 className="text-lg font-bold text-grey-900 mb-4">
          {isArabic ? 'التفصيل حسب الوحدة' : 'Module Breakdown'}
        </h3>
        <div className="space-y-4">
          {result.moduleScores.map((module) => (
            <ModuleResultItem key={module.module} module={module} locale={locale} />
          ))}
        </div>
      </div>
      
      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-grey-100 mb-8">
          <h3 className="text-lg font-bold text-grey-900 mb-4">
            {isArabic ? 'التوصيات' : 'Recommendations'}
          </h3>
          <div className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <div 
                key={i}
                className={`p-4 rounded-xl border ${
                  rec.priority === 'high' ? 'bg-red-50 border-red-200' :
                  rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                    rec.priority === 'high' ? 'bg-red-200 text-red-800' :
                    rec.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {rec.priority}
                  </div>
                  <p className="text-sm text-grey-700 flex-1">
                    {rec.action[locale as 'en' | 'ar']}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onRestart}
          className="flex-1 py-4 rounded-xl border border-grey-200 text-grey-700 font-medium hover:bg-grey-50"
        >
          {isArabic ? 'إعادة التقييم' : 'Restart Assessment'}
        </button>
        <Link
          href={`/${locale}/web/products/compliance-checker`}
          className="flex-1 py-4 rounded-xl bg-green-600 text-white font-bold text-center hover:bg-green-700"
        >
          {isArabic ? 'عرض القواعد التنظيمية' : 'View Compliance Rules'}
        </Link>
      </div>
    </div>
  );
}

// ============================================
// Main Page Component
// ============================================

export default function AssessPage({ params: { locale } }: { params: { locale: string } }) {
  const isArabic = locale === 'ar';
  
  const [state, setState] = useState<AssessmentState>(INITIAL_ASSESSMENT_STATE);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  
  // Get questions based on selected activities
  const questions = useMemo(() => {
    return getQuestionsForActivities(state.selectedActivities);
  }, [state.selectedActivities]);
  
  const handleActivityUpdate = (activities: SelectedActivities) => {
    setState(prev => ({ ...prev, selectedActivities: activities }));
  };
  
  const handleAnswer = (answer: AssessmentAnswer) => {
    setState(prev => {
      const existing = prev.answers.findIndex(a => a.questionId === answer.questionId);
      const newAnswers = existing >= 0 
        ? prev.answers.map((a, i) => i === existing ? answer : a)
        : [...prev.answers, answer];
      return { ...prev, answers: newAnswers };
    });
  };
  
  const handleComplete = () => {
    const assessmentResult = calculateAssessmentResult(state.answers, state.selectedActivities);
    setResult(assessmentResult);
    setState(prev => ({ ...prev, currentStep: 'report' }));
  };
  
  const handleRestart = () => {
    setState(INITIAL_ASSESSMENT_STATE);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-grey-50 pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href={`/${locale}/web/products/compliance-checker`} className="hover:text-white">
              {isArabic ? 'فاحص الامتثال' : 'Compliance Checker'}
            </Link>
            <span>/</span>
            <span className="text-white">
              {isArabic ? 'تقييم الجاهزية' : 'Readiness Assessment'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            {isArabic ? 'تقييم جاهزية الامتثال' : 'Compliance Readiness Assessment'}
          </h1>
          <p className="text-green-100 max-w-xl">
            {isArabic 
              ? 'أجب على الأسئلة لتقييم مستوى امتثال مؤسستك للوائح هيئة السوق المالية'
              : 'Answer questions to assess your organization\'s compliance with CMA regulations'}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {state.currentStep === 'activities' && (
          <ActivitySelectionStep
            activities={state.selectedActivities}
            onUpdate={handleActivityUpdate}
            onNext={() => setState(prev => ({ ...prev, currentStep: 'questions' }))}
            locale={locale}
          />
        )}
        
        {state.currentStep === 'questions' && (
          <QuestionsStep
            questions={questions}
            answers={state.answers}
            onAnswer={handleAnswer}
            onBack={() => setState(prev => ({ ...prev, currentStep: 'activities' }))}
            onComplete={handleComplete}
            locale={locale}
          />
        )}
        
        {state.currentStep === 'report' && result && (
          <ReportStep
            result={result}
            onRestart={handleRestart}
            locale={locale}
          />
        )}
      </div>
    </div>
  );
}
