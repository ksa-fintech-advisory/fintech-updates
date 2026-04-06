import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/core/seo/buildPageMetadata';
import FintechLearnerRoadmap from '@/core/components/web/roadmap/FintechLearnerRoadmap';

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'web.roadmapPage' });
  return buildPageMetadata({
    locale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/roadmap',
  });
}

export default function RoadmapPage() {
  return <FintechLearnerRoadmap />;
}
