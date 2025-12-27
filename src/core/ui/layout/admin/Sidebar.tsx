'use client'

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/core/i18n/routing';
import { cn } from '@/core/lib/utils';

interface MenuItem {
  href: string;
  label: string;
  icon?: string;
  children?: MenuItem[];
}

const SidebarItem = ({ item, depth = 0, isActive, toggleSubmenu, openSubmenus, locale }: {
  item: MenuItem;
  depth?: number;
  isActive: (href: string) => boolean;
  toggleSubmenu: (label: string) => void;
  openSubmenus: Record<string, boolean>;
  locale: string;
}) => {
  const active = isActive(item.href);
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openSubmenus[item.label];
  const isChildActive = hasChildren && item.children!.some(child => isActive(child.href) || (child.children && child.children.some(c => isActive(c.href))));
  const isRTL = locale === 'ar';

  if (hasChildren) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => toggleSubmenu(item.label)}
          className={cn(
            'w-full group flex items-center justify-between rounded-lg text-sm font-medium transition-all duration-200',
            depth === 0 ? 'px-3 py-2.5' : 'px-3 py-2',
            isChildActive || isOpen
              ? 'bg-primary-50 text-primary-900 dark:bg-primary-900/20 dark:text-primary-100'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50',
            depth > 0 && 'text-xs ml-3'
          )}
        >
          <div className="flex items-center gap-2.5">
            {item.icon && depth === 0 && (
              <span className={cn(
                "text-base transition-all",
                isChildActive || isOpen ? "opacity-100" : "opacity-70"
              )}>{item.icon}</span>
            )}
            {depth > 0 && (
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
            )}
            <span>{item.label}</span>
          </div>
          <svg
            className={cn(
              'w-4 h-4 transition-transform duration-200',
              isOpen ? 'rotate-0' : isRTL ? 'rotate-90' : '-rotate-90',
              isChildActive || isOpen ? 'opacity-70' : 'opacity-40'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className={cn(
            "space-y-0.5 py-1",
            depth === 0 ? "ml-2 pl-3 border-l-2 border-primary-200/40 dark:border-primary-800/30" : "ml-4"
          )}>
            {item.children!.map((child) => (
              <SidebarItem
                key={child.label}
                item={child}
                depth={depth + 1}
                isActive={isActive}
                toggleSubmenu={toggleSubmenu}
                openSubmenus={openSubmenus}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'group flex items-center gap-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative',
        depth === 0 ? 'px-3 py-2.5' : 'px-3 py-2',
        active
          ? 'bg-gradient-to-r from-primary-500/10 to-primary-600/10 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/50 shadow-sm'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50',
        depth > 0 && 'text-xs ml-3'
      )}
    >
      {item.icon && depth === 0 && (
        <span className={cn(
          "text-base transition-all",
          active ? "opacity-100 scale-110" : "opacity-70 group-hover:opacity-100"
        )}>{item.icon}</span>
      )}
      {depth > 0 && !active && (
        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 group-hover:bg-primary-500" />
      )}
      <span className="flex-1">{item.label}</span>
      {active && (
        <div className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse" />
      )}
    </Link>
  );
};

export const Sidebar = ({ mobileOpen, setMobileOpen }: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const isRTL = locale === 'ar';

  const menuItems: MenuItem[] = [
    { href: '/dashboard', label: t('dashboard'), icon: '📊' },
    { href: '/dashboard/customers', label: t('customers'), icon: '👥' },
   
    { 
      icon: '🔔',
      label: t('notifications'),
      href: '/dashboard/notifications'
    },
    { 
      icon: '⚙️',
      label: t('systemConfigs'),
      href: '/dashboard/system-configs'
    },
   

    {
      icon: '🎨',
      label:t('example-ui'),
      href:'/dashboard/ui-examples'
    },
    { href: '/dashboard/profile', label: t('profile'), icon: '👤' },
  ];

  const isActive = (href: string) => {
    if (href === '#' || href === '') return false;
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className={cn(
      "fixed inset-y-0 z-[100] flex flex-col w-64 bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 ease-in-out transform will-change-transform",
      isRTL ? "right-0 border-l border-gray-200/60 dark:border-gray-800/60" : "left-0 border-r border-gray-200/60 dark:border-gray-800/60",
      // Mobile behavior
      !mobileOpen && (isRTL ? "translate-x-full" : "-translate-x-full"),
      mobileOpen && "translate-x-0",
      // Desktop behavior (overrides mobile)
      "lg:translate-x-0"
    )}>
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200/60 dark:border-gray-800/60 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center text-white shadow-md">
            <span className="text-base font-bold">F</span>
          </div>
          <h1 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
            {tCommon('appName')}
          </h1>
        </div>
        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileOpen?.(false)}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        <div className={cn(
          "mb-3 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest",
          isRTL && "text-right"
        )}>
          {isRTL ? 'القائمة' : 'MENU'}
        </div>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            isActive={isActive}
            toggleSubmenu={toggleSubmenu}
            openSubmenus={openSubmenus}
            locale={locale}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/80 rounded-xl p-3 flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
              {tCommon('adminUser')}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
              admin@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
