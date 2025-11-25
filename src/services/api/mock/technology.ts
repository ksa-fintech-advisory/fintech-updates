import { PaginatedTechnologies } from '@/core/types/web/technology';
import { technologies, technologyCategories } from './data/technology.data';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const technologyService = {
  /**
   * Get paginated technologies
   */
  async paginateTechnologies(
    page: number = 1,
    limit: number = 12,
    category?: string
  ): Promise<PaginatedTechnologies> {
    await delay();
    
    let filteredTechnologies = [...technologies];

    // Apply category filter
    if (category) {
      filteredTechnologies = filteredTechnologies.filter(tech => tech.category.slug === category);
    }

    // Sort by publish date (newest first)
    filteredTechnologies.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const total = filteredTechnologies.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      technologies: filteredTechnologies.slice(start, end),
      total,
      page,
      limit,
      totalPages,
      categories: technologyCategories,
    };
  },

  /**
   * Get a single technology by slug
   */
  async getTechnologyBySlug(slug: string) {
    await delay();
    
    return technologies.find(tech => tech.slug === slug) || null;
  },

  /**
   * Get all categories
   */
  async getCategories() {
    await delay(200);
    
    return technologyCategories;
  },
};
