// Technology Types
export interface Technology {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  category: TechnologyCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // e.g., "45 min read"
  slug: string;
  icon: string;
  topics: string[];
  publishedAt: string;
  updatedAt: string;
}

export interface TechnologyCategory {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  color: string;
  icon: string;
}

export interface PaginatedTechnologies {
  technologies: Technology[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: TechnologyCategory[];
}
