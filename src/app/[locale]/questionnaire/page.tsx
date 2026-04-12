'use client';

import { useState } from 'react';
import { questionnaireApiService } from '@/services/api/questionnaireApi';
import type { QuestionnaireFormData } from '@/core/types/web/questionnaire';
import { useLocale, useTranslations } from 'next-intl';
import {
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiMessageSquare,
} from 'react-icons/fi';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import CustomSelect from '@/core/components/web/ui/CustomSelect';

export default function QuestionnairePage() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const t = useTranslations('web.questionnaire');
  const tf = useTranslations('web.questionnaire.form');

  const [formData, setFormData] = useState<QuestionnaireFormData>({
    name: '',
    email: '',
    region: 'saudi_arabia',
    otherRegion: '',
    projectType: 'payments',
    otherProjectType: '',
    difficulties: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await questionnaireApiService.submitQuestionnaireForm(formData);
      setResult({
        success: response.success,
        message: locale === 'ar' ? response.message.ar : response.message.en,
      });

      if (response.success) {
        setFormData({ name: '', email: '', region: 'saudi_arabia', otherRegion: '', projectType: 'payments', otherProjectType: '', difficulties: '' });
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
    'w-full scroll-mt-32 rounded-xl border border-white/10 bg-zinc-800/40 px-4 py-3.5 text-sm text-zinc-100 shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-200 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20';

  return (
    <div className="min-h-screen w-full bg-zinc-950 font-sans selection:bg-emerald-500/30 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none fixed left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px] z-0" />

      {/* Main content */}
      <section className="relative z-10 pt-32 pb-20 px-4 w-full">
        <div className="container mx-auto max-w-3xl">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <p className="mb-4  text-xs font-bold uppercase tracking-widest text-emerald-400">
              </p>
              <h1 className="mb-5 text-3xl font-bold leading-[1.18] tracking-tight text-white sm:text-4xl">
                {t('title')}
              </h1>
             
              <p className="mt-2 text-sm text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                {t('description')}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-800/40 shadow-[0_0_40px_-20px_rgba(16,185,129,0.1)] transition-shadow duration-500 hover:border-emerald-500/30 mx-auto w-full">
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 p-6 md:space-y-7 md:p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
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
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
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

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="region" className="block text-sm font-medium text-zinc-300">
                      {tf('region')} <span className="text-red-500">{tf('required')}</span>
                    </label>
                    <div className="relative">
                      <CustomSelect
                        id="region"
                        value={formData.region}
                        options={[
                          { value: 'saudi_arabia', label: tf('saudiArabia') },
                          { value: 'uae', label: tf('uae') },
                          { value: 'bahrain', label: tf('bahrain') },
                          { value: 'kuwait', label: tf('kuwait') },
                          { value: 'jordan', label: tf('jordan') },
                          { value: 'other', label: tf('other') }
                        ]}
                        onChange={(val) => setFormData({ ...formData, region: val as QuestionnaireFormData['region'] })}
                        className={`${fieldClass} py-[13px]`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectType" className="block text-sm font-medium text-zinc-300">
                      {tf('projectType')} <span className="text-red-500">{tf('required')}</span>
                    </label>
                    <div className="relative">
                      <CustomSelect
                        id="projectType"
                        value={formData.projectType}
                        options={[
                          { value: 'payments', label: tf('payments') },
                          { value: 'open_banking', label: tf('openBanking') },
                          { value: 'wealth_management', label: tf('wealthManagement') },
                          { value: 'crypto', label: tf('crypto') },
                          { value: 'other', label: tf('other') }
                        ]}
                        onChange={(val) => setFormData({ ...formData, projectType: val as QuestionnaireFormData['projectType'] })}
                        className={`${fieldClass} py-[13px]`}
                      />
                    </div>
                  </div>
                </div>

                {formData.region === 'other' && (
                  <AnimatedSection  delay={0.1}>
                    <div className="space-y-2">
                      <label htmlFor="otherRegion" className="block text-sm font-medium text-zinc-300">
                        {tf('otherRegion')} <span className="text-red-500">{tf('required')}</span>
                      </label>
                      <input
                        type="text"
                        id="otherRegion"
                        required
                        value={formData.otherRegion}
                        onChange={(e) => setFormData({ ...formData, otherRegion: e.target.value })}
                        className={fieldClass}
                        placeholder={tf('otherRegionPlaceholder')}
                      />
                    </div>
                  </AnimatedSection>
                )}

                {formData.projectType === 'other' && (
                  <AnimatedSection delay={0.1}>
                    <div className="space-y-2">
                      <label htmlFor="otherProjectType" className="block text-sm font-medium text-zinc-300">
                        {tf('otherProjectType')} <span className="text-red-500">{tf('required')}</span>
                      </label>
                      <input
                        type="text"
                        id="otherProjectType"
                        required
                        value={formData.otherProjectType}
                        onChange={(e) => setFormData({ ...formData, otherProjectType: e.target.value })}
                        className={fieldClass}
                        placeholder={tf('otherProjectTypePlaceholder')}
                      />
                    </div>
                  </AnimatedSection>
                )}

                <div className="space-y-2">
                  <label htmlFor="difficulties" className="block text-sm font-medium text-zinc-300">
                    {tf('difficulties')} <span className="text-red-500">{tf('required')}</span>
                  </label>
                  <textarea
                    id="difficulties"
                    required
                    rows={6}
                    value={formData.difficulties}
                    onChange={(e) => setFormData({ ...formData, difficulties: e.target.value })}
                    className={`${fieldClass} min-h-[160px] resize-y`}
                    placeholder={tf('difficultiesPlaceholder')}
                  />
                </div>

                {/* Result notification */}
                {result ? (
                  <div
                    role="status"
                    className={`flex gap-3 rounded-xl border p-4 animate-slide-in-right ${
                      result.success
                        ? 'border-emerald-900/50 bg-emerald-950/40 text-emerald-100'
                        : 'border-red-900/50 bg-red-950/40 text-red-100'
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
      </section>
    </div>
  );
}
