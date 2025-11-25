import React from 'react';
import { cn } from '@/core/lib/utils';

export type StatusType = 
  | 'success' | 'warning' | 'error' | 'info' | 'default'
  | 'SAFE' | 'CRITICAL' | 'WARNING' | 'HIGH' | 'MEDIUM' | 'LOW'
  | 'OPEN' | 'CLOSED' | 'RESOLVED' | 'PENDING'
  | 'SUCCESS' | 'FAILED' | 'ACTIVE' | 'INACTIVE'
  | 'MITIGATED' | 'BLOCKED';

export type StatusVariant = 'default' | 'pill' | 'dot';

interface StatusBadgeProps {
  /**
   * Status to display - supports both lowercase and UPPERCASE
   */
  status: StatusType | string;
  /**
   * Visual variant of the badge
   * - default: Rectangular badge with padding
   * - pill: Fully rounded pill shape
   * - dot: Status indicator with dot
   */
  variant?: StatusVariant;
  /**
   * Show an icon/dot indicator
   */
  showDot?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Custom label to display instead of the status
   */
  label?: string;
}

/**
 * StatusBadge component - Displays status with consistent styling
 * 
 * Automatically maps common status values to appropriate colors:
 * - Green: SUCCESS, SAFE, ACTIVE, RESOLVED, CLOSED, MITIGATED
 * - Red: ERROR, CRITICAL, FAILED, OPEN (for incidents)
 * - Amber/Yellow: WARNING, PENDING
 * - Orange: HIGH severity
 * - Blue: MEDIUM, INFO
 * - Gray: LOW, INACTIVE, default
 * 
 * @example
 * // Basic usage
 * <StatusBadge status="CRITICAL" />
 * 
 * @example
 * // Pill variant
 * <StatusBadge status="success" variant="pill" />
 * 
 * @example
 * // With dot indicator
 * <StatusBadge status="ACTIVE" variant="dot" />
 * 
 * @example
 * // Custom label
 * <StatusBadge status="CRITICAL" label={t('status.critical')} />
 */
export const StatusBadge = ({
  status,
  variant = 'default',
  showDot = false,
  className,
  label
}: StatusBadgeProps) => {
  
  // Normalize status to uppercase for consistent mapping
  const normalizedStatus = status.toString().toUpperCase();
  
  // Map status to color scheme
  const getStatusColor = (): string => {
    // Success/Safe states
    if (['SUCCESS', 'SAFE', 'ACTIVE', 'RESOLVED', 'CLOSED', 'MITIGATED', 'COMPLETED', 'APPROVED'].includes(normalizedStatus)) {
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
    }
    
    // Critical/Error states
    if (['CRITICAL', 'ERROR', 'FAILED', 'OPEN', 'REJECTED', 'BLOCKED'].includes(normalizedStatus)) {
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
    }
    
    // Warning states
    if (['WARNING', 'PENDING', 'IN-PROGRESS', 'PROCESSING'].includes(normalizedStatus)) {
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    }
    
    // High severity (orange)
    if (['HIGH'].includes(normalizedStatus)) {
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
    }
    
    // Medium/Info states (blue)
    if (['MEDIUM', 'INFO'].includes(normalizedStatus)) {
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    }
    
    // Low/Inactive/Default states (gray)
    return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
  };
  
  // Get dot color for the status
  const getDotColor = (): string => {
    if (['SUCCESS', 'SAFE', 'ACTIVE', 'RESOLVED', 'CLOSED', 'MITIGATED'].includes(normalizedStatus)) {
      return 'bg-green-500';
    }
    if (['CRITICAL', 'ERROR', 'FAILED', 'OPEN'].includes(normalizedStatus)) {
      return 'bg-red-500';
    }
    if (['WARNING', 'PENDING'].includes(normalizedStatus)) {
      return 'bg-amber-500';
    }
    if (['HIGH'].includes(normalizedStatus)) {
      return 'bg-orange-500';
    }
    if (['MEDIUM', 'INFO'].includes(normalizedStatus)) {
      return 'bg-blue-500';
    }
    return 'bg-gray-500';
  };
  
  const baseClasses = cn(
    'inline-flex items-center gap-1.5 text-xs font-medium transition-colors',
    variant === 'default' && 'px-2.5 py-0.5 rounded-md border',
    variant === 'pill' && 'px-2.5 py-0.5 rounded-full border',
    variant === 'dot' && 'px-0',
    getStatusColor(),
    className
  );
  
  const displayText = label || status;
  
  return (
    <span className={baseClasses}>
      {(showDot || variant === 'dot') && (
        <span className={cn('w-2 h-2 rounded-full', getDotColor())} />
      )}
      {variant !== 'dot' && displayText}
    </span>
  );
};

/**
 * Helper function to get a status badge for common severity levels
 */
export const getSeverityBadge = (severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW') => {
  return <StatusBadge status={severity} variant="pill" />;
};
