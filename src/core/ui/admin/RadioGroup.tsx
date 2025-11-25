import { ReactNode } from 'react';

export interface RadioOption {
  value: string;
  label: ReactNode;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioGroup({ name, options, value, onChange, className = '' }: RadioGroupProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-primary-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          />
          <span className="ml-2 text-sm text-gray-900 dark:text-white">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
