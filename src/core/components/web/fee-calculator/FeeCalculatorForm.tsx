'use client';

import { useState, useEffect, useMemo } from 'react';

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
    selectProvider: 'Select Payment Provider',
    chooseProvider: 'Choose a provider...',
    monthlyVolume: 'Monthly Processing Volume (SAR)',
    monthlyVolumePlaceholder: 'e.g., 100000',
    avgTransaction: 'Average Transaction Value (SAR)',
    avgTransactionPlaceholder: 'e.g., 250',
    paymentMix: 'Payment Method Mix',
    mada: 'Mada',
    visaLocal: 'Visa/MC (Local)',
    visaIntl: 'Visa/MC (International)',
    total: 'Total',
    mixError: 'Payment mix must total 100%',
    calculate: 'Calculate Fees',
    calculating: 'Calculating...',
    confidence: {
      high: 'High confidence pricing',
      medium: 'Medium confidence pricing',
      low: 'Low confidence - estimates only',
    },
  },
  ar: {
    selectProvider: 'اختر مزود الدفع',
    chooseProvider: 'اختر مزوداً...',
    monthlyVolume: 'حجم المعالجة الشهري (ريال)',
    monthlyVolumePlaceholder: 'مثال: 100000',
    avgTransaction: 'متوسط قيمة المعاملة (ريال)',
    avgTransactionPlaceholder: 'مثال: 250',
    paymentMix: 'توزيع طرق الدفع',
    mada: 'مدى',
    visaLocal: 'فيزا/ماستركارد (محلي)',
    visaIntl: 'فيزا/ماستركارد (دولي)',
    total: 'المجموع',
    mixError: 'يجب أن يكون مجموع التوزيع 100%',
    calculate: 'احسب الرسوم',
    calculating: 'جاري الحساب...',
    confidence: {
      high: 'ثقة عالية في الأسعار',
      medium: 'ثقة متوسطة في الأسعار',
      low: 'ثقة منخفضة - تقديرات فقط',
    },
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
    paymentMix: {
      mada: 60,
      visa_mc_local: 30,
      visa_mc_international: 10,
    },
  });

  // Fetch providers on mount
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

  // Calculate payment mix total
  const mixTotal = useMemo(() => {
    return (
      formData.paymentMix.mada +
      formData.paymentMix.visa_mc_local +
      formData.paymentMix.visa_mc_international
    );
  }, [formData.paymentMix]);

  const isMixValid = Math.abs(mixTotal - 100) < 0.01;

  // Form validation
  const isFormValid = useMemo(() => {
    return (
      formData.provider !== '' &&
      parseFloat(formData.monthlyVolume) > 0 &&
      parseFloat(formData.averageTransactionValue) > 0 &&
      isMixValid
    );
  }, [formData, isMixValid]);

  // Get selected provider
  const selectedProvider = providers.find((p) => p.name === formData.provider);

  // Handle payment mix change
  const handleMixChange = (
    method: keyof PaymentMix,
    value: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      paymentMix: {
        ...prev.paymentMix,
        [method]: Math.max(0, Math.min(100, value)),
      },
    }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && !isLoading) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Provider Selection */}
      <div>
        <label className="block text-sm font-semibold text-grey-700 mb-2">
          {labels.selectProvider}
        </label>
        <select
          value={formData.provider}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, provider: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white text-grey-900"
          disabled={loadingProviders}
        >
          <option value="">{labels.chooseProvider}</option>
          {providers.map((provider) => (
            <option key={provider.name} value={provider.name}>
              {provider.name}
            </option>
          ))}
        </select>
        {selectedProvider && (
          <p
            className={`mt-2 text-sm ${
              selectedProvider.confidenceLevel === 'high'
                ? 'text-green-600'
                : selectedProvider.confidenceLevel === 'medium'
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}
          >
            {labels.confidence[selectedProvider.confidenceLevel]}
          </p>
        )}
      </div>

      {/* Volume Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-grey-700 mb-2">
            {labels.monthlyVolume}
          </label>
          <input
            type="number"
            value={formData.monthlyVolume}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, monthlyVolume: e.target.value }))
            }
            placeholder={labels.monthlyVolumePlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            min="0"
            step="1000"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-grey-700 mb-2">
            {labels.avgTransaction}
          </label>
          <input
            type="number"
            value={formData.averageTransactionValue}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                averageTransactionValue: e.target.value,
              }))
            }
            placeholder={labels.avgTransactionPlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            min="0"
            step="10"
          />
        </div>
      </div>

      {/* Payment Mix */}
      <div>
        <label className="block text-sm font-semibold text-grey-700 mb-4">
          {labels.paymentMix}
        </label>
        <div className="space-y-4">
          {/* Mada */}
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm text-grey-600">{labels.mada}</div>
            <input
              type="range"
              value={formData.paymentMix.mada}
              onChange={(e) => handleMixChange('mada', Number(e.target.value))}
              className="flex-1 h-2 bg-grey-200 rounded-lg appearance-none cursor-pointer accent-green-500"
              min="0"
              max="100"
            />
            <div className="w-16 text-right">
              <input
                type="number"
                value={formData.paymentMix.mada}
                onChange={(e) =>
                  handleMixChange('mada', Number(e.target.value))
                }
                className="w-full px-2 py-1 rounded border border-grey-200 text-center text-sm"
                min="0"
                max="100"
              />
            </div>
            <span className="text-grey-500 text-sm">%</span>
          </div>

          {/* Visa/MC Local */}
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm text-grey-600">{labels.visaLocal}</div>
            <input
              type="range"
              value={formData.paymentMix.visa_mc_local}
              onChange={(e) =>
                handleMixChange('visa_mc_local', Number(e.target.value))
              }
              className="flex-1 h-2 bg-grey-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              min="0"
              max="100"
            />
            <div className="w-16 text-right">
              <input
                type="number"
                value={formData.paymentMix.visa_mc_local}
                onChange={(e) =>
                  handleMixChange('visa_mc_local', Number(e.target.value))
                }
                className="w-full px-2 py-1 rounded border border-grey-200 text-center text-sm"
                min="0"
                max="100"
              />
            </div>
            <span className="text-grey-500 text-sm">%</span>
          </div>

          {/* Visa/MC International */}
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm text-grey-600">{labels.visaIntl}</div>
            <input
              type="range"
              value={formData.paymentMix.visa_mc_international}
              onChange={(e) =>
                handleMixChange('visa_mc_international', Number(e.target.value))
              }
              className="flex-1 h-2 bg-grey-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
              min="0"
              max="100"
            />
            <div className="w-16 text-right">
              <input
                type="number"
                value={formData.paymentMix.visa_mc_international}
                onChange={(e) =>
                  handleMixChange('visa_mc_international', Number(e.target.value))
                }
                className="w-full px-2 py-1 rounded border border-grey-200 text-center text-sm"
                min="0"
                max="100"
              />
            </div>
            <span className="text-grey-500 text-sm">%</span>
          </div>
        </div>

        {/* Total indicator */}
        <div
          className={`mt-4 flex items-center justify-between px-4 py-2 rounded-lg ${
            isMixValid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          <span className="text-sm font-medium">{labels.total}</span>
          <span className="text-lg font-bold">{mixTotal.toFixed(0)}%</span>
        </div>
        {!isMixValid && (
          <p className="mt-2 text-sm text-red-600">{labels.mixError}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform ${
          isFormValid && !isLoading
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] shadow-lg hover:shadow-xl'
            : 'bg-grey-200 text-grey-500 cursor-not-allowed'
        }`}
      >
        {isLoading ? labels.calculating : labels.calculate}
      </button>
    </form>
  );
}
