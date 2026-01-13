'use client';

import { useMemo } from 'react';
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiActivity,
  FiInfo,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPieChart,
  FiDollarSign,
  FiPercent
} from 'react-icons/fi';

interface PaymentMethodBreakdown {
  method: string;
  methodLabel: string;
  transactionCount: number;
  volume: number;
  percentageFee: number;
  fixedFee: number;
  totalFee: number;
  effectiveRate: number;
}

interface FeeCalculationResults {
  totalMonthlyFees: number;
  effectiveFeeRate: number;
  netSettlementAmount: number;
  fixedFees: number;
  variableFees: number;
  vatAmount: number;
  methodBreakdown: PaymentMethodBreakdown[];
  totalTransactions: number;
  totalVolume: number;
  provider: string;
  settlementDays: string;
  confidenceLevel: 'high' | 'medium' | 'low';
  assumptions: string[];
  disclaimer: string;
  lastUpdated: string;
}

interface FeeCalculatorResultsProps {
  results: FeeCalculationResults;
  locale: string;
}

// Translations
const t = {
  en: {
    resultsTitle: 'Financial Analysis',
    totalMonthlyFees: 'Total Cost (Fees + VAT)',
    effectiveRate: 'Effective Rate',
    netSettlement: 'Net Settlement Amount',
    feeBreakdown: 'Cost Structure',
    fixedFees: 'Fixed Fees',
    variableFees: 'MDR Fees',
    vat: 'VAT (15%)',
    methodBreakdown: 'Breakdown by Method',
    method: 'Channel',
    transactions: 'Count',
    volume: 'Volume',
    fees: 'Cost',
    rate: 'Eff. Rate',
    settlementTime: 'Settlement Cycle',
    assumptions: 'Modeling Assumptions',
    disclaimer: 'Legal Disclaimer',
    lastUpdated: 'Rates Valid As Of',
    confidence: { high: 'High', medium: 'Medium', low: 'Low' },
    confidenceLabel: 'Data Confidence',
    currency: 'SAR',
    netProfit: 'Net Profit',
    costRatio: 'Cost Ratio',
  },
  ar: {
    resultsTitle: 'التحليل المالي',
    totalMonthlyFees: 'إجمالي التكلفة (الرسوم + الضريبة)',
    effectiveRate: 'النسبة الفعلية',
    netSettlement: 'صافي مبلغ التسوية',
    feeBreakdown: 'هيكل التكاليف',
    fixedFees: 'رسوم ثابتة',
    variableFees: 'نسبة العمليات (MDR)',
    vat: 'ضريبة القيمة المضافة (15%)',
    methodBreakdown: 'التفصيل حسب القناة',
    method: 'القناة',
    transactions: 'العدد',
    volume: 'الحجم',
    fees: 'التكلفة',
    rate: 'النسبة',
    settlementTime: 'دورة التسوية',
    assumptions: 'افتراضات النموذج',
    disclaimer: 'إخلاء المسؤولية القانونية',
    lastUpdated: 'الأسعار محدثة بتاريخ',
    confidence: { high: 'عالي', medium: 'متوسط', low: 'منخفض' },
    confidenceLabel: 'مستوى الثقة',
    currency: 'ر.س',
    netProfit: 'صافي الربح',
    costRatio: 'معدل التكلفة',
  },
};

