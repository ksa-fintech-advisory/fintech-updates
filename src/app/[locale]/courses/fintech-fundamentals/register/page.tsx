import { getTranslations } from 'next-intl/server';
import CourseRegistrationForm from '@/core/components/web/course/CourseRegistrationForm';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

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
        priceLabel: t('steps.payment.priceLabel'),
        options: [
          {
            value: 'full',
            label: isArabic ? 'الدفع الكامل' : 'Full Payment',
            description: isArabic ? 'ادفع مرة واحدة واحصل على خصم' : 'Pay once and get a discount',
            icon: '💰',
          },
          {
            value: 'installments',
            label: isArabic ? 'دفعتان: بداية ونهاية الدورة' : 'Two payments: start and end of course',
            description: isArabic ? 'دفعة عند بداية الدورة ودفعة عند نهايتها' : 'One payment at course start, one at course end',
            icon: '📅',
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
    <div className="w-full bg-zinc-50 dark:bg-black min-h-screen selection:bg-primary-500/30">
      {/* Global Background Grid - same as course */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Hero strip - course style */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm pt-28 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/${locale}/courses/fintech-fundamentals`}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors uppercase tracking-widest"
            >
              {isArabic ? <FiArrowRight className="w-4 h-4" /> : <FiArrowLeft className="w-4 h-4" />}
              <span>{isArabic ? '../العودة_للدورة' : '../BACK_TO_COURSE'}</span>
            </Link>
            <div className="max-w-3xl">
              <span className="text-primary-600 dark:text-primary-400 font-mono text-xs uppercase tracking-widest mb-2 block">
                {isArabic ? '// التسجيل' : '// REGISTRATION'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-3 leading-[1.16] md:leading-[1.14]">
                {translations.title}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                {translations.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Form Section - same bg as course content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <CourseRegistrationForm locale={locale} translations={translations} />
          </div>
        </section>
      </div>
    </div>
  );
}
