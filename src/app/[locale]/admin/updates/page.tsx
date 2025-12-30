'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import UpdateListTable from '@/core/components/admin/update/UpdateListTable';
import { adminUpdateApiService } from '@/services/api/admin/updateApi';

export default function UpdatesPage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [updates, setUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUpdates();
  }, []);

  const loadUpdates = async () => {
    try {
      setIsLoading(true);
      const data = await adminUpdateApiService.getUpdates();
      setUpdates(data as any);
    } catch (err: any) {
      setError(err.message || 'Failed to load updates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminUpdateApiService.deleteUpdate(id);
      await loadUpdates();
    } catch (err: any) {
      alert(err.message || 'Failed to delete update');
    }
  };

  return (
    <div className="p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isRTL ? 'التحديثات' : 'Updates'}
        </h1>
        <Link
          href="/admin/updates/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isRTL ? '+ إضافة تحديث' : '+ Add Update'}
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
          <UpdateListTable updates={updates} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
