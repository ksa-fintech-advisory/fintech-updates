export type LocalizedMessage = {
  en: string;
  ar: string;
};

export interface RateFormData {
  name: string;
  serviceType: 'consulting' | 'technical';
  description: string;
  agreeToShare: boolean;
}

export interface RateFormResponse {
  success: boolean;
  message: LocalizedMessage;
  error?: string;
}
