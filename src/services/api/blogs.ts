import type { LocalizedBlog, LocalizedBlogCategory, LocalizedPaginatedBlogs, BlogFilters } from '@/core/types/web/blog';
import {
  getFeaturedStaticBlogs,
  getStaticBlogBySlug,
  getStaticCategoriesLocalized,
  paginateStaticBlogs,
} from '@/services/blog/staticBlogs';

export const blogApiService = {
  async paginateBlogs(
    page: number = 1,
    limit: number = 12,
    filters?: BlogFilters,
    locale: string = 'ar',
  ): Promise<LocalizedPaginatedBlogs> {
    return paginateStaticBlogs(page, limit, filters, locale);
  },

  async getBlogBySlug(slug: string, locale: string = 'ar'): Promise<LocalizedBlog | null> {
    return getStaticBlogBySlug(slug, locale);
  },

  async getFeaturedBlogs(locale: string = 'ar', limit: number = 3): Promise<LocalizedBlog[]> {
    return getFeaturedStaticBlogs(locale, limit);
  },

  async getBlogCategories(locale: string = 'ar'): Promise<LocalizedBlogCategory[]> {
    return getStaticCategoriesLocalized(locale);
  },
};
