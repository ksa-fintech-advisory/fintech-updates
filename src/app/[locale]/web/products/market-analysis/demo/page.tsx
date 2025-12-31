'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MARKET_DATA, VERTICAL_LABELS, MarketVertical } from './market-data';

export default function MarketAnalysisDemoPage({ params: { locale } }: { params: { locale: string } }) {
  const isArabic = locale === 'ar';
  const [activeVertical, setActiveVertical] = useState<MarketVertical>('payments');

  const data = MARKET_DATA[activeVertical];

  return (
    <div className="min-h-screen bg-grey-50 pb-24 font-sans">
      {/* Top Navigation Bar */}
      <div className="bg-slate-900 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
               <Link href={`/${locale}/web/products/market-analysis`} className="text-purple-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
               </Link>
               <div>
                  <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    {isArabic ? 'محاكي السوق' : 'Market Simulator'}
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">BETA</span>
                  </h1>
                  <p className="text-xs text-slate-400">KSA FinTech Outlook 2025</p>
               </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
               {(Object.keys(VERTICAL_LABELS) as MarketVertical[]).map((v) => (
                 <button
                   key={v}
                   onClick={() => setActiveVertical(v)}
                   className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                     activeVertical === v 
                       ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' 
                       : 'bg-white/5 text-slate-300 hover:bg-white/10'
                   }`}
                 >
                   {VERTICAL_LABELS[v][locale as 'en' | 'ar']}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           {/* TAM Card */}
           <div className="bg-white rounded-2xl p-6 border border-grey-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h3 className="text-sm font-medium text-grey-500 uppercase tracking-wider">{isArabic ? 'إجمالي السوق المتاح' : 'Total Addressable Market'}</h3>
                    <div className="text-3xl font-black text-slate-900 mt-1">
                       {data.tam} <span className="text-lg text-grey-400 font-medium">SAR Bn</span>
                    </div>
                 </div>
                 <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                 </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                 <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">+{data.cagr}% CAGR</span>
                 <span className="text-grey-400">{isArabic ? 'بحلول 2030' : 'Through 2030'}</span>
              </div>
           </div>

           {/* Companies Card */}
           <div className="bg-white rounded-2xl p-6 border border-grey-100 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                 <div>
                    <h3 className="text-sm font-medium text-grey-500 uppercase tracking-wider">{isArabic ? 'الشركات النشطة' : 'Active Companies'}</h3>
                    <div className="text-3xl font-black text-slate-900 mt-1">
                       {data.activeCompanies}
                    </div>
                 </div>
                 <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                 </div>
              </div>
              <div className="w-full bg-grey-100 h-2 rounded-full overflow-hidden">
                 <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(data.activeCompanies / 50) * 100}%` }}></div>
              </div>
              <div className="mt-2 text-xs text-grey-400 text-end">
                 {isArabic ? 'درجة التشبع' : 'Saturation Index'}
              </div>
           </div>

           {/* Insight Card */}
           <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                 {isArabic ? 'رؤية الذكاء الاصطناعي' : 'AI Insight'}
              </h3>
              <p className="text-sm leading-relaxed font-light text-slate-100">
                 "{data.insight[locale as 'en' | 'ar']}"
              </p>
           </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Chart Section */}
           <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-grey-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">{isArabic ? 'اتجاه النمو (5 سنوات)' : 'Growth Trend (5-Year)'}</h3>
              
              {/* Custom SVG Chart */}
              <div className="relative h-64 w-full flex items-end justify-between gap-2 px-2 pb-6">
                 {/* Grid Lines */}
                 <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                    <div className="w-full h-px bg-grey-100"></div>
                    <div className="w-full h-px bg-grey-100"></div>
                    <div className="w-full h-px bg-grey-100"></div>
                    <div className="w-full h-px bg-grey-100"></div>
                    <div className="w-full h-px bg-grey-100"></div>
                 </div>

                 {data.growthTrend.map((value, i) => {
                    const height = (value / Math.max(...data.growthTrend)) * 100;
                    return (
                       <div key={i} className="relative w-full h-full flex flex-col justify-end group">
                          <div 
                            className="w-full bg-purple-500 rounded-t-lg transition-all duration-500 ease-out group-hover:bg-purple-600 relative"
                            style={{ height: `${height}%` }}
                          >
                             {/* Tooltip */}
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                {value}Bn SAR
                             </div>
                          </div>
                          <div className="text-center mt-2 text-xs text-grey-400 font-medium">
                             {2023 + i}
                          </div>
                       </div>
                    );
                 })}
              </div>
           </div>

           {/* Competitors List */}
           <div className="bg-white rounded-3xl p-6 sm:p-8 border border-grey-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">{isArabic ? 'كبار اللاعبين' : 'Top Players'}</h3>
              <div className="space-y-4">
                 {data.topPlayers.map((player, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-grey-50 transition-colors border border-transparent hover:border-grey-100 group">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-white group-hover:shadow-sm">
                             {i + 1}
                          </div>
                          <span className="font-medium text-slate-900">{player.name}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-grey-100 rounded-full overflow-hidden">
                             <div className="h-full bg-green-500 rounded-full" style={{ width: `${player.share}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-green-600">{player.share}%</span>
                       </div>
                    </div>
                 ))}
              </div>

               <div className="mt-8 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <h4 className="text-sm font-bold text-purple-900 mb-2">{isArabic ? 'هل تريد التعمق أكثر؟' : 'Want deeper analysis?'}</h4>
                  <p className="text-xs text-purple-700 mb-3 leading-relaxed">
                     {isArabic 
                       ? 'احصل على التقرير الكامل الذي يتضمن تحليلاً تفصيلياً لـ 50+ شركة.' 
                       : 'Get the full report including detailed analysis on 50+ companies.'}
                  </p>
                  <button className="w-full py-2 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
                     {isArabic ? 'تحميل التقرير' : 'Download Report'}
                  </button>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
}
