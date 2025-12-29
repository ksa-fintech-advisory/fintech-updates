'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { CreateHeroDto } from '@/services/api/admin/heroApi';

interface CTAButton {
  labelEn: string;
  labelAr: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface HeroFormProps {
  initialData?: any;
  mode: 'create' | 'edit';
  onSubmit: (data: CreateHeroDto) => Promise<void>;
}

export default function HeroForm({ initialData, mode, onSubmit }: HeroFormProps) {
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse CTA buttons from initialData
  const initialButtons: CTAButton[] = initialData?.ctaButtons 
    ? (typeof initialData.ctaButtons === 'string' ? JSON.parse(initialData.ctaButtons) : initialData.ctaButtons)
    : [{ labelEn: '', labelAr: '', href: '', variant: 'primary' as const }];

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    titleEn: initialData?.titleEn || '',
    titleAr: initialData?.titleAr || '',
    subtitleEn: initialData?.subtitleEn || '',
    subtitleAr: initialData?.subtitleAr || '',
    descriptionEn: initialData?.descriptionEn || '',
    descriptionAr: initialData?.descriptionAr || '',
    active: initialData?.active || false,
  });

  const [ctaButtons, setCtaButtons] = useState<CTAButton[]>(initialButtons);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.titleEn || !formData.titleAr) {
        throw new Error('Please fill in all required fields');
      }

      await onSubmit({
        ...formData,
        ctaButtons: JSON.stringify(ctaButtons),
      });
      router.push('/admin/heroes');
    } catch (err: any) {
      setError(err.message || 'Failed to save hero');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addButton = () => {
    setCtaButtons([...ctaButtons, { labelEn: '', labelAr: '', href: '', variant: 'primary' }]);
  };

  const removeButton = (index: number) => {
    setCtaButtons(ctaButtons.filter((_, i) => i !== index));
  };

  const updateButton = (index: number, field: keyof CTAButton, value: string) => {
    const updated = [...ctaButtons];
    updated[index] = { ...updated[index], [field]: value };
    setCtaButtons(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">
          {isRTL ? 'المعلومات الأساسية' : 'Basic Information'}
        </h2>

        <div>
          <label className="block text-sm font-medium mb-1">
            {isRTL ? 'الاسم الداخلي' : 'Internal Name'} *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder={isRTL ? 'مثال: البانر الرئيسي' : 'e.g., Main Hero'}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'العنوان (إنجليزي)' : 'Title (English)'} *
            </label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
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
              {isRTL ? 'العنوان الفرعي (إنجليزي)' : 'Subtitle (English)'}
            </label>
            <input
              type="text"
              value={formData.subtitleEn}
              onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'العنوان الفرعي (عربي)' : 'Subtitle (Arabic)'}
            </label>
            <input
              type="text"
              value={formData.subtitleAr}
              onChange={(e) => setFormData({ ...formData, subtitleAr: e.target.value })}
              className="w-full border rounded px-3 py-2"
              dir="rtl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'الوصف (إنجليزي)' : 'Description (English)'}
            </label>
            <textarea
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'الوصف (عربي)' : 'Description (Arabic)'}
            </label>
            <textarea
              value={formData.descriptionAr}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={3}
              dir="rtl"
            />
          </div>
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
            {isRTL ? 'نشط (سيظهر في الصفحة الرئيسية)' : 'Active (Will display on home page)'}
          </label>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {isRTL ? 'أزرار الدعوة لاتخاذ إجراء' : 'CTA Buttons'}
          </h2>
          <button
            type="button"
            onClick={addButton}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {isRTL ? '+ إضافة زر' : '+ Add Button'}
          </button>
        </div>

        {ctaButtons.map((button, index) => (
          <div key={index} className="border rounded p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{isRTL ? `الزر ${index + 1}` : `Button ${index + 1}`}</span>
              {ctaButtons.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeButton(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  {isRTL ? 'حذف' : 'Remove'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder={isRTL ? 'النص (إنجليزي)' : 'Label (English)'}
                value={button.labelEn}
                onChange={(e) => updateButton(index, 'labelEn', e.target.value)}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder={isRTL ? 'النص (عربي)' : 'Label (Arabic)'}
                value={button.labelAr}
                onChange={(e) => updateButton(index, 'labelAr', e.target.value)}
                className="border rounded px-3 py-2"
                dir="rtl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder={isRTL ? 'الرابط' : 'URL'}
                value={button.href}
                onChange={(e) => updateButton(index, 'href', e.target.value)}
                className="border rounded px-3 py-2"
              />
              <select
                value={button.variant}
                onChange={(e) => updateButton(index, 'variant', e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="primary">{isRTL ? 'أساسي' : 'Primary'}</option>
                <option value="secondary">{isRTL ? 'ثانوي' : 'Secondary'}</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
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
            ? (isRTL ? 'إنشاء' : 'Create')
            : (isRTL ? 'تحديث' : 'Update')}
        </button>
      </div>
    </form>
  );
}
