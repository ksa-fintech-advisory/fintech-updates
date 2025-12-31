import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import { updateApiService } from '@/services/api/updateApi';

export default async function LatestUpdates({ locale }: { locale: string }) {
  const isArabic = locale === 'ar';

  // Fetch real updates from API
  const latestUpdates = await updateApiService.getUpdates({
    featured: true,
    limit: 5,
    lang: locale,
  });

  return (
    <section className="py-24 bg-gradient-to-b from-grey-50 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4">
              {isArabic ? 'آخر التحديثات' : 'Latest Updates'}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent-400 to-primary-400 mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-16">
            <StaggerContainer staggerDelay={0.2}>
              {latestUpdates.map((update: any, idx: number) => (
                <StaggerItem key={update.id} className="group relative">
                  {/* Timeline Line */}
                  {idx !== latestUpdates.length - 1 && (
                    <div className="absolute left-[2.25rem] top-20 bottom-[-4rem] w-0.5 bg-gradient-to-b from-primary-200 to-transparent z-0"></div>
                  )}

                  <Link href={`/web/updates/${update.slug}`}>
                    <div
                      className="flex gap-6 p-8 bg-white rounded-3xl shadow-soft hover:shadow-hard transition-all duration-500 transform hover:-translate-y-1 border border-grey-100 group-hover:border-primary-200 relative z-10 cursor-pointer"
                    >
                      {/* Icon - Centered */}
                      <div className="flex-shrink-0">
                        <div className="w-18 h-18 p-4 bg-gradient-to-br from-primary-50 to-white rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm border border-primary-100 text-primary-600">
                          {update.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                          <h3 className="font-bold text-grey-900 text-xl group-hover:text-primary-600 transition-colors">
                            {update.title}
                          </h3>
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-grey-500 bg-grey-50 px-3 py-1 rounded-full border border-grey-100">
                            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(update.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        <p className="text-grey-600 mb-0 leading-relaxed text-base">
                          {update.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
  );
}
