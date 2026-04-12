export type LocalizedMessage = {
  en: string;
  ar: string;
};

export interface RateFormData {
  name: string;
  role: string;
  serviceType: 'technical_consulting' | 'mentoring_enablement';
  description: string;
  agreeToShare: boolean;
}

export interface RateFormResponse {
  success: boolean;
  message: LocalizedMessage;
  error?: string;
}
