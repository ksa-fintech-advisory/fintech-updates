import { legalData } from '@/services/api/data/legal.data';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isArabic = locale === 'ar';
  const data = legalData.privacy;

  return (
    <div className="w-full bg-grey-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900/30 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-900/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {isArabic ? data.title.ar : data.title.en}
              </h1>
              <p className="text-grey-400">
                {isArabic ? 'آخر تحديث:' : 'Last Updated:'} {data.lastUpdated}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-grey-100">
            <div className="space-y-12">
              {data.sections.map((section, index) => (
                <AnimatedSection key={section.id} delay={index * 0.1}>
                  <div className="border-b border-grey-100 pb-8 last:border-0 last:pb-0">
                    <h2 className="text-2xl font-bold text-grey-900 mb-4">
                      {isArabic ? section.title.ar : section.title.en}
                    </h2>
                    <p className="text-grey-600 leading-relaxed text-lg">
                      {isArabic ? section.content.ar : section.content.en}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
