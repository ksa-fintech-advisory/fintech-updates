'use client';

import { formatDistanceToNow } from 'date-fns';

interface ActivityLogItemProps {
  action: string;
  timestamp: string;
  details?: string;
  ipAddress?: string;
}

export function ActivityLogItem({ action, timestamp, details, ipAddress }: ActivityLogItemProps) {
  const getActionIcon = (action: string) => {
    if (action.toLowerCase().includes('login')) {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      );
    }
    if (action.toLowerCase().includes('update') || action.toLowerCase().includes('edit')) {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      );
    }
    if (action.toLowerCase().includes('delete')) {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  return (
    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
      <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
        {getActionIcon(action)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {action}
        </p>
        {details && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {details}
          </p>
        )}
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-500">
          <span>{formatDistanceToNow(new Date(timestamp), { addSuffix: true })}</span>
          {ipAddress && (
            <>
              <span>•</span>
              <span>{ipAddress}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
