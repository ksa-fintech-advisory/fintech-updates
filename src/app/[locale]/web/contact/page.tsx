'use client';

import { useState } from 'react';
import { contactApiService } from '@/services/api/contactApi';
import { useLocale } from 'next-intl';
import { FiMail, FiMapPin, FiClock, FiSend, FiTerminal, FiCheckCircle, FiAlertCircle, FiMessageSquare } from 'react-icons/fi';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';

export default function ContactPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await contactApiService.submitContactForm(formData);
      setResult({
        success: response.success,
        message: locale === 'ar' ? response.message.ar : response.message.en,
      });

      if (response.success) {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setResult({
        success: false,
        message: locale === 'ar' ? 'فشل الاتصال بالخادم. حاول مرة أخرى.' : 'Connection refused. Please retry.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-black selection:bg-primary-500/30 font-sans">

      {/* 1. Global Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Header Section */}
      <section className="relative pt-32 pb-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  {isArabic ? 'قنوات_الاتصال' : 'COMMUNICATION_UPLINK'}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-zinc-900 dark:text-white leading-tight">
                {isArabic ? 'تواصل مع الخبراء' : 'Initialize Contact'}
              </h1>

              <p className="text-xl text-zinc-500 dark:text-zinc-400 font-light max-w-2xl leading-relaxed border-l-4 border-primary-500 pl-6">
                {isArabic
                  ? 'هل لديك استفسار تقني أو تجاري؟ فريقنا جاهز للرد على استفساراتك وتقديم المشورة.'
                  : 'Have a technical or commercial query? Our engineers are on standby to process your request.'}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="py-20 relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column: Contact Coordinates (4 Cols) */}
          <div className="lg:col-span-4 space-y-12">

            <div>
              <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FiMapPin /> {isArabic ? 'المقر_الرئيسي' : 'PHYSICAL_COORDINATES'}
              </h3>
              <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group">
                <p className="text-zinc-900 dark:text-white font-bold text-lg mb-2">Riyadh HQ</p>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm font-mono">
                  King Fahd Road, Olaya<br />
                  Unit No: 42<br />
                  Riyadh 12214, KSA
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FiMail /> {isArabic ? 'القنوات_الرقمية' : 'DIGITAL_CHANNELS'}
              </h3>
              <div className="space-y-4">
                <a href="mailto:hello@fintech.sa" className="block p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-primary-500 transition-colors group">
                  <span className="text-xs font-mono text-zinc-400 mb-1 block uppercase">General Inquiries</span>
                  <span className="text-zinc-900 dark:text-white font-bold text-lg font-mono group-hover:text-primary-600 transition-colors">hello@fintech.sa</span>
                </a>
                <a href="mailto:support@fintech.sa" className="block p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-primary-500 transition-colors group">
                  <span className="text-xs font-mono text-zinc-400 mb-1 block uppercase">Technical Support</span>
                  <span className="text-zinc-900 dark:text-white font-bold text-lg font-mono group-hover:text-primary-600 transition-colors">support@fintech.sa</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <FiClock /> {isArabic ? 'ساعات_العمل' : 'OPERATING_WINDOW'}
              </h3>
              <div className="p-6 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-zinc-600 dark:text-zinc-400 text-sm">Sun - Thu</span>
                  <span className="text-zinc-900 dark:text-white font-mono font-bold text-sm">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400 text-sm">Fri - Sat</span>
                  <span className="text-zinc-500 dark:text-zinc-500 font-mono font-bold text-sm">CLOSED</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: The "Terminal" Form (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden">

              {/* Fake Terminal Header */}
              <div className="bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  user@fintech:~/{isArabic ? 'contact-form' : 'new-message'}
                </div>
                <div className="w-10" /> {/* Spacer */}
              </div>

              <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                      <label htmlFor="name" className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-primary-600 transition-colors">
                        {isArabic ? 'الاسم_الكامل' : 'FULL_NAME'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-700 px-0 py-2 text-zinc-900 dark:text-white font-bold focus:outline-none focus:border-primary-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder={isArabic ? 'الاسم...' : 'Enter identifier...'}
                      />
                    </div>

                    <div className="space-y-2 group">
                      <label htmlFor="email" className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-primary-600 transition-colors">
                        {isArabic ? 'البريد_الإلكتروني' : 'EMAIL_ADDRESS'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-700 px-0 py-2 text-zinc-900 dark:text-white font-bold focus:outline-none focus:border-primary-500 transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label htmlFor="subject" className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-primary-600 transition-colors">
                      {isArabic ? 'الموضوع' : 'SUBJECT_LINE'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiTerminal className="absolute top-3 left-0 rtl:right-0 text-zinc-400" />
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-800/50 rounded border border-zinc-200 dark:border-zinc-700 px-8 py-3 text-zinc-900 dark:text-white font-medium focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-zinc-400"
                        placeholder={isArabic ? 'عنوان الرسالة...' : 'Technical Inquiry...'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label htmlFor="message" className="block text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-primary-600 transition-colors">
                      {isArabic ? 'الرسالة' : 'MESSAGE_PAYLOAD'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMessageSquare className="absolute top-3 left-0 rtl:right-0 text-zinc-400" />
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-800/50 rounded border border-zinc-200 dark:border-zinc-700 px-8 py-3 text-zinc-900 dark:text-white font-medium focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none placeholder:text-zinc-400"
                        placeholder={isArabic ? 'اكتب تفاصيل طلبك هنا...' : '// Write your request details here...'}
                      />
                    </div>
                  </div>

                  {/* Status Message Area */}
                  {result && (
                    <div className={`p-4 rounded-md flex items-start gap-3 border ${result.success
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                      }`}>
                      <div className="mt-0.5">
                        {result.success ? <FiCheckCircle /> : <FiAlertCircle />}
                      </div>
                      <div className="text-sm font-mono">
                        <span className="font-bold block mb-1">
                          {result.success ? 'TRANSMISSION SUCCESS' : 'TRANSMISSION ERROR'}
                        </span>
                        {result.message}
                      </div>
                    </div>
                  )}

                  {/* Submit Action */}
                  <div className="pt-4 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-sm uppercase tracking-wider hover:bg-primary-600 dark:hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {loading ? (
                        <span className="font-mono animate-pulse">{isArabic ? 'جاري الإرسال...' : 'SENDING_PACKETS...'}</span>
                      ) : (
                        <>
                          <span>{isArabic ? 'إرسال الرسالة' : 'EXECUTE_SEND'}</span>
                          <FiSend className={`transition-transform duration-300 ${isArabic ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}