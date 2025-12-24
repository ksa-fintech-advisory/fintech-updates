import React from 'react';

interface PdfAttachmentProps {
  url: string;
  label?: string;
}

export const PdfAttachment: React.FC<PdfAttachmentProps> = ({ url, label = 'Download PDF' }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-5 py-3 bg-red-50 border border-red-100 rounded-lg group hover:bg-red-100 transition-colors duration-200"
    >
      <div className="p-2 bg-red-100 rounded-lg group-hover:bg-white text-red-600 transition-colors">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div>
        <div className="font-semibold text-grey-900 group-hover:text-red-700 transition-colors">
          {label}
        </div>
        <div className="text-xs text-grey-500 mt-0.5">PDF Document</div>
      </div>
      <div className="ml-auto text-grey-400 group-hover:text-red-500 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </div>
    </a>
  );
};
