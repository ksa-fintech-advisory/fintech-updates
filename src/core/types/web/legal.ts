export interface BilingualText {
  en: string;
  ar: string;
}

export interface LegalSection {
  id: string;
  title: BilingualText;
  content: BilingualText;
}

export interface LegalDocument {
  title: BilingualText;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface LegalContent {
  privacy: LegalDocument;
  terms: LegalDocument;
}
