'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { adminHeroApiService } from '@/services/api/admin/heroApi';
import HeroForm from '@/core/components/admin/hero/HeroForm';

export default function EditHeroPage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const params = useParams();
  const id = params.id as string;

  const [hero, setHero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHero();
  }, [id]);

  const loadHero = async () => {
    try {
      setIsLoading(true);
      const data = await adminHeroApiService.getHeroById(id);
      setHero(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load hero');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    await adminHeroApiService.updateHero(id, data);
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">
          {isRTL ? 'جارٍ التحميل...' : 'Loading...'}
        </p>
      </div>
    );
  }

  if (error || !hero) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || (isRTL ? 'البانر غير موجود' : 'Hero not found')}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">
        {isRTL ? 'تعديل البانر' : 'Edit Hero'}
      </h1>

      <HeroForm mode="edit" initialData={hero} onSubmit={handleSubmit} />
    </div>
  );
}
