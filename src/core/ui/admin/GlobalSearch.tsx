'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from '@/core/i18n/routing';
import { cn } from '@/core/lib/utils';
import { useTranslations } from 'next-intl';

interface SearchResult {
  id: string;
  title: any;
  subtitle?: any;
  category: string;
  path: string;
  icon?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search results - replace with actual search implementation
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: {
        ar: "الرئيسية",
        en: "Dashboard"
      },
      category: 'Pages',
      path: '/dashboard',
      icon: '📊'
    },
    {
      id: '2', title: {
        ar: "العملاء",
        en: "Customers"
      }, subtitle: {
        ar: "إدارة العملاء",
        en: "Manage customers"
      }, category: 'Pages', path: '/dashboard/customers', icon: '👥'
    },
    {
      id: '3', title: {
        ar: "الصلاحيات",
        en: "Roles"
      }, subtitle: {
        ar: "إدارة الصلاحيات",
        en: "Configure permissions"
      }, category: 'Pages', path: '/dashboard/roles', icon: '🛡️'
    },
    {
      id: '4', title: {
        ar: "صناديق الاستثمار المتداول",
        en: "ETFs"
      }, subtitle: {
        ar: "صناديق الاستثمار المتداول",
        en: "Exchange Traded Funds"
      }, category: 'Finance', path: '/dashboard/etfs', icon: '📈'
    },
    {
      id: '5', title: {
        ar: "الحسابات المالية",
        en: "Finance Accounts"
      }, category: 'Finance', path: '/dashboard/finance-accounts', icon: '💰'
    },
    {
      id: '6', title: {
        ar: "المحافظ الاستثمارية",
        en: "Portfolios"
      }, category: 'Finance', path: '/dashboard/portfolios', icon: '📊'
    },
    {
      id: '7', title: {
        ar: "الإعدادات",
        en: "System Configs"
      }, subtitle: {
        ar: "الإعدادات العامة",
        en: "General settings"
      }, category: 'Settings', path: '/dashboard/system-configs', icon: '⚙️'
    },
    {
      id: '9', title: {
        ar: "المراجعة والتدقيق",
        en: "Audit Logs"
      }, subtitle: {
        ar: "سجل النظام",
        en: "System logs"
      }, category: 'Audit', path: '/dashboard/audit/logs', icon: '📋'
    },
    {
      id: '11', title: {
        ar: "جهات الربط الخارجية",
        en: "Third party integrations"
      }, subtitle: {
        ar: "جهات الربط الخارجية",
        en: "Third party integrations"
      }, category: 'Settings', path: '/dashboard/integrations', icon: '⚙️'
    },
    {
      id: '12',
      title: {
        en: "Banks",
        ar: "البنوك"
      },
      category: 'Finance',
      path: '/dashboard/banks',
      icon: '🏦'
    },
    {
      id: '13',
      title: {
        en: "Users",
        ar: "المستخدمين"
      },
      category: 'Users',
      path: '/dashboard/users',
      icon: '👥'
    }
  ];

  useEffect(() => {

    console.log(isOpen);
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = mockResults.filter(
        (item) =>
          item.title.ar.toLowerCase().includes(query.toLowerCase()) ||
          item.title.en.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle?.ar.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      // Show all results or a curated "Recent" list by default
      setResults(mockResults);
    }
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        router.push(results[selectedIndex].path);
        onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [results, selectedIndex, router, onClose]
  );

  const handleResultClick = (result: SearchResult) => {
    router.push(result.path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="flex items-start justify-center pt-[10vh] px-4">
        <div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("search.title")}
              className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              ESC
            </kbd>
          </div>

          {/* Results */}
          {query && (
            <div className="max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="py-2">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={cn(
                        'w-full flex items-center gap-3 px-6 py-3 text-left transition-colors',
                        index === selectedIndex
                          ? 'bg-primary-50 dark:bg-primary-900/20'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      )}
                    >
                      {result.icon && (
                        <span className="text-2xl flex-shrink-0">{result.icon}</span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {result.title["ar"]}
                        </div>
                        {result.subtitle && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {result.subtitle["ar"]}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {result.category}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                    <p className="text-sm">No results found for &quot;{query}&quot;</p>
                </div>
              )}
            </div>
          )}

          {/* Footer Hints */}
          {!query && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-between">
                <span>Type to search...</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">↑↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">↵</kbd>
                    to select
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook to trigger global search with keyboard shortcut
export const useGlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isOpen,
    openSearch: () => setIsOpen(true),
    closeSearch: () => setIsOpen(false),
  };
};
