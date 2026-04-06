import { staticUpdateRecords, type StaticUpdateRecord } from '@/services/api/data/updates.data';

function localize(update: StaticUpdateRecord, lang: string) {
  const isAr = lang === 'ar';
  return {
    id: update.id,
    title: isAr ? update.titleAr : update.titleEn,
    description: isAr ? update.descriptionAr : update.descriptionEn,
    summary: isAr ? update.summaryAr : update.summaryEn,
    icon: update.icon,
    date: update.date,
    publishedAt: update.publishedAt,
    featured: update.featured,
    slug: update.slug,
    featuredImage: update.featuredImage,
    content: update.content,
    source: update.source,
    category: update.category,
    references: update.references,
    pdfUrl: update.pdfUrl,
  };
}

export type LocalizedUpdate = ReturnType<typeof localize>;

/** Same surface as the former Prisma-backed `updateService` for web pages. */
export const updateService = {
  async getUpdates(params: { limit?: number; featured?: boolean; lang?: string } = {}) {
    const { limit, featured, lang = 'en' } = params;

    let list = [...staticUpdateRecords];
    if (featured) {
      list = list.filter((u) => u.featured);
    }
    list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    if (limit != null && limit > 0) {
      list = list.slice(0, limit);
    }
    return list.map((u) => localize(u, lang));
  },

  async getUpdateBySlug(slug: string, lang: string = 'en') {
    const found = staticUpdateRecords.find((u) => u.slug === slug);
    if (!found) return null;
    return localize(found, lang);
  },
};

export function getUpdateSitemapEntries(): { slug: string; publishedAt: Date }[] {
  return staticUpdateRecords.map((u) => ({
    slug: u.slug,
    publishedAt: new Date(u.publishedAt),
  }));
}
