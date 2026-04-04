import type { ContactFormData, ContactFormResponse } from '@/core/types/web/contact';

export type { ContactFormData, ContactFormResponse };

export const contactApiService = {
  submitContactForm: async (data: ContactFormData): Promise<ContactFormResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: {
        en: 'Thank you for your message. I will get back to you shortly.',
        ar: 'شكراً لرسالتك. سأعود إليك قريباً.',
      },
    };
  },
};
