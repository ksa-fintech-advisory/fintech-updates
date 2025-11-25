'use client';

import { BarChart, DonutChart, Sparkline } from '@/core/ui/admin/Charts';
import { StatCard } from '@/core/ui/admin/StatCard';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  // Mock data for demonstration
  const userGrowth = [65, 72, 68, 85, 91, 98, 105];
  const transactionTrend = [120, 135, 128, 142, 155, 168, 182, 195];

  const regionData = [
    { label: 'North America', value: 45, color: '#8b5cf6' },
    { label: 'Europe', value: 25, color: '#06b6d4' },
    { label: 'Asia', value: 20, color: '#10b981' },
    { label: 'Other', value: 10, color: '#f59e0b' },
  ];

  const monthlyData = [
    { label: 'Jan', value: 4500 },
    { label: 'Feb', value: 5200 },
    { label: 'Mar', value: 4800 },
    { label: 'Apr', value: 6100 },
    { label: 'May', value: 5900 },
    { label: 'Jun', value: 7200 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('title')}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('overview')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('totalUsers')}
          value="12,543"
          change={{ value: 12.5, trend: 'up', period: t('vsLastMonth') }}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatCard
          title={t('activePortfolios')}
          value="8,421"
          change={{ value: 8.2, trend: 'up', period: t('vsLastMonth') }}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <StatCard
          title={t('totalVolume')}
          value="$2.4M"
          change={{ value: 15.3, trend: 'up', period: t('vsLastMonth') }}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title={t('pendingTransactions')}
          value="234"
          change={{ value: 3.1, trend: 'down', period: t('vsLastWeek') }}
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('monthlyRevenue')}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('monthsPerformance')}
              </p>
            </div>
            <div className="text-primary-600 dark:text-primary-400">
              <Sparkline data={transactionTrend} width={80} height={30} showDots />
            </div>
          </div>
          <div className="overflow-x-auto">
            <BarChart data={monthlyData} showLabels showValues />
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-hidden">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('regionalDistribution')}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('userDistribution')}
            </p>
          </div>
          <DonutChart data={regionData} size={180} thickness={35} />
        </div>
      </div>

      {/* Recent Activity Table Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('recentActivity')}
        </h3>
        <div className="space-y-4 overflow-x-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('newPortfolioCreated')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    by User {i} • {i} {i > 1 ? 'hours' : 'hour'} ago
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ${(1000 + i * 123.45).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
