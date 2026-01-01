import { getTranslations } from 'next-intl/server';
import CourseRegistrationForm from '@/core/components/web/course/CourseRegistrationForm';
import Link from 'next/link';

export default async function CourseRegistrationPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const isArabic = locale === 'ar';
  const t = await getTranslations('courseRegistration');

  const translations = {
    title: t('title'),
    subtitle: t('subtitle'),
    steps: {
      language: {
        title: t('steps.language.title'),
        subtitle: t('steps.language.subtitle'),
        options: [
          { value: 'arabic', label: isArabic ? 'العربية' : 'Arabic', icon: '🇸🇦' },
          { value: 'english', label: isArabic ? 'الإنجليزية' : 'English', icon: '🇺🇸' },
          { value: 'both', label: isArabic ? 'كلاهما' : 'Both', icon: '🌍' },
        ],
      },
      availability: {
        title: t('steps.availability.title'),
        subtitle: t('steps.availability.subtitle'),
        hoursLabel: t('steps.availability.hoursLabel'),
        hoursOptions: [
          { value: '1-3', label: isArabic ? '1-3 ساعات' : '1-3 hours' },
          { value: '4-6', label: isArabic ? '4-6 ساعات' : '4-6 hours' },
          { value: '7-10', label: isArabic ? '7-10 ساعات' : '7-10 hours' },
          { value: '10+', label: isArabic ? '+10 ساعات' : '10+ hours' },
        ],
        daysLabel: t('steps.availability.daysLabel'),
        daysOptions: [
          { value: 'sat', label: isArabic ? 'السبت' : 'Saturday' },
          { value: 'sun', label: isArabic ? 'الأحد' : 'Sunday' },
          { value: 'mon', label: isArabic ? 'الاثنين' : 'Monday' },
          { value: 'tue', label: isArabic ? 'الثلاثاء' : 'Tuesday' },
          { value: 'wed', label: isArabic ? 'الأربعاء' : 'Wednesday' },
          { value: 'thu', label: isArabic ? 'الخميس' : 'Thursday' },
          { value: 'fri', label: isArabic ? 'الجمعة' : 'Friday' },
        ],
      },
      contact: {
        title: t('steps.contact.title'),
        subtitle: t('steps.contact.subtitle'),
        nameLabel: t('steps.contact.nameLabel'),
        namePlaceholder: t('steps.contact.namePlaceholder'),
        emailLabel: t('steps.contact.emailLabel'),
        emailPlaceholder: t('steps.contact.emailPlaceholder'),
        phoneLabel: t('steps.contact.phoneLabel'),
        phonePlaceholder: t('steps.contact.phonePlaceholder'),
      },
      payment: {
        title: t('steps.payment.title'),
        subtitle: t('steps.payment.subtitle'),
        options: [
          {
            value: 'full',
            label: isArabic ? 'الدفع الكامل' : 'Full Payment',
            description: isArabic ? 'ادفع مرة واحدة واحصل على خصم' : 'Pay once and get a discount',
            icon: '💰',
          },
          {
            value: 'installments',
            label: isArabic ? 'أقساط شهرية' : 'Monthly Installments',
            description: isArabic ? 'قسط الدفع على 3 أشهر' : 'Split payment over 3 months',
            icon: '📅',
          },
          {
            value: 'corporate',
            label: isArabic ? 'تمويل الشركة' : 'Corporate Sponsorship',
            description: isArabic ? 'شركتك تتكفل بالرسوم' : 'Your company covers the fees',
            icon: '🏢',
          },
          {
            value: 'scholarship',
            label: isArabic ? 'منحة دراسية' : 'Scholarship',
            description: isArabic ? 'تقدم لبرنامج المنح الدراسية' : 'Apply for scholarship program',
            icon: '🎓',
          },
        ],
      },
      confirm: {
        title: t('steps.confirm.title'),
        subtitle: t('steps.confirm.subtitle'),
        submitButton: t('steps.confirm.submitButton'),
        successTitle: t('steps.confirm.successTitle'),
        successMessage: t('steps.confirm.successMessage'),
        backToHome: t('steps.confirm.backToHome'),
      },
    },
    navigation: {
      next: t('navigation.next'),
      previous: t('navigation.previous'),
      step: t('navigation.step'),
      of: t('navigation.of'),
    },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white py-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-[120px] opacity-15" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Back Link */}
            <Link
              href={`/${locale}/web/courses/fintech-fundamentals`}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <svg className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {isArabic ? 'العودة للدورة' : 'Back to Course'}
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent">
                {translations.title}
              </span>
            </h1>
            <p className="text-xl text-white/80">{translations.subtitle}</p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 fill-white">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <CourseRegistrationForm locale={locale} translations={translations} />
        </div>
      </section>
    </div>
  );
}
