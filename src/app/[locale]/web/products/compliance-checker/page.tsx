'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  getComplianceStats,
  getModuleSummaries,
  getAllRules,
  getRulesByModule,
  getRulesByRiskLevel,
  getHighRiskRules,
  searchRules,
} from '@/services/compliance-checker/engine';
import type { ComplianceRule, RiskLevel, ModuleSummary } from '@/services/compliance-checker/types';
import { parseRiskLevel, isMandatory } from '@/services/compliance-checker/types';
import {
  FiShield, FiAlertTriangle, FiCheckCircle, FiSearch, FiFilter,
  FiFolder, FiFileText, FiX, FiActivity, FiHash, FiArrowRight, FiArrowLeft
} from 'react-icons/fi';

// ============================================
// 1. UI Primitives
// ============================================

function RiskBadge({ level, locale }: { level: RiskLevel; locale: string }) {
  const styles = {
    High: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
    Medium: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    Low: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  };

  const labels = {
    High: { en: 'CRITICAL', ar: 'عالي_المخاطر' },
    Medium: { en: 'MODERATE', ar: 'متوسط' },
    Low: { en: 'STANDARD', ar: 'منخفض' },
  };

  return (
    <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded border ${styles[level]}`}>
      {labels[level][locale as 'en' | 'ar']}
    </span>
  );
}

function EnforcementBadge({ rule, locale }: { rule: ComplianceRule; locale: string }) {
  const mandatory = isMandatory(rule.enforcement_type);
  const isArabic = locale === 'ar';

  return (
    <span className={`
      px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded border
      ${mandatory
        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
      }
    `}>
      {mandatory ? (isArabic ? 'إلزامي' : 'MANDATORY') : (isArabic ? 'إرشادي' : 'ADVISORY')}
    </span>
  );
}

// ============================================
// 2. Dashboard Stats (Heads Up Display)
// ============================================

function DashboardStats({ locale }: { locale: string }) {
  const stats = getComplianceStats();
  const isArabic = locale === 'ar';

  const statItems = [
    { label: isArabic ? 'إجمالي القواعد' : 'TOTAL_RULES', value: stats.totalRules, color: 'text-zinc-900 dark:text-white' },
    { label: isArabic ? 'مخاطر عالية' : 'HIGH_RISK_FLAG', value: stats.riskScore.high, color: 'text-red-600 dark:text-red-500' },
    { label: isArabic ? 'إلزامي' : 'MANDATORY', value: stats.mandatoryCount, color: 'text-purple-600 dark:text-purple-500' },
    { label: isArabic ? 'الأنشطة' : 'ACTIVITIES', value: stats.totalActivities, color: 'text-primary-600 dark:text-primary-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden mb-8">
      {statItems.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-zinc-900 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
          <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1">
            {item.label}
          </div>
          <div className={`text-2xl font-black font-mono ${item.color}`}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 3. Module Selector (Directory Style)
// ============================================

function ModuleSelector({
  modules,
  selectedModule,
  onSelectModule,
  locale
}: {
  modules: ModuleSummary[];
  selectedModule: string | null;
  onSelectModule: (module: string | null) => void;
  locale: string;
}) {
  const isArabic = locale === 'ar';

  return (
    <div className="mb-8">
      <h3 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
        <FiFolder /> {isArabic ? 'وحدات_النظام' : 'COMPLIANCE_MODULES'}
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectModule(null)}
          className={`
            px-3 py-2 rounded-md text-xs font-bold font-mono uppercase tracking-wide border transition-all
            ${!selectedModule
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white'
              : 'bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
            }
          `}
        >
          {isArabic ? 'الكل' : 'ALL_ROOT'}
        </button>
        {modules.map((module) => (
          <button
            key={module.module}
            onClick={() => onSelectModule(selectedModule === module.module ? null : module.module)}
            className={`
              px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wide border transition-all flex items-center gap-2
              ${selectedModule === module.module
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-primary-200 dark:border-primary-800 shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }
            `}
          >
            {module.moduleLabel[locale as 'en' | 'ar']}
            <span className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[9px] font-mono text-zinc-500">
              {module.ruleCount}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 4. Rule Row (Log Entry Style)
// ============================================

function RuleRow({
  rule,
  locale,
  onClick
}: {
  rule: ComplianceRule;
  locale: string;
  onClick: () => void;
}) {
  const riskLevel = parseRiskLevel(rule.risk_level);
  const isArabic = locale === 'ar';

  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
    >
      {/* Indicator Line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-primary-500 transition-colors" />

      {/* ID & Meta */}
      <div className="min-w-[140px] shrink-0">
        <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-200 flex items-center gap-2">
          <FiHash className="text-zinc-400" />
          {rule.rule_id}
        </div>
        <div className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider font-mono">
          {rule.article_reference[locale as 'en' | 'ar']}
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
          {rule.description[locale as 'en' | 'ar']}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 shrink-0">
        <RiskBadge level={riskLevel} locale={locale} />
        <div className={`text-zinc-300 group-hover:text-primary-500 transition-colors transform ${isArabic ? 'rotate-180' : ''}`}>
          <FiArrowRight />
        </div>
      </div>
    </div>
  );
}

// ============================================
// 5. Slide-Over Inspector (The "Detail View")
// ============================================

function RuleInspector({
  rule,
  locale,
  onClose
}: {
  rule: ComplianceRule;
  locale: string;
  onClose: () => void;
}) {
  const riskLevel = parseRiskLevel(rule.risk_level);
  const isArabic = locale === 'ar';
  const lang = locale as 'en' | 'ar';

  return (
    <>
      <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />

      <div className={`fixed inset-y-0 ${isArabic ? 'left-0' : 'right-0'} w-full max-w-2xl bg-white dark:bg-zinc-950 shadow-2xl z-50 overflow-y-auto border-l border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out`}>

        {/* Header */}
        <div className="sticky top-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 p-6 flex justify-between items-start z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono font-bold text-zinc-400">{rule.rule_id}</span>
              <RiskBadge level={riskLevel} locale={locale} />
              <EnforcementBadge rule={rule} locale={locale} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug">
              {rule.article_reference[lang]}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-8">

          {/* Main Description */}
          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">
              {isArabic ? 'نص القاعدة' : 'RULE_DESCRIPTION'}
            </h3>
            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {rule.description[lang]}
            </p>
          </div>

          {/* Logic Grid */}
          <div className="grid grid-cols-1 gap-6">

            {/* Condition */}
            <div className="border-l-2 border-amber-500 pl-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                <FiAlertTriangle className="text-amber-500" />
                {isArabic ? 'الشرط (متى ينطبق؟)' : 'Condition (Trigger)'}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {rule.condition[lang]}
              </p>
            </div>

            {/* Action */}
            <div className="border-l-2 border-emerald-500 pl-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                <FiActivity className="text-emerald-500" />
                {isArabic ? 'الإجراء المطلوب' : 'Required Action'}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {rule.required_action[lang]}
              </p>
            </div>

          </div>

          {/* Evidence Checklist */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <FiFolder /> {isArabic ? 'المستندات_والأدلة' : 'REQUIRED_EVIDENCE'}
            </h3>
            <ul className="space-y-3">
              {rule.evidence[lang].map((item, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded border border-zinc-100 dark:border-zinc-800">
                  <FiCheckCircle className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Penalty */}
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-1">
              <FiAlertTriangle /> {isArabic ? 'مرجع العقوبة' : 'PENALTY_REF'}
            </div>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">
              {rule.penalty_reference[lang]}
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

// ============================================
// 6. Main Controller
// ============================================

export default function ComplianceCheckerPage({ params: { locale } }: { params: { locale: string } }) {
  const isArabic = locale === 'ar';

  // State
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRule, setSelectedRule] = useState<ComplianceRule | null>(null);

  // Data
  const modules = useMemo(() => getModuleSummaries(), []);

  // Filtered rules
  const filteredRules = useMemo(() => {
    let rules = getAllRules();
    if (selectedModule) rules = getRulesByModule(selectedModule);
    if (selectedRisk) rules = rules.filter(r => parseRiskLevel(r.risk_level) === selectedRisk);
    if (searchQuery.trim()) {
      const searchResults = searchRules(searchQuery, locale as 'en' | 'ar');
      const searchIds = new Set(searchResults.map(r => r.rule_id));
      rules = rules.filter(r => searchIds.has(r.rule_id));
    }
    return rules;
  }, [selectedModule, selectedRisk, searchQuery, locale]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-primary-500/30">

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Hero Header */}
      <section className="relative pt-32 pb-12 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                <FiShield className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  {isArabic ? 'نظام_الامتثال_الآلي' : 'COMPLIANCE_ENGINE_V2'}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-zinc-900 dark:text-white">
                {isArabic ? 'فاحص الامتثال التنظيمي' : 'Regulatory Compliance Checker'}
              </h1>
              <p className="text-lg text-zinc-500 dark:text-zinc-400 font-light max-w-2xl leading-relaxed">
                {isArabic
                  ? 'محرك بحث متقدم لتحليل لوائح البنك المركزي وهيئة السوق المالية.'
                  : 'Advanced query engine for SAMA & CMA regulatory frameworks.'}
              </p>
            </div>

            {/* Assessment CTA */}
            <div>
              <Link
                href={`/${locale}/web/products/compliance-checker/assess`}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-sm uppercase tracking-wider rounded hover:bg-primary-600 dark:hover:bg-zinc-200 transition-all shadow-lg"
              >
                <span>{isArabic ? 'بدء التقييم الآلي' : 'RUN_AUTO_ASSESSMENT'}</span>
                {isArabic ? <FiArrowLeft /> : <FiArrowRight />}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interface */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">

        {/* Stats */}
        <DashboardStats locale={locale} />

        {/* Controls Toolbar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">

          {/* Search Bar: The "CLI" */}
          <div className="flex-1 relative group">
            <div className="absolute top-1/2 -translate-y-1/2 left-4 rtl:right-4 text-zinc-400 group-focus-within:text-primary-500 transition-colors">
              <FiSearch />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isArabic ? 'بحث في معرف القاعدة، النص، أو المادة...' : 'Query rule_id, content, or reference...'}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-sm font-mono text-zinc-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all shadow-sm"
            />
          </div>

          {/* Risk Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase whitespace-nowrap">
              {isArabic ? 'مستوى_الخطر:' : 'RISK_LEVEL:'}
            </span>
            {['High', 'Medium', 'Low'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedRisk(selectedRisk === level ? null : level as RiskLevel)}
                className={`
                  px-3 py-2 rounded text-xs font-bold uppercase tracking-wide border transition-all whitespace-nowrap
                  ${selectedRisk === level
                    ? 'bg-zinc-800 text-white border-zinc-800'
                    : 'bg-white dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                  }
                `}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar: Modules */}
          <div className="lg:col-span-1">
            <ModuleSelector
              modules={modules}
              selectedModule={selectedModule}
              onSelectModule={setSelectedModule}
              locale={locale}
            />
          </div>

          {/* Main List: Rules */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-sm">

              {/* List Header */}
              <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                  {isArabic ? 'نتائج_البحث' : 'QUERY_RESULTS'}
                </span>
                <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded">
                  {filteredRules.length}
                </span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                {filteredRules.length > 0 ? (
                  filteredRules.map((rule) => (
                    <RuleRow
                      key={rule.rule_id}
                      rule={rule}
                      locale={locale}
                      onClick={() => setSelectedRule(rule)}
                    />
                  ))
                ) : (
                  <div className="p-12 text-center text-zinc-400">
                    <FiFolder className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="font-mono text-sm">NO_DATA_FOUND</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Slide-Over Detail View */}
      {selectedRule && (
        <RuleInspector
          rule={selectedRule}
          locale={locale}
          onClose={() => setSelectedRule(null)}
        />
      )}

    </div>
  );
}