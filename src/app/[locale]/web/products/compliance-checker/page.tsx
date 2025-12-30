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
  getActivities,
  getDecisionFlows,
  getChecklists,
} from '@/services/compliance-checker/engine';
import type { ComplianceRule, RiskLevel, ModuleSummary } from '@/services/compliance-checker/types';
import { parseRiskLevel, isMandatory } from '@/services/compliance-checker/types';

// ============================================
// Helper Components
// ============================================

function RiskBadge({ level, locale }: { level: RiskLevel; locale: string }) {
  const colors = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  };

  const labels = {
    High: { en: 'High Risk', ar: 'عالي المخاطر' },
    Medium: { en: 'Medium Risk', ar: 'متوسط المخاطر' },
    Low: { en: 'Low Risk', ar: 'منخفض المخاطر' },
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colors[level]}`}>
      {labels[level][locale as 'en' | 'ar']}
    </span>
  );
}

function EnforcementBadge({ rule, locale }: { rule: ComplianceRule; locale: string }) {
  const mandatory = isMandatory(rule.enforcement_type);

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${mandatory
        ? 'bg-purple-100 text-purple-700 border-purple-200'
        : 'bg-grey-100 text-grey-600 border-grey-200'
      }`}>
      {rule.enforcement_type[locale as 'en' | 'ar']}
    </span>
  );
}

function ModuleIcon({ module }: { module: string }) {
  const icons: Record<string, string> = {
    'Licensing': '📜',
    'Governance': '🏛️',
    'Operations': '⚙️',
    'Reporting & Notifications': '📊',
    'Outsourcing & Third Parties': '🤝',
    'Data & Cybersecurity': '🔒',
    'Capital & Financials': '💰',
  };

  return <span className="text-2xl">{icons[module] || '📋'}</span>;
}

// ============================================
// Dashboard Stats Component
// ============================================

function DashboardStats({ locale }: { locale: string }) {
  const stats = getComplianceStats();
  const isArabic = locale === 'ar';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-grey-100">
        <div className="text-3xl font-black text-grey-900">{stats.totalRules}</div>
        <div className="text-sm text-grey-500">{isArabic ? 'قاعدة تنظيمية' : 'Compliance Rules'}</div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-grey-100">
        <div className="text-3xl font-black text-red-600">{stats.riskScore.high}</div>
        <div className="text-sm text-grey-500">{isArabic ? 'عالي المخاطر' : 'High Risk'}</div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-grey-100">
        <div className="text-3xl font-black text-purple-600">{stats.mandatoryCount}</div>
        <div className="text-sm text-grey-500">{isArabic ? 'إلزامي' : 'Mandatory'}</div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-grey-100">
        <div className="text-3xl font-black text-blue-600">{stats.totalActivities}</div>
        <div className="text-sm text-grey-500">{isArabic ? 'نشاط مرخص' : 'Activities'}</div>
      </div>
    </div>
  );
}

// ============================================
// Module Cards Component
// ============================================

