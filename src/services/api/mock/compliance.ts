import { PaginatedCompliance } from '@/core/types/web/compliance';
import { complianceUpdates, complianceRegions, complianceCategories } from './data/compliance.data';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const complianceService = {
  /**
   * Get paginated compliance updates with optional region filter
   */
  async paginateCompliance(
    page: number = 1,
    limit: number = 10,
    regionCode?: string
  ): Promise<PaginatedCompliance> {
    await delay();
    
    let filteredUpdates = [...complianceUpdates];

    // Apply region filter
    if (regionCode) {
      filteredUpdates = filteredUpdates.filter(
        update => update.region.code === regionCode
      );
    }

    // Sort by published date (newest first)
    filteredUpdates.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const total = filteredUpdates.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      updates: filteredUpdates.slice(start, end),
      total,
      page,
      limit,
      totalPages,
      regions: complianceRegions,
      categories: complianceCategories,
    };
  },

  /**
   * Get compliance updates by region
   */
  async getByRegion(regionCode: string) {
    await delay();
    
    return complianceUpdates.filter(update => update.region.code === regionCode);
  },

  /**
   * Get all regions
   */
  async getRegions() {
    await delay(200);
    
    return complianceRegions;
  },
};
