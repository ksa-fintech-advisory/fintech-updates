'use client';

import { useState } from 'react';
import { contactApiService } from '@/services/api/contactApi';
import type { ContactFormData } from '@/core/types/web/contact';
import { useLocale, useTranslations } from 'next-intl';
import {
  FiMail,
  FiPhone,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiMessageSquare,
  FiShield,
  FiTwitter,
  FiLinkedin,
  FiArrowUpRight,
} from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { PUBLIC_CONTACT_EMAIL, getPublicMailtoHref, getWhatsAppWaMeUrl } from '@/core/data/publicContact';

export default function ContactPage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('web.contact');
  const tf = useTranslations('web.contact.form');

  const whatsappUrl = getWhatsAppWaMeUrl();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
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
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch {
      setResult({
        success: false,
        message: tf('error'),
      });
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    'w-full rounded-xl border border-white/10 bg-[#0a0a0b] px-4 py-3.5 text-sm text-zinc-100 shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-200 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20';

  return (
    <div className="min-h-screen w-full bg-[#030303] font-sans selection:bg-emerald-500/30 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none fixed left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px] z-0" />

      {/* Hero */}
      {/* <section className="relative z-10 border-b border-zinc-200/80 bg-white/80 pt-28 pb-14 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 md:pt-36 md:pb-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                {t('kicker')}
              </p>
              <h1 className="mb-5 text-3xl font-bold leading-[1.18] tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl md:leading-[1.15] lg:text-6xl lg:leading-[1.12]">
                {t('title')}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg md:text-xl">
                {t('subtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section> */}

      {/* Main content */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Channels sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
              <AnimatedSection>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0b] shadow-[0_0_80px_-30px_rgba(16,185,129,0.25)] backdrop-blur-xl">
                  {/* Glowing background */}
                  <div className="absolute -inset-10 z-0 pointer-events-none">
                    <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-[60px]" />
                  </div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="border-b border-white/5 bg-white/[0.02] px-5 py-4">
                      <div className="flex items-center justify-between">
                         <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400/90">
                           {t('channelsHeading')}
                         </h2>
                         <div className="flex gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                         </div>
                      </div>
                    </div>

                    {/* Body/Links */}
                    <div className="p-2">
                      <a
                        href={getPublicMailtoHref()}
                        className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                      >
                        <div className="flex items-center gap-3">
                           <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 ring-1 ring-white/10 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-300 transition-colors">
                             <FiMail className="h-4.5 w-4.5" />
                           </div>
                           <span className="font-mono font-medium">{PUBLIC_CONTACT_EMAIL}</span>
                        </div>
                        <FiArrowUpRight className={`h-4 w-4 shrink-0 text-zinc-600 transition-transform group-hover:text-emerald-400 ${isArabic ? 'rotate-[270deg] group-hover:-translate-x-0.5 group-hover:translate-y-0.5' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                      </a>

                      {whatsappUrl ? (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                          <div className="flex items-center gap-3">
                             <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 ring-1 ring-white/10 text-[#25D366] group-hover:bg-[#25D366]/10 transition-colors">
                               <SiWhatsapp className="h-4.5 w-4.5" />
                             </div>
                             <span className={`font-medium ${isArabic ? 'font-arabic' : 'font-mono'}`}>{t('whatsappTitle')}</span>
                          </div>
                          <FiArrowUpRight className={`h-4 w-4 shrink-0 text-zinc-600 transition-transform group-hover:text-emerald-400 ${isArabic ? 'rotate-[270deg] group-hover:-translate-x-0.5 group-hover:translate-y-0.5' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                        </a>
                      ) : null}
                    </div>
                    
                    {/* Social footer */}
                    <div className="border-t border-white/5 bg-white/[0.01] px-6 py-4 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500">PING_ME</span>
                      <div className="flex gap-4">
                        <a href="https://x.com/mohfintech" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors">
                          <FiTwitter className="h-4.5 w-4.5" />
                        </a>
                        <a href="https://www.linkedin.com/in/mohfintech/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors">
                          <FiLinkedin className="h-4.5 w-4.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Form card */}
            <div className="lg:col-span-8">
              <AnimatedSection delay={0.15}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0b] shadow-[0_0_40px_-20px_rgba(16,185,129,0.1)] transition-shadow duration-500 hover:border-emerald-500/30">
                  {/* Card header */}
                  <div className="border-b border-white/5 bg-white/[0.02] px-6 py-5 md:px-8">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-emerald-400 ring-1 ring-white/10">
                        <FiMessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-zinc-100">{t('formCardTitle')}</h2>
                        <p className="mt-1 text-sm text-zinc-500">{t('formCardHint')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Privacy notice */}
                  <div className="border-b border-white/5 bg-white/[0.01] px-6 py-4 md:px-8">
                    <div className="flex gap-3">
                      <div className="mt-0.5 shrink-0 text-emerald-400/80" aria-hidden>
                        <FiShield className="h-5 w-5" />
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-500">{t('privacyNote')}</p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6 p-6 md:space-y-7 md:p-8">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {tf('name')} <span className="text-red-500">{tf('required')}</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className={fieldClass}
                          placeholder={tf('namePlaceholder')}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {tf('email')} <span className="text-red-500">{tf('required')}</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className={fieldClass}
                          placeholder={tf('emailPlaceholder')}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        <span className="inline-flex items-center gap-2">
                          <FiPhone className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
                          {tf('phone')}
                        </span>{' '}
                        <span className="font-normal text-zinc-400">{tf('optional')}</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className={fieldClass}
                        placeholder={tf('phonePlaceholder')}
                      />
                      <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{tf('phoneHint')}</p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {tf('subject')} <span className="text-red-500">{tf('required')}</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className={fieldClass}
                        placeholder={tf('subjectPlaceholder')}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {tf('message')} <span className="text-red-500">{tf('required')}</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className={`${fieldClass} min-h-[168px] resize-y`}
                        placeholder={tf('messagePlaceholder')}
                      />
                    </div>

                    {/* Result notification */}
                    {result ? (
                      <div
                        role="status"
                        className={`flex gap-3 rounded-xl border p-4 animate-slide-in-right ${
                          result.success
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100'
                            : 'border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-100'
                        }`}
                      >
                        <div className="shrink-0 pt-0.5">
                          {result.success ? <FiCheckCircle className="h-5 w-5" /> : <FiAlertCircle className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {result.success ? t('successTitle') : t('errorTitle')}
                          </p>
                          <p className="mt-1 text-sm opacity-90">{result.message}</p>
                        </div>
                      </div>
                    ) : null}

                    {/* Submit */}
                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="press-scale inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-bold text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-200 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full border-2 border-zinc-900/30 border-t-zinc-900 animate-spin-smooth" />
                            {tf('sending')}
                          </span>
                        ) : (
                          <>
                            {tf('submit')}
                            <FiSend className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
