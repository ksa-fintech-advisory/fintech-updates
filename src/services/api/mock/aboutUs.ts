import { AboutUsContent } from '@/core/types/web/aboutUs';
import { aboutUsData } from './data/aboutUs.data';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const aboutUsService = {
  /**
   * Get about us content
   */
  async getAboutUsContent(): Promise<AboutUsContent> {
    await delay(300);
    
    return aboutUsData;
  },
};
