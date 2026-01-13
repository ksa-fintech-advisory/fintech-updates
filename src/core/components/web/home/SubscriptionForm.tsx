'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { FiCheck, FiCpu, FiBriefcase, FiArrowRight, FiArrowLeft, FiLoader } from 'react-icons/fi';

export default function SubscriptionForm({ locale }: { locale: string }) {
  const isArabic = locale === 'ar';
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<'pro' | 'enterprise'>('pro');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success(isArabic ? 'تم استلام طلبك بنجاح!' : 'Request received successfully!');
    setIsLoading(false);
  };

  const t = {
    title: isArabic ? 'ترقية الحساب' : 'Upgrade Workspace',
    subtitle: isArabic
      ? 'اختر خطة تناسب حجم نموك التقني.'
      : 'Select a plan that scales with your technical growth.',
    plans: {
      pro: {
        name: isArabic ? 'برو' : 'Pro',
        price: isArabic ? '499 ر.س' : 'SAR 499',
        period: isArabic ? '/ شهرياً' : '/ month',
        description: isArabic ? 'للمطورين والشركات الناشئة' : 'For developers & startups',
        features: isArabic
          ? ['API غير محدود', 'تقارير سوقية (CSV)', 'دعم فني عبر البريد']
          : ['Unlimited API calls', 'Market reports (CSV)', 'Email Support']
      },
      enterprise: {
        name: isArabic ? 'مؤسسات' : 'Enterprise',
        price: isArabic ? 'مخصص' : 'Custom',
        period: '',
        description: isArabic ? 'للشركات الكبرى والبنوك' : 'For large scale fintechs',
        features: isArabic
          ? ['كل مميزات برو', 'SLA مخصص', 'مدير حساب تقني']
          : ['Everything in Pro', 'Custom SLA', 'Technical Account Mgr']
      }
    },
    form: {
      title: isArabic ? 'بيانات الفوترة' : 'Billing Details',
      name: isArabic ? 'الاسم الكامل' : 'Full Name',
      company: isArabic ? 'الكيان القانوني' : 'Legal Entity',
      email: isArabic ? 'بريد العمل' : 'Work Email',
      phone: isArabic ? 'الهاتف' : 'Phone',
      submit: isArabic ? 'تأكيد الاشتراك' : 'Confirm Subscription',
      processing: isArabic ? 'جاري المعالجة...' : 'Processing...'
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row my-12 max-w-5xl mx-auto">

      {/* 1. Left Side: Plan Selector (The "Menu") */}
      <div className="bg-zinc-50 dark:bg-black p-8 md:p-10 md:w-5/12 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 rtl:md:border-r-0 rtl:md:border-l relative">

        {/* Header */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
            <FiCpu className="text-primary-600" />
            {t.title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Plan Cards */}
        <div className="space-y-4">

          {/* Pro Plan */}
          <div
            onClick={() => setPlan('pro')}
            className={`cursor-pointer group relative p-4 rounded-lg border-2 transition-all duration-200 ${plan === 'pro'
                ? 'bg-white dark:bg-zinc-900 border-primary-600 dark:border-primary-500 shadow-md'
                : 'bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
          >
            <div className="flex justify-between items-start mb-1">
              <div>
                <span className="block font-bold text-zinc-900 dark:text-white">{t.plans.pro.name}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{t.plans.pro.description}</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${plan === 'pro' ? 'border-primary-600' : 'border-zinc-300'}`}>
                {plan === 'pro' && <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />}
              </div>
            </div>
            <div className="mt-3 font-mono text-sm font-bold text-zinc-800 dark:text-zinc-200">
              {t.plans.pro.price} <span className="text-zinc-400 font-normal">{t.plans.pro.period}</span>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div
            onClick={() => setPlan('enterprise')}
            className={`cursor-pointer group relative p-4 rounded-lg border-2 transition-all duration-200 ${plan === 'enterprise'
                ? 'bg-white dark:bg-zinc-900 border-primary-600 dark:border-primary-500 shadow-md'
                : 'bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
          >
            <div className="flex justify-between items-start mb-1">
              <div>
                <span className="block font-bold text-zinc-900 dark:text-white">{t.plans.enterprise.name}</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{t.plans.enterprise.description}</span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${plan === 'enterprise' ? 'border-primary-600' : 'border-zinc-300'}`}>
                {plan === 'enterprise' && <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />}
              </div>
            </div>
            <div className="mt-3 font-mono text-sm font-bold text-zinc-800 dark:text-zinc-200">
              {t.plans.enterprise.price}
            </div>
          </div>

        </div>

        {/* Feature List for Selected Plan */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 border-dashed">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-4">
            {isArabic ? 'المميزات المتضمنة:' : 'INCLUDED FEATURES:'}
          </h4>
          <ul className="space-y-2.5">
            {t.plans[plan].features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                <FiCheck className="w-4 h-4 text-primary-600 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. Right Side: The Form (The "Terminal") */}
      <div className="p-8 md:p-10 md:w-7/12 bg-white dark:bg-zinc-900 flex flex-col justify-center">

        <div className="mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
            {t.form.title}
          </h3>
          <p className="text-xs text-zinc-400">
            {isArabic ? 'يرجى ملء البيانات بدقة لغرض الفوترة.' : 'Please fill details accurately for invoicing.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">{t.form.name}</label>
              <input
                required
                type="text"
                className="w-full px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-zinc-400"
                placeholder={isArabic ? 'أحمد محمد' : 'John Doe'}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">{t.form.company}</label>
              <input
                required
                type="text"
                className="w-full px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-zinc-400"
                placeholder={isArabic ? 'شركة التقنية' : 'Tech Corp Ltd.'}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">{t.form.email}</label>
            <input
              required
              type="email"
              className="w-full px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-zinc-400"
              placeholder="name@company.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">{t.form.phone}</label>
            <input
              required
              type="tel"
              className="w-full px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-zinc-400"
              placeholder="+966 5..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`group w-full py-3.5 px-4 rounded font-bold text-sm flex items-center justify-center gap-2 transition-all ${isLoading
                  ? 'bg-zinc-100 text-zinc-400 cursor-wait'
                  : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-primary-600 dark:hover:bg-zinc-200'
                }`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin w-4 h-4" />
                  {t.form.processing}
                </>
              ) : (
                <>
                  {t.form.submit}
                  {isArabic ? <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> : <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-zinc-400 mt-4 leading-relaxed px-4">
              {isArabic
                ? 'بياناتك آمنة ومشفرة. بالضغط على "تأكيد الاشتراك"، فإنك توافق على اتفاقية مستوى الخدمة (SLA).'
                : 'Secure & Encrypted. By subscribing, you agree to our Service Level Agreement (SLA).'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}