'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  getQuestionsForActivities,
  groupQuestionsByModule,
  scoreAnswer,
  calculateAssessmentResult,
  getActivityLabels,
  getModuleLabel,
} from '@/services/compliance-checker/assessment-engine';
import type {
  AssessmentQuestion,
  AssessmentAnswer,
  AssessmentResult,
  SelectedActivities,
  AssessmentState,
  ModuleScore,
} from '@/services/compliance-checker/assessment-types';
import { INITIAL_ASSESSMENT_STATE } from '@/services/compliance-checker/assessment-types';
import { generateAssessmentPdf } from '@/services/compliance-checker/report-pdf';
import {
  FiCheckCircle,
  FiChevronRight,
  FiAlertTriangle,
  FiFileText,
  FiRefreshCw,
  FiDownload,
  FiActivity,
  FiGrid,
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiExternalLink,
  FiShield,
  FiBriefcase,
  FiLock,
  FiTrendingUp,
  FiGitMerge,
  FiMessageCircle,
  FiInfo,
} from 'react-icons/fi';

const ACTIVITY_ICONS: Record<keyof SelectedActivities, typeof FiBriefcase> = {
  dealing: FiBriefcase,
  custody: FiLock,
  managing: FiTrendingUp,
  arranging: FiGitMerge,
  advising: FiMessageCircle,
};

function StepProgress({
  current,
  locale,
}: {
  current: 1 | 2 | 3;
  locale: string;
}) {
  const isArabic = locale === 'ar';
  const steps = [
    { n: 1, label: isArabic ? 'النطاق' : 'Scope' },
    { n: 2, label: isArabic ? 'التدقيق' : 'Audit' },
    { n: 3, label: isArabic ? 'التقرير' : 'Report' },
  ] as const;

  return (
    <ol className="mb-8 flex items-center gap-2 sm:gap-3">
      {steps.map((step, idx) => {
        const done = current > step.n;
        const active = current === step.n;
        return (
          <li key={step.n} className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  done
                    ? 'bg-emerald-500 text-zinc-950'
                    : active
                      ? 'bg-white text-zinc-950'
                      : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {done ? <FiCheck size={12} strokeWidth={3} /> : step.n}
              </span>
              <span
                className={`truncate text-xs font-semibold sm:text-sm ${
                  active ? 'text-white' : done ? 'text-emerald-400' : 'text-zinc-600'
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-px min-w-4 flex-1 ${done ? 'bg-emerald-500/50' : 'bg-zinc-800'}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

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
  const keys = Object.keys(activityLabels) as (keyof SelectedActivities)[];
  const hasSelection = Object.values(activities).some(Boolean);
  const selectedCount = Object.values(activities).filter(Boolean).length;
  const allSelected = keys.every((key) => activities[key]);

  const selectAll = () => {
    const next = { ...activities };
    keys.forEach((key) => {
      next[key] = true;
    });
    onUpdate(next);
  };

  const clearAll = () => {
    const next = { ...activities };
    keys.forEach((key) => {
      next[key] = false;
    });
    onUpdate(next);
  };

  return (
    <div className="mx-auto max-w-5xl pb-28">
      <StepProgress current={1} locale={locale} />

      <div className="mb-8">
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
          {isArabic ? 'حدد نطاق عملياتك' : 'Define your operational scope'}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {isArabic
            ? 'اختر الأنشطة المرخصة التي تمارسها منشأتك. سيتم بناء مصفوفة الامتثال بناءً على اختيارك.'
            : 'Choose the licensed activities your entity performs. The compliance matrix is built from this selection.'}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-500">
          {isArabic ? 'يمكنك اختيار أكثر من نشاط' : 'You can select more than one activity'}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={allSelected ? clearAll : selectAll}
            className="rounded-full border border-zinc-700 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            {allSelected
              ? isArabic
                ? 'مسح الكل'
                : 'Clear all'
              : isArabic
                ? 'تحديد الكل'
                : 'Select all'}
          </button>
        </div>
      </div>

      <fieldset className="mb-6">
        <legend className="sr-only">
          {isArabic ? 'الأنشطة المرخصة' : 'Licensed activities'}
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {keys.map((key) => {
            const label = activityLabels[key];
            const isSelected = activities[key];
            const Icon = ACTIVITY_ICONS[key];

            return (
              <label
                key={key}
                className={`group relative flex cursor-pointer gap-4 rounded-2xl border p-4 transition-all duration-200 sm:p-5 ${
                  isSelected
                    ? 'border-emerald-500/50 bg-emerald-500/[0.08] shadow-[0_0_28px_rgba(16,185,129,0.1)]'
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onUpdate({ ...activities, [key]: !isSelected })}
                  className="peer sr-only"
                />

                <span
                  className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isSelected
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="mb-1 flex items-start justify-between gap-3">
                    <span
                      className={`block text-base font-bold ${
                        isSelected ? 'text-emerald-200' : 'text-white'
                      }`}
                    >
                      {label[locale as 'en' | 'ar']}
                    </span>
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
                          : 'border-zinc-600 bg-transparent'
                      }`}
                      aria-hidden
                    >
                      {isSelected && <FiCheck size={12} strokeWidth={3} />}
                    </span>
                  </span>
                  <span className="block text-sm leading-relaxed text-zinc-500">
                    {label.description[locale as 'en' | 'ar']}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {hasSelection && (
        <div className="mb-6 flex flex-wrap gap-2">
          {keys
            .filter((key) => activities[key])
            .map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => onUpdate({ ...activities, [key]: false })}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-500/20"
              >
                {activityLabels[key][locale as 'en' | 'ar']}
                <span className="text-emerald-500/80" aria-hidden>
                  ×
                </span>
              </button>
            ))}
        </div>
      )}

      {!hasSelection && (
        <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-500">
          <FiInfo className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
          <p>
            {isArabic
              ? 'اختر نشاطاً واحداً على الأقل للمتابعة.'
              : 'Select at least one activity to continue.'}
          </p>
        </div>
      )}

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-800/90 bg-zinc-950/90 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-white">
              {selectedCount === 0
                ? isArabic
                  ? 'لم يتم اختيار أي نشاط'
                  : 'No activities selected'
                : isArabic
                  ? `${selectedCount} ${selectedCount === 1 ? 'نشاط محدد' : 'أنشطة محددة'}`
                  : `${selectedCount} activit${selectedCount === 1 ? 'y' : 'ies'} selected`}
            </p>
            <p className="text-xs text-zinc-500">
              {isArabic ? 'الخطوة 1 من 3' : 'Step 1 of 3'}
            </p>
          </div>
          <button
            type="button"
            onClick={onNext}
            disabled={!hasSelection}
            className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-all sm:h-12 sm:px-8 ${
              hasSelection
                ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                : 'cursor-not-allowed bg-zinc-800 text-zinc-500'
            }`}
          >
            <span>{isArabic ? 'متابعة' : 'Continue'}</span>
            {isArabic ? <FiArrowLeft className="h-4 w-4" /> : <FiArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModuleInspector({
  moduleName,
  questions,
  answers,
  onAnswer,
  onReturn,
  locale,
}: {
  moduleName: string;
  questions: AssessmentQuestion[];
  answers: AssessmentAnswer[];
  onAnswer: (answer: AssessmentAnswer) => void;
  onReturn: () => void;
  locale: string;
}) {
  const isArabic = locale === 'ar';
  const firstUnansweredIdx = questions.findIndex((q) => !answers.find((a) => a.questionId === q.id));
  const [currentIndex, setCurrentIndex] = useState(
    firstUnansweredIdx >= 0 ? firstUnansweredIdx : 0,
  );

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id);
  const answeredInModule = answers.filter((a) =>
    questions.map((q) => q.id).includes(a.questionId),
  ).length;
  const progress = Math.round((answeredInModule / questions.length) * 100);

  const handleAnswerSelect = (value: string) => {
    if (!currentQuestion) return;
    const score = scoreAnswer(currentQuestion, value);
    onAnswer({
      questionId: currentQuestion.id,
      ruleId: currentQuestion.ruleId,
      value,
      score,
    });

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 280);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center text-zinc-400">
        {isArabic ? 'لا توجد أسئلة في هذه الوحدة.' : 'No questions in this module.'}
        <button
          type="button"
          onClick={onReturn}
          className="mt-4 block w-full text-sm font-semibold text-emerald-400"
        >
          {isArabic ? 'العودة' : 'Go back'}
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:min-h-[560px]">
        {/* Sidebar */}
        <aside className="flex w-full flex-col border-b border-zinc-800 bg-zinc-950/80 lg:w-72 lg:border-b-0 lg:border-e lg:shrink-0">
          <div className="border-b border-zinc-800 p-5">
            <button
              type="button"
              onClick={onReturn}
              className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:text-white"
            >
              {isArabic ? <FiArrowRight className="h-3.5 w-3.5" /> : <FiArrowLeft className="h-3.5 w-3.5" />}
              {isArabic ? 'العودة للوحة' : 'Back to hub'}
            </button>
            <h3 className="mb-2 text-base font-bold leading-snug text-white">
              {getModuleLabel(moduleName, locale)}
            </h3>
            <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
              <span
                className={`h-2 w-2 rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`}
              />
              {answeredInModule}/{questions.length} {isArabic ? 'مكتمل' : 'answered'} · {progress}%
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="max-h-48 space-y-1 overflow-y-auto p-3 lg:max-h-none lg:flex-1">
            {questions.map((q, idx) => {
              const isAnswered = answers.some((a) => a.questionId === q.id);
              const isActive = idx === currentIndex;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-white ring-1 ring-zinc-700'
                      : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                      isAnswered
                        ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
                        : isActive
                          ? 'border-zinc-500'
                          : 'border-zinc-700'
                    }`}
                  >
                    {isAnswered ? <FiCheck size={10} /> : idx + 1}
                  </span>
                  <span className={`min-w-0 truncate ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {isArabic ? `سؤال ${idx + 1}` : `Check ${idx + 1}`}
                  </span>
                  {q.riskLevel === 'High' && (
                    <span className="ms-auto h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" title="High risk" />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Question panel */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="h-1 w-full bg-zinc-800">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-2xl">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-400">
                  {currentQuestion.ruleId}
                </span>
                <span
                  className={`rounded-md border px-2 py-1 text-[10px] font-bold uppercase ${
                    currentQuestion.riskLevel === 'High'
                      ? 'border-red-500/30 bg-red-500/10 text-red-400'
                      : currentQuestion.riskLevel === 'Medium'
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                        : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {currentQuestion.riskLevel} risk
                </span>
                {currentQuestion.articleReference && (
                  <span className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-1 text-[10px] font-medium text-zinc-500">
                    {currentQuestion.articleReference[locale as 'en' | 'ar']}
                  </span>
                )}
              </div>

              <h2 className="mb-3 text-xl font-bold leading-snug text-white sm:text-2xl md:text-[1.75rem]">
                {currentQuestion.question[locale as 'en' | 'ar']}
              </h2>

              <p className="mb-6 text-sm text-zinc-500">
                {isArabic
                  ? 'اختر الإجابة الأنسب لوضع منشأتك الحالي.'
                  : 'Choose the answer that best matches your current state.'}
              </p>

              {currentQuestion.helpText && (
                <div className="mb-7 flex gap-3 rounded-xl border border-zinc-800 border-s-2 border-s-emerald-500 bg-zinc-950/60 p-4 text-sm leading-relaxed text-zinc-400">
                  <FiInfo className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/80" />
                  <p>{currentQuestion.helpText[locale as 'en' | 'ar']}</p>
                </div>
              )}

              <div
                role="radiogroup"
                aria-label={isArabic ? 'خيارات الإجابة' : 'Answer options'}
                className="space-y-3"
              >
                {currentQuestion.options?.map((option) => {
                  const isSelected = currentAnswer?.value === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleAnswerSelect(option.value)}
                      className={`group flex w-full items-center gap-4 rounded-xl border-2 p-4 text-start transition-all duration-200 sm:p-5 ${
                        isSelected
                          ? 'border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
                          : 'border-zinc-800 bg-zinc-950/40 hover:border-zinc-600 hover:bg-zinc-900/60'
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-500'
                            : 'border-zinc-600 group-hover:border-zinc-400'
                        }`}
                      >
                        {isSelected && <span className="h-2 w-2 rounded-full bg-zinc-950" />}
                      </span>
                      <span
                        className={`text-base sm:text-lg ${
                          isSelected ? 'font-bold text-emerald-100' : 'font-medium text-zinc-300'
                        }`}
                      >
                        {option.label[locale as 'en' | 'ar']}
                      </span>
                      {isSelected && (
                        <FiCheck className="ms-auto h-4 w-4 shrink-0 text-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-zinc-800 bg-zinc-950/50 px-5 py-4 sm:px-8">
            <button
              type="button"
              onClick={() => currentIndex > 0 && setCurrentIndex((prev) => prev - 1)}
              disabled={currentIndex === 0}
              className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white disabled:opacity-30"
            >
              {isArabic ? 'السابق' : 'Previous'}
            </button>

            <span className="text-xs font-medium text-zinc-500">
              {currentIndex + 1} / {questions.length}
            </span>

            <button
              type="button"
              onClick={() =>
                currentIndex < questions.length - 1
                  ? setCurrentIndex((prev) => prev + 1)
                  : onReturn()
              }
              disabled={currentIndex < questions.length - 1 && !currentAnswer}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                currentIndex < questions.length - 1 && !currentAnswer
                  ? 'cursor-not-allowed bg-zinc-800 text-zinc-500'
                  : 'bg-white text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              {currentIndex === questions.length - 1
                ? isArabic
                  ? 'إنهاء الوحدة'
                  : 'Finish module'
                : isArabic
                  ? 'التالي'
                  : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleAuditRow({
  module,
  locale,
  forceExpanded = false,
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
    <div className="mb-3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
      <div
        onClick={() => !forceExpanded && hasGaps && setIsOpen(!isOpen)}
        className={`flex items-center gap-4 p-4 transition-colors ${
          !forceExpanded && hasGaps ? 'cursor-pointer hover:bg-zinc-800/40' : ''
        }`}
      >
        <div
          className={`h-2 w-2 shrink-0 rounded-full ${
            module.score >= 80
              ? 'bg-emerald-500'
              : module.score >= 50
                ? 'bg-amber-500'
                : 'bg-red-500'
          }`}
        />

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <h4 className="truncate text-sm font-bold text-white">
              {module.moduleLabel[locale as 'en' | 'ar']}
            </h4>
            <span
              className={`shrink-0 text-sm font-bold ${
                module.score >= 80
                  ? 'text-emerald-400'
                  : module.score >= 50
                    ? 'text-amber-400'
                    : 'text-red-400'
              }`}
            >
              {module.score}%
            </span>
          </div>
          <div className="h-1.5 max-w-[200px] overflow-hidden rounded-full bg-zinc-800">
            <div
              className={`h-full ${
                module.score >= 80
                  ? 'bg-emerald-500'
                  : module.score >= 50
                    ? 'bg-amber-500'
                    : 'bg-red-500'
              }`}
              style={{ width: `${module.score}%` }}
            />
          </div>
        </div>

        {hasGaps && (
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden rounded border border-red-500/30 bg-red-500/10 px-2 py-1 text-[10px] font-bold uppercase text-red-400 sm:inline-block">
              {module.gaps.length} {isArabic ? 'تنبيهات' : 'alerts'}
            </span>
            {!forceExpanded && (
              <FiChevronRight
                className={`h-4 w-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-90' : ''}`}
              />
            )}
          </div>
        )}
      </div>

      {hasGaps && showContent && (
        <div className="space-y-3 border-t border-zinc-800 bg-zinc-950/40 p-4">
          {module.gaps.map((gap, i) => (
            <div key={`${gap.ruleId}-${i}`} className="border-s-2 border-red-500 ps-3 text-sm">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <Link
                  href={`/${locale}/products/compliance-checker/rules/${gap.ruleId}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-bold text-red-400 transition-colors hover:bg-red-500/25"
                >
                  <span>{gap.ruleId}</span>
                  <FiExternalLink className="h-2.5 w-2.5 opacity-60" />
                </Link>
                <span className="text-xs font-bold text-white">
                  {gap.severity === 'High'
                    ? isArabic
                      ? 'مخاطر عالية'
                      : 'Critical'
                    : isArabic
                      ? 'متوسط'
                      : 'Warning'}
                </span>
              </div>
              <p className="mb-2 font-medium text-zinc-300">
                {gap.description[locale as 'en' | 'ar']}
              </p>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-zinc-500">
                <span className="font-bold text-zinc-300">
                  {isArabic ? 'الإجراء:' : 'Action:'}
                </span>{' '}
                {gap.requiredAction[locale as 'en' | 'ar']}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AssessmentHub({
  moduleGroups,
  answers,
  onSelectModule,
  onComplete,
  locale,
}: {
  moduleGroups: Map<string, AssessmentQuestion[]>;
  answers: AssessmentAnswer[];
  onSelectModule: (moduleName: string) => void;
  onComplete: () => void;
  locale: string;
}) {
  const isArabic = locale === 'ar';
  const totalQuestions = Array.from(moduleGroups.values()).flat().length;
  const answeredCount = answers.length;
  const globalProgress =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const isComplete = answeredCount === totalQuestions && totalQuestions > 0;
  const hasStarted = answeredCount > 0;

  return (
    <div className="mx-auto max-w-6xl">
      <StepProgress current={2} locale={locale} />

      <div className="mb-8 flex flex-col justify-between gap-6 border-b border-zinc-800 pb-8 md:flex-row md:items-end">
        <div>
          <span className="mb-2 inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            {isArabic ? 'جلسة نشطة' : 'Live session'}
          </span>
          <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
            {isArabic ? 'لوحة التدقيق' : 'Compliance audit hub'}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            {isArabic
              ? 'راجع الوحدات واحدةً تلو الآخر. يمكنك إصدار تقرير جزئي في أي وقت.'
              : 'Work through modules one by one. You can generate a partial report anytime.'}
          </p>
        </div>

        <div className="min-w-[220px] rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="mb-2 flex justify-between text-xs font-semibold text-zinc-500">
            <span>{isArabic ? 'التغطية' : 'Coverage'}</span>
            <span>{globalProgress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${globalProgress}%` }}
            />
          </div>
          <p className="mt-2 text-end text-[11px] text-zinc-500">
            {answeredCount} / {totalQuestions} {isArabic ? 'تم فحصه' : 'checked'}
          </p>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from(moduleGroups.entries()).map(([moduleName, questions]) => {
          const moduleQIds = questions.map((q) => q.id);
          const moduleAnswers = answers.filter((a) => moduleQIds.includes(a.questionId));
          const progress = Math.round((moduleAnswers.length / questions.length) * 100);
          const isModuleComplete = progress === 100;
          const isModuleStarted = progress > 0;

          return (
            <button
              key={moduleName}
              type="button"
              onClick={() => onSelectModule(moduleName)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-start transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.08)]"
            >
              {isModuleStarted && !isModuleComplete && (
                <div className="absolute inset-y-0 start-0 w-1 bg-amber-500" />
              )}
              {isModuleComplete && (
                <div className="absolute inset-y-0 start-0 w-1 bg-emerald-500" />
              )}

              <div className="mb-5 flex w-full items-start justify-between ps-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${
                    isModuleComplete
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : isModuleStarted
                        ? 'bg-amber-500/15 text-amber-400'
                        : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {isModuleComplete ? (
                    <FiCheckCircle />
                  ) : isModuleStarted ? (
                    <FiActivity />
                  ) : (
                    <FiGrid />
                  )}
                </div>
                <span className="rounded-md bg-zinc-800 px-2 py-1 text-[10px] font-bold uppercase text-zinc-400">
                  {questions.length} {isArabic ? 'نقاط' : 'items'}
                </span>
              </div>

              <div className="mb-5 flex-1 ps-2">
                <h3 className="mb-1 text-base font-bold text-white">
                  {getModuleLabel(moduleName, locale)}
                </h3>
                <p className="text-xs font-medium text-zinc-500">
                  {isModuleComplete
                    ? isArabic
                      ? 'جاهز للتقرير'
                      : 'Ready for report'
                    : isModuleStarted
                      ? isArabic
                        ? 'قيد العمل...'
                        : 'In progress...'
                      : isArabic
                        ? 'لم يبدأ'
                        : 'Not started'}
                </p>
              </div>

              <div className="w-full ps-2">
                <div className="mb-1.5 flex justify-between text-[10px] font-bold text-zinc-500">
                  <span>{isModuleComplete ? 'Done' : 'Status'}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className={`h-full transition-all duration-700 ${
                      isModuleComplete ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-stretch justify-between gap-4 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center">
        <p className="text-sm text-zinc-500">
          {hasStarted
            ? isComplete
              ? isArabic
                ? 'جميع الوحدات مكتملة.'
                : 'All modules completed.'
              : isArabic
                ? 'يمكنك إصدار تقرير جزئي الآن.'
                : 'You can generate a partial report now.'
            : isArabic
              ? 'ابدأ بأي وحدة للمتابعة.'
              : 'Start any module to proceed.'}
        </p>

        <button
          type="button"
          onClick={onComplete}
          disabled={!hasStarted}
          className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-bold transition-all ${
            !hasStarted
              ? 'cursor-not-allowed bg-zinc-800 text-zinc-500'
              : 'bg-white text-zinc-950 hover:bg-zinc-200'
          }`}
        >
          {isArabic
            ? isComplete
              ? 'إصدار التقرير النهائي'
              : 'إصدار مسودة التقرير'
            : isComplete
              ? 'Generate final report'
              : 'Generate draft report'}
          <FiFileText className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

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
  const [isExporting, setIsExporting] = useState(false);

  const isPartial = result.answeredQuestions < result.totalQuestions;
  const coveragePercent = Math.round((result.answeredQuestions / result.totalQuestions) * 100);

  const scoreColor =
    result.overallScore >= 80
      ? 'text-emerald-400'
      : result.overallScore >= 50
        ? 'text-amber-400'
        : 'text-red-400';

  const handleExportPDF = async () => {
    setIsExporting(true);
    const toastId = toast.loading(isArabic ? 'جاري إنشاء التقرير...' : 'Compiling audit report...');
    try {
      await generateAssessmentPdf(result, locale);
      toast.success(isArabic ? 'تم التحميل' : 'Report downloaded', { id: toastId });
    } catch (error) {
      console.error('PDF export failed:', error);
      toast.error(isArabic ? 'فشل التصدير' : 'Export failed', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <StepProgress current={3} locale={locale} />

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl">
        {isPartial && (
          <div className="flex items-center justify-center gap-2 border-b border-amber-500/20 bg-amber-500/10 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-amber-300">
            <FiAlertTriangle className="h-3.5 w-3.5 shrink-0" />
            {isArabic
              ? `تقرير أولي: تم فحص ${coveragePercent}٪ فقط من النطاق المحدد.`
              : `Draft report: only ${coveragePercent}% of scope audited.`}
          </div>
        )}

        <div className="flex flex-col items-start justify-between gap-6 border-b border-zinc-800 bg-zinc-950/50 px-6 py-6 sm:px-8 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`h-2 w-2 animate-pulse rounded-full ${
                  isPartial
                    ? 'bg-amber-500'
                    : result.overallScore >= 80
                      ? 'bg-emerald-500'
                      : 'bg-red-500'
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                {isArabic
                  ? isPartial
                    ? 'مسودة'
                    : 'تقرير نهائي'
                  : isPartial
                    ? 'Draft mode'
                    : 'Final report'}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isArabic ? 'نتيجة الامتثال' : 'Compliance readiness'}
            </h2>
          </div>

          <button
            type="button"
            onClick={handleExportPDF}
            disabled={isExporting}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-zinc-950 transition-colors hover:bg-zinc-200 disabled:opacity-60"
          >
            <FiDownload className="h-4 w-4" />
            {isArabic ? 'تصدير PDF' : 'Export PDF'}
          </button>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="mb-12 flex flex-col items-center gap-10 md:flex-row">
            <div className="relative flex h-48 w-48 shrink-0 items-center justify-center sm:h-56 sm:w-56">
              <div className="absolute inset-0 rounded-full border-4 border-zinc-800 opacity-50" />
              {isPartial && (
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-amber-500/20" />
              )}
              <svg className="h-full w-full -rotate-90 drop-shadow-2xl" viewBox="0 0 224 224">
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="16"
                  className="text-zinc-800"
                />
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  fill="none"
                  stroke={
                    result.overallScore >= 80
                      ? '#10b981'
                      : result.overallScore >= 50
                        ? '#f59e0b'
                        : '#ef4444'
                  }
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${result.overallScore * 6.28} 628`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-black tracking-tighter sm:text-6xl ${scoreColor}`}>
                  {result.overallScore}%
                </span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {isArabic ? 'الدرجة' : 'Score'}
                </span>
              </div>
            </div>

            <div className="grid w-full max-w-lg grid-cols-2 gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                <div className="mb-1 text-[10px] font-bold uppercase text-zinc-500">
                  {isArabic ? 'تم فحصه' : 'Items audited'}
                </div>
                <div className="text-2xl font-black text-white sm:text-3xl">
                  {result.answeredQuestions}
                  <span className="text-base font-medium text-zinc-500">
                    /{result.totalQuestions}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                <div className="mb-1 text-[10px] font-bold uppercase text-zinc-500">
                  {isArabic ? 'الفجوات' : 'Gaps found'}
                </div>
                <div className="text-2xl font-black text-white sm:text-3xl">{result.totalGaps}</div>
              </div>

              <div className="col-span-2 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-zinc-500">
                    {isArabic ? 'تغطية النطاق' : 'Scope coverage'}
                  </span>
                  <span className="text-xs font-bold text-white">{coveragePercent}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${coveragePercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
                <FiGrid className="h-4 w-4" />
                {isArabic ? 'تفاصيل الوحدات' : 'Module breakdown'}
              </h3>
              {isPartial && (
                <span className="rounded bg-amber-500/10 px-2 py-1 text-[10px] font-semibold text-amber-400">
                  {isArabic ? 'الوحدات التي بدأت فقط' : 'Active modules only'}
                </span>
              )}
            </div>

            <div className="space-y-2">
              {result.moduleScores
                .filter((m) => m.answeredQuestions > 0 || !isPartial)
                .map((module) => (
                  <ModuleAuditRow key={module.module} module={module} locale={locale} />
                ))}

              {isPartial && result.moduleScores.some((m) => m.answeredQuestions === 0) && (
                <div className="rounded-xl border border-dashed border-zinc-800 py-8 text-center text-sm text-zinc-500">
                  {isArabic
                    ? `يوجد ${result.moduleScores.filter((m) => m.answeredQuestions === 0).length} وحدة لم يتم فحصها بعد.`
                    : `${result.moduleScores.filter((m) => m.answeredQuestions === 0).length} modules have not been audited yet.`}
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <FiRefreshCw className="h-4 w-4" />
              {isArabic ? 'بدء فحص جديد' : 'Start new audit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssessPage({ params: { locale } }: { params: { locale: string } }) {
  const isArabic = locale === 'ar';
  const [state, setState] = useState<AssessmentState>(INITIAL_ASSESSMENT_STATE);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const questions = useMemo(
    () => getQuestionsForActivities(state.selectedActivities),
    [state.selectedActivities],
  );

  const moduleGroups = useMemo(() => groupQuestionsByModule(questions), [questions]);

  const handleActivityUpdate = (activities: SelectedActivities) => {
    setState((prev) => ({ ...prev, selectedActivities: activities }));
  };

  const handleAnswer = (answer: AssessmentAnswer) => {
    setState((prev) => {
      const existing = prev.answers.findIndex((a) => a.questionId === answer.questionId);
      const newAnswers =
        existing >= 0
          ? prev.answers.map((a, i) => (i === existing ? answer : a))
          : [...prev.answers, answer];
      return { ...prev, answers: newAnswers };
    });
  };

  const handleComplete = () => {
    const assessmentResult = calculateAssessmentResult(
      state.answers,
      state.selectedActivities,
    );
    setResult(assessmentResult);
    setState((prev) => ({ ...prev, currentStep: 'report' }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setState(INITIAL_ASSESSMENT_STATE);
    setResult(null);
    setActiveModule(null);
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 pb-20 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-radial-gradient from-transparent via-zinc-950/40 to-zinc-950" />

      <header className="relative z-20 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-emerald-400"
            >
              {isArabic ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/products/compliance-checker`}
              className="transition-colors hover:text-emerald-400"
            >
              {isArabic ? 'فحص الامتثال' : 'Compliance checker'}
            </Link>
            <span>/</span>
            <span className="text-zinc-300">{isArabic ? 'التقييم' : 'Assessment'}</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <FiShield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                {isArabic ? 'مدقق الامتثال' : 'Compliance assessment'}
              </h1>
              <p className="mt-1 text-sm text-zinc-500 sm:text-base">
                {isArabic
                  ? 'قيّم جاهزية منشأتك التنظيمية خطوة بخطوة.'
                  : 'Evaluate your regulatory readiness step by step.'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container relative z-10 mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {state.currentStep === 'activities' && (
          <ActivitySelectionStep
            activities={state.selectedActivities}
            onUpdate={handleActivityUpdate}
            onNext={() => setState((prev) => ({ ...prev, currentStep: 'questions' }))}
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
          <ReportStep result={result} onRestart={handleRestart} locale={locale} />
        )}
      </div>
    </div>
  );
}
