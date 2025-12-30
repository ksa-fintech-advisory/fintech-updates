/**
 * Fee Calculator Types
 * TypeScript interfaces for Saudi PSP pricing data and fee calculation
 */

// ============================================
// Pricing Data Types (from JSON)
// ============================================

export interface PriceRange {
  min: number;
  max: number;
}

export interface PaymentMethodPricing {
  percentage: PriceRange;
  fixed_fee: PriceRange;
  cap?: number; // Only for mada
}

export interface ProviderPricing {
  provider: string;
  pricing: {
    monthly_fee: PriceRange;
    setup_fee: PriceRange;
    payment_methods: {
      mada: PaymentMethodPricing;
      visa_mc_local: PaymentMethodPricing;
      visa_mc_international: PaymentMethodPricing;
    };
  };
  settlement_days: PriceRange;
  additional_fees: string[];
  confidence_level: 'high' | 'medium' | 'low';
  source_type: 'public_pricing' | 'market_estimate' | 'industry_inference';
}

export interface PricingData {
  currency: string;
  vat_applies: boolean;
  last_updated: string;
  disclaimer: string;
  providers: ProviderPricing[];
}

// ============================================
// API Request/Response Types
// ============================================

export type PaymentMethod = 'mada' | 'visa_mc_local' | 'visa_mc_international';

export interface PaymentMix {
  mada: number;           // percentage (0-100)
  visa_mc_local: number;  // percentage (0-100)
  visa_mc_international: number; // percentage (0-100)
}

export interface FeeCalculationRequest {
  provider: string;
  monthlyVolume: number;      // SAR
  averageTransactionValue: number; // SAR
  paymentMix: PaymentMix;
}

export interface PaymentMethodBreakdown {
  method: PaymentMethod;
  methodLabel: string;
  transactionCount: number;
  volume: number;
  percentageFee: number;
  fixedFee: number;
  totalFee: number;
  effectiveRate: number; // percentage
}

export interface FeeCalculationResponse {
  // Summary
  totalMonthlyFees: number;
  effectiveFeeRate: number; // percentage
  netSettlementAmount: number;
  
  // Fee breakdown
  fixedFees: number;
  variableFees: number;
  vatAmount: number;
  
  // Per-method breakdown
  methodBreakdown: PaymentMethodBreakdown[];
  
  // Transaction info
  totalTransactions: number;
  totalVolume: number;
  
  // Provider info
  provider: string;
  settlementDays: string;
  confidenceLevel: 'high' | 'medium' | 'low';
  
  // Assumptions & metadata
  assumptions: string[];
  disclaimer: string;
  lastUpdated: string;
}

export interface FeeCalculationError {
  error: string;
  code: 'INVALID_PROVIDER' | 'INVALID_PAYMENT_MIX' | 'INVALID_VALUES' | 'SERVER_ERROR';
  details?: string[];
}

// ============================================
// Validation Types
// ============================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
