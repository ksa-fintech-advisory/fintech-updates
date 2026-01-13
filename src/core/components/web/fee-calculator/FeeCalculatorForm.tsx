'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  FiServer,
  FiDollarSign,
  FiPieChart,
  FiActivity,
  FiAlertCircle,
  FiCheck,
  FiTrendingUp
} from 'react-icons/fi';

interface Provider {
  name: string;
  confidenceLevel: 'high' | 'medium' | 'low';
  hasSetupFee: boolean;
  hasMonthlyFee: boolean;
}

interface PaymentMix {
  mada: number;
  visa_mc_local: number;
  visa_mc_international: number;
}

interface FormData {
  provider: string;
  monthlyVolume: string;
  averageTransactionValue: string;
  paymentMix: PaymentMix;
}

interface FeeCalculatorFormProps {
  locale: string;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
}

// Translations
const t = {
  en: {
    sectionProvider: 'Service Provider',
    sectionMetrics: 'Transaction Metrics',
    sectionMix: 'Payment Channel Mix',
    selectProvider: 'Select PSP',
    chooseProvider: 'Select a provider...',
    monthlyVolume: 'Monthly Volume',
    monthlyVolumePlaceholder: 'e.g. 100,000',
    avgTransaction: 'Avg. Ticket Size',
    avgTransactionPlaceholder: 'e.g. 250',
    mada: 'Mada (Debit)',
    visaLocal: 'Visa/MC (Local)',
    visaIntl: 'Visa/MC (Intl)',
    total: 'Allocation',
    mixError: 'Total allocation must equal 100%',
    calculate: 'Run Simulation',
    calculating: 'Processing...',
    confidence: { high: 'High Accuracy', medium: 'Est. Accuracy', low: 'Low Accuracy' },
    currency: 'SAR',
  },
  ar: {
    sectionProvider: 'مزود الخدمة',
    sectionMetrics: 'مؤشرات العمليات',
    sectionMix: 'توزيع قنوات الدفع',
    selectProvider: 'اختر بوابة الدفع',
    chooseProvider: 'اختر المزود...',
    monthlyVolume: 'حجم المبيعات الشهري',
    monthlyVolumePlaceholder: 'مثال: 100,000',
    avgTransaction: 'متوسط قيمة السلة',
    avgTransactionPlaceholder: 'مثال: 250',
    mada: 'مدى (Debit)',
    visaLocal: 'فيزا/ماستر (محلي)',
    visaIntl: 'فيزا/ماستر (دولي)',
    total: 'الإجمالي',
    mixError: 'يجب أن يكون مجموع النسب 100%',
    calculate: 'بدء المحاكاة',
    calculating: 'جاري الحساب...',
    confidence: { high: 'دقة عالية', medium: 'دقة متوسطة', low: 'دقة منخفضة' },
    currency: 'ر.س',
  },
};