function ModuleCards({
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
      {modules.map((module) => (
        <button
          key={module.module}
          onClick={() => onSelectModule(selectedModule === module.module ? null : module.module)}
          className={`text-start p-5 rounded-2xl border transition-all ${selectedModule === module.module
              ? 'bg-green-50 border-green-300 shadow-lg'
              : 'bg-white border-grey-100 hover:border-green-200 hover:shadow-md'
            }`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <ModuleIcon module={module.module} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-grey-900 text-sm mb-1">
                {module.moduleLabel[locale as 'en' | 'ar']}
              </h3>
              <div className="flex items-center gap-2 text-xs text-grey-500">
                <span>{module.ruleCount} {locale === 'ar' ? 'قاعدة' : 'rules'}</span>
                {module.highRiskCount > 0 && (
                  <span className="text-red-600">
                    {module.highRiskCount} {locale === 'ar' ? 'عالي' : 'high'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ============================================
// Rule Card Component
// ============================================

function RuleCard({
  rule,
  locale,
  onClick
}: {
  rule: ComplianceRule;
  locale: string;
  onClick: () => void;
}) {
  const riskLevel = parseRiskLevel(rule.risk_level);

  return (
    <button
      onClick={onClick}
      className="w-full text-start p-5 bg-white rounded-xl border border-grey-100 hover:border-green-200 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-grey-400 mb-1">{rule.rule_id}</div>
          <h4 className="font-semibold text-grey-900 text-sm line-clamp-2">
            {rule.description[locale as 'en' | 'ar']}
          </h4>
        </div>
        <RiskBadge level={riskLevel} locale={locale} />
      </div>
      <div className="flex items-center gap-2 text-xs text-grey-500">
        <span className="bg-grey-100 px-2 py-0.5 rounded">
          {rule.article_reference[locale as 'en' | 'ar']}
        </span>
        <span>{rule.module[locale as 'en' | 'ar']}</span>
      </div>
    </button>
  );
}

// ============================================
// Rule Detail Modal
// ============================================

function RuleDetailModal({
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-20">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-green-200 text-sm mb-1">{rule.rule_id}</div>
                <h2 className="text-xl font-bold">{rule.article_reference[lang]}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-green-50">{rule.description[lang]}</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <RiskBadge level={riskLevel} locale={locale} />
              <EnforcementBadge rule={rule} locale={locale} />
              <span className="px-2.5 py-1 text-xs font-medium rounded-full border bg-blue-100 text-blue-700 border-blue-200">
                {rule.module[lang]}
              </span>
            </div>

            {/* Condition */}
            <div>
              <h3 className="text-sm font-semibold text-grey-900 mb-2">
                {isArabic ? 'الشرط' : 'Condition'}
              </h3>
              <p className="text-sm text-grey-600 bg-grey-50 p-3 rounded-lg">
                {rule.condition[lang]}
              </p>
            </div>

            {/* Required Action */}
            <div>
              <h3 className="text-sm font-semibold text-grey-900 mb-2">
                {isArabic ? 'الإجراء المطلوب' : 'Required Action'}
              </h3>
              <p className="text-sm text-grey-600 bg-green-50 p-3 rounded-lg border border-green-100">
                {rule.required_action[lang]}
              </p>
            </div>

            {/* Evidence */}
            <div>
              <h3 className="text-sm font-semibold text-grey-900 mb-2">
                {isArabic ? 'الأدلة المطلوبة' : 'Required Evidence'}
              </h3>
              <ul className="space-y-2">
                {rule.evidence[lang].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-grey-600">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Penalty */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h3 className="text-sm font-semibold text-red-800 mb-1">
                {isArabic ? 'العقوبة' : 'Penalty Reference'}
              </h3>
              <p className="text-sm text-red-700">
                {rule.penalty_reference[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Search Bar Component
// ============================================

function SearchBar({
  value,
  onChange,
  locale
}: {
  value: string;
  onChange: (value: string) => void;
  locale: string;
}) {
  const isArabic = locale === 'ar';

  return (
    <div className="relative mb-6">
      <svg
        className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-grey-400 ${isArabic ? 'right-4' : 'left-4'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isArabic ? 'ابحث في القواعد التنظيمية...' : 'Search compliance rules...'}
        className={`w-full bg-white border border-grey-200 rounded-xl py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent ${isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'
          }`}
      />
    </div>
  );
}

// ============================================
// Risk Filter Component
// ============================================

function RiskFilter({
  selected,
  onChange,
  locale
}: {
  selected: RiskLevel | null;
  onChange: (level: RiskLevel | null) => void;
  locale: string;
}) {
  const isArabic = locale === 'ar';
  const levels: RiskLevel[] = ['High', 'Medium', 'Low'];

  const labels: Record<RiskLevel, { en: string; ar: string }> = {
    High: { en: 'High', ar: 'عالي' },
    Medium: { en: 'Medium', ar: 'متوسط' },
    Low: { en: 'Low', ar: 'منخفض' },
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm text-grey-500">
        {isArabic ? 'تصفية حسب المخاطر:' : 'Filter by risk:'}
      </span>
      <div className="flex gap-2">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onChange(selected === level ? null : level)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${selected === level
                ? level === 'High'
                  ? 'bg-red-600 text-white'
                  : level === 'Medium'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-green-600 text-white'
                : 'bg-grey-100 text-grey-600 hover:bg-grey-200'
              }`}
          >
            {labels[level][locale as 'en' | 'ar']}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Main Page Component
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
  const stats = useMemo(() => getComplianceStats(), []);

  // Filtered rules
  const filteredRules = useMemo(() => {
    let rules = getAllRules();

    // Filter by module
    if (selectedModule) {
      rules = getRulesByModule(selectedModule);
    }

    // Filter by risk level
    if (selectedRisk) {
      rules = rules.filter(r => parseRiskLevel(r.risk_level) === selectedRisk);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const searchResults = searchRules(searchQuery, locale as 'en' | 'ar');
      const searchIds = new Set(searchResults.map(r => r.rule_id));
      rules = rules.filter(r => searchIds.has(r.rule_id));
    }

    return rules;
  }, [selectedModule, selectedRisk, searchQuery, locale]);

  return (
    <div className="min-h-screen bg-grey-50 pb-24">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-slate-900 opacity-90">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="flex items-center gap-2 mb-4">
            <Link href={`/${locale}/web/products`} className="text-green-300 hover:text-white transition-colors text-sm">
              {isArabic ? 'المنتجات' : 'Products'}
            </Link>
            <span className="text-green-500">/</span>
            <span className="text-green-100 text-sm">
              {isArabic ? 'فاحص الامتثال' : 'Compliance Checker'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {isArabic ? 'فاحص الامتثال' : 'Compliance Checker'}
          </h1>

          <p className="text-lg text-green-100 max-w-2xl leading-relaxed mb-6">
            {isArabic 
              ? 'استكشف متطلبات لوائح هيئة السوق المالية للتكنولوجيا المالية في المملكة العربية السعودية. ابحث في القواعد التنظيمية حسب الوحدة أو مستوى المخاطر أو السيناريو التجاري.'
              : 'Explore CMA regulatory requirements for fintech in Saudi Arabia. Browse compliance rules by module, risk level, or business scenario.'
            }
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-green-200">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {stats.totalRules} {isArabic ? 'قاعدة' : 'Rules'}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {stats.metadata.total_articles} {isArabic ? 'مادة' : 'Articles'}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {isArabic ? 'آخر تحديث:' : 'Updated:'} {stats.metadata.extraction_date}
            </span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Stats Cards */}
        <DashboardStats locale={locale} />

        {/* Module Navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-grey-900 mb-4">
            {isArabic ? 'تصفح حسب الوحدة' : 'Browse by Module'}
          </h2>
          <ModuleCards
            modules={modules}
            selectedModule={selectedModule}
            onSelectModule={setSelectedModule}
            locale={locale}
          />
        </div>

        {/* Rules Browser */}
        <div className="bg-white rounded-3xl shadow-sm border border-grey-100 p-6">
          <h2 className="text-lg font-bold text-grey-900 mb-4">
            {isArabic ? 'القواعد التنظيمية' : 'Compliance Rules'}
            {selectedModule && (
              <span className="text-green-600 font-normal ms-2">
                ({modules.find(m => m.module === selectedModule)?.moduleLabel[locale as 'en' | 'ar']})
              </span>
            )}
          </h2>

          <SearchBar value={searchQuery} onChange={setSearchQuery} locale={locale} />
          <RiskFilter selected={selectedRisk} onChange={setSelectedRisk} locale={locale} />

          <div className="text-sm text-grey-500 mb-4">
            {isArabic
              ? `عرض ${filteredRules.length} قاعدة`
              : `Showing ${filteredRules.length} rules`}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRules.map((rule) => (
              <RuleCard
                key={rule.rule_id}
                rule={rule}
                locale={locale}
                onClick={() => setSelectedRule(rule)}
              />
            ))}
          </div>

          {filteredRules.length === 0 && (
            <div className="text-center py-12 text-grey-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{isArabic ? 'لا توجد قواعد مطابقة' : 'No matching rules found'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Rule Detail Modal */}
      {selectedRule && (
        <RuleDetailModal
          rule={selectedRule}
          locale={locale}
          onClose={() => setSelectedRule(null)}
        />
      )}
    </div>
  );
}
