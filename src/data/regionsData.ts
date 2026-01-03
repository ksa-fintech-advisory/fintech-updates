// Region data for the header dropdown
export interface Region {
  id: string;
  code: string;
  name: { en: string; ar: string };
  flag: string;
  isActive: boolean; // Whether content is available for this region
}

export const regions: Region[] = [
  {
    id: 'region-sa',
    code: 'sa',
    name: { en: 'Saudi Arabia', ar: 'السعودية' },
    flag: '🇸🇦',
    isActive: true,
  },
  {
    id: 'region-ae',
    code: 'ae',
    name: { en: 'UAE', ar: 'الإمارات' },
    flag: '🇦🇪',
    isActive: false, // Coming soon
  },
  {
    id: 'region-eg',
    code: 'eg',
    name: { en: 'Egypt', ar: 'مصر' },
    flag: '🇪🇬',
    isActive: false, // Coming soon
  },
  {
    id: 'region-bh',
    code: 'bh',
    name: { en: 'Bahrain', ar: 'البحرين' },
    flag: '🇧🇭',
    isActive: false, // Coming soon
  },
  {
    id: 'region-kw',
    code: 'kw',
    name: { en: 'Kuwait', ar: 'الكويت' },
    flag: '🇰🇼',
    isActive: false, // Coming soon
  },
  {
    id: 'region-qa',
    code: 'qa',
    name: { en: 'Qatar', ar: 'قطر' },
    flag: '🇶🇦',
    isActive: false, // Coming soon
  },
  {
    id: 'region-om',
    code: 'om',
    name: { en: 'Oman', ar: 'عمان' },
    flag: '🇴🇲',
    isActive: false, // Coming soon
  },
];

// Helper functions
export function getActiveRegions(): Region[] {
  return regions.filter(r => r.isActive);
}

export function getRegionByCode(code: string): Region | undefined {
  return regions.find(r => r.code === code);
}

export function getAllRegions(): Region[] {
  return regions;
}

export function getDefaultRegion(): Region {
  return regions[0]; // Saudi Arabia
}
