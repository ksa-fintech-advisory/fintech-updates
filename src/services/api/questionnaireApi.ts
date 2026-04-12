import type { QuestionnaireFormData, QuestionnaireFormResponse } from '@/core/types/web/questionnaire';

export type { QuestionnaireFormData, QuestionnaireFormResponse };

const fallbackError: QuestionnaireFormResponse = {
  success: false,
  message: {
    en: 'Something went wrong. Please try again.',
    ar: 'حدث خطأ ما. حاول مرة أخرى.',
  },
};

export const questionnaireApiService = {
  submitQuestionnaireForm: async (data: QuestionnaireFormData): Promise<QuestionnaireFormResponse> => {
    const res = await fetch('/api/questionnaire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    let parsed: QuestionnaireFormResponse;
    try {
      parsed = (await res.json()) as QuestionnaireFormResponse;
    } catch {
      return fallbackError;
    }

    if (typeof parsed.success !== 'boolean' || !parsed.message?.en || !parsed.message?.ar) {
      return fallbackError;
    }

    return parsed;
  },
};
