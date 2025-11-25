'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Navbar } from './Navbar';
import { Breadcrumb } from '../../admin/Breadcrumb';
import { GlobalSearch, useGlobalSearch } from '../../admin/GlobalSearch';
import { Sidebar } from './Sidebar';
import { cn } from '@/core/lib/utils';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { isOpen, closeSearch, openSearch } = useGlobalSearch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[90] lg:hidden backdrop-blur-sm transition-opacity duration-300",
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <Sidebar
        mobileOpen={sidebarOpen}
        setMobileOpen={setSidebarOpen}
      />

      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-w-0",
        isRTL ? "lg:pr-64" : "lg:pl-64"
      )}>
        
        <Navbar
          isOpen={isOpen}
          openSearch={openSearch}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          <Breadcrumb className="mb-6" />
          {children}
        </main>
      </div>
      <GlobalSearch isOpen={isOpen} onClose={closeSearch} />
    </div>
  );
};
