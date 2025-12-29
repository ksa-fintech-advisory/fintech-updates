import { LocalizedNewsUpdate, LocalizedPaginatedNewsUpdates, NewsCategory } from '@/core/types/web/news';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

export const newsApiService = {
  async getNewsUpdates(
    locale: string,
    page: number = 1,
    limit: number = 10,
    category?: NewsCategory,
    search?: string
  ): Promise<LocalizedPaginatedNewsUpdates> {
    try {
      const queryParams = new URLSearchParams({
        lang: locale,
        page: page.toString(),
        limit: limit.toString(),
      });

      if (category) queryParams.append('category', category);
      if (search) queryParams.append('search', search);

      const response = await fetch(`${BASE_URL}/api/news?${queryParams.toString()}`, {
        next: { revalidate: 60 }, // Revalidate every minute
      });

      if (!response.ok) {
        throw new Error('Failed to fetch news updates');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching news updates:', error);
      return {
        updates: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      };
    }
  },

  async getNewsUpdateBySlug(slug: string, locale: string): Promise<LocalizedNewsUpdate | null> {
    try {
      const response = await fetch(`${BASE_URL}/api/news/${slug}?lang=${locale}`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch news update');
      }

      return response.json();
    } catch (error) {
      console.error(`Error fetching news update ${slug}:`, error);
      return null;
    }
  },
};
