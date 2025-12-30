'use client';

import { useMemo } from 'react';

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
    resultsTitle: 'Fee Estimation Results',
    totalMonthlyFees: 'Total Monthly Fees',
    effectiveRate: 'Effective Fee Rate',
    netSettlement: 'Net Settlement',
    feeBreakdown: 'Fee Breakdown',
    fixedFees: 'Fixed Fees',
    variableFees: 'Variable Fees',
    vat: 'VAT (15%)',
    methodBreakdown: 'Breakdown by Payment Method',
    method: 'Method',
    transactions: 'Transactions',
    volume: 'Volume',
    fees: 'Fees',
    rate: 'Rate',
    settlementTime: 'Settlement Time',
    assumptions: 'Assumptions',
    disclaimer: 'Disclaimer',
    lastUpdated: 'Pricing data updated',
    confidence: {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    },
    confidenceLabel: 'Data Confidence',
    currency: 'SAR',
  },
  ar: {
    resultsTitle: 'نتائج تقدير الرسوم',
    totalMonthlyFees: 'إجمالي الرسوم الشهرية',
    effectiveRate: 'نسبة الرسوم الفعلية',
    netSettlement: 'صافي التسوية',
    feeBreakdown: 'تفصيل الرسوم',
    fixedFees: 'رسوم ثابتة',
    variableFees: 'رسوم متغيرة',
    vat: 'ضريبة القيمة المضافة (15%)',
    methodBreakdown: 'التفصيل حسب طريقة الدفع',
    method: 'الطريقة',
    transactions: 'المعاملات',
    volume: 'الحجم',
    fees: 'الرسوم',
    rate: 'النسبة',
    settlementTime: 'مدة التسوية',
    assumptions: 'الافتراضات',
    disclaimer: 'إخلاء المسؤولية',
    lastUpdated: 'تاريخ تحديث الأسعار',
    confidence: {
      high: 'عالي',
      medium: 'متوسط',
      low: 'منخفض',
    },
    confidenceLabel: 'مستوى الثقة في البيانات',
    currency: 'ريال',
  },
};

// Format number with commas
function formatNumber(num: number, locale: string): string {
  return num.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-SA', {
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

  // Calculate percentages for the pie chart
  const feeBreakdownData = useMemo(() => {
    const total = results.fixedFees + results.variableFees + results.vatAmount;
    return [
      {
        label: labels.fixedFees,
        value: results.fixedFees,
        percentage: total > 0 ? (results.fixedFees / total) * 100 : 0,
        color: 'bg-blue-500',
      },
      {
        label: labels.variableFees,
        value: results.variableFees,
        percentage: total > 0 ? (results.variableFees / total) * 100 : 0,
        color: 'bg-green-500',
      },
      {
        label: labels.vat,
        value: results.vatAmount,
        percentage: total > 0 ? (results.vatAmount / total) * 100 : 0,
        color: 'bg-purple-500',
      },
    ];
  }, [results, labels]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-grey-900">{labels.resultsTitle}</h2>
        <p className="text-grey-500 mt-1">{results.provider}</p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Monthly Fees */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-blue-100 text-sm font-medium mb-1">
            {labels.totalMonthlyFees}
          </p>
          <p className="text-3xl font-black">
            {formatNumber(results.totalMonthlyFees, locale)}
            <span className="text-lg font-normal ms-2">{labels.currency}</span>
          </p>
        </div>

        {/* Effective Rate */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-green-100 text-sm font-medium mb-1">
            {labels.effectiveRate}
          </p>
          <p className="text-3xl font-black">
            {results.effectiveFeeRate.toFixed(2)}%
          </p>
        </div>

        {/* Net Settlement */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-purple-100 text-sm font-medium mb-1">
            {labels.netSettlement}
          </p>
          <p className="text-3xl font-black">
            {formatNumber(results.netSettlementAmount, locale)}
            <span className="text-lg font-normal ms-2">{labels.currency}</span>
          </p>
        </div>
      </div>

      {/* Fee Breakdown Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-grey-100">
        <h3 className="text-lg font-bold text-grey-900 mb-4">
          {labels.feeBreakdown}
        </h3>
        
        {/* Stacked bar */}
        <div className="h-8 rounded-full overflow-hidden flex mb-4">
          {feeBreakdownData.map((item, index) => (
            <div
              key={index}
              className={`${item.color} transition-all`}
              style={{ width: `${item.percentage}%` }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-4">
          {feeBreakdownData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <div>
                <p className="text-sm text-grey-600">{item.label}</p>
                <p className="font-semibold text-grey-900">
                  {formatNumber(item.value, locale)} {labels.currency}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Method Breakdown Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-grey-100 overflow-x-auto">
        <h3 className="text-lg font-bold text-grey-900 mb-4">
          {labels.methodBreakdown}
        </h3>
        
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-grey-200">
              <th className="text-start py-3 px-2 text-sm font-semibold text-grey-600">
                {labels.method}
              </th>
              <th className="text-end py-3 px-2 text-sm font-semibold text-grey-600">
                {labels.transactions}
              </th>
              <th className="text-end py-3 px-2 text-sm font-semibold text-grey-600">
                {labels.volume}
              </th>
              <th className="text-end py-3 px-2 text-sm font-semibold text-grey-600">
                {labels.fees}
              </th>
              <th className="text-end py-3 px-2 text-sm font-semibold text-grey-600">
                {labels.rate}
              </th>
            </tr>
          </thead>
          <tbody>
            {results.methodBreakdown.map((method, index) => (
              <tr
                key={index}
                className="border-b border-grey-100 hover:bg-grey-50 transition-colors"
              >
                <td className="py-3 px-2 font-medium text-grey-900">
                  {method.methodLabel}
                </td>
                <td className="py-3 px-2 text-end text-grey-600">
                  {method.transactionCount.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-SA')}
                </td>
                <td className="py-3 px-2 text-end text-grey-600">
                  {formatNumber(method.volume, locale)}
                </td>
                <td className="py-3 px-2 text-end font-semibold text-grey-900">
                  {formatNumber(method.totalFee, locale)}
                </td>
                <td className="py-3 px-2 text-end text-grey-600">
                  {method.effectiveRate.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Settlement & Confidence */}
        <div className="bg-grey-50 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-grey-600">{labels.settlementTime}</span>
            <span className="font-semibold text-grey-900">
              {results.settlementDays}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-grey-600">{labels.confidenceLabel}</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                results.confidenceLevel === 'high'
                  ? 'bg-green-100 text-green-700'
                  : results.confidenceLevel === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {labels.confidence[results.confidenceLevel]}
            </span>
          </div>
        </div>

        {/* Assumptions */}
        <div className="bg-grey-50 p-6 rounded-2xl">
          <h4 className="text-sm font-semibold text-grey-700 mb-3">
            {labels.assumptions}
          </h4>
          <ul className="space-y-2">
            {results.assumptions.map((assumption, index) => (
              <li key={index} className="text-sm text-grey-600 flex gap-2">
                <span className="text-grey-400">•</span>
                {assumption}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
        <p className="text-sm text-amber-800">
          <strong>{labels.disclaimer}:</strong> {results.disclaimer}
        </p>
        <p className="text-xs text-amber-600 mt-2">
          {labels.lastUpdated}: {results.lastUpdated}
        </p>
      </div>
    </div>
  );
}
