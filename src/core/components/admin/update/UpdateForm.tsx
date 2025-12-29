'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { CreateUpdateDto, UpdateUpdateDto } from '@/services/api/admin/updateApi';

interface UpdateFormProps {
  initialData?: any;
  mode: 'create' | 'edit';
  onSubmit: (data: CreateUpdateDto | UpdateUpdateDto) => Promise<void>;
}

export default function UpdateForm({initialData, mode, onSubmit }: UpdateFormProps) {
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    titleEn: initialData?.titleEn || '',
    titleAr: initialData?.titleAr || '',
    descriptionEn: initialData?.descriptionEn || '',
    descriptionAr: initialData?.descriptionAr || '',
    icon: initialData?.icon || '📰',
    date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    publishedAt: initialData?.publishedAt ? new Date(initialData.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    featured: initialData?.featured || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.slug || !formData.titleEn || !formData.titleAr || !formData.descriptionEn || !formData.descriptionAr) {
        throw new Error('Please fill in all required fields');
      }

      await onSubmit(formData);
      router.push('/admin/updates');
    } catch (err: any) {
      setError(err.message || 'Failed to save update');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">
          {isRTL ? 'المعلومات الأساسية' : 'Basic Information'}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'العنوان (إنجليزي)' : 'Title (English)'} *
            </label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => {
                setFormData({ ...formData, titleEn: e.target.value });
                if (mode === 'create' && !formData.slug) {
                  setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                }
              }}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'العنوان (عربي)' : 'Title (Arabic)'} *
            </label>
            <input
              type="text"
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              className="w-full border rounded px-3 py-2"
              dir="rtl"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'الوصف (إنجليزي)' : 'Description (English)'} *
            </label>
            <textarea
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'الوصف (عربي)' : 'Description (Arabic)'} *
            </label>
            <textarea
              value={formData.descriptionAr}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={3}
              dir="rtl"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'الرمز التعبيري' : 'Icon (Emoji)'}
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full border rounded px-3 py-2 text-2xl"
              placeholder="📰"
              maxLength={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'التاريخ' : 'Date'} *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'تاريخ النشر' : 'Published At'}
            </label>
            <input
              type="date"
              value={formData.publishedAt}
              onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {isRTL ? 'الرابط' : 'Slug'} *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="sama-digital-payments-framework"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {isRTL ? 'معرّف صديق لمحركات البحث' : 'URL-friendly identifier'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4"
          />
          <label htmlFor="featured" className="text-sm font-medium">
            {isRTL ? 'مميز (يظهر في الصفحة الرئيسية)' : 'Featured (Show on home page)'}
          </label>
        </div>
      </div>

      {/* Submit Buttons */}
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
          className={`px-6 py-2 rounded text-white ${
            isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isSubmitting
            ? (isRTL ? 'جارٍ الحفظ...' : 'Saving...')
            : mode === 'create'
            ? (isRTL ? 'إنشاء تحديث' : 'Create Update')
            : (isRTL ? 'تحديث' : 'Update')}
        </button>
      </div>
    </form>
  );
}
