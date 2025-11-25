// Compliance Types
export interface ComplianceUpdate {
  id: string;
  region: ComplianceRegion;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  category: ComplianceCategory;
  publishedAt: string;
  effectiveDate?: string;
  source: string;
  sourceUrl?: string;
}

export interface ComplianceRegion {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  code: string; // e.g., 'ksa', 'uae', 'bahrain'
  flag: string; // emoji flag
}

export interface ComplianceCategory {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  color: string;
}

export interface PaginatedCompliance {
  updates: ComplianceUpdate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  regions: ComplianceRegion[];
  categories: ComplianceCategory[];
}
