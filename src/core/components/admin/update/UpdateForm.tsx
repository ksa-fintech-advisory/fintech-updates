'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { CreateUpdateDto, UpdateUpdateDto } from '@/services/api/admin/updateApi';
import ImageUpload from '@/core/components/admin/common/ImageUpload';

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

  // Parse references from JSON string
  const initialReferences = initialData?.references
    ? JSON.parse(initialData.references)
    : [];

  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    titleEn: initialData?.titleEn || '',
    titleAr: initialData?.titleAr || '',
    descriptionEn: initialData?.descriptionEn || '',
    descriptionAr: initialData?.descriptionAr || '',
    summaryEn: initialData?.summaryEn || '',
    summaryAr: initialData?.summaryAr || '',
    icon: initialData?.icon || '📰',
    featuredImage: initialData?.featuredImage || '',
    content: initialData?.content || '',
    source: initialData?.source || '',
    category: initialData?.category || '',
    pdfUrl: initialData?.pdfUrl || '',
    date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    publishedAt: initialData?.publishedAt ? new Date(initialData.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    featured: initialData?.featured || false,
  });

  const [references, setReferences] = useState<Array<{ title: string, url: string }>>(initialReferences);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.slug || !formData.titleEn || !formData.titleAr || !formData.descriptionEn || !formData.descriptionAr) {
        throw new Error('Please fill in all required fields');
      }

      const submitData = {
        ...formData,
        references: JSON.stringify(references),
      };

      await onSubmit(submitData);
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

  const addReference = () => {
    setReferences([...references, { title: '', url: '' }]);
  };

  const removeReference = (index: number) => {
    setReferences(references.filter((_, i) => i !== index));
  };

  const updateReference = (index: number, field: 'title' | 'url', value: string) => {
    const updated = [...references];
    updated[index][field] = value;
    setReferences(updated);
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
              {isRTL ? 'الملخص (إنجليزي)' : 'Summary (English)'} *
            </label>
            <input
              type="text"
              value={formData.summaryEn}
              onChange={(e) => setFormData({ ...formData, summaryEn: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'الملخص (عربي)' : 'Summary (Arabic)'} *
            </label>
            <input
              type="text"
              value={formData.summaryAr}
              onChange={(e) => setFormData({ ...formData, summaryAr: e.target.value })}
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
              rows={4}
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
              rows={4}
              dir="rtl"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {isRTL ? 'الصورة المميزة' : 'Featured Image'}
          </label>
          <ImageUpload
            value={formData.featuredImage}
            onChange={(url) => setFormData({ ...formData, featuredImage: url })}
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'الرمز' : 'Icon'}
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full border rounded px-3 py-2 text-2xl text-center"
              maxLength={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'المصدر' : 'Source'}
            </label>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="SAMA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {isRTL ? 'الفئة' : 'Category'}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select...</option>
              <option value="Regulation">Regulation</option>
              <option value="Compliance">Compliance</option>
              <option value="Market">Market</option>
              <option value="Announcement">Announcement</option>
            </select>
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
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {isRTL ? 'رابط PDF (اختياري)' : 'PDF URL (Optional)'}
          </label>
          <input
            type="url"
            value={formData.pdfUrl}
            onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
            className="w-full border rounded px-3 py-2"
            placeholder="https://example.com/document.pdf"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {isRTL ? 'رابط URL' : 'Slug'} *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
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
            {isRTL ? 'مميز' : 'Featured'}
          </label>
        </div>
      </div>

      {/* References */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {isRTL ? 'المراجع' : 'References'}
          </h2>
          <button
            type="button"
            onClick={addReference}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isRTL ? '+ إضافة مرجع' : '+ Add Reference'}
          </button>
        </div>

        {references.map((ref, index) => (
          <div key={index} className="border rounded p-4 space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{isRTL ? `مرجع ${index + 1}` : `Reference ${index + 1}`}</span>
              <button
                type="button"
                onClick={() => removeReference(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              value={ref.title}
              onChange={(e) => updateReference(index, 'title', e.target.value)}
              placeholder={isRTL ? 'العنوان' : 'Title'}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="url"
              value={ref.url}
              onChange={(e) => updateReference(index, 'url', e.target.value)}
              placeholder={isRTL ? 'الرابط' : 'URL'}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        ))}
      </div>

      {/* Content (Simple for now) */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          {isRTL ? 'المحتوى' : 'Content'}
        </h2>
        <p className="text-sm text-gray-600">
          {isRTL ? 'المحتوى المخزن كـ JSON. استخدام محرر نصوص غني قريبًا.' : 'Content stored as JSON. Rich editor coming soon.'}
        </p>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full border rounded px-3 py-2 font-mono text-sm"
          rows={6}
          placeholder='[{"type":"paragraph","content":"..."}]'
        />
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
              ? (isRTL ? 'إنشاء' : 'Create')
            : (isRTL ? 'تحديث' : 'Update')}
        </button>
      </div>
    </form>
  );
}
