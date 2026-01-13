'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRuleById } from '@/services/compliance-checker/engine'; // تأكد من مسار الاستيراد الصحيح
import {
  FiArrowLeft, FiArrowRight, FiShield, FiAlertTriangle,
  FiCheckSquare, FiFileText, FiActivity, FiLock, FiCpu
} from 'react-icons/fi';

export default function RuleDetailsPage({
  params: { locale, ruleId }
}: {
  params: { locale: string; ruleId: string }
}) {
  const isArabic = locale === 'ar';
  const rule = getRuleById(ruleId);

  if (!rule) {
    notFound();
  }

  // تحديد الألوان بناءً على المخاطر
  const riskColor = rule.risk_level.en === 'High' ? 'red' :
    rule.risk_level.en === 'Medium' ? 'amber' : 'emerald';

  const riskBg = rule.risk_level.en === 'High' ? 'bg-red-500' :
    rule.risk_level.en === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-primary-500/30 pb-24">

      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Header / Breadcrumbs */}
      <div className="relative pt-24 pb-8 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md z-10 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/web/products/compliance-checker/assess`} // عدل الرابط حسب مسار صفحة التقييم لديك
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 hover:text-primary-600 transition-colors uppercase tracking-widest mb-6"
          >
            {isArabic ? <FiArrowRight /> : <FiArrowLeft />}
            {isArabic ? 'العودة للتقرير' : 'BACK_TO_REPORT'}
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] font-mono font-bold text-zinc-500 uppercase">
                  RULE_ID: {ruleId}
                </span>
                <span className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase text-white ${riskBg}`}>
                  {rule.risk_level[locale as 'en' | 'ar']} RISK
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                {isArabic ? 'تفاصيل القاعدة التنظيمية' : 'Regulatory Rule Details'}
              </h1>
            </div>

            {/* Meta Badges */}
            <div className="flex gap-2">
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm text-center min-w-[100px]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase mb-1">{isArabic ? 'الوحدة' : 'MODULE'}</div>
                <div className="font-bold text-sm text-zinc-800 dark:text-zinc-200 truncate max-w-[150px]">
                  {rule.module[locale as 'en' | 'ar']}
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm text-center min-w-[100px]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase mb-1">{isArabic ? 'المادة' : 'ARTICLE'}</div>
                <div className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
                  {rule.article_reference[locale as 'en' | 'ar']}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Logic & Action */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FiFileText className="text-primary-600" />
                <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  {isArabic ? 'الوصف والنطاق' : 'DESCRIPTION & SCOPE'}
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                {rule.description[locale as 'en' | 'ar']}
              </p>
            </div>

            {/* Required Action (The Core) */}
            <div className="bg-zinc-900 dark:bg-zinc-950 rounded-2xl border border-zinc-800 p-1 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-purple-500 opacity-70"></div>
              <div className="bg-zinc-900/50 p-7 rounded-xl backdrop-blur-sm relative z-10">
                <div className="flex items-center gap-2 mb-4 text-primary-400">
                  <FiCpu className="w-5 h-5" />
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    {isArabic ? 'الإجراء التقني/التنظيمي المطلوب' : 'REQUIRED ACTION / IMPLEMENTATION'}
                  </h2>
                </div>
                <div className="font-mono text-base md:text-lg text-white leading-relaxed bg-black/30 p-4 rounded-lg border border-white/10">
                  {">"} {rule.required_action[locale as 'en' | 'ar']}
                </div>
              </div>
            </div>

            {/* Evidence List */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <FiCheckSquare className="text-emerald-500" />
                <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  {isArabic ? 'أدلة الامتثال المقبولة' : 'ACCEPTED EVIDENCE'}
                </h2>
              </div>
              <ul className="space-y-4">
                {rule.evidence[locale as 'en' | 'ar'].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                    <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Metadata Sidebar */}
          <div className="space-y-6">

            {/* Risk Analysis Widget */}
            <div className={`rounded-2xl border p-6 ${rule.risk_level.en === 'High'
                ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30'
                : rule.risk_level.en === 'Medium'
                  ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30'
                  : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30'
              }`}>
              <div className="flex items-center gap-2 mb-4">
                <FiActivity className={
                  rule.risk_level.en === 'High' ? 'text-red-600' :
                    rule.risk_level.en === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                } />
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  {isArabic ? 'تحليل الأثر' : 'IMPACT ANALYSIS'}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-zinc-500 uppercase mb-1">{isArabic ? 'نوع التنفيذ' : 'Enforcement'}</div>
                  <div className="font-bold text-zinc-900 dark:text-white">{rule.enforcement_type[locale as 'en' | 'ar']}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase mb-1">{isArabic ? 'المخاطر' : 'Risk Level'}</div>
                  <div className={`font-bold ${rule.risk_level.en === 'High' ? 'text-red-600' :
                      rule.risk_level.en === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                    {rule.risk_level[locale as 'en' | 'ar']}
                  </div>
                </div>
              </div>
            </div>

            {/* Penalties Widget */}
            <div className="bg-zinc-900 text-white rounded-2xl p-6 border border-zinc-800 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-zinc-400">
                <FiLock />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  {isArabic ? 'العقوبات المترتبة' : 'NON-COMPLIANCE PENALTY'}
                </h3>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-zinc-700 pl-4">
                {rule.penalty_reference[locale as 'en' | 'ar']}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}