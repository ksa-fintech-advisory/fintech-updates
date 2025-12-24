import React from 'react';
import Link from 'next/link';
import { LocalizedNewsUpdate } from '@/core/types/web/news';

interface UpdateCardProps {
  update: LocalizedNewsUpdate;
  locale: string;
}

export const UpdateCard: React.FC<UpdateCardProps> = ({ update, locale }) => {
  const isArabic = locale === 'ar';
  
  const categoryColors = {
    Regulation: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    Compliance: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Market: 'bg-purple-50 text-purple-700 border-purple-100',
    Announcement: 'bg-amber-50 text-amber-700 border-amber-100',
  };

  const formattedDate = new Date(update.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={`group relative bg-white border border-grey-200 rounded-2xl p-6 md:p-8 hover:shadow-xl hover:border-grey-300 transition-all duration-300 ${update.isImportant ? 'border-l-4 border-l-primary-500' : ''}`}>
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex items-center justify-between">
          <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border ${categoryColors[update.category]}`}>
            {update.category}
          </span>
          <span className="text-sm text-grey-400 font-medium">
             {formattedDate}
          </span>
        </div>
        
        {update.source && (
          <div className="text-sm font-semibold text-primary-600">
                {update.source}
            </div>
        )}
      </div>

      <h3 className="text-2xl font-bold text-grey-900 mb-4 group-hover:text-primary-600 transition-colors leading-tight">
        <Link href={`/${locale}/web/updates/${update.slug}`} className="before:absolute before:inset-0">
          {update.title}
        </Link>
      </h3>

      <p className="text-grey-600 leading-relaxed mb-6 line-clamp-3 text-lg">
        {update.summary}
      </p>

      <div className="flex items-center gap-2 text-primary-600 font-bold text-sm mt-auto group-hover:gap-4 transition-all duration-300">
        <span>{isArabic ? 'قراءة التفاصيل' : 'Read Full Update'}</span>
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${isArabic ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
      
      {update.isImportant && (
        <div className="absolute top-6 right-6">
            <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
         </div>
      )}
    </div>
  );
};
