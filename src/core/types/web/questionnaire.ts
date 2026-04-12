export type LocalizedMessage = {
  en: string;
  ar: string;
};

export interface QuestionnaireFormData {
  name: string;
  email: string;
  region: 'saudi_arabia' | 'uae' | 'bahrain' | 'kuwait' | 'jordan' | 'other';
  otherRegion?: string;
  projectType: 'payments' | 'open_banking' | 'wealth_management' | 'crypto' | 'other';
  otherProjectType?: string;
  difficulties: string;
}

export interface QuestionnaireFormResponse {
  success: boolean;
  message: LocalizedMessage;
  error?: string;
}
