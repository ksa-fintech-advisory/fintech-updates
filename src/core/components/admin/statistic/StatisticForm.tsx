'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface StatisticFormProps {
  initialData?: any;
  mode: 'create' | 'edit';
  onSubmit: (data: any) => Promise<void>;
}

export default function StatisticForm({ initialData, mode, onSubmit }: StatisticFormProps) {
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    value: initialData?.value || '',
    labelEn: initialData?.labelEn || '',
    labelAr: initialData?.labelAr || '',
    icon: initialData?.icon || '📊',
    order: initialData?.order || 0,
    active: initialData?.active !== undefined ? initialData.active : true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!formData.value || !formData.labelEn || !formData.labelAr) {
        throw new Error('Please fill in all required fields');
      }

      await onSubmit(formData);
      router.push('/admin/statistics');
    } catch (err: any) {
      setError(err.message || 'Failed to save statistic');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'القيمة' : 'Value'} *
            </label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="500+"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'الرمز' : 'Icon'}
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full border rounded px-3 py-2 text-2xl"
              maxLength={2}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'التسمية (إنجليزي)' : 'Label (English)'} *
            </label>
            <input
              type="text"
              value={formData.labelEn}
              onChange={(e) => setFormData({ ...formData, labelEn: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'التسمية (عربي)' : 'Label (Arabic)'} *
            </label>
            <input
              type="text"
              value={formData.labelAr}
              onChange={(e) => setFormData({ ...formData, labelAr: e.target.value })}
              className="w-full border rounded px-3 py-2"
              dir="rtl"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {isRTL ? 'الترتيب' : 'Order'}
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            className="w-4 h-4"
          />
          <label htmlFor="active" className="text-sm font-medium">
            {isRTL ? 'نشط' : 'Active'}
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border rounded hover:bg-gray-50"
          disabled={isSubmitting}
        >
          {isRTL ? 'إلغاء' : 'Cancel'}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded text-white ${isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isSubmitting ? (isRTL ? 'جارٍ الحفظ...' : 'Saving...') : (isRTL ? 'حفظ' : 'Save')}
        </button>
      </div>
    </form>
  );
}
