/**
 * Fee Calculation Engine
 * Pure calculation logic for Saudi PSP fee estimation
 * NO HTTP or framework logic - deterministic, data-driven calculations
 */

import {
  PricingData,
  ProviderPricing,
  FeeCalculationRequest,
  FeeCalculationResponse,
  PaymentMethodBreakdown,
  PaymentMethod,
  ValidationResult,
} from './types';

// VAT rate in Saudi Arabia
const VAT_RATE = 0.15;

// Setup fee amortization period (months)
const SETUP_AMORTIZATION_MONTHS = 12;

// Payment method display labels
const METHOD_LABELS: Record<PaymentMethod, { en: string; ar: string }> = {
  mada: { en: 'Mada', ar: 'مدى' },
  visa_mc_local: { en: 'Visa/Mastercard (Local)', ar: 'فيزا/ماستركارد (محلي)' },
  visa_mc_international: { en: 'Visa/Mastercard (International)', ar: 'فيزا/ماستركارد (دولي)' },
};

/**
 * Validate calculation request
 */
export function validateRequest(
  request: FeeCalculationRequest,
  pricingData: PricingData
): ValidationResult {
  const errors: string[] = [];

  // Check provider exists
  const providerExists = pricingData.providers.some(
    (p) => p.provider.toLowerCase() === request.provider.toLowerCase()
  );
  if (!providerExists) {
    errors.push(`Provider "${request.provider}" not found in pricing data`);
  }

  // Check payment mix totals 100%
  const mixTotal =
    request.paymentMix.mada +
    request.paymentMix.visa_mc_local +
    request.paymentMix.visa_mc_international;
  
  if (Math.abs(mixTotal - 100) > 0.01) {
    errors.push(`Payment mix must total 100% (current: ${mixTotal.toFixed(2)}%)`);
  }

  // Check positive values
  if (request.monthlyVolume <= 0) {
    errors.push('Monthly volume must be positive');
  }
  if (request.averageTransactionValue <= 0) {
    errors.push('Average transaction value must be positive');
  }

  // Check non-negative payment mix percentages
  if (request.paymentMix.mada < 0) {
    errors.push('Mada percentage cannot be negative');
  }
  if (request.paymentMix.visa_mc_local < 0) {
    errors.push('Visa/MC Local percentage cannot be negative');
  }
  if (request.paymentMix.visa_mc_international < 0) {
    errors.push('Visa/MC International percentage cannot be negative');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get provider pricing data
 */
function getProviderPricing(
  providerName: string,
  pricingData: PricingData
): ProviderPricing | undefined {
  return pricingData.providers.find(
    (p) => p.provider.toLowerCase() === providerName.toLowerCase()
  );
}

/**
 * Calculate midpoint of a price range
 */
function getMidpoint(min: number, max: number): number {
  return (min + max) / 2;
}

/**
 * Calculate transaction count from volume and average value
 */
function calculateTransactionCount(
  monthlyVolume: number,
  averageTransactionValue: number
): number {
  return Math.round(monthlyVolume / averageTransactionValue);
}

/**
 * Calculate fees for a single payment method
 * Handles mada fee cap logic
 */
function calculateMethodFees(
  method: PaymentMethod,
  transactionCount: number,
  averageTransactionValue: number,
  methodPricing: { percentage: { min: number; max: number }; fixed_fee: { min: number; max: number }; cap?: number },
  locale: string = 'en'
): PaymentMethodBreakdown {
  // Get midpoint rates
  const percentageRate = getMidpoint(
    methodPricing.percentage.min,
    methodPricing.percentage.max
  );
  const fixedFeePerTx = getMidpoint(
    methodPricing.fixed_fee.min,
    methodPricing.fixed_fee.max
  );

  const volume = transactionCount * averageTransactionValue;

  // Calculate percentage fee (as percentage of transaction value)
  let percentageFee = volume * (percentageRate / 100);

  // Apply mada cap if applicable
  // Cap is per transaction, so we need to check each transaction
  if (method === 'mada' && methodPricing.cap !== undefined) {
    const capPerTransaction = methodPricing.cap;
    const uncappedFeePerTx = averageTransactionValue * (percentageRate / 100);
    const cappedFeePerTx = Math.min(uncappedFeePerTx, capPerTransaction);
    percentageFee = transactionCount * cappedFeePerTx;
  }

  // Calculate fixed fee
  const fixedFee = transactionCount * fixedFeePerTx;

  // Total fee for this method
  const totalFee = percentageFee + fixedFee;

  // Effective rate for this method
  const effectiveRate = volume > 0 ? (totalFee / volume) * 100 : 0;

  return {
    method,
    methodLabel: METHOD_LABELS[method][locale as 'en' | 'ar'] || METHOD_LABELS[method].en,
    transactionCount,
    volume,
    percentageFee,
    fixedFee,
    totalFee,
    effectiveRate,
  };
}

/**
 * Calculate fixed monthly costs (subscription + amortized setup)
 */
function calculateFixedCosts(pricing: ProviderPricing['pricing']): number {
  const monthlyFee = getMidpoint(pricing.monthly_fee.min, pricing.monthly_fee.max);
  const setupFee = getMidpoint(pricing.setup_fee.min, pricing.setup_fee.max);
  const amortizedSetup = setupFee / SETUP_AMORTIZATION_MONTHS;
  
  return monthlyFee + amortizedSetup;
}

/**
 * Generate assumptions list based on pricing data
 */
function generateAssumptions(
  provider: ProviderPricing,
  locale: string = 'en'
): string[] {
  const assumptions: string[] = [];
  const isArabic = locale === 'ar';

  // Pricing uses midpoint of ranges
  assumptions.push(
    isArabic
      ? 'تستخدم الأسعار نقطة الوسط للنطاقات السعرية المنشورة'
      : 'Pricing uses midpoint of published price ranges'
  );

  // Setup fee amortization
  if (provider.pricing.setup_fee.max > 0) {
    assumptions.push(
      isArabic
        ? 'رسوم الإعداد موزعة على 12 شهراً'
        : 'Setup fee amortized over 12 months'
    );
  }

  // VAT
  assumptions.push(
    isArabic
      ? 'ضريبة القيمة المضافة 15% مطبقة على الرسوم فقط، وليس على حجم المعاملات'
      : 'VAT (15%) applied to fees only, not transaction volume'
  );

  // Mada cap
  assumptions.push(
    isArabic
      ? 'رسوم مدى محددة بسقف 2 ريال لكل معاملة'
      : 'Mada fees capped at 2 SAR per transaction'
  );

  // Confidence level
  const confidenceText = {
    high: isArabic ? 'عالي' : 'high',
    medium: isArabic ? 'متوسط' : 'medium',
    low: isArabic ? 'منخفض' : 'low',
  };
  assumptions.push(
    isArabic
      ? `مستوى الثقة في البيانات: ${confidenceText[provider.confidence_level]}`
      : `Data confidence level: ${confidenceText[provider.confidence_level]}`
  );

  // Source type
  if (provider.source_type !== 'public_pricing') {
    assumptions.push(
      isArabic
        ? 'الأسعار مبنية على تقديرات السوق وقد تختلف'
        : 'Pricing based on market estimates and may vary'
    );
  }

  return assumptions;
}

/**
 * Main fee calculation function
 * Pure, deterministic, data-driven
 */
export function calculateFees(
  request: FeeCalculationRequest,
  pricingData: PricingData,
  locale: string = 'en'
): FeeCalculationResponse {
  const isArabic = locale === 'ar';
  
  // Get provider pricing
  const provider = getProviderPricing(request.provider, pricingData);
  if (!provider) {
    throw new Error(`Provider "${request.provider}" not found`);
  }

  // Calculate total transaction count
  const totalTransactions = calculateTransactionCount(
    request.monthlyVolume,
    request.averageTransactionValue
  );

  // Calculate per-method breakdown
  const methods: PaymentMethod[] = ['mada', 'visa_mc_local', 'visa_mc_international'];
  const methodBreakdown: PaymentMethodBreakdown[] = methods.map((method) => {
    const mixPercentage = request.paymentMix[method] / 100;
    const methodTransactions = Math.round(totalTransactions * mixPercentage);
    
    return calculateMethodFees(
      method,
      methodTransactions,
      request.averageTransactionValue,
      provider.pricing.payment_methods[method],
      locale
    );
  });

  // Calculate totals
  const variableFees = methodBreakdown.reduce((sum, m) => sum + m.totalFee, 0);
  const fixedFees = calculateFixedCosts(provider.pricing);
  const subtotal = variableFees + fixedFees;
  const vatAmount = pricingData.vat_applies ? subtotal * VAT_RATE : 0;
  const totalMonthlyFees = subtotal + vatAmount;

  // Effective rate
  const effectiveFeeRate = request.monthlyVolume > 0
    ? (totalMonthlyFees / request.monthlyVolume) * 100
    : 0;

  // Net settlement
  const netSettlementAmount = request.monthlyVolume - totalMonthlyFees;

  // Settlement days description
  const settlementDays =
    provider.settlement_days.min === provider.settlement_days.max
      ? `${provider.settlement_days.min} ${isArabic ? 'يوم' : 'days'}`
      : `${provider.settlement_days.min}-${provider.settlement_days.max} ${isArabic ? 'أيام' : 'days'}`;

  return {
    totalMonthlyFees: Math.round(totalMonthlyFees * 100) / 100,
    effectiveFeeRate: Math.round(effectiveFeeRate * 100) / 100,
    netSettlementAmount: Math.round(netSettlementAmount * 100) / 100,
    fixedFees: Math.round(fixedFees * 100) / 100,
    variableFees: Math.round(variableFees * 100) / 100,
    vatAmount: Math.round(vatAmount * 100) / 100,
    methodBreakdown: methodBreakdown.map((m) => ({
      ...m,
      percentageFee: Math.round(m.percentageFee * 100) / 100,
      fixedFee: Math.round(m.fixedFee * 100) / 100,
      totalFee: Math.round(m.totalFee * 100) / 100,
      effectiveRate: Math.round(m.effectiveRate * 100) / 100,
    })),
    totalTransactions,
    totalVolume: request.monthlyVolume,
    provider: provider.provider,
    settlementDays,
    confidenceLevel: provider.confidence_level,
    assumptions: generateAssumptions(provider, locale),
    disclaimer: pricingData.disclaimer,
    lastUpdated: pricingData.last_updated,
  };
}

/**
 * Get list of available providers
 */
export function getProviders(pricingData: PricingData): string[] {
  return pricingData.providers.map((p) => p.provider);
}
