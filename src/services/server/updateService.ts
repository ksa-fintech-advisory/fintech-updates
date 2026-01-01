import prisma from '@/lib/prisma';

export const updateService = {
  async getUpdates(params: {
    limit?: number;
    featured?: boolean;
    lang?: string;
  } = {}) {
    const { limit, featured, lang = 'en' } = params;

    const where: any = {};
    if (featured) {
      where.featured = true;
    }

    const updates = await prisma.update.findMany({
      where,
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
    });

    // Transform to localized format
    return updates.map((update) => ({
      id: update.id,
      title: lang === 'ar' ? update.titleAr : update.titleEn,
      description: lang === 'ar' ? update.descriptionAr : update.descriptionEn,
      summary: lang === 'ar' ? update.summaryAr : update.summaryEn,
      icon: update.icon,
      date: update.date.toISOString(),
      publishedAt: update.publishedAt.toISOString(),
      featured: update.featured,
      slug: update.slug,
      featuredImage: update.featuredImage,
      content: update.content,
      source: update.source,
      category: update.category,
      references: update.references,
      pdfUrl: update.pdfUrl,
    }));
  },

  async getUpdateBySlug(slug: string, lang: string = 'en') {
     const update = await prisma.update.findUnique({
      where: { slug },
    });

    if (!update) {
      return null;
    }

    return {
      id: update.id,
      title: lang === 'ar' ? update.titleAr : update.titleEn,
      description: lang === 'ar' ? update.descriptionAr : update.descriptionEn,
      summary: lang === 'ar' ? update.summaryAr : update.summaryEn,
      icon: update.icon,
      date: update.date.toISOString(),
      publishedAt: update.publishedAt.toISOString(),
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
};
