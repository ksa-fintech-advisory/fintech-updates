'use client';

import { useLocale } from 'next-intl';
import UpdateForm from '@/core/components/admin/update/UpdateForm';
import { adminUpdateApiService } from '@/services/api/admin/updateApi';

export default function CreateUpdatePage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleSubmit = async (data: any) => {
    await adminUpdateApiService.createUpdate(data);
  };

  return (
    <div className="p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">
        {isRTL ? 'إنشاء تحديث جديد' : 'Create New Update'}
      </h1>

      <UpdateForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
