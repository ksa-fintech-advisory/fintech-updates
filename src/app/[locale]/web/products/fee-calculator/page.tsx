'use client';

import { useState } from 'react';
import FeeCalculatorForm from '@/core/components/web/fee-calculator/FeeCalculatorForm';
import FeeCalculatorResults from '@/core/components/web/fee-calculator/FeeCalculatorResults';

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

// Page translations
const pageT = {
  en: {
    heroTitle: 'Payment Fee Calculator',
    heroSubtitle: 'Compare processing costs across Saudi payment providers',
    heroDescription: 'Get accurate fee estimates for Mada, Visa, and Mastercard transactions. Make informed decisions about your payment infrastructure.',
    features: {
      accurate: {
        title: 'Accurate Estimates',
        description: 'Based on real market pricing data from major Saudi PSPs.',
      },
      compare: {
        title: 'Easy Comparison',
        description: 'Compare fees across different providers and payment methods.',
      },
      transparent: {
        title: 'Full Transparency',
        description: 'See detailed breakdowns including VAT and all hidden fees.',
      },
    },
  },
  ar: {
    heroTitle: 'حاسبة رسوم المدفوعات',
    heroSubtitle: 'قارن تكاليف المعالجة عبر مزودي الدفع السعوديين',
    heroDescription: 'احصل على تقديرات دقيقة للرسوم لمعاملات مدى وفيزا وماستركارد. اتخذ قرارات مستنيرة بشأن بنيتك التحتية للدفع.',
    features: {
      accurate: {
        title: 'تقديرات دقيقة',
        description: 'مبنية على بيانات الأسعار الفعلية من مزودي الدفع السعوديين الرئيسيين.',
      },
      compare: {
        title: 'مقارنة سهلة',
        description: 'قارن الرسوم عبر مختلف المزودين وطرق الدفع.',
      },
      transparent: {
        title: 'شفافية كاملة',
        description: 'اطلع على التفاصيل الكاملة بما في ذلك ضريبة القيمة المضافة وجميع الرسوم المخفية.',
      },
    },
  },
};

export default function FeeCalculatorPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isArabic = locale === 'ar';
  const labels = isArabic ? pageT.ar : pageT.en;

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<FeeCalculationResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: {
    provider: string;
    monthlyVolume: string;
    averageTransactionValue: string;
    paymentMix: {
      mada: number;
      visa_mc_local: number;
      visa_mc_international: number;
    };
  }) => {
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

      if (!response.ok) {
        throw new Error(data.details?.join(', ') || data.error || 'Calculation failed');
      }

      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-grey-50 pb-24">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 font-medium text-sm mb-6 backdrop-blur-sm border border-blue-500/30">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {isArabic ? 'متاح الآن' : 'Now Available'}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              {labels.heroTitle}
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-4 font-light">
              {labels.heroSubtitle}
            </p>

            <p className="text-blue-200/80 max-w-2xl mx-auto">
              {labels.heroDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Features Cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-grey-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-2xl">
              🎯
            </div>
            <h3 className="text-lg font-bold text-grey-900 mb-2">
              {labels.features.accurate.title}
            </h3>
            <p className="text-grey-500 text-sm">
              {labels.features.accurate.description}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-grey-100">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 text-2xl">
              📊
            </div>
            <h3 className="text-lg font-bold text-grey-900 mb-2">
              {labels.features.compare.title}
            </h3>
            <p className="text-grey-500 text-sm">
              {labels.features.compare.description}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-grey-100">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-grey-900 mb-2">
              {labels.features.transparent.title}
            </h3>
            <p className="text-grey-500 text-sm">
              {labels.features.transparent.description}
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-grey-100 mb-8">
            <FeeCalculatorForm
              locale={locale}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8">
              <p className="font-medium">{isArabic ? 'حدث خطأ' : 'Error'}</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-grey-100">
              <FeeCalculatorResults results={results} locale={locale} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
