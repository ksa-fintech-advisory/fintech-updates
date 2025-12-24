import React from 'react';
import { BlogContentBlock } from '@/core/types/web/blog';

interface BlogTimelineBlockProps {
  block: Extract<BlogContentBlock, { type: 'timeline' }>;
}

export const BlogTimelineBlock: React.FC<BlogTimelineBlockProps> = ({ block }) => {
  return (
    <div className="my-10 pl-2">
      <div className="relative border-l-2 border-grey-200">
        {block.items.map((item, index) => {
           let statusColor = 'bg-grey-200 border-grey-300'; // Default/Upcoming
           let textColor = 'text-grey-500';

           if (item.status === 'completed') {
             statusColor = 'bg-primary-500 border-primary-600';
             textColor = 'text-gray-900';
           } else if (item.status === 'active') {
             statusColor = 'bg-amber-400 border-amber-500 ring-4 ring-amber-100';
             textColor = 'text-amber-900';
           }

           return (
             <div key={index} className="mb-10 ml-6 last:mb-0 relative">
               {/* Dot Indicator */}
               <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-[3.25rem] border-2 ${statusColor} transition-all duration-300`}>
                  {item.status === 'completed' && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
               </span>
               
               {/* Date Badge */}
               <span className="inline-block px-2 py-0.5 mb-2 text-xs font-bold uppercase tracking-wider bg-grey-100 text-grey-500 rounded">
                 {item.date}
               </span>
               
               {/* Content */}
               <h4 className={`text-lg font-bold mb-1 ${textColor}`}>
                 {item.title}
               </h4>
               {item.description && (
                 <p className="text-grey-600 text-sm leading-relaxed">
                   {item.description}
                 </p>
               )}
             </div>
           );
        })}
      </div>
    </div>
  );
};
