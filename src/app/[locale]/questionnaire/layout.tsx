import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/core/seo/buildPageMetadata';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'web.questionnaire' });
  return buildPageMetadata({
    locale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    path: '/questionnaire',
    image: '/images/og/questionnaire-og.png',
  });
}

export default function QuestionnaireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
