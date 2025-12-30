'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { adminStatisticApiService } from '@/services/api/admin/statisticApi';
import StatisticForm from '@/core/components/admin/statistic/StatisticForm';

export default function EditStatisticPage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const params = useParams();
  const id = params.id as string;

  const [statistic, setStatistic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStatistic = async () => {
      try {
        const data = await adminStatisticApiService.getStatisticById(id);
        setStatistic(data);
      } finally {
        setIsLoading(false);
      }
    };
    loadStatistic();
  }, [id]);

  const handleSubmit = async (data: any) => {
    await adminStatisticApiService.updateStatistic(id, data);
  };

  if (isLoading) {
    return <div className="p-6 text-center">{isRTL ? 'جارٍ التحميل...' : 'Loading...'}</div>;
  }

  if (!statistic) {
    return <div className="p-6 text-center text-red-600">{isRTL ? 'غير موجود' : 'Not found'}</div>;
  }

  return (
    <div className="p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">
        {isRTL ? 'تعديل الإحصائية' : 'Edit Statistic'}
      </h1>

      <StatisticForm mode="edit" initialData={statistic} onSubmit={handleSubmit} />
    </div>
  );
}
