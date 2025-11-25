import React from 'react';
import { cn } from '@/core/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    default: 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:ring-gray-700',
    success: 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20',
    warning: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20',
    danger: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
    info: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

// Helper function to map status to badge variant
export const getStatusBadgeVariant = (status: string): BadgeVariant => {
  const statusMap: Record<string, BadgeVariant> = {
    active: 'success',
    approved: 'success',
    completed: 'success',
    pending: 'warning',
    'in-progress': 'info',
    suspended: 'danger',
    rejected: 'danger',
    failed: 'danger',
  };

  return statusMap[status.toLowerCase()] || 'default';
};
