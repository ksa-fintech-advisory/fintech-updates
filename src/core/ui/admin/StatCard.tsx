import React from 'react';
import { cn } from '@/core/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
    period?: string;
  };
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export const StatCard = ({ title, value, change, icon, subtitle, className }: StatCardProps) => {
  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}

          {change && (
            <div className="mt-3 flex items-center gap-1">
              <span className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
                change.trend === 'up'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              )}>
                {change.trend === 'up' ? '↑' : '↓'}
                {Math.abs(change.value)}%
              </span>
              {change.period && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  vs {change.period}
                </span>
              )}
            </div>
          )}
        </div>

        {icon && (
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
