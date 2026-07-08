import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/core/seo/buildPageMetadata';
import MaintenancePage from '@/core/components/web/maintenance/MaintenancePage';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'web.maintenance' });
  return {
    ...buildPageMetadata({
      locale,
      title: t('metaTitle'),
      description: t('metaDescription'),
      path: '',
    }),
    robots: { index: false, follow: false },
  };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  return <MaintenancePage locale={params.locale} />;
}
