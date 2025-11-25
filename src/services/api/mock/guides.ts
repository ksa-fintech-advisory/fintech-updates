import { PaginatedGuides } from '@/core/types/web/guide';
import { guides, guideCategories } from './data/guides.data';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const guideService = {
  /**
   * Get paginated guides
   */
  async paginateGuides(
    page: number = 1,
    limit: number = 12,
    category?: string
  ): Promise<PaginatedGuides> {
    await delay();
    
    let filteredGuides = [...guides];

    // Apply category filter
    if (category) {
      filteredGuides = filteredGuides.filter(guide => guide.category.slug === category);
    }

    // Sort by publish date (newest first)
    filteredGuides.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const total = filteredGuides.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      guides: filteredGuides.slice(start, end),
      total,
      page,
      limit,
      totalPages,
      categories: guideCategories,
    };
  },

  /**
   * Get a single guide by slug
   */
  async getGuideBySlug(slug: string) {
    await delay();
    
    return guides.find(guide => guide.slug === slug) || null;
  },

  /**
   * Get all categories
   */
  async getCategories() {
    await delay(200);
    
    return guideCategories;
  },
};
