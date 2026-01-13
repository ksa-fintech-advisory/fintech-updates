'use client';

import { useState } from 'react';
import Link from 'next/link';
import FeeCalculatorForm from '@/core/components/web/fee-calculator/FeeCalculatorForm';
import FeeCalculatorResults from '@/core/components/web/fee-calculator/FeeCalculatorResults';
import {
  FiActivity, FiPieChart, FiDollarSign, FiArrowRight,
  FiArrowLeft, FiCpu, FiTrendingUp, FiShield
} from 'react-icons/fi';

// Types (Keep existing types)
interface FeeCalculationResults {
  totalMonthlyFees: number;
  effectiveFeeRate: number;
  netSettlementAmount: number;
  fixedFees: number;
  variableFees: number;
  vatAmount: number;
  methodBreakdown: Array<{
    method: string;
    methodLabel: string;
    transactionCount: number;
    volume: number;
    percentageFee: number;
    fixedFee: number;
    totalFee: number;
    effectiveRate: number;
  }>;
  totalTransactions: number;
  totalVolume: number;
  provider: string;
  settlementDays: string;
  confidenceLevel: 'high' | 'medium' | 'low';
  assumptions: string[];
  disclaimer: string;
  lastUpdated: string;
}

export default function FeeCalculatorPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isArabic = locale === 'ar';

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<FeeCalculationResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle Form Submit
  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/fee-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': locale,
        },
        body: JSON.stringify({
          provider: formData.provider,
          monthlyVolume: parseFloat(formData.monthlyVolume),
          averageTransactionValue: parseFloat(formData.averageTransactionValue),
          paymentMix: formData.paymentMix,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.details?.join(', ') || data.error || 'Calculation failed');
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-primary-500/30 pb-24 text-zinc-900 dark:text-zinc-100">

      {/* 1. Global Engineering Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* 2. Header Section */}
      <div className="relative pt-24 pb-8 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-md z-20 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4">
            <Link href={`/${locale}/web/tools`} className="hover:text-primary-600 transition-colors">
              {isArabic ? 'الأدوات' : 'TOOLS'}
            </Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white">
              {isArabic ? 'حاسبة_الرسوم' : 'FEE_SIMULATOR'}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
                {isArabic ? 'محاكي تكاليف الدفع' : 'Payment Fee Simulator'}
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg">
                {isArabic
                  ? 'نموذج محاكاة دقيق لحساب هوامش الربح وصافي التسوية بعد خصم رسوم بوابات الدفع والضرائب.'
                  : 'High-precision simulation for calculating profit margins and net settlements after gateway fees and VAT.'}
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                {isArabic ? 'نظام الأسعار محدث' : 'RATES_UPDATED'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Simulator Layout (Split View) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: Input Control Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <FiActivity /> {isArabic ? 'معاملات المحاكاة' : 'SIMULATION INPUTS'}
                </h3>
              </div>

              <div className="p-6">
                {/* We wrap the existing form component */}
                <FeeCalculatorForm
                  locale={locale}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                <FiActivity className="mt-0.5 text-red-600 dark:text-red-400" />
                <div>
                  <h4 className="text-sm font-bold text-red-800 dark:text-red-300 mb-1">
                    {isArabic ? 'خطأ في الحساب' : 'Calculation Error'}
                  </h4>
                  <p className="text-xs text-red-600 dark:text-red-400 font-mono">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Results / Visualization */}
          <div className="lg:col-span-7">
            {results ? (
              // RESULT STATE
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <FiPieChart /> {isArabic ? 'التحليل المالي' : 'FINANCIAL BREAKDOWN'}
                  </h3>
                  <div className="text-[10px] font-mono text-zinc-400">
                    ID: {new Date().getTime().toString().slice(-6)}
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <FeeCalculatorResults results={results} locale={locale} />
                </div>
              </div>
            ) : (
              // EMPTY STATE (Value Props)
              <div className="h-full flex flex-col gap-6">
                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-primary-500/50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center text-primary-600 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <FiTrendingUp className="text-xl" />
                    </div>
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-2">
                      {isArabic ? 'تقديرات دقيقة' : 'Precision Estimates'}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {isArabic
                        ? 'تستخدم الخوارزمية أحدث جداول الرسوم المنشورة من قبل "مدى" و"فيزا" و"ماستركارد" في السعودية.'
                        : 'Algorithm uses the latest published fee schedules from Mada, Visa, and Mastercard in Saudi Arabia.'}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-primary-500/50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center text-emerald-600 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <FiDollarSign className="text-xl" />
                    </div>
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-2">
                      {isArabic ? 'كشف الرسوم الخفية' : 'Hidden Fees Exposed'}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {isArabic
                        ? 'نحسب تلقائياً ضريبة القيمة المضافة (VAT) والرسوم الثابتة التي غالباً ما يتم تجاهلها في العروض التسويقية.'
                        : 'We automatically calculate VAT and fixed fees often overlooked in marketing proposals.'}
                    </p>
                  </div>

                  <div className="col-span-1 md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-white border border-zinc-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="mt-1">
                        <FiShield className="text-2xl text-zinc-300" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          {isArabic ? 'لماذا هذه الأداة؟' : 'Why use this tool?'}
                        </h3>
                        <p className="text-zinc-300 text-sm leading-relaxed max-w-lg">
                          {isArabic
                            ? 'بصفتك مديراً تقنياً أو مالياً، تحتاج إلى معرفة "صافي التسوية" الحقيقي (Net Settlement) وليس فقط نسبة العمولة. هذه الأداة تساعدك على التفاوض مع البنوك.'
                            : 'As a CTO or CFO, you need to know the true Net Settlement amount, not just the commission rate. This tool empowers your negotiations with banks.'}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Loading State Overlay (if needed visually outside form) */}
                {isLoading && (
                  <div className="flex-1 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/30 flex flex-col items-center justify-center animate-pulse">
                    <div className="w-16 h-16 border-4 border-zinc-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                    <span className="font-mono text-sm font-bold text-zinc-400 uppercase">
                      {isArabic ? 'جاري معالجة البيانات...' : 'PROCESSING_DATA...'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}