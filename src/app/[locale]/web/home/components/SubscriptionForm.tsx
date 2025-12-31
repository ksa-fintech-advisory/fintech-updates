'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function SubscriptionForm({ locale }: { locale: string }) {
  const isArabic = locale === 'ar';
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<'pro' | 'enterprise'>('pro');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success(isArabic ? 'تم استلام طلبك بنجاح!' : 'Request received successfully!');
    setIsLoading(false);
    // Reset form or redirect could go here
  };

  const t = {
    title: isArabic ? 'احصل على الوصول الكامل' : 'Get Full Access',
    subtitle: isArabic ? 'اختر الخطة التي تناسب احتياجاتك وابدأ في اتخاذ قرارات مبنية على البيانات.' : 'Choose the plan that fits your needs and start making data-driven decisions.',
    plans: {
      pro: {
        name: isArabic ? 'برو' : 'Pro',
        price: isArabic ? '٤٩٩ ر.س / شهرياً' : 'SAR 499 / mo',
        features: isArabic ? ['بيانات السوق المباشرة', 'تصدير البيانات (Excel)', 'دعم البريد الإلكتروني'] : ['Live Market Data', 'Data Export (Excel)', 'Email Support']
      },
      enterprise: {
        name: isArabic ? 'مؤسسات' : 'Enterprise',
        price: isArabic ? 'تواصل معنا' : 'Contact Us',
        features: isArabic ? ['كل مميزات برو', 'وصول API', 'تقارير مخصصة', 'مدير حساب خاص'] : ['Everything in Pro', 'API Access', 'Custom Reports', 'Dedicated Account Manager']
      }
    },
    form: {
      name: isArabic ? 'الاسم الكامل' : 'Full Name',
      company: isArabic ? 'اسم الشركة' : 'Company Name',
      email: isArabic ? 'البريد الإلكتروني للعمل' : 'Work Email',
      phone: isArabic ? 'رقم الهاتف' : 'Phone Number',
      submit: isArabic ? 'اشترك الآن' : 'Subscribe Now',
      processing: isArabic ? 'جاري المعالجة...' : 'Processing...'
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col md:flex-row">
      {/* Plan Selection Side */}
      <div className="bg-slate-900 p-8 md:p-12 md:w-2/5 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-slate-900 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6">{t.title}</h3>
          <p className="text-purple-200 mb-8 font-light">{t.subtitle}</p>
          
          <div className="space-y-4">
            {/* Pro Plan */}
            <button
              type="button"
              onClick={() => setPlan('pro')}
              className={`w-full text-start p-4 rounded-xl border transition-all ${
                plan === 'pro' 
                  ? 'bg-purple-600 border-purple-500 shadow-lg' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{t.plans.pro.name}</span>
                {plan === 'pro' && <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-purple-600"></div></div>}
              </div>
              <div className="text-sm text-purple-200">{t.plans.pro.price}</div>
            </button>

            {/* Enterprise Plan */}
            <button
              type="button"
              onClick={() => setPlan('enterprise')}
              className={`w-full text-start p-4 rounded-xl border transition-all ${
                plan === 'enterprise' 
                  ? 'bg-purple-600 border-purple-500 shadow-lg' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{t.plans.enterprise.name}</span>
                {plan === 'enterprise' && <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-purple-600"></div></div>}
              </div>
              <div className="text-sm text-purple-200">{t.plans.enterprise.price}</div>
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
          <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-4">
            {isArabic ? 'مميزات الخطة المختارة' : 'Selected Plan Features'}
          </h4>
          <ul className="space-y-2">
            {t.plans[plan].features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form Side */}
      <div className="p-8 md:p-12 md:w-3/5 bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-grey-700">{t.form.name}</label>
              <input 
                required 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder={isArabic ? 'أحمد محمد' : 'John Doe'}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-grey-700">{t.form.company}</label>
              <input 
                required 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder={isArabic ? 'شركة التقنية المالية' : 'FinTech Corp'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-grey-700">{t.form.email}</label>
            <input 
              required 
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
              placeholder="name@company.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-grey-700">{t.form.phone}</label>
            <input 
              required 
              type="tel" 
              className="w-full px-4 py-3 rounded-xl border border-grey-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
              placeholder="+966 5..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] ${
              isLoading ? 'bg-purple-400 cursor-wait' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
            }`}
          >
            {isLoading ? t.form.processing : t.form.submit}
          </button>
          
          <p className="text-xs text-center text-grey-400 mt-4">
            {isArabic 
              ? 'بالضغط على "اشترك الآن"، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.' 
              : 'By clicking "Subscribe Now", you agree to our Terms of Service and Privacy Policy.'}
          </p>
        </form>
      </div>
    </div>
  );
}
