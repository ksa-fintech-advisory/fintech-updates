'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import UpdateForm from '@/core/components/admin/update/UpdateForm';
import { adminUpdateApiService } from '@/services/api/admin/updateApi';

export default function EditUpdatePage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const params = useParams();
  const id = params.id as string;

  const [update, setUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUpdate();
  }, [id]);

  const loadUpdate = async () => {
    try {
      setIsLoading(true);
      const data = await adminUpdateApiService.getUpdateById(id);
      setUpdate(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load update');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    await adminUpdateApiService.updateUpdate(id, data);
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

  if (error || !update) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || (isRTL ? 'التحديث غير موجود' : 'Update not found')}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">
        {isRTL ? 'تعديل التحديث' : 'Edit Update'}
      </h1>

      <UpdateForm mode="edit" initialData={update} onSubmit={handleSubmit} />
    </div>
  );
}
