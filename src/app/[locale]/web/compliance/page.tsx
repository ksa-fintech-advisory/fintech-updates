'use client';

import { useEffect, useState } from 'react';
import { complianceService } from '@/services/api/mock';
import { PaginatedCompliance } from '@/core/types/web/compliance';
import { useLocale } from 'next-intl';

export default function CompliancePage() {
  const locale = useLocale();
  const [data, setData] = useState<PaginatedCompliance | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompliance = async () => {
      setLoading(true);
      const result = await complianceService.paginateCompliance(1, 20, selectedRegion || undefined);
      setData(result);
      setLoading(false);
    };
    loadCompliance();
  }, [selectedRegion]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-grey-600">
          {locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-saudi text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {locale === 'ar' ? 'التحديثات التنظيمية' : 'Compliance Updates'}
            </h1>
            <p className="text-xl text-white/90">
              {locale === 'ar' 
                ? 'آخر التحديثات التنظيمية والامتثال في منطقة الخليج'
                : 'Latest regulatory and compliance updates across the Gulf region'}
            </p>
          </div>
        </div>
      </section>

      {/* Region Filter */}
      <section className="border-b border-grey-200 bg-white sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedRegion('')}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedRegion === ''
                  ? 'bg-primary text-white'
                  : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
              }`}
            >
              {locale === 'ar' ? 'جميع المناطق' : 'All Regions'}
            </button>
            {data.regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.code)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  selectedRegion === region.code
                    ? 'bg-primary text-white'
                    : 'bg-grey-100 text-grey-700 hover:bg-grey-200'
                }`}
              >
                <span>{region.flag}</span>
                <span>{locale === 'ar' ? region.name.ar : region.name.en}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Updates List */}
      <section className="py-16 bg-grey-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {data.updates.length === 0 ? (
            <div className="text-center text-grey-600 py-12">
              {locale === 'ar' ? 'لا توجد تحديثات' : 'No updates found'}
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-6">
              {data.updates.map((update) => (
                <article
                  key={update.id}
                  className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow p-6"
                >
                  {/* Region & Category */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="flex items-center gap-2 px-3 py-1 bg-grey-100 text-grey-900 rounded-full text-sm font-medium">
                      <span className="text-lg">{update.region.flag}</span>
                      <span>{locale === 'ar' ? update.region.name.ar : update.region.name.en}</span>
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: `${update.category.color}15`,
                        color: update.category.color,
                      }}
                    >
                      {locale === 'ar' ? update.category.name.ar : update.category.name.en}
                    </span>
                    {update.effectiveDate && (
                      <span className="text-sm text-grey-500">
                        {locale === 'ar' ? 'يدخل حيز التنفيذ: ' : 'Effective: '}
                        {new Date(update.effectiveDate).toLocaleDateString(
                          locale === 'ar' ? 'ar-SA' : 'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-grey-900 mb-3">
                    {locale === 'ar' ? update.title.ar : update.title.en}
                  </h3>

                  {/* Description */}
                  <p className="text-grey-700 mb-4 leading-relaxed">
                    {locale === 'ar' ? update.description.ar : update.description.en}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-grey-200">
                    <div className="flex items-center gap-4 text-sm text-grey-600">
                      <span>
                        {locale === 'ar' ? 'المصدر: ' : 'Source: '}
                        <span className="font-medium text-grey-900">{update.source}</span>
                      </span>
                      <span className="text-grey-400">•</span>
                      <span>
                        {new Date(update.publishedAt).toLocaleDateString(
                          locale === 'ar' ? 'ar-SA' : 'en-US',
                          { year: 'numeric', month: 'short', day: 'numeric' }
                        )}
                      </span>
                    </div>
                    {update.sourceUrl && (
                      <a
                        href={update.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-700 font-medium text-sm"
                      >
                        {locale === 'ar' ? 'المزيد ←' : 'Learn More →'}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
