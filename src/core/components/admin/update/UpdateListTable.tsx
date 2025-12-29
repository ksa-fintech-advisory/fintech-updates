'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { format } from 'date-fns';

interface Update {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  date: string;
  publishedAt: string;
  featured: boolean;
  slug: string;
}

interface UpdateListTableProps {
  updates: Update[];
  onDelete: (id: string) => void;
}

export default function UpdateListTable({ updates, onDelete }: UpdateListTableProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="overflow-x-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-semibold`}>
              {isRTL ? 'الرمز' : 'Icon'}
            </th>
            <th className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-semibold`}>
              {isRTL ? 'العنوان' : 'Title'}
            </th>
            <th className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-semibold`}>
              {isRTL ? 'الوصف' : 'Description'}
            </th>
            <th className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-semibold`}>
              {isRTL ? 'التاريخ' : 'Date'}
            </th>
            <th className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-semibold`}>
              {isRTL ? 'مميز?' : 'Featured?'}
            </th>
            <th className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-semibold`}>
              {isRTL ? 'الإجراءات' : 'Actions'}
            </th>
          </tr>
        </thead>
        <tbody>
          {updates.length === 0 ? (
            <tr>
              <td colSpan={6} className="border px-4 py-8 text-center text-gray-500">
                {isRTL ? 'لا توجد تحديثات' : 'No updates found'}
              </td>
            </tr>
          ) : (
            updates.map((update) => (
              <tr key={update.id} className="hover:bg-gray-50">
                <td className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} text-2xl`}>
                  {update.icon}
                </td>
                <td className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-medium`}>
                  {isRTL ? update.titleAr : update.titleEn}
                </td>
                <td className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} text-sm text-gray-600`}>
                  {isRTL 
                    ? update.descriptionAr.substring(0, 60) + (update.descriptionAr.length > 60 ? '...' : '')
                    : update.descriptionEn.substring(0, 60) + (update.descriptionEn.length > 60 ? '...' : '')
                  }
                </td>
                <td className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} text-sm`}>
                  {format(new Date(update.date), 'MMM d, yyyy')}
                </td>
                <td className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'}`}>
                  {update.featured ? (
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                      {isRTL ? 'نعم' : 'Yes'}
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      {isRTL ? 'لا' : 'No'}
                    </span>
                  )}
                </td>
                <td className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'}`}>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/updates/edit/${update.id}`}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {isRTL ? 'تعديل' : 'Edit'}
                    </Link>
                    <button
                      onClick={() => handleDelete(update.id, isRTL ? update.titleAr : update.titleEn)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      {isRTL ? 'حذف' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
