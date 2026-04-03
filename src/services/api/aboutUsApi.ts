import type { AboutUsContent } from '@/core/types/web/aboutUs';
import { aboutUsData } from '@/services/api/data/aboutUs.data';

export const aboutUsApiService = {
  getAboutUsContent: async (_lang: string = 'en'): Promise<AboutUsContent> => aboutUsData,
};
