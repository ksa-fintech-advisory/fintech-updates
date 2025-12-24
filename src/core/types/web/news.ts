import { BlogContentBlock } from './blog';

export type NewsCategory = 'Regulation' | 'Compliance' | 'Market' | 'Announcement';

export interface NewsUpdate {
  id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  summary: {
    en: string;
    ar: string;
  };
  content: {
    en: BlogContentBlock[];
    ar: BlogContentBlock[];
  };
  date: string;
  category: NewsCategory;
  source?: {
    en: string;
    ar: string;
  };
  pdfUrl?: string; // URL to the downloadable PDF
  isImportant?: boolean; // To highlight critical updates
}

export interface LocalizedNewsUpdate {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: BlogContentBlock[];
  date: string;
  category: NewsCategory;
  source?: string;
  pdfUrl?: string;
  isImportant?: boolean;
}

export interface PaginatedNewsUpdates {
  updates: NewsUpdate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LocalizedPaginatedNewsUpdates {
  updates: LocalizedNewsUpdate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
