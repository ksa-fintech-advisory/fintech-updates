'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface CategoryFormProps {
  mode: 'create' | 'edit';
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function CategoryForm({ mode, initialData, onSubmit, onCancel }: CategoryFormProps) {
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    nameAr: initialData?.nameAr || '',
    slug: initialData?.slug || '',
    color: initialData?.color || '#3B82F6',
    icon: initialData?.icon || '📁',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (value: string) => {
    handleChange('name', value);
    // Auto-generate slug only in create mode if slug is empty
    if (mode === 'create' && !formData.slug) {
      handleChange('slug', generateSlug(value));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = isRTL ? 'الاسم مطلوب' : 'Name is required';
    }
    if (!formData.nameAr.trim()) {
      newErrors.nameAr = isRTL ? 'الاسم بالعربية مطلوب' : 'Arabic name is required';
    }
    if (!formData.slug.trim()) {
      newErrors.slug = isRTL ? 'المعرف مطلوب' : 'Slug is required';
    }
    if (!formData.color.trim()) {
      newErrors.color = isRTL ? 'اللون مطلوب' : 'Color is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      router.push('/admin/categories');
    } catch (error: any) {
      alert(error.message || (isRTL ? 'فشل في حفظ الفئة' : 'Failed to save category'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="space-y-6">
        {/* Name (English) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'الاسم (إنجليزي)' : 'Name (English)'}
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={isRTL ? 'مثال: تقنية' : 'e.g., Technology'}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Name (Arabic) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'الاسم (عربي)' : 'Name (Arabic)'}
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            value={formData.nameAr}
            onChange={(e) => handleChange('nameAr', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nameAr ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={isRTL ? 'مثال: التقنية' : 'e.g., التقنية'}
            dir="rtl"
          />
          {errors.nameAr && <p className="mt-1 text-sm text-red-500">{errors.nameAr}</p>}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'المعرف (Slug)' : 'Slug'}
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.slug ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={isRTL ? 'مثال: technology' : 'e.g., technology'}
          />
          {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
          <p className="mt-1 text-xs text-gray-500">
            {isRTL ? 'يستخدم في الروابط (أحرف إنجليزية صغيرة وشرطات فقط)' : 'Used in URLs (lowercase letters and dashes only)'}
          </p>
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'اللون' : 'Color'}
            <span className="text-red-500"> *</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.color ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="#3B82F6"
            />
          </div>
          {errors.color && <p className="mt-1 text-sm text-red-500">{errors.color}</p>}
        </div>

        {/* Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'الأيقونة (إيموجي)' : 'Icon (Emoji)'}
          </label>
          <input
            type="text"
            value={formData.icon}
            onChange={(e) => handleChange('icon', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="📁"
            maxLength={2}
          />
          <p className="mt-1 text-xs text-gray-500">
            {isRTL ? 'اختر أي رمز تعبيري' : 'Choose any emoji'}
          </p>
        </div>

        {/* Preview */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isRTL ? 'معاينة' : 'Preview'}
          </label>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{formData.icon}</span>
            <span
              className="px-3 py-1 text-sm rounded-full"
              style={{ backgroundColor: formData.color + '20', color: formData.color }}
            >
              {formData.name || (isRTL ? 'اسم الفئة' : 'Category Name')}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className={`flex gap-3 pt-4 border-t ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting 
              ? (isRTL ? 'جاري الحفظ...' : 'Saving...') 
              : (mode === 'create' 
                  ? (isRTL ? 'إنشاء فئة' : 'Create Category')
                  : (isRTL ? 'تحديث الفئة' : 'Update Category')
                )
            }
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isRTL ? 'إلغاء' : 'Cancel'}
          </button>
        </div>
      </div>
    </form>
  );
}
