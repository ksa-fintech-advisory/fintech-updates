'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
   FiArrowUpRight,
   FiArrowLeft,
   FiArrowRight,
   FiActivity,
   FiUsers,
   FiPieChart,
   FiTarget,
   FiCpu
} from 'react-icons/fi';
import { MARKET_DATA, VERTICAL_LABELS, MarketVertical } from './market-data';

export default function MarketAnalysisDemoPage({ params: { locale } }: { params: { locale: string } }) {
   const isArabic = locale === 'ar';
   const [activeVertical, setActiveVertical] = useState<MarketVertical>('payments');

   const data = MARKET_DATA[activeVertical];

   return (
      <div className="min-h-screen bg-black font-sans selection:bg-purple-500/30 text-zinc-100 pb-24">

         {/* 1. Background Matrix Grid */}
         <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

         {/* 2. Top Navigation Bar */}
         <div className="relative z-10 border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">

                  {/* Breadcrumb & Title */}
                  <div className="flex items-center gap-4">
                     <Link
                        href={`/${locale}/web/products/market-analysis`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                     >
                        {isArabic ? <FiArrowRight /> : <FiArrowLeft />}
                     </Link>
                     <div>
                        <div className="flex items-center gap-2 mb-0.5">
                           <h1 className="text-lg font-bold text-white tracking-tight">
                              {isArabic ? 'محاكي السوق المالي' : 'Market Simulator'}
                           </h1>
                           <span className="text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20 uppercase">
                              BETA v2.0
                           </span>
                        </div>
                        <p className="text-xs text-zinc-500 font-mono">KSA FinTech Outlook 2030</p>
                     </div>
                  </div>

                  {/* Vertical Switcher (Segmented Control) */}
                  <div className="flex p-1 bg-zinc-900 rounded-lg border border-zinc-800 overflow-x-auto scrollbar-hide">
                     {(Object.keys(VERTICAL_LABELS) as MarketVertical[]).map((v) => (
                        <button
                           key={v}
                           onClick={() => setActiveVertical(v)}
                           className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${activeVertical === v
                                 ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700'
                                 : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                        >
                           {VERTICAL_LABELS[v][locale as 'en' | 'ar']}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

            {/* 3. KPI Grid (The Dashboard) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

               {/* KPI 1: TAM */}
               <div className="group bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-purple-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                           <FiTarget /> {isArabic ? 'حجم السوق المستهدف' : 'TAM (2030)'}
                        </h3>
                     </div>
                     <div className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-mono font-bold border border-emerald-500/20 flex items-center gap-1">
                        <FiArrowUpRight /> {data.cagr}% CAGR
                     </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                     <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                        {data.tam}
                     </div>
                     <span className="text-sm font-bold text-zinc-500">SAR Bn</span>
                  </div>

                  {/* Mini Progress Bar */}
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-4 overflow-hidden">
                     <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full w-3/4 rounded-full animate-pulse"></div>
                  </div>
               </div>

               {/* KPI 2: Active Companies */}
               <div className="group bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-blue-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                           <FiUsers /> {isArabic ? 'الشركات النشطة' : 'Active Entities'}
                        </h3>
                     </div>
                     <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400">
                        <FiActivity />
                     </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                     {data.activeCompanies}
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">
                     {isArabic
                        ? 'مرخصة من البنك المركزي / هيئة السوق المالية'
                        : 'Licensed by SAMA / CMA'}
                  </p>
               </div>

               {/* KPI 3: AI Insight (The "Jarvis" Box) */}
               <div className="relative bg-zinc-900/80 rounded-2xl p-6 border border-zinc-700/50 overflow-hidden flex flex-col justify-center">
                  {/* Background Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                  <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <FiCpu className="animate-pulse" />
                     {isArabic ? 'تحليل الذكاء الاصطناعي' : 'AI_SYSTEM_INSIGHT'}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-zinc-200 border-l-2 border-purple-500 pl-3">
                     "{data.insight[locale as 'en' | 'ar']}"
                  </p>
               </div>
            </div>

            {/* 4. Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

               {/* Chart Section */}
               <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-zinc-800 relative">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <FiActivity /> {isArabic ? 'توقعات النمو (5 سنوات)' : 'Growth Projection (5-Year)'}
                     </h3>
                     <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                        <span className="text-[10px] text-zinc-500 uppercase">Projected Vol.</span>
                     </div>
                  </div>

                  {/* Custom SVG Chart (Dark Mode Optimized) */}
                  <div className="relative h-64 w-full flex items-end justify-between gap-4 px-2 pb-6">
                     {/* Grid Lines */}
                     <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 opacity-20">
                        <div className="w-full h-px bg-zinc-500 border-t border-dashed border-zinc-500"></div>
                        <div className="w-full h-px bg-zinc-500 border-t border-dashed border-zinc-500"></div>
                        <div className="w-full h-px bg-zinc-500 border-t border-dashed border-zinc-500"></div>
                        <div className="w-full h-px bg-zinc-500 border-t border-dashed border-zinc-500"></div>
                        <div className="w-full h-px bg-zinc-500 border-t border-dashed border-zinc-500"></div>
                     </div>

                     {data.growthTrend.map((value, i) => {
                        const height = (value / Math.max(...data.growthTrend)) * 100;
                        return (
                           <div key={i} className="relative w-full h-full flex flex-col justify-end group">
                              {/* The Bar */}
                              <div
                                 className="w-full bg-gradient-to-t from-purple-900/50 to-purple-500 rounded-t-sm transition-all duration-500 ease-out group-hover:to-purple-400 relative border-t border-x border-purple-500/30"
                                 style={{ height: `${height}%` }}
                              >
                                 {/* Floating Value */}
                                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 text-white text-[10px] font-mono py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 z-10 shadow-xl">
                                    {value}B
                                 </div>
                              </div>
                              {/* Year Label */}
                              <div className="text-center mt-3 text-[10px] font-mono font-bold text-zinc-500 group-hover:text-white transition-colors">
                                 {2024 + i}
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>

               {/* Competitors List (Leaderboard Style) */}
               <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-zinc-800">
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <FiPieChart /> {isArabic ? 'حصص السوق' : 'Market Share Leaders'}
                  </h3>

                  <div className="space-y-2">
                     {data.topPlayers.map((player, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700 group cursor-default">
                           <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold font-mono border ${i === 0 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                    i === 1 ? 'bg-zinc-700/50 text-zinc-400 border-zinc-600' :
                                       'bg-zinc-800/50 text-zinc-500 border-zinc-700'
                                 }`}>
                                 {i + 1}
                              </div>
                              <span className="font-bold text-sm text-zinc-300 group-hover:text-white transition-colors">{player.name}</span>
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden flex justify-end">
                                 <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${player.share}%` }}></div>
                              </div>
                              <span className="text-xs font-mono font-bold text-emerald-500 w-8 text-right">{player.share}%</span>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-800">
                     <h4 className="text-xs font-bold text-zinc-300 mb-2">{isArabic ? 'تقرير معمق' : 'Need Full Data?'}</h4>
                     <p className="text-[10px] text-zinc-500 mb-4 leading-relaxed">
                        {isArabic
                           ? 'قم بتحميل التقرير بصيغة PDF للحصول على تحليل تفصيلي لـ 50+ شركة ومقارنة الرسوم.'
                           : 'Download the full PDF report for detailed analysis on 50+ companies and fee benchmarks.'}
                     </p>
                     <button className="w-full py-3 bg-zinc-100 text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                        <FiTarget /> {isArabic ? 'تحميل التقرير' : 'Access Full Report'}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}