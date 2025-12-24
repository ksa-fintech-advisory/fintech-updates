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
          className="group flex items-center p-4 bg-white border border-grey-200 rounded-xl hover:border-red-200 hover:shadow-md transition-all duration-300 w-full md:w-auto md:min-w-[300px]"
    >
          {/* Icon Container */}
          <div className="flex-shrink-0 w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>

          {/* Text Info */}
          <div className="ml-4 flex-grow">
              <h4 className="font-semibold text-grey-900 group-hover:text-red-700 transition-colors">
          {label}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium text-grey-500 bg-grey-100 px-1.5 py-0.5 rounded uppercase">PDF</span>
                  <span className="text-xs text-grey-400">~ 2.4 MB</span>
              </div>
      </div>

          {/* Download Action Icon */}
          <div className="ml-4 text-grey-300 group-hover:text-red-500 transition-colors">
              <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </div>
    </a>
  );
};
