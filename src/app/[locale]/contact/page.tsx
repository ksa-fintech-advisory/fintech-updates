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
    'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm transition-all placeholder:text-zinc-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600';

  return (
    <div className="min-h-screen w-full bg-zinc-50 font-sans selection:bg-primary-500/30 dark:bg-zinc-950">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <section className="relative z-10 border-b border-zinc-200/80 bg-white/80 pt-28 pb-14 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 md:pt-36 md:pb-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                {t('kicker')}
              </p>
              <h1 className="mb-5 text-4xl font-bold leading-[1.18] tracking-tight text-zinc-900 dark:text-white md:text-5xl md:leading-[1.15] lg:text-6xl lg:leading-[1.12]">
                {t('title')}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-xl">
                {t('subtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Channels */}
            <div className="space-y-6 lg:col-span-4">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {t('channelsHeading')}
              </h2>

              <a
                href={getPublicMailtoHref()}
                className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-primary-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-primary-500/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
                  <FiMail className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">{t('emailTitle')}</p>
                  <p className="mt-1 break-all font-mono text-sm font-semibold text-zinc-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                    {PUBLIC_CONTACT_EMAIL}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{t('emailHint')}</p>
                </div>
              </a>

              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-[#25D366]">
                    <SiWhatsapp className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                      {t('whatsappTitle')}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                      {t('whatsappOpen')}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{t('whatsappHint')}</p>
                  </div>
                </a>
              ) : null}

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://x.com/mohfintech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:text-white"
                  aria-label="X (Twitter)"
                >
                  <FiTwitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohfintech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:text-white"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="border-b border-zinc-100 bg-zinc-50/80 px-6 py-5 dark:border-zinc-800 dark:bg-zinc-900/80 md:px-8">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400">
                      <FiMessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{t('formCardTitle')}</h2>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{t('formCardHint')}</p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-zinc-100 bg-zinc-50/90 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950/50 md:px-8">
                  <div className="flex gap-3">
                    <div className="mt-0.5 shrink-0 text-primary-600 dark:text-primary-400" aria-hidden>
                      <FiShield className="h-5 w-5" />
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{t('privacyNote')}</p>
                  </div>
                </div>

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

                  {result ? (
                    <div
                      role="status"
                      className={`flex gap-3 rounded-xl border p-4 ${
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

                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto"
                    >
                      {loading ? (
                        <span className="animate-pulse">{tf('sending')}</span>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
