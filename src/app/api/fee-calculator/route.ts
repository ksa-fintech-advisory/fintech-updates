/**
 * Fee Calculator API Route
 * POST /api/fee-calculator
 */

import { NextResponse } from 'next/server';
import { calculateFees, validateRequest, getProviders } from '@/services/fee-calculator/engine';
import { FeeCalculationRequest, FeeCalculationError, PricingData } from '@/services/fee-calculator/types';
import pricingData from '@/data/saudi_psp_pricing.json';

/**
 * POST - Calculate fees for a provider
 */
export async function POST(request: Request) {
  try {
    // Get locale from header
    const acceptLanguage = request.headers.get('accept-language');
    const locale = acceptLanguage?.includes('ar') ? 'ar' : 'en';

    // Parse request body
    const body = await request.json();
    
    const calcRequest: FeeCalculationRequest = {
      provider: body.provider || '',
      monthlyVolume: Number(body.monthlyVolume) || 0,
      averageTransactionValue: Number(body.averageTransactionValue) || 0,
      paymentMix: {
        mada: Number(body.paymentMix?.mada) || 0,
        visa_mc_local: Number(body.paymentMix?.visa_mc_local) || 0,
        visa_mc_international: Number(body.paymentMix?.visa_mc_international) || 0,
      },
    };

    // Validate request
    const validation = validateRequest(calcRequest, pricingData as PricingData);
    if (!validation.valid) {
      const errorResponse: FeeCalculationError = {
        error: locale === 'ar' ? 'بيانات غير صالحة' : 'Invalid request data',
        code: 'INVALID_VALUES',
        details: validation.errors,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Calculate fees
    const result = calculateFees(calcRequest, pricingData as PricingData, locale);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Fee calculation error:', error);
    
    const errorResponse: FeeCalculationError = {
      error: 'Server error',
      code: 'SERVER_ERROR',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * GET - Get list of available providers
 */
export async function GET() {
  try {
    const providers = getProviders(pricingData as PricingData);
    
    // Return provider details for dropdowns
    const providerDetails = (pricingData as PricingData).providers.map((p) => ({
      name: p.provider,
      confidenceLevel: p.confidence_level,
      settlementDays: p.settlement_days,
      hasSetupFee: p.pricing.setup_fee.max > 0,
      hasMonthlyFee: p.pricing.monthly_fee.max > 0,
    }));

    return NextResponse.json({
      providers: providerDetails,
      currency: pricingData.currency,
      lastUpdated: pricingData.last_updated,
    });
  } catch (error) {
    console.error('Error fetching providers:', error);
    return NextResponse.json({ error: 'Failed to fetch providers' }, { status: 500 });
  }
}
