// Guide Types
export interface Guide {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  category: GuideCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // e.g., "45 min read"
  slug: string;
  icon: string;
  topics: string[];
  publishedAt: string;
  updatedAt: string;
}

export interface GuideCategory {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  color: string;
  icon: string;
}

export interface PaginatedGuides {
  guides: Guide[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: GuideCategory[];
}
