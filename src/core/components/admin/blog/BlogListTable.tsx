'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { format } from 'date-fns';

interface BlogListTableProps {
  blogs: any[];
  onDelete: (id: string) => Promise<void>;
}

export default function BlogListTable({ blogs, onDelete }: BlogListTableProps) {
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await onDelete(id);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className={`px-6 py-3 text-${isRTL ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isRTL ? 'العنوان' : 'Title'}
            </th>
            <th className={`px-6 py-3 text-${isRTL ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isRTL ? 'الفئة' : 'Category'}
            </th>
            <th className={`px-6 py-3 text-${isRTL ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isRTL ? 'الكاتب' : 'Author'}
            </th>
            <th className={`px-6 py-3 text-${isRTL ? 'right' : 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isRTL ? 'تاريخ النشر' : 'Published'}
            </th>
            <th className={`px-6 py-3 text-${isRTL ? 'left' : 'right'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
              {isRTL ? 'الإجراءات' : 'Actions'}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {blogs.map((blog) => (
            <tr
              key={blog.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => router.push(`/admin/blogs/${blog.id}`)}
            >
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {isRTL ? blog.titleAr : blog.titleEn}
                </div>
                <div className="text-sm text-gray-500 truncate max-w-md">
                  {isRTL ? blog.excerptAr : blog.excerptEn}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className="px-2 py-1 text-xs rounded-full"
                  style={{ backgroundColor: blog.category.color + '20', color: blog.category.color }}
                >
                  {isRTL ? blog.category.nameAr : blog.category.name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {isRTL ? (blog.author.nameAr || blog.author.name) : blog.author.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(blog.publishedAt), 'MMM dd, yyyy')}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-${isRTL ? 'left' : 'right'} text-sm font-medium`}>
                <div className="flex items-center gap-2 justify-end" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                    className="px-3 py-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
                  >
                    {isRTL ? 'تعديل' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id, isRTL ? blog.titleAr : blog.titleEn)}
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
      
      {blogs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {isRTL ? 'لم يتم العثور على مدونات. أنشئ أول مدونة!' : 'No blogs found. Create your first blog!'}
        </div>
      )}
    </div>
  );
}
