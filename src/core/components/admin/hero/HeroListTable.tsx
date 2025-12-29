'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { format } from 'date-fns';

interface Hero {
  id: string;
  name: string;
  titleEn: string;
  titleAr: string;
  active: boolean;
  createdAt: string;
}

interface HeroListTableProps {
  heroes: Hero[];
  onDelete: (id: string) => void;
  onToggleActive: (id: string, currentActive: boolean) => void;
}

export default function HeroListTable({ heroes, onDelete, onToggleActive }: HeroListTableProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="overflow-x-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-semibold`}>
              {isRTL ? 'الاسم' : 'Name'}
            </th>
            <th className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-semibold`}>
              {isRTL ? 'العنوان' : 'Title'}
            </th>
            <th className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-semibold`}>
              {isRTL ? 'نشط؟' : 'Active?'}
            </th>
            <th className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-semibold`}>
              {isRTL ? 'التاريخ' : 'Created'}
            </th>
            <th className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-semibold`}>
              {isRTL ? 'الإجراءات' : 'Actions'}
            </th>
          </tr>
        </thead>
        <tbody>
          {heroes.length === 0 ? (
            <tr>
              <td colSpan={5} className="border px-4 py-8 text-center text-gray-500">
                {isRTL ? 'لا توجد بانرات' : 'No heroes found'}
              </td>
            </tr>
          ) : (
            heroes.map((hero) => (
              <tr key={hero.id} className="hover:bg-gray-50">
                <td className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} font-medium`}>
                  {hero.name}
                </td>
                <td className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'}`}>
                  {isRTL ? hero.titleAr : hero.titleEn}
                </td>
                <td className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'}`}>
                  <button
                    onClick={() => onToggleActive(hero.id, hero.active)}
                    className={`inline-block px-3 py-1 text-xs rounded cursor-pointer ${
                      hero.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {hero.active ? (isRTL ? 'نعم' : 'Yes') : (isRTL ? 'لا' : 'No')}
                  </button>
                </td>
                <td className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'} text-sm`}>
                  {format(new Date(hero.createdAt), 'MMM d, yyyy')}
                </td>
                <td className={`border px-4 py-3 text-${isRTL ? 'right' : 'left'}`}>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/heroes/edit/${hero.id}`}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {isRTL ? 'تعديل' : 'Edit'}
                    </Link>
                    <button
                      onClick={() => handleDelete(hero.id, hero.name)}
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
