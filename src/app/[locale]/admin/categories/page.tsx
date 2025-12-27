'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import CategoryForm from '@/core/components/admin/category/CategoryForm';
import { adminCategoryApi } from '@/services/api/admin/categoryApi';

export default function CategoriesPage() {
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await adminCategoryApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleSubmit = async (data: any) => {
    if (editingCategory) {
      await adminCategoryApi.updateCategory(editingCategory.id, data);
    } else {
      await adminCategoryApi.createCategory(data);
    }
    setShowModal(false);
    await loadCategories();
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`${isRTL ? 'هل أنت متأكد من حذف الفئة' : 'Are you sure you want to delete category'} "${name}"?`)) {
      try {
        await adminCategoryApi.deleteCategory(id);
        await loadCategories();
      } catch (error: any) {
        alert(error.message || (isRTL ? 'فشل في حذف الفئة' : 'Failed to delete category'));
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">{isRTL ? 'جاري التحميل...' : 'Loading categories...'}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {isRTL ? 'إدارة الفئات' : 'Category Management'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isRTL ? 'إدارة فئات المدونات' : 'Manage blog categories'}
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isRTL ? 'إضافة فئة جديدة' : 'Add New Category'}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className={`px-6 py-3 text-${isRTL ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {isRTL ? 'الاسم' : 'Name'}
              </th>
              <th className={`px-6 py-3 text-${isRTL ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {isRTL ? 'المعرف' : 'Slug'}
              </th>
              <th className={`px-6 py-3 text-${isRTL ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {isRTL ? 'اللون' : 'Color'}
              </th>
              <th className={`px-6 py-3 text-${isRTL ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {isRTL ? 'الأيقونة' : 'Icon'}
              </th>
              <th className={`px-6 py-3 text-${isRTL ? 'left' : 'right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                {isRTL ? 'الإجراءات' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{category.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {isRTL ? category.nameAr : category.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {isRTL ? category.name : category.nameAr}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{category.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-xs text-gray-500">{category.color}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-2xl">{category.icon}</div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-${isRTL ? 'left' : 'right'} text-sm font-medium`}>
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(category)}
                      className="px-3 py-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
                    >
                      {isRTL ? 'تعديل' : 'Edit'}
                    </button>
                    <button
                      onClick={() => handleDelete(category.id, isRTL ? category.nameAr : category.name)}
                      className="px-3 py-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                    >
                      {isRTL ? 'حذف' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {isRTL ? 'لم يتم العثور على فئات' : 'No categories found'}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
                {editingCategory 
                  ? (isRTL ? 'تعديل الفئة' : 'Edit Category')
                  : (isRTL ? 'إضافة فئة جديدة' : 'Add New Category')
                }
              </h2>
              <CategoryForm
                mode={editingCategory ? 'edit' : 'create'}
                initialData={editingCategory}
                onSubmit={handleSubmit}
                onCancel={() => setShowModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

