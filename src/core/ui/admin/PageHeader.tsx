import React from 'react';
import { cn } from '@/core/lib/utils';

interface PageHeaderProps {
  /**
   * Main page title
   */
  title: string;
  /**
   * Optional description/subtitle
   */
  description?: string;
  /**
   * Optional icon to display before the title
   */
  icon?: React.ReactNode;
  /**
   * Optional action buttons or elements to display on the right
   */
  actions?: React.ReactNode;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * PageHeader component - Standardized header for dashboard pages
 * 
 * @example
 * // Basic usage
 * <PageHeader 
 *   title={t('banks.title')}
 *   description={t('banks.description')}
 * />
 * 
 * @example
 * // With icon
 * <PageHeader 
 *   title={t('security.title')}
 *   icon={<Shield className="h-6 w-6" />}
 * />
 * 
 * @example
 * // With actions
 * <PageHeader 
 *   title={t('users.title')}
 *   description={t('users.description')}
 *   actions={
 *     <button className="btn-primary">
 *       Add User
 *     </button>
 *   }
 * />
 */
export const PageHeader = ({ 
  title, 
  description, 
  icon,
  actions,
  className 
}: PageHeaderProps) => {
  return (
    <div className={cn(
      'flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4',
      className
    )}>
      <div className="flex-1">
        <h1 className={cn(
          'text-2xl font-bold text-gray-900 dark:text-white',
          icon && 'flex items-center gap-2'
        )}>
          {icon}
          {title}
        </h1>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};
