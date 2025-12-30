'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import HeroListTable from '@/core/components/admin/hero/HeroListTable';
import { adminHeroApiService } from '@/services/api/admin/heroApi';

export default function HeroesPage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [heroes, setHeroes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHeroes();
  }, []);

  const loadHeroes = async () => {
    try {
      setIsLoading(true);
      const data = await adminHeroApiService.getHeroes();
      setHeroes(data as any);
    } catch (err: any) {
      setError(err.message || 'Failed to load heroes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminHeroApiService.deleteHero(id);
      await loadHeroes();
    } catch (err: any) {
      alert(err.message || 'Failed to delete hero');
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await adminHeroApiService.updateHero(id, { active: !currentActive });
      await loadHeroes();
    } catch (err: any) {
      alert(err.message || 'Failed to update hero');
    }
  };

  return (
    <div className="p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isRTL ? 'البانرات' : 'Heroes'}
        </h1>
        <Link
          href="/admin/heroes/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isRTL ? '+ إضافة بانر' : '+ Add Hero'}
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">
            {isRTL ? 'جارٍ التحميل...' : 'Loading...'}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <HeroListTable 
            heroes={heroes} 
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
          />
        </div>
      )}
    </div>
  );
}