export default function FeeCalculatorForm({
  locale,
  onSubmit,
  isLoading,
}: FeeCalculatorFormProps) {
  const isArabic = locale === 'ar';
  const labels = isArabic ? t.ar : t.en;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [loadingProviders, setLoadingProviders] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    provider: '',
    monthlyVolume: '',
    averageTransactionValue: '',
    paymentMix: { mada: 60, visa_mc_local: 30, visa_mc_international: 10 },
  });

  // Fetch providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('/api/fee-calculator');
        const data = await response.json();
        setProviders(data.providers || []);
      } catch (error) {
        console.error('Failed to fetch providers:', error);
      } finally {
        setLoadingProviders(false);
      }
    };
    fetchProviders();
  }, []);

  // Validation Logic
  const mixTotal = useMemo(() => {
    return (
      formData.paymentMix.mada +
      formData.paymentMix.visa_mc_local +
      formData.paymentMix.visa_mc_international
    );
  }, [formData.paymentMix]);

  const isMixValid = Math.abs(mixTotal - 100) < 0.01;

  const isFormValid = useMemo(() => {
    return (
      formData.provider !== '' &&
      parseFloat(formData.monthlyVolume) > 0 &&
      parseFloat(formData.averageTransactionValue) > 0 &&
      isMixValid
    );
  }, [formData, isMixValid]);

  const selectedProvider = providers.find((p) => p.name === formData.provider);

  const handleMixChange = (method: keyof PaymentMix, value: number) => {
    setFormData((prev) => ({
      ...prev,
      paymentMix: { ...prev.paymentMix, [method]: Math.max(0, Math.min(100, value)) },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && !isLoading) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-sans">

      {/* 1. Provider Selection */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
          <FiServer className="text-primary-500" /> {labels.sectionProvider}
        </label>

        <div className="relative">
          <select
            value={formData.provider}
            onChange={(e) => setFormData((prev) => ({ ...prev, provider: e.target.value }))}
            disabled={loadingProviders}
            className="w-full pl-4 pr-10 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none"
          >
            <option value="">{labels.chooseProvider}</option>
            {providers.map((provider) => (
              <option key={provider.name} value={provider.name}>
                {provider.name}
              </option>
            ))}
          </select>
          <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${isArabic ? 'left-4' : 'right-4'}`}>
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        {selectedProvider && (
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide border ${selectedProvider.confidenceLevel === 'high'
              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900'
              : selectedProvider.confidenceLevel === 'medium'
                ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-900'
            }`}>
            <FiActivity /> {labels.confidence[selectedProvider.confidenceLevel]}
          </div>
        )}
      </div>

      <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

      {/* 2. Volume Inputs */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
          <FiTrendingUp className="text-primary-500" /> {labels.sectionMetrics}
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group relative">
            <label className="block text-xs font-medium text-zinc-500 mb-1.5 ml-1">{labels.monthlyVolume}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <FiDollarSign />
              </div>
              <input
                type="number"
                value={formData.monthlyVolume}
                onChange={(e) => setFormData((prev) => ({ ...prev, monthlyVolume: e.target.value }))}
                placeholder="100000"
                className="w-full pl-9 pr-12 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white font-mono placeholder-zinc-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                min="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs font-bold text-zinc-400">
                {labels.currency}
              </div>
            </div>
          </div>

          <div className="group relative">
            <label className="block text-xs font-medium text-zinc-500 mb-1.5 ml-1">{labels.avgTransaction}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <FiPieChart />
              </div>
              <input
                type="number"
                value={formData.averageTransactionValue}
                onChange={(e) => setFormData((prev) => ({ ...prev, averageTransactionValue: e.target.value }))}
                placeholder="250"
                className="w-full pl-9 pr-12 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white font-mono placeholder-zinc-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                min="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs font-bold text-zinc-400">
                {labels.currency}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

      {/* 3. Payment Mix (Interactive) */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
            <FiPieChart className="text-primary-500" /> {labels.sectionMix}
          </label>
          <span className={`text-xs font-mono font-bold ${isMixValid ? 'text-emerald-600' : 'text-red-600'}`}>
            {mixTotal.toFixed(0)}% / 100%
          </span>
        </div>

        {/* Visual Mix Bar */}
        <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex">
          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${formData.paymentMix.mada}%` }} />
          <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${formData.paymentMix.visa_mc_local}%` }} />
          <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${formData.paymentMix.visa_mc_international}%` }} />
        </div>

        <div className="space-y-5 pt-2">
          {/* Mada Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> {labels.mada}
              </span>
              <span className="font-mono font-bold text-zinc-900 dark:text-white">{formData.paymentMix.mada}%</span>
            </div>
            <input
              type="range"
              value={formData.paymentMix.mada}
              onChange={(e) => handleMixChange('mada', Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              min="0" max="100"
            />
          </div>

          {/* Visa Local Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> {labels.visaLocal}
              </span>
              <span className="font-mono font-bold text-zinc-900 dark:text-white">{formData.paymentMix.visa_mc_local}%</span>
            </div>
            <input
              type="range"
              value={formData.paymentMix.visa_mc_local}
              onChange={(e) => handleMixChange('visa_mc_local', Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              min="0" max="100"
            />
          </div>

          {/* Visa Intl Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span> {labels.visaIntl}
              </span>
              <span className="font-mono font-bold text-zinc-900 dark:text-white">{formData.paymentMix.visa_mc_international}%</span>
            </div>
            <input
              type="range"
              value={formData.paymentMix.visa_mc_international}
              onChange={(e) => handleMixChange('visa_mc_international', Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              min="0" max="100"
            />
          </div>
        </div>

        {!isMixValid && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg text-xs font-bold border border-red-100 dark:border-red-900/30">
            <FiAlertCircle /> {labels.mixError}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`
            w-full py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all
            ${isFormValid && !isLoading
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg hover:shadow-xl translate-y-0'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
            }
          `}
        >
          {isLoading ? (
            <span className="animate-pulse">{labels.calculating}</span>
          ) : (
            <>
              {labels.calculate} <FiActivity />
            </>
          )}
        </button>
      </div>
    </form>
  );
}