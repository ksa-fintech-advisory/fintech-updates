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
    Regulation: 'bg-blue-100 text-blue-700',
    Compliance: 'bg-green-100 text-green-700',
    Market: 'bg-purple-100 text-purple-700',
    Announcement: 'bg-orange-100 text-orange-700',
  };

  const formattedDate = new Date(update.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={`group relative bg-white border border-grey-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${update.isImportant ? 'border-l-4 border-l-primary-500' : ''}`}>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[update.category]}`}>
            {update.category}
          </span>
          <span className="text-sm text-grey-500 flex items-center gap-1">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             {formattedDate}
          </span>
        </div>
        
        {update.source && (
            <div className="text-xs font-medium text-grey-400 bg-grey-50 px-2 py-1 rounded border border-grey-100">
                {update.source}
            </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-grey-900 mb-3 group-hover:text-primary transition-colors">
        <Link href={`/${locale}/web/updates/${update.slug}`} className="before:absolute before:inset-0">
          {update.title}
        </Link>
      </h3>

      <p className="text-grey-600 leading-relaxed mb-4 line-clamp-2">
        {update.summary}
      </p>

      <div className="flex items-center gap-2 text-primary font-semibold text-sm mt-auto">
        <span>{isArabic ? 'اقرأ المزيد' : 'Read Full Update'}</span>
        <svg 
            className={`w-4 h-4 transition-transform duration-300 ${isArabic ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      {update.isImportant && (
         <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
            </span>
         </div>
      )}
    </div>
  );
};
