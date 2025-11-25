// Contact Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: {
    en: string;
    ar: string;
  };
  error?: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface NewsletterFormResponse {
  success: boolean;
  message: {
    en: string;
    ar: string;
  };
  error?: string;
}
