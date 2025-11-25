'use client';

import { useState, ReactNode } from 'react';
import { cn } from '@/core/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
  badge?: number | string;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'default' | 'pills';
  onChange?: (tabId: string) => void;
}

export const Tabs = ({ tabs, defaultTab, variant = 'default', onChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div>
      {/* Tab Headers */}
      <div className={cn(
        variant === 'default' && 'border-b border-gray-200 dark:border-gray-800',
        variant === 'pills' && 'bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex gap-1'
      )}>
        <div className={cn(
          'flex',
          variant === 'default' && 'gap-8',
          variant === 'pills' && 'gap-0'
        )}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'flex items-center gap-2 transition-all duration-200',
                variant === 'default' && cn(
                  'px-1 py-3 border-b-2 font-medium text-sm',
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                ),
                variant === 'pills' && cn(
                  'px-4 py-2 rounded-md font-medium text-sm',
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                )
              )}
            >
              {tab.icon && <span className="text-base">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={cn(
                  'px-2 py-0.5 text-xs font-medium rounded-full',
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                )}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTabContent}
      </div>
    </div>
  );
};
