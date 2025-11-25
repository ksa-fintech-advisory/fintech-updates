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
  icon?: string;
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
  icon?: string;
}
