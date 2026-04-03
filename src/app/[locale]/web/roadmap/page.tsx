import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FintechLearnerRoadmap from '@/core/components/web/roadmap/FintechLearnerRoadmap';

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'web.roadmapPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default function RoadmapPage() {
  return <FintechLearnerRoadmap />;
}
