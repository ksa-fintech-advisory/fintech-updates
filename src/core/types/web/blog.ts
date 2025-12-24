// Blog Types
export type BlogContentBlock =
  | { type: 'header'; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'list'; style: 'ordered' | 'unordered'; items: string[] }
  | { type: 'quote'; text: string; author?: string };

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
    bio: {
      en: string;
      ar: string;
    };
    role: {
      en: string;
      ar: string;
    };
    avatar?: string;
  };
  publishedAt: string;
  readTime: number; // minutes
  relatedPosts: string[]; // Array of Blog IDs
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

// Localized Types
export interface LocalizedBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: BlogContentBlock[];
  featuredImage: string;
  category: LocalizedBlogCategory;
  tags: string[];
  author: {
    id: string;
    name: string;
    bio: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: number; // minutes
  relatedPosts: LocalizedBlog[]; // We might need to map this in the service
}

export interface LocalizedBlogCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon?: string;
}

export interface LocalizedPaginatedBlogs {
  blogs: LocalizedBlog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: LocalizedBlogCategory[];
}