// Format number with commas
function formatNumber(num: number, locale: string): string {
  return num.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function FeeCalculatorResults({
  results,
  locale,
}: FeeCalculatorResultsProps) {
  const isArabic = locale === 'ar';
  const labels = isArabic ? t.ar : t.en;

  // Calculate percentages for the breakdown bar
  const feeBreakdownData = useMemo(() => {
    const total = results.fixedFees + results.variableFees + results.vatAmount;
    return [
      {
        label: labels.variableFees,
        value: results.variableFees,
        percentage: total > 0 ? (results.variableFees / total) * 100 : 0,
        color: 'bg-amber-500',
        textColor: 'text-amber-600 dark:text-amber-400',
      },
      {
        label: labels.fixedFees,
        value: results.fixedFees,
        percentage: total > 0 ? (results.fixedFees / total) * 100 : 0,
        color: 'bg-blue-500',
        textColor: 'text-blue-600 dark:text-blue-400',
      },
      {
        label: labels.vat,
        value: results.vatAmount,
        percentage: total > 0 ? (results.vatAmount / total) * 100 : 0,
        color: 'bg-purple-500',
        textColor: 'text-purple-600 dark:text-purple-400',
      },
    ];
  }, [results, labels]);

  return (
    <div className="space-y-8 font-sans">

      {/* 1. Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* Main Hero: Net Settlement (The most important number) */}
        <div className="md:col-span-12 lg:col-span-6 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FiArrowUpRight className="w-24 h-24 text-emerald-600" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                <FiDollarSign className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                {labels.netSettlement}
              </h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black text-emerald-700 dark:text-emerald-400 font-mono tracking-tight">
                {formatNumber(results.netSettlementAmount, locale)}
              </span>
              <span className="text-sm font-bold text-emerald-600/70 dark:text-emerald-500/70">
                {labels.currency}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/30 w-fit px-3 py-1 rounded-full">
              <FiCheckCircle />
              {isArabic
                ? 'المبلغ المتوقع إيداعه في حسابك البنكي'
                : 'Expected deposit to your bank account'}
            </div>
          </div>
        </div>

        {/* Secondary Metrics Column */}
        <div className="md:col-span-6 lg:col-span-3 space-y-4">
          {/* Total Costs */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 text-zinc-500 dark:text-zinc-400">
              <FiArrowDownRight className="w-4 h-4 text-red-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider">{labels.totalMonthlyFees}</h3>
            </div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400 font-mono">
              -{formatNumber(results.totalMonthlyFees, locale)} <span className="text-xs">{labels.currency}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-3 space-y-4">
          {/* Effective Rate */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 text-zinc-500 dark:text-zinc-400">
              <FiPercent className="w-4 h-4 text-blue-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider">{labels.effectiveRate}</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">
              {results.effectiveFeeRate.toFixed(2)}%
            </div>
            <div className="text-[10px] text-zinc-400 mt-1">
              {isArabic ? 'نسبة التكلفة إلى الإيرادات' : 'Cost-to-revenue ratio'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visualization Bar */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <FiPieChart /> {labels.feeBreakdown}
          </h3>
          <span className="text-xs font-mono text-zinc-400 bg-white dark:bg-zinc-800 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700">
            100% = {formatNumber(results.totalMonthlyFees, locale)} {labels.currency}
          </span>
        </div>

        {/* The Bar */}
        <div className="h-4 rounded-full overflow-hidden flex w-full bg-zinc-200 dark:bg-zinc-800 mb-6">
          {feeBreakdownData.map((item, index) => (
            <div
              key={index}
              className={`${item.color} hover:brightness-110 transition-all duration-300 relative group`}
              style={{ width: `${item.percentage}%` }}
            >
              {/* Tooltip on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-max">
                <div className="bg-black text-white text-xs rounded py-1 px-2 font-mono">
                  {item.percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {feeBreakdownData.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${item.color} shadow-sm`} />
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wide">{item.label}</p>
                <p className={`text-sm font-bold font-mono ${item.textColor}`}>
                  {formatNumber(item.value, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Detailed Table (Financial Ledger Style) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-black/20">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <FiActivity /> {labels.methodBreakdown}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-950/50 text-xs uppercase text-zinc-500 dark:text-zinc-400 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4 text-start">{labels.method}</th>
                <th className="px-6 py-4 text-end hidden sm:table-cell">{labels.transactions}</th>
                <th className="px-6 py-4 text-end">{labels.volume}</th>
                <th className="px-6 py-4 text-end text-red-600 dark:text-red-400">{labels.fees}</th>
                <th className="px-6 py-4 text-end">{labels.rate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {results.methodBreakdown.map((method, index) => (
                <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-zinc-800 dark:text-zinc-200">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 group-hover:bg-primary-500 transition-colors"></span>
                      {method.methodLabel}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-end font-mono text-zinc-600 dark:text-zinc-400 hidden sm:table-cell">
                    {method.transactionCount}
                  </td>
                  <td className="px-6 py-4 text-end font-mono text-zinc-900 dark:text-zinc-300 font-medium">
                    {formatNumber(method.volume, locale)}
                  </td>
                  <td className="px-6 py-4 text-end font-mono text-red-600 dark:text-red-400 font-medium bg-red-50/30 dark:bg-red-900/10">
                    {formatNumber(method.totalFee, locale)}
                  </td>
                  <td className="px-6 py-4 text-end font-mono text-zinc-600 dark:text-zinc-400">
                    {method.effectiveRate.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-zinc-50 dark:bg-zinc-900 font-bold border-t border-zinc-200 dark:border-zinc-800">
              <tr>
                <td className="px-6 py-4 text-zinc-900 dark:text-white uppercase text-xs tracking-wider">TOTAL</td>
                <td className="px-6 py-4 text-end font-mono hidden sm:table-cell">{results.totalTransactions}</td>
                <td className="px-6 py-4 text-end font-mono text-zinc-900 dark:text-white">{formatNumber(results.totalVolume, locale)}</td>
                <td className="px-6 py-4 text-end font-mono text-red-600 dark:text-red-400">{formatNumber(results.totalMonthlyFees, locale)}</td>
                <td className="px-6 py-4 text-end font-mono text-blue-600 dark:text-blue-400">{results.effectiveFeeRate.toFixed(2)}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 4. Metadata Footer (System Status Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Settlement Info */}
        <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-zinc-800 p-2 rounded-lg text-zinc-500">
              <FiClock />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-500 uppercase">{labels.settlementTime}</div>
              <div className="text-sm font-bold text-zinc-900 dark:text-white">{results.settlementDays}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-zinc-500 uppercase mb-1">{labels.confidenceLabel}</div>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${results.confidenceLevel === 'high' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                results.confidenceLevel === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
              {labels.confidence[results.confidenceLevel]}
            </span>
          </div>
        </div>

        {/* Disclaimer / Updates */}
        <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 mb-2 text-zinc-500">
            <FiInfo className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{labels.disclaimer}</span>
          </div>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-2">
            {results.disclaimer}
          </p>
          <div className="text-[10px] font-mono text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-2 mt-2">
            {labels.lastUpdated}: {results.lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
}