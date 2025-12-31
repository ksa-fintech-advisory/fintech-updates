'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRuleById } from '@/services/compliance-checker/engine';

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

  return (
    <div className="min-h-screen bg-grey-50 pb-24">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href={`/${locale}/web/products/compliance-checker/assess`} className="hover:text-white">
              {isArabic ? 'التقييم' : 'Assessment'}
            </Link>
            <span>/</span>
            <span className="text-white">
              {ruleId}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            {isArabic ? 'تفاصيل القاعدة' : 'Rule Details'}
          </h1>
          <p className="text-green-100 max-w-xl font-mono text-lg">
            {ruleId}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Main Rule Card */}
          <div className="bg-white rounded-3xl p-8 border border-grey-100 shadow-sm">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${
                rule.risk_level.en === 'High' ? 'bg-red-100 text-red-700' :
                rule.risk_level.en === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {rule.risk_level[locale as 'en' | 'ar']} {isArabic ? 'المخاطر' : 'Risk'}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-50 text-blue-700">
                {rule.module[locale as 'en' | 'ar']}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-grey-100 text-grey-700">
                {rule.article_reference[locale as 'en' | 'ar']}
              </span>
            </div>

            <h2 className="text-xl font-bold text-grey-900 mb-4">
              {isArabic ? 'الوصف' : 'Description'}
            </h2>
            <p className="text-grey-700 text-lg leading-relaxed mb-8">
              {rule.description[locale as 'en' | 'ar']}
            </p>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {isArabic ? 'الإجراء المطلوب' : 'Required Action'}
              </h3>
              <p className="text-grey-800 font-medium">
                {rule.required_action[locale as 'en' | 'ar']}
              </p>
            </div>
          </div>

          {/* Evidence Card */}
          <div className="bg-white rounded-3xl p-8 border border-grey-100 shadow-sm">
            <h3 className="text-lg font-bold text-grey-900 mb-6">
              {isArabic ? 'أدلة الامتثال المقترحة' : 'Suggested Compliance Evidence'}
            </h3>
            <ul className="space-y-4">
              {rule.evidence[locale as 'en' | 'ar'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">{i + 1}</span>
                  </div>
                  <span className="text-grey-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metadata Card */}
          <div className="bg-grey-50 rounded-3xl p-8 border border-grey-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="text-xs font-bold text-grey-500 uppercase block mb-1">
                  {isArabic ? 'نوع التنفيذ' : 'Enforcement Type'}
                </span>
                <span className="font-medium text-grey-900">
                  {rule.enforcement_type[locale as 'en' | 'ar']}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-grey-500 uppercase block mb-1">
                  {isArabic ? 'مرجع العقوبة' : 'Penalty Reference'}
                </span>
                <span className="font-medium text-grey-900">
                  {rule.penalty_reference[locale as 'en' | 'ar']}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
