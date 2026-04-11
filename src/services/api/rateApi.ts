import type { RateFormData, RateFormResponse } from '@/core/types/web/rate';

export type { RateFormData, RateFormResponse };

const fallbackError: RateFormResponse = {
  success: false,
  message: {
    en: 'Something went wrong. Please try again.',
    ar: 'حدث خطأ ما. حاول مرة أخرى.',
  },
};

export const rateApiService = {
  submitRateForm: async (data: RateFormData): Promise<RateFormResponse> => {
    const res = await fetch('/api/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    let parsed: RateFormResponse;
    try {
      parsed = (await res.json()) as RateFormResponse;
    } catch {
      return fallbackError;
    }

    if (typeof parsed.success !== 'boolean' || !parsed.message?.en || !parsed.message?.ar) {
      return fallbackError;
    }

    return parsed;
  },
};
