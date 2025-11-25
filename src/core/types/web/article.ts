// Article Types
export interface Article {
  id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  excerpt: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  featuredImage: string;
  category: ArticleCategory;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTime: number; // minutes
  isFeatured: boolean;
  views: number;
}

export interface ArticleCategory {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  color: string; // Hex color
}

export interface Author {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  avatar?: string;
  bio?: {
    en: string;
    ar: string;
  };
  role: {
    en: string;
    ar: string;
  };
}

export interface ArticleFilters {
  category?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
}

export interface PaginatedArticles {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
