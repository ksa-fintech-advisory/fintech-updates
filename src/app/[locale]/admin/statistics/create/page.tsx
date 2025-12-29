'use client';

import { useLocale } from 'next-intl';
import { adminStatisticApiService } from '@/services/api/admin/statisticApi';
import StatisticForm from '@/core/components/admin/statistic/StatisticForm';

export default function CreateStatisticPage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleSubmit = async (data: any) => {
    await adminStatisticApiService.createStatistic(data);
  };

  return (
    <div className="p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6">
        {isRTL ? 'إنشاء إحصائية جديدة' : 'Create New Statistic'}
      </h1>

      <StatisticForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
