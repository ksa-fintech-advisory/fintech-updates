import type { ContactFormData, ContactFormResponse } from '@/core/types/web/contact';

export type { ContactFormData, ContactFormResponse };

const fallbackError: ContactFormResponse = {
  success: false,
  message: {
    en: 'Something went wrong. Please try again or email me directly.',
    ar: 'حدث خطأ ما. حاول مرة أخرى أو راسلني عبر البريد مباشرة.',
  },
};

export const contactApiService = {
  submitContactForm: async (data: ContactFormData): Promise<ContactFormResponse> => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    let parsed: ContactFormResponse;
    try {
      parsed = (await res.json()) as ContactFormResponse;
    } catch {
      return fallbackError;
    }

    if (typeof parsed.success !== 'boolean' || !parsed.message?.en || !parsed.message?.ar) {
      return fallbackError;
    }

    return parsed;
  },
};
