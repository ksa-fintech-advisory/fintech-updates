'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { adminStatisticApiService } from '@/services/api/admin/statisticApi';

export default function StatisticsPage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [statistics, setStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setIsLoading(true);
      const data = await adminStatisticApiService.getStatistics();
      setStatistics(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(isRTL ? 'هل أنت متأكد من الحذف؟' : 'Are you sure?')) {
      try {
        await adminStatisticApiService.deleteStatistic(id);
        await loadStatistics();
      } catch (err: any) {
        alert(err.message || 'Failed to delete');
      }
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await adminStatisticApiService.updateStatistic(id, { active: !currentActive });
      await loadStatistics();
    } catch (err: any) {
      alert(err.message || 'Failed to update');
    }
  };

  return (
    <div className="p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isRTL ? 'الإحصائيات' : 'Statistics'}
        </h1>
        <Link
          href="/admin/statistics/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isRTL ? '+ إضافة إحصائية' : '+ Add Statistic'}
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
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-4 py-3 text-left">{isRTL ? 'الرمز' : 'Icon'}</th>
                <th className="border px-4 py-3 text-left">{isRTL ? 'القيمة' : 'Value'}</th>
                <th className="border px-4 py-3 text-left">{isRTL ? 'التسمية' : 'Label'}</th>
                <th className="border px-4 py-3 text-left">{isRTL ? 'الترتيب' : 'Order'}</th>
                <th className="border px-4 py-3 text-left">{isRTL ? 'نشط' : 'Active'}</th>
                <th className="border px-4 py-3 text-left">{isRTL ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {statistics.map((stat: any) => (
                <tr key={stat.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-3 text-2xl">{stat.icon}</td>
                  <td className="border px-4 py-3 font-bold">{stat.value}</td>
                  <td className="border px-4 py-3">{isRTL ? stat.labelAr : stat.labelEn}</td>
                  <td className="border px-4 py-3">{stat.order}</td>
                  <td className="border px-4 py-3">
                    <button
                      onClick={() => handleToggleActive(stat.id, stat.active)}
                      className={`px-3 py-1 text-xs rounded ${stat.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {stat.active ? (isRTL ? 'نعم' : 'Yes') : (isRTL ? 'لا' : 'No')}
                    </button>
                  </td>
                  <td className="border px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/statistics/edit/${stat.id}`}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        {isRTL ? 'تعديل' : 'Edit'}
                      </Link>
                      <button
                        onClick={() => handleDelete(stat.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        {isRTL ? 'حذف' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
