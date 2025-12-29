'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { adminHeroApiService } from '@/services/api/admin/heroApi';
import HeroForm from '@/core/components/admin/hero/HeroForm';

export default function CreateHeroPage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await adminHeroApiService.createHero(data);
    router.push('/admin/heroes');
  };

  return (
    <div className="p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">
        {isRTL ? 'إنشاء بانر جديد' : 'Create New Hero'}
      </h1>

      <HeroForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
