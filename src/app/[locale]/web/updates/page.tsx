import Link from 'next/link';
import { newsApiService } from '@/services/api/news';
import { UpdateCard } from '@/core/components/web/news/UpdateCard';
import { NewsCategory } from '@/core/types/web/news';

interface NewsListingPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
  };
}

export default async function NewsListingPage({ params, searchParams }: NewsListingPageProps) {
  const { locale } = params;
  const isArabic = locale === 'ar';
  
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category as NewsCategory | undefined;
  const search = searchParams.search;

  const data = await newsApiService.getNewsUpdates(locale, page, 10, category, search);

  const categories: NewsCategory[] = ['Regulation', 'Compliance', 'Market', 'Announcement'];

  return (
    <div className="bg-grey-50 min-h-screen pb-24">
          {/* Hero Header with Gradient */}
          <section className="bg-slate-900 relative overflow-hidden text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-slate-900 pointer-events-none" />
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
                  <span className="inline-block py-1 px-3 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                      {isArabic ? 'مركز المعلومات' : 'Knowledge Center'}
            </span>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                      {isArabic ? 'آخر التحديثات وأخبار السوق' : 'Latest Updates & Market News'}
            </h1>
                  <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                {isArabic 
                          ? 'مصدرك الموثوق لآخر التشريعات التنظيمية، تحديثات الامتثال، وتطورات قطاع التقنية المالية في المملكة.'
                          : 'Your trusted source for the latest regulatory frameworks, compliance updates, and fintech market developments in the Kingdom.'}
            </p>
        </div>
      </section>

          {/* Modern Horizontal Filters */}
          <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-grey-200">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-center py-4 overflow-x-auto no-scrollbar gap-2 md:gap-4">
                      <Link
                          href={`/${locale}/web/updates`}
                          className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${!category ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-grey-100 text-grey-600 hover:bg-grey-200'}`}
                      >
                          {isArabic ? 'الكل' : 'All Updates'}
                      </Link>
                      {categories.map(cat => (
                          <Link
                              key={cat}
                              href={`/${locale}/web/updates?category=${cat}`}
                        className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${category === cat ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-grey-100 text-grey-600 hover:bg-grey-200'}`}
                    >
                        {cat}
                    </Link>
                ))}
                  </div>
              </div>
          </div>

          {/* Content Grid */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {data.updates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {data.updates.map((update, index) => (
                          <div key={update.id} className={`transform transition-all duration-500 hover:-translate-y-2 delay-[${index * 50}ms]`}>
                              <UpdateCard update={update} locale={locale} />
                          </div>
                      ))}
                  </div>
              ) : (
                      <div className="text-center py-24 bg-white rounded-3xl border border-grey-100 shadow-sm">
                          <div className="w-16 h-16 bg-grey-50 rounded-full flex items-center justify-center mx-auto mb-4 text-grey-400">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                          </div>
                          <h3 className="text-xl font-bold text-grey-900 mb-2">
                              {isArabic ? 'لا توجد تحديثات' : 'No updates found'}
                          </h3>
                          <p className="text-grey-500">
                              {isArabic 
                              ? 'لم يتم العثور على تحديثات تطابق معايير البحث الحالية.'
                              : 'No updates match currently selected filters.'}
                      </p>
                  </div>
              )}
      </div>
    </div>
  );
}
