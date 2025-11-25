import { HomeContent, LatestUpdate } from '@/core/types/web/home';
import { homeData } from './data/home.data';
import { articleService } from './articles';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const homeService = {
  /**
   * Get all home page content including featured articles
   */
  async getHomeContent(): Promise<HomeContent> {
    await delay();

    // Get featured articles dynamically
    const featuredArticles = await articleService.getFeaturedArticles(3);

    return {
      ...homeData,
      featuredArticles,
    };
  },

  /**
   * Get latest updates
   */
  async getLatestUpdates(limit: number = 4): Promise<LatestUpdate[]> {
    await delay(300);
    
    return homeData.latestUpdates.slice(0, limit);
  },
};