/** Feather icon id for principles grid (no emoji). */
export type AboutValueIconKey = 'candor' | 'lean' | 'partner' | 'depth';

/** Feather icon id for expertise grid. */
export type AboutExpertiseIconKey = 'sandbox' | 'systems' | 'local';

export interface AboutUsContent {
  mission: {
    en: string;
    ar: string;
  };
  vision: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  values: Value[];
  expertise: ExpertiseArea[];
}

export interface Value {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  iconKey: AboutValueIconKey;
}

export interface ExpertiseArea {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  iconKey: AboutExpertiseIconKey;
}
