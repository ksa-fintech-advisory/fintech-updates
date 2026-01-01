import prisma from '@/lib/prisma';

export const statisticService = {
  async getStatistics(lang: string = 'en') {
    const statistics = await prisma.statistic.findMany({
      where: {
        active: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Transform to localized format
    return statistics.map((stat) => ({
      id: stat.id,
      value: stat.value,
      label: lang === 'ar' ? stat.labelAr : stat.labelEn,
      icon: stat.icon,
      order: stat.order,
    }));
  },
};
