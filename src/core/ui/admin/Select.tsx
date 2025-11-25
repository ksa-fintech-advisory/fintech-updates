import React from 'react';
import { cn } from '@/core/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  /**
   * Current selected value
   */
  value: string;
  /**
   * Change handler
   */
  onChange: (value: string) => void;
  /**
   * Options array - can be SelectOption[] or string[]
   */
  options: SelectOption[] | string[];
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Success state
   */
  success?: boolean;
  /**
   * Full width (takes 100% of container width)
   */
  fullWidth?: boolean;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * ID for the select element
   */
  id?: string;
  /**
   * Name attribute
   */
  name?: string;
  /**
   * Show chevron icon
   */
  showIcon?: boolean;
}

/**
 * Select component - A styled select/dropdown input
 * 
 * @example
 * // Basic usage with string array
 * <Select
 *   value={value}
 *   onChange={setValue}
 *   options={['Option 1', 'Option 2', 'Option 3']}
 *   placeholder="Select an option"
 * />
 * 
 * @example
 * // With SelectOption array
 * <Select
 *   value={roleFilter}
 *   onChange={setRoleFilter}
 *   options={[
 *     { value: '', label: 'All Roles' },
 *     { value: 'admin', label: 'Admin' },
 *     { value: 'user', label: 'User', disabled: true }
 *   ]}
 * />
 * 
 * @example
 * // Full width with error
 * <Select
 *   value={country}
 *   onChange={setCountry}
 *   options={countries}
 *   error={!!errors.country}
 *   fullWidth
 * />
 */
export const Select = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  error = false,
  success = false,
  fullWidth = false,
  size = 'md',
  className,
  id,
  name,
  showIcon = true
}: SelectProps) => {
  
  // Normalize options to SelectOption format
  const normalizedOptions: SelectOption[] = options.map(opt => 
    typeof opt === 'string' 
      ? { value: opt, label: opt }
      : opt
  );
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };
  
  return (
    <div className={cn('relative', fullWidth && 'w-full', className)}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          // Base styles
          'appearance-none border rounded-xl transition-all duration-200',
          'bg-gray-50 dark:bg-gray-800',
          'text-gray-900 dark:text-gray-100',
          'focus:outline-none focus:ring-2',
          
          // Size
          sizeClasses[size],
          showIcon && 'pr-10', // Extra padding for icon
          
          // States
          !error && !success && [
            'border-gray-200 dark:border-gray-700',
            'focus:ring-primary-500/20 focus:border-primary-500',
            'hover:border-gray-300 dark:hover:border-gray-600'
          ],
          error && [
            'border-red-300 dark:border-red-700',
            'focus:ring-red-500/20 focus:border-red-500',
            'bg-red-50/50 dark:bg-red-900/10'
          ],
          success && [
            'border-green-300 dark:border-green-700',
            'focus:ring-green-500/20 focus:border-green-500',
            'bg-green-50/50 dark:bg-green-900/10'
          ],
          disabled && 'opacity-50 cursor-not-allowed',
          fullWidth && 'w-full'
        )}
      >
        {placeholder && (
          <option value="" disabled={!normalizedOptions.some(opt => opt.value === '')}>
            {placeholder}
          </option>
        )}
        {normalizedOptions.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {showIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className={cn(
            'h-4 w-4 transition-colors',
            error ? 'text-red-500' : success ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'
          )} />
        </div>
      )}
    </div>
  );
};

/**
 * SelectField component - Select with label and error message
 */
interface SelectFieldProps extends SelectProps {
  label?: string;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
}

export const SelectField = ({
  label,
  errorMessage,
  helperText,
  required,
  error,
  id,
  ...selectProps
}: SelectFieldProps) => {
  const inputId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = error || !!errorMessage;
  
  return (
    <div className={cn('space-y-1.5', selectProps.fullWidth && 'w-full')}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <Select
        {...selectProps}
        id={inputId}
        error={hasError}
      />
      
      {errorMessage && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}
      
      {helperText && !errorMessage && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
