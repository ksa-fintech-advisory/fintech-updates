// Blog Types
export type BlogContentBlock =
  | { type: 'header'; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'list'; style: 'ordered' | 'unordered'; items: string[] };

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
    en: BlogContentBlock[];
    ar: BlogContentBlock[];
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
