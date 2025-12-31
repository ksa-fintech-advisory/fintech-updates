import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/core/components/web/home/HomeAnimations';
import ProductShowcase from '../home/components/ProductShowcase';

export default function ProductsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-24 md:py-32 overflow-hidden min-h-[50vh] flex items-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-[100px] opacity-20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection direction="up">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent drop-shadow-xl">
                  {isArabic ? 'حلولنا المتكاملة' : 'Our Solutions'}
                </span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection direction="up" delay={0.2}>
              <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed mb-10">
                {isArabic
                  ? 'مجموعة متكاملة من الأدوات الرقمية المصممة لتمكين قطاع التقنية المالية في المملكة'
                  : 'A comprehensive suite of digital tools designed to empower the FinTech sector in the Kingdom'}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Products Grid - Reusing Component */}
      <ProductShowcase locale={locale} />

      {/* Benefits Section */}
      <section className="py-24 bg-grey-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-grey-900 mb-4">
              {isArabic ? 'لماذا تختار حلولنا؟' : 'Why Choose Our Solutions?'}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent-400 to-primary-400 mx-auto rounded-full"></div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-hard transition-all duration-300 text-center">
                <div className="w-16 h-16 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mb-6 text-primary-600">
                  🎯
                </div>
                <h3 className="text-xl font-bold text-grey-900 mb-3">
                  {isArabic ? 'دقة متناهية' : 'High Precision'}
                </h3>
                <p className="text-grey-600">
                  {isArabic
                    ? 'أدوات مبنية على أحدث البيانات والمعايير لضمان نتائج دقيقة وموثوقة.'
                    : 'Tools built on the latest data and standards to ensure accurate and reliable results.'}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-hard transition-all duration-300 text-center">
                <div className="w-16 h-16 mx-auto bg-accent-50 rounded-2xl flex items-center justify-center text-3xl mb-6 text-accent-600">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-grey-900 mb-3">
                  {isArabic ? 'سريعة وفعالة' : 'Fast & Efficient'}
                </h3>
                <p className="text-grey-600">
                  {isArabic
                    ? 'وفر الوقت والجهد مع واجهات سهلة الاستخدام ومعالجة فورية للبيانات.'
                    : 'Save time and effort with user-friendly interfaces and instant data processing.'}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white p-8 rounded-3xl shadow-soft hover:shadow-hard transition-all duration-300 text-center">
                <div className="w-16 h-16 mx-auto bg-green-50 rounded-2xl flex items-center justify-center text-3xl mb-6 text-green-600">
                  🛡️
                </div>
                <h3 className="text-xl font-bold text-grey-900 mb-3">
                  {isArabic ? 'متوافقة تنظيمياً' : 'Regulatory Compliant'}
                </h3>
                <p className="text-grey-600">
                  {isArabic
                    ? 'مصممة لتتوافق مع لوائح البنك المركزي السعودي وهيئة السوق المالية.'
                    : 'Designed to comply with SAMA and CMA regulations.'}
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-[80px] opacity-20"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {isArabic ? 'ابدأ رحلتك معنا اليوم' : 'Start Your Journey With Us Today'}
              </h2>
              <p className="text-xl text-primary-100 mb-10">
                {isArabic
                  ? 'سواء كنت شركة ناشئة أو مؤسسة مالية، لدينا الأدوات التي تحتاجها للنجاح.'
                  : 'Whether you are a startup or a financial institution, we have the tools you need to succeed.'}
              </p>
              <Link
                href={`/${locale}/web/contact`}
                className="inline-block bg-white text-primary-900 font-bold py-4 px-10 rounded-xl hover:bg-accent-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isArabic ? 'تواصل معنا' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
