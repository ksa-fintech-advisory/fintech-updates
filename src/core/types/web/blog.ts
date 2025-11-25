// Blog Types
export interface Blog {
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
  category: BlogCategory;
  tags: string[];
  author: {
    id: string;
    name: {
      en: string;
      ar: string;
    };
    avatar?: string;
  };
  publishedAt: string;
  readTime: number; // minutes
}

export interface BlogCategory {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  color: string;
  icon?: string;
}

export interface PaginatedBlogs {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: BlogCategory[];
}

export interface BlogFilters {
  category?: string;
  search?: string;
}
