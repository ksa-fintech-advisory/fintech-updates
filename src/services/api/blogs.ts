import { LocalizedBlog, LocalizedPaginatedBlogs, BlogFilters, LocalizedBlogCategory } from '@/core/types/web/blog';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

export const blogApiService = {
  /**
   * Get paginated blogs with optional filters and locale
   */
  async paginateBlogs(
    page: number = 1,
    limit: number = 12,
    filters?: BlogFilters,
    locale: string = 'ar'
  ): Promise<LocalizedPaginatedBlogs> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      lang: locale,
    });

    if (filters?.category) {
      params.append('category', filters.category);
    }

    if (filters?.search) {
      params.append('search', filters.search);
    }

    const res = await fetch(`${BASE_URL}/api/blogs?${params.toString()}`, {
      cache: 'no-store', // Ensure fresh data
    });

    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }

    return res.json();
  },

  /**
   * Get a single blog by slug with locale
   */
  async getBlogBySlug(slug: string, locale: string = 'ar'): Promise<LocalizedBlog | null> {
    const params = new URLSearchParams({ lang: locale });
    const res = await fetch(`${BASE_URL}/api/blogs/${slug}?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch blog');
    }

    return res.json();
  },

  /**
   * Get blog categories
   */
  async getBlogCategories(locale: string = 'ar'): Promise<LocalizedBlogCategory[]> {
     const data = await this.paginateBlogs(1, 1, undefined, locale);
     return data.categories;
  },
};
