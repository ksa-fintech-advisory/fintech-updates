'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import {
  getQuestionsForActivities,
  groupQuestionsByModule,
  scoreAnswer,
  calculateAssessmentResult,
  getActivityLabels,
  getProgress
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
import {
  FiCheckCircle, FiCircle, FiChevronRight, FiChevronLeft, FiCpu,
  FiAlertTriangle, FiFileText, FiRefreshCw, FiDownload, FiActivity,
  FiShield, FiGrid, FiArrowLeft, FiArrowRight, FiCheck, FiMenu,
  FiExternalLink
} from 'react-icons/fi';

// ============================================
// 1. Module Configuration (Activity Selection)
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
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center justify-center w-8 h-8 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-mono font-bold text-sm">01</span>
          <span className="h-px w-12 bg-zinc-200 dark:bg-zinc-800"></span>
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
            {isArabic ? 'تهيئة النظام' : 'SYSTEM CONFIGURATION'}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
          {isArabic ? 'حدد نطاق عملياتك' : 'Define Operational Scope'}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed">
          {isArabic
            ? 'لضمان دقة التدقيق، يرجى تحديد الأنشطة المرخصة التي تمارسها منشأتك حالياً أو تخطط لها.'
            : 'Select the regulated activities your entity performs. The engine will dynamically construct the compliance matrix based on this selection.'}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {(Object.keys(activityLabels) as (keyof SelectedActivities)[]).map((key) => {
          const label = activityLabels[key];
          const isSelected = activities[key];

          return (
            <button
              key={key}
              onClick={() => onUpdate({ ...activities, [key]: !isSelected })}
              className={`
                group relative p-6 rounded-xl border-2 text-start transition-all duration-200 flex flex-col h-full
                ${isSelected
                  ? 'border-primary-600 bg-zinc-50 dark:bg-zinc-900/50 shadow-lg shadow-primary-900/5'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md'
                }
              `}
            >
              <div className="flex justify-between items-start w-full mb-4">
                <div className={`
                  w-8 h-8 rounded flex items-center justify-center transition-colors font-mono text-xs
                  ${isSelected
                    ? 'bg-primary-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                  }
                `}>
                  {isSelected ? <FiCheck strokeWidth={3} /> : key.substring(0, 2).toUpperCase()}
                </div>
                {isSelected && (
                  <span className="inline-block w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                )}
              </div>

              <div className="mt-auto">
                <h3 className={`font-bold text-lg mb-2 ${isSelected ? 'text-primary-700 dark:text-primary-400' : 'text-zinc-900 dark:text-white'}`}>
                  {label[locale as 'en' | 'ar']}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {label.description[locale as 'en' | 'ar']}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <div className="text-xs font-mono text-zinc-400">
          {isArabic ? 'تم اختيار' : 'SELECTED'}: {Object.values(activities).filter(Boolean).length}
        </div>
        <button
          onClick={onNext}
          disabled={!hasSelection}
          className={`
            px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center gap-3 transition-all
            ${hasSelection
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-primary-600 dark:hover:bg-zinc-200 shadow-lg hover:shadow-xl translate-y-0'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
            }
          `}
        >
          <span>{isArabic ? 'إنشاء لوحة التدقيق' : 'GENERATE_AUDIT_HUB'}</span>
          {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
        </button>
      </div>
    </div>
  );
}


// ============================================
// 3. Module Inspector (The Drill-down View)
// ============================================

function ModuleInspector({
  moduleName,
  questions,
  answers,
  onAnswer,
  onReturn,
  locale
}: {
  moduleName: string;
  questions: AssessmentQuestion[];
  answers: AssessmentAnswer[];
  onAnswer: (answer: AssessmentAnswer) => void;
  onReturn: () => void;
  locale: string;
}) {
  const isArabic = locale === 'ar';

  // Local state for navigation within the module
  // Find the first unanswered question to start with
  const firstUnansweredIdx = questions.findIndex(q => !answers.find(a => a.questionId === q.id));
  const [currentIndex, setCurrentIndex] = useState(firstUnansweredIdx >= 0 ? firstUnansweredIdx : 0);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  // Auto-advance logic could go here, but let's keep it manual/smooth
  const handleAnswerSelect = (value: string) => {
    const score = scoreAnswer(currentQuestion, value);
    onAnswer({
      questionId: currentQuestion.id,
      ruleId: currentQuestion.ruleId,
      value,
      score,
    });

    // Smooth transition to next question after short delay
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 350);
    }
  };

  const progress = Math.round((answers.filter(a => questions.map(q => q.id).includes(a.questionId)).length / questions.length) * 100);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] min-h-[600px] overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-300">

      {/* Sidebar (Navigation) */}
      <div className="w-full lg:w-80 bg-zinc-50 dark:bg-black border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={onReturn}
            className="text-xs font-mono font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 mb-4 uppercase tracking-wider"
          >
            {isArabic ? <FiArrowRight /> : <FiArrowLeft />}
            {isArabic ? 'العودة للوحة' : 'BACK_TO_HUB'}
          </button>
          <h3 className="font-bold text-lg text-zinc-900 dark:text-white leading-tight mb-1">{moduleName}</h3>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className={`w-2 h-2 rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-primary-500'}`}></span>
            {progress}% {isArabic ? 'مكتمل' : 'Complete'}
          </div>
        </div>

        {/* Question List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {questions.map((q, idx) => {
            const isAnswered = answers.some(a => a.questionId === q.id);
            const isActive = idx === currentIndex;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`
                  w-full text-start p-3 rounded-lg text-sm flex items-start gap-3 transition-colors
                  ${isActive
                    ? 'bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-700'
                    : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }
                `}
              >
                <div className={`
                   mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0
                   ${isAnswered
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : isActive
                      ? 'border-zinc-400 dark:border-zinc-500'
                      : 'border-zinc-300 dark:border-zinc-700'
                  }
                 `}>
                  {isAnswered && <FiCheck size={10} />}
                </div>
                <span className={`${isActive ? 'font-bold text-zinc-900 dark:text-white' : 'font-medium'}`}>
                  {isArabic ? `سؤال ${idx + 1}` : `Check ${idx + 1}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content (The Question) */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-white dark:bg-zinc-900/50">

        {/* Top Bar inside Content */}
        <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12 flex flex-col justify-center max-w-3xl mx-auto w-full">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded">
              {currentQuestion.ruleId}
            </span>
            <span className={`text-[10px] font-mono font-bold uppercase px-2 py-1 rounded border ${currentQuestion.riskLevel === 'High'
                ? 'text-red-600 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900/50'
                : 'text-zinc-500 border-zinc-200 dark:border-zinc-700'
              }`}>
              {currentQuestion.riskLevel} Risk
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-8 leading-snug">
            {currentQuestion.question[locale as 'en' | 'ar']}
          </h2>

          {/* Helper Text */}
          {currentQuestion.helpText && (
            <div className="mb-10 p-5 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg border-l-2 border-primary-500 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              {currentQuestion.helpText[locale as 'en' | 'ar']}
            </div>
          )}

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options?.map((option) => {
              const isSelected = currentAnswer?.value === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`
                      w-full p-5 rounded-xl border-2 text-start transition-all duration-200 flex items-center gap-4 group
                      ${isSelected
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }
                    `}
                >
                  <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                      ${isSelected
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-400'
                    }
                    `}>
                    {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                  <span className={`text-lg ${isSelected ? 'font-bold text-primary-900 dark:text-primary-100' : 'font-medium text-zinc-700 dark:text-zinc-300'}`}>
                    {option.label[locale as 'en' | 'ar']}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900">
          <button
            onClick={() => currentIndex > 0 ? setCurrentIndex(prev => prev - 1) : null}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded text-sm font-bold text-zinc-500 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {isArabic ? 'السابق' : 'PREV'}
          </button>

          <div className="text-xs font-mono text-zinc-400">
            {currentIndex + 1} / {questions.length}
          </div>

          <button
            onClick={() => currentIndex < questions.length - 1 ? setCurrentIndex(prev => prev + 1) : onReturn()}
            className="px-6 py-2 rounded bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-bold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            {currentIndex === questions.length - 1 ? (isArabic ? 'إنهاء الوحدة' : 'FINISH_MODULE') : (isArabic ? 'التالي' : 'NEXT')}
          </button>
        </div>

      </div>
    </div>
  );
}

// ============================================
// 4. System Audit Log (Report) - Minimal Changes needed as it was good
// ============================================

function ModuleAuditRow({
  module,
  locale,
  forceExpanded = false
}: {
  module: ModuleScore;
  locale: string;
  forceExpanded?: boolean;
}) {
  const isArabic = locale === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const hasGaps = module.gaps.length > 0;
  const showContent = forceExpanded || (hasGaps && isOpen);

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden mb-3 bg-white dark:bg-zinc-900 break-inside-avoid">
      <div
        onClick={() => !forceExpanded && hasGaps && setIsOpen(!isOpen)}
        className={`
          flex items-center gap-4 p-4 transition-colors
          ${!forceExpanded && hasGaps ? 'cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50' : ''}
        `}
      >
        <div className={`w-2 h-2 rounded-full shrink-0 ${module.score >= 80 ? 'bg-emerald-500' : module.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
              {module.moduleLabel[locale as 'en' | 'ar']}
            </h4>
            <span className={`font-mono font-bold text-sm ${module.score >= 80 ? 'text-emerald-600' : module.score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
              {module.score}%
            </span>
          </div>
          <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden w-full max-w-[200px]">
            <div
              className={`h-full ${module.score >= 80 ? 'bg-emerald-500' : module.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${module.score}%` }}
            />
          </div>
        </div>

        {hasGaps && (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-mono font-bold uppercase rounded border border-red-100 dark:border-red-900">
              {module.gaps.length} {isArabic ? 'تنبيهات' : 'ALERTS'}
            </span>
            {!forceExpanded && (
              <FiChevronRight className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            )}
          </div>
        )}
      </div>

      {hasGaps && showContent && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-black/20 p-4 space-y-3">
          {module.gaps.map((gap, i) => (
            <div key={`${gap.ruleId}-${i}`} className="text-sm border-l-2 border-red-500 pl-3 ml-1">
              <div className="flex items-center gap-2 mb-1">
                {/* START OF UPDATE: Wrapped Rule ID in Link */}
                <Link
                  href={`/${locale}/web/products/compliance-checker/rules/${gap.ruleId}`}
                  target="_blank" // Optional: Open in new tab to keep report open
                  className="group/link flex items-center gap-1.5 text-[10px] font-mono font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  <span>{gap.ruleId}</span>
                  <FiExternalLink className="w-2.5 h-2.5 opacity-50 group-hover/link:opacity-100" />
                </Link>
                {/* END OF UPDATE */}

                <span className="font-bold text-zinc-900 dark:text-white text-xs">
                  {gap.severity === 'High' ? (isArabic ? 'مخاطر عالية' : 'CRITICAL') : (isArabic ? 'متوسط' : 'WARNING')}
                </span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 mb-2 font-medium">
                {gap.description[locale as 'en' | 'ar']}
              </p>
              <div className="text-zinc-500 dark:text-zinc-500 text-xs font-mono bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800">
                <span className="font-bold text-zinc-700 dark:text-zinc-300">ACTION:</span> {gap.requiredAction[locale as 'en' | 'ar']}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



// ============================================
// 5. Main Controller
// ============================================

export default function AssessPage({ params: { locale } }: { params: { locale: string } }) {
  const isArabic = locale === 'ar';

  const [state, setState] = useState<AssessmentState>(INITIAL_ASSESSMENT_STATE);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Memoize questions & grouping
  const questions = useMemo(() => {
    return getQuestionsForActivities(state.selectedActivities);
  }, [state.selectedActivities]);

  const moduleGroups = useMemo(() => {
    return groupQuestionsByModule(questions);
  }, [questions]);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setState(INITIAL_ASSESSMENT_STATE);
    setResult(null);
    setActiveModule(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-primary-500/30 pb-24 text-zinc-900 dark:text-zinc-100">

      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Hero Header */}
      <div className="relative pt-32 pb-8 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-md z-20 mb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4">
            <Link href={`/${locale}/web/products/compliance-checker`} className="hover:text-primary-600 transition-colors">
              {isArabic ? 'الرئيسية' : 'ROOT'}
            </Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white">
              {isArabic ? 'أداة_التقييم' : 'COMPLIANCE_ENGINE_V1'}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            {isArabic ? 'مدقق الامتثال الذكي' : 'Regulatory Compliance Engine'}
          </h1>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {state.currentStep === 'activities' && (
          <ActivitySelectionStep
            activities={state.selectedActivities}
            onUpdate={handleActivityUpdate}
            onNext={() => setState(prev => ({ ...prev, currentStep: 'questions' }))}
            locale={locale}
          />
        )}

        {state.currentStep === 'questions' && !activeModule && (
          <AssessmentHub
            moduleGroups={moduleGroups}
            answers={state.answers}
            onSelectModule={setActiveModule}
            onComplete={handleComplete}
            locale={locale}
          />
        )}

        {state.currentStep === 'questions' && activeModule && (
          <ModuleInspector
            moduleName={activeModule}
            questions={moduleGroups.get(activeModule) || []}
            answers={state.answers}
            onAnswer={handleAnswer}
            onReturn={() => setActiveModule(null)}
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


// ============================================
// 2. The Hub (Dashboard View) - UPDATED
// ============================================

function AssessmentHub({
  moduleGroups,
  answers,
  onSelectModule,
  onComplete,
  locale
}: {
  moduleGroups: Map<string, AssessmentQuestion[]>;
  answers: AssessmentAnswer[];
  onSelectModule: (moduleName: string) => void;
  onComplete: () => void;
  locale: string;
}) {
  const isArabic = locale === 'ar';

  // Calculate Global Progress
  const totalQuestions = Array.from(moduleGroups.values()).flat().length;
  const answeredCount = answers.length;
  const globalProgress = Math.round((answeredCount / totalQuestions) * 100);
  const isComplete = answeredCount === totalQuestions;
  const hasStarted = answeredCount > 0;

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">

      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 uppercase">
              {isArabic ? 'نشط الآن' : 'LIVE_SESSION'}
            </span>
          </div>
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">
            {isArabic ? 'لوحة التدقيق المركزية' : 'Compliance Audit Hub'}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            {isArabic
              ? 'يمكنك إصدار تقرير فوري لأي وحدة بعد الانتهاء منها، لا يشترط إكمال كافة الوحدات.'
              : 'Audit specific modules or the entire system. You can generate a partial report at any time.'}
          </p>
        </div>

        {/* Global Progress Widget */}
        <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl min-w-[240px] border border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between text-xs font-mono font-bold text-zinc-500 mb-2">
            <span>{isArabic ? 'حالة التغطية' : 'COVERAGE'}</span>
            <span>{globalProgress}%</span>
          </div>
          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-900 dark:bg-white transition-all duration-1000 ease-out"
              style={{ width: `${globalProgress}%` }}
            />
          </div>
          <div className="mt-2 text-[10px] text-zinc-400 text-right font-mono">
            {answeredCount} / {totalQuestions} {isArabic ? 'تم فحصه' : 'CHECKED'}
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {Array.from(moduleGroups.entries()).map(([moduleName, questions], idx) => {
          // Module Stats
          const moduleQIds = questions.map(q => q.id);
          const moduleAnswers = answers.filter(a => moduleQIds.includes(a.questionId));
          const progress = Math.round((moduleAnswers.length / questions.length) * 100);
          const isModuleComplete = progress === 100;
          const isModuleStarted = progress > 0;

          return (
            <button
              key={moduleName}
              onClick={() => onSelectModule(moduleName)}
              className={`
                group flex flex-col text-start p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden
                ${isModuleComplete
                  ? 'bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-primary-500 dark:hover:border-primary-500 shadow-sm hover:shadow-xl hover:shadow-primary-900/5'
                }
              `}
            >
              {/* Active Indicator Strip */}
              {isModuleStarted && !isModuleComplete && (
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              )}

              {/* Card Header */}
              <div className="flex justify-between items-start w-full mb-6 pl-2">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-colors
                  ${isModuleComplete
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : isModuleStarted
                      ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                      : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                  }
                `}>
                  {isModuleComplete ? <FiCheckCircle /> : isModuleStarted ? <FiActivity /> : <FiGrid />}
                </div>
                <div className="text-[10px] font-mono font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded uppercase">
                  {questions.length} {isArabic ? 'نقاط' : 'ITEMS'}
                </div>
              </div>

              {/* Content */}
              <div className="mb-6 flex-1 pl-2">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">
                  {moduleName}
                </h3>
                <div className="text-xs text-zinc-500 font-medium">
                  {isModuleComplete
                    ? (isArabic ? 'جاهز للتقرير' : 'Ready for Report')
                    : isModuleStarted
                      ? (isArabic ? 'قيد العمل...' : 'In Progress...')
                      : (isArabic ? 'لم يبدأ' : 'Not Started')}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full pl-2">
                <div className="flex justify-between text-[10px] font-mono font-bold text-zinc-400 mb-1.5">
                  <span>{isModuleComplete ? 'DONE' : 'STATUS'}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${isModuleComplete ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Action - UPDATED LOGIC */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-zinc-200 dark:border-zinc-800 gap-4">
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          {hasStarted
            ? (isArabic
              ? isComplete ? 'جميع الوحدات مكتملة.' : 'يمكنك إصدار تقرير جزئي الآن.'
              : isComplete ? 'All modules completed.' : 'You can generate a partial report now.')
            : (isArabic ? 'ابدأ بأي وحدة للمتابعة.' : 'Start any module to proceed.')
          }
        </div>

        <button
          onClick={onComplete}
          disabled={!hasStarted}
          className={`
              px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center gap-3 transition-all
              ${!hasStarted
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
              : isComplete
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-900/20'
                : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200'
            }
            `}
        >
          {isArabic
            ? (isComplete ? 'إصدار التقرير النهائي' : 'إصدار مسودة التقرير')
            : (isComplete ? 'GENERATE_FINAL_REPORT' : 'GENERATE_DRAFT_REPORT')
          }
          <FiFileText />
        </button>
      </div>

    </div>
  );
}

// ============================================
// 4. Report Step - UPDATED TO SHOW PARTIAL STATUS
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
  const reportRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Check partial status
  const isPartial = result.answeredQuestions < result.totalQuestions;
  const coveragePercent = Math.round((result.answeredQuestions / result.totalQuestions) * 100);

  const scoreColor = result.overallScore >= 80 ? 'text-emerald-600' :
    result.overallScore >= 50 ? 'text-amber-600' : 'text-red-600';

  const handleExportPDF = async () => {
    // ... (PDF Export Logic remains same)
    const element = printRef.current || reportRef.current;
    if (!element) return;
    setIsExporting(true);
    const toastId = toast.loading(isArabic ? 'جاري إنشاء التقرير...' : 'Compiling Audit Report...');
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff', windowHeight: element.scrollHeight + 50 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`CMA-Audit-${isPartial ? 'DRAFT' : 'FINAL'}-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success(isArabic ? 'تم التحميل' : 'Report Downloaded', { id: toastId });
    } catch (error) {
      console.error('PDF export failed:', error);
      toast.error('Export Failed', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* Hidden Print Template (Simplified for brevity - ensure to update title based on isPartial) */}
      <div ref={printRef} className="fixed left-[-9999px] top-0 w-[900px] bg-white text-black p-12 font-sans">
        <div className="border-b-4 border-black pb-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
              {isPartial ? (isArabic ? 'مسودة تقرير (جزئي)' : 'DRAFT AUDIT REPORT') : (isArabic ? 'تقرير الامتثال النهائي' : 'FINAL COMPLIANCE AUDIT')}
            </h1>
            <p className="font-mono text-sm text-gray-600">
              STATUS: {isPartial ? 'INCOMPLETE DATA' : 'COMPLETED'} {'//'} COVERAGE: {coveragePercent}%
            </p>
          </div>
          {/* ... Rest of print template ... */}
        </div>
        {/* ... */}
      </div>

      {/* Screen View */}
      <div ref={reportRef} className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden relative">

        {/* Partial Warning Strip */}
        {isPartial && (
          <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-4 py-2 text-xs font-bold text-center border-b border-amber-200 dark:border-amber-900/50 uppercase tracking-widest flex items-center justify-center gap-2">
            <FiAlertTriangle />
            {isArabic
              ? `تقرير أولي: تم فحص ${coveragePercent}٪ فقط من النطاق المحدد.`
              : `DRAFT REPORT: ONLY ${coveragePercent}% OF SCOPE AUDITED.`}
          </div>
        )}

        {/* Header */}
        <div className="bg-zinc-50 dark:bg-black/50 px-8 py-8 border-b border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isPartial ? 'bg-amber-500' : result.overallScore >= 80 ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                {isArabic ? (isPartial ? 'مسودة' : 'تقرير نهائي') : (isPartial ? 'DRAFT_MODE' : 'FINAL_REPORT')}
              </span>
            </div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              {isArabic ? 'نتيجة الامتثال' : 'Compliance Readiness'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">AUDIT_ID</div>
              <div className="text-sm font-mono font-bold text-zinc-600 dark:text-zinc-400">#{new Date().getTime().toString().slice(-6)}</div>
            </div>
            <button
              onClick={handleExportPDF}
              className="bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-700 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <FiDownload /> {isArabic ? 'PDF' : 'Export'}
            </button>
          </div>
        </div>

        <div className="p-8 md:p-12">

          {/* Score Hero */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="relative w-56 h-56 flex-shrink-0 flex items-center justify-center">
              {/* Decorative rings */}
              <div className="absolute inset-0 border-4 border-zinc-100 dark:border-zinc-800 rounded-full opacity-50"></div>
              {isPartial && <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full border-dashed"></div>}

              <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
                <circle cx="112" cy="112" r="100" fill="none" stroke="currentColor" strokeWidth="16" className="text-zinc-100 dark:text-zinc-900" />
                <circle
                  cx="112" cy="112" r="100" fill="none"
                  stroke={result.overallScore >= 80 ? '#10b981' : result.overallScore >= 50 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="16" strokeLinecap="round"
                  strokeDasharray={`${result.overallScore * 6.28} 628`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-6xl font-black font-mono tracking-tighter ${scoreColor}`}>
                  {result.overallScore}%
                </span>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-2 bg-white dark:bg-black px-2">
                  {isArabic ? 'الدرجة الحالية' : 'CURRENT_SCORE'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              {/* Stats Cards */}
              <div className="p-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase mb-1">Items Audited</div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white">
                  {result.answeredQuestions}<span className="text-base text-zinc-400 font-medium">/{result.totalQuestions}</span>
                </div>
              </div>

              <div className="p-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase mb-1">Gaps Found</div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white">{result.totalGaps}</div>
              </div>

              <div className="col-span-2 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-zinc-500 uppercase">Audit Scope Coverage</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">{coveragePercent}%</span>
                </div>
                <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-800 dark:bg-zinc-200" style={{ width: `${coveragePercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs / Sections */}
          <div className="mb-8">
            <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 mb-6 pb-2">
              <h3 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                <FiGrid /> {isArabic ? 'تفاصيل الوحدات المفحوصة' : 'Audited Modules Breakdown'}
              </h3>
              {isPartial && (
                <span className="text-[10px] font-mono text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                  {isArabic ? 'عرض الوحدات التي تم بدأها فقط' : 'Showing active modules only'}
                </span>
              )}
            </div>

            <div className="space-y-2">
              {/* Filter to show only modules with at least 1 answer if partial, or show all if specifically requested to see empty ones */}
              {result.moduleScores
                .filter(m => m.answeredQuestions > 0 || !isPartial) // Show only touched modules in draft mode for cleaner UI
                .map((module) => (
                  <ModuleAuditRow key={module.module} module={module} locale={locale} />
                ))}

              {isPartial && result.moduleScores.some(m => m.answeredQuestions === 0) && (
                <div className="text-center py-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-400 text-sm">
                  {isArabic
                    ? `يوجد ${result.moduleScores.filter(m => m.answeredQuestions === 0).length} وحدة لم يتم فحصها بعد.`
                    : `${result.moduleScores.filter(m => m.answeredQuestions === 0).length} modules have not been audited yet.`}
                </div>
              )}
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex justify-center mt-12 gap-4">
            <button onClick={onRestart} className="text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
              <FiRefreshCw /> {isArabic ? 'بدء فحص جديد' : 'Start New Audit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}