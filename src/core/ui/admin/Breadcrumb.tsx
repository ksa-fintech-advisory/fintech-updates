'use client';

import { usePathname, Link } from '@/core/i18n/routing';
import { useTranslations } from 'next-intl';
import { cn } from '@/core/lib/utils';

interface BreadcrumbProps {
  className?: string;
}

export const Breadcrumb = ({ className }: BreadcrumbProps) => {
  const pathname = usePathname();
  const t = useTranslations('nav');
  
  const segments = pathname.split('/').filter((segment) => segment !== '');

  const items = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;
    // Try to translate the segment
    // 1. Try exact match
    // 2. Try camelCase match (e.g. system-configs -> systemConfigs)
    const camelCaseSegment = segment.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    
    let label = segment;
    if (t.has(segment)) {
      label = t(segment);
    } else if (t.has(camelCaseSegment)) {
      label = t(camelCaseSegment);
    } else {
      // Fallback to capitalizing the segment
      label = segment.charAt(0).toUpperCase() + segment.slice(1);
    }

    return {
      href,
      label,
      isLast,
    };
  });

  const breadcrumbs = [
    { href: '/dashboard', label: t('dashboard'), isLast: items.length === 0 },
    ...items.filter(item => item.href !== '/dashboard')
  ];

  if (pathname === '/dashboard') return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex items-center space-x-2 rtl:space-x-reverse">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-gray-400 mx-2 rtl:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.isLast ? (
              <span className="text-sm font-medium text-gray-900 dark:text-white" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
