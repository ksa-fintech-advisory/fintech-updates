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
      {/* Header */}
      <section className="bg-white border-b border-grey-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
               {isArabic ? 'آخر التحديثات' : 'Latest Updates'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-grey-900 mb-6">
                {isArabic ? 'التحديثات التنظيمية وأخبار السوق' : 'Regulatory & Market Updates'}
            </h1>
            <p className="text-xl text-grey-600 max-w-2xl mx-auto leading-relaxed">
                {isArabic 
                    ? 'ابق على اطلاع بآخر التشريعات وأخبار الامتثال وتطورات قطاع التقنية المالية في المملكة.'
                    : 'Stay informed with the latest regulations, compliance news, and fintech market developments in the Kingdom.'}
            </p>
        </div>
      </section>

      {/* Filters & Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
                <div className="bg-white p-6 rounded-xl border border-grey-200 sticky top-8">
                    <h3 className="font-bold text-lg text-grey-900 mb-4">
                        {isArabic ? 'التصنيفات' : 'Categories'}
                    </h3>
                    <nav className="flex flex-col gap-2">
                        <Link 
                            href={`/${locale}/web/updates`}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!category ? 'bg-primary-50 text-primary-700' : 'text-grey-600 hover:bg-grey-50'}`}
                        >
                            {isArabic ? 'الكل' : 'All Updates'}
                        </Link>
                        {categories.map(cat => (
                            <Link
                                key={cat}
                                href={`/${locale}/web/updates?category=${cat}`}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === cat ? 'bg-primary-50 text-primary-700' : 'text-grey-600 hover:bg-grey-50'}`}
                            >
                                {cat}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Updates List */}
            <main className="flex-1">
                {data.updates.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {data.updates.map(update => (
                            <UpdateCard key={update.id} update={update} locale={locale} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-grey-200 border-dashed">
                        <h3 className="text-lg font-medium text-grey-900 mb-2">
                            {isArabic ? 'لا توجد تحديثات' : 'No updates found'}
                        </h3>
                        <p className="text-grey-500">
                            {isArabic 
                                ? 'حاول تغيير معايير البحث أو التصفية.' 
                                : 'Try adjusting your search or filters.'}
                        </p>
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  );
}
