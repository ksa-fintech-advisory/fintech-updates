import Link from 'next/link';
import { updateApiService } from '@/services/api/updateApi';

interface UpdatesListingPageProps {
  params: {
    locale: string;
  };
}

export default async function UpdatesListingPage({ params }: UpdatesListingPageProps) {
  const { locale } = params;
  const isArabic = locale === 'ar';
  
    const updates = await updateApiService.getUpdates({ lang: locale });

  return (
    <div className="bg-grey-50 min-h-screen pb-24">
          {/* Hero Header */}
          <section className="bg-slate-900 relative overflow-hidden text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-slate-900 pointer-events-none" />
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
                  <span className="inline-block py-1 px-3 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                      {isArabic ? 'مركز المعلومات' : 'Knowledge Center'}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                      {isArabic ? 'آخر التحديثات' : 'Latest Updates'}
                  </h1>
                  <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                      {isArabic 
                          ? 'مصدرك الموثوق لآخر التشريعات التنظيمية وتحديثات قطاع التقنية المالية'
                          : 'Your trusted source for the latest regulatory frameworks and fintech developments'}
                  </p>
        </div>
      </section>

          {/* Content Grid */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {updates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {updates.map((update: any, index: number) => (
                          <Link 
                    key={update.id}
                    href={`/${locale}/web/updates/${update.slug}`}
                    className={`transform transition-all duration-500 hover:-translate-y-2`}
                >
                    <div className="bg-white rounded-3xl shadow-soft hover:shadow-hard transition-all p-6 h-full border border-grey-100 hover:border-primary-200">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="text-4xl">{update.icon}</div>
                            <div className="flex-1">
                                {update.featured && (
                                    <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full mb-2">
                                        {isArabic ? 'مميز' : 'Featured'}
                                    </span>
                                )}
                                <h3 className="font-bold text-grey-900 text-lg mb-2" dir={isArabic ? 'rtl' : 'ltr'}>
                                    {update.title}
                                </h3>
                            </div>
                        </div>
                        <p className="text-grey-600 text-sm leading-relaxed mb-4" dir={isArabic ? 'rtl' : 'ltr'}>
                            {update.description.substring(0, 120)}...
                        </p>
                        <div className="flex items-center gap-2 text-grey-500 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(update.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                    </div>
                </Link>
            ))}
                  </div>
              ) : (
                  <div className="text-center py-24 bg-white rounded-3xl border border-grey-100 shadow-sm">
                      <div className="w-16 h-16 bg-grey-50 rounded-full flex items-center justify-center mx-auto mb-4 text-grey-400">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                          </div>
                          <h3 className="text-xl font-bold text-grey-900 mb-2">
                              {isArabic ? 'لا توجد تحديثات' : 'No updates found'}
                          </h3>
                          <p className="text-grey-500">
                              {isArabic 
                              ? 'لم يتم العثور على تحديثات.'
                              : 'No updates available yet.'}
                      </p>
                  </div>
              )}
      </div>
    </div>
  );
}
