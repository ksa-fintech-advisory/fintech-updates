import React from 'react';
import { cn } from '@/core/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Add hover effect with shadow transition
   * @default false
   */
  hover?: boolean;
  /**
   * Remove default padding (useful for table wrappers, custom layouts)
   * @default false
   */
  noPadding?: boolean;
}

/**
 * Card component - A flexible container with consistent styling
 * 
 * @example
 * // Basic card with padding
 * <Card>Content here</Card>
 * 
 * @example
 * // Card with hover effect
 * <Card hover>Clickable content</Card>
 * 
 * @example
 * // Card without padding (e.g., for tables)
 * <Card noPadding className="overflow-hidden">
 *   <Table />
 * </Card>
 * 
 * @example
 * // Using with CardHeader and CardContent
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     Content here
 *   </CardContent>
 * </Card>
 */
export const Card = ({ children, className, hover = false, noPadding = false }: CardProps) => {
  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700',
      !noPadding && 'p-6',
      hover && 'hover:shadow-md transition-shadow duration-200',
      className
    )}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle = ({ children, className }: CardTitleProps) => {
  return (
    <h3 className={cn('text-lg font-semibold text-gray-900 dark:text-gray-100', className)}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
};
