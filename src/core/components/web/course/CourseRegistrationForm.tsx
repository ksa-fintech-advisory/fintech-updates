'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FiUser, FiMail, FiPhone, FiGlobe, FiClock, FiCalendar,
  FiCreditCard, FiCheckCircle, FiChevronRight, FiChevronLeft
} from 'react-icons/fi';

// ---------------------------------------------------------
// Types & Interfaces
// ---------------------------------------------------------

interface RegistrationFormProps {
  locale: string;
  translations: {
    title: string;
    subtitle: string;
    steps: {
      language: { title: string; subtitle: string; options: { value: string; label: string; icon: string }[] };
      availability: { title: string; subtitle: string; hoursLabel: string; hoursOptions: { value: string; label: string }[]; daysLabel: string; daysOptions: { value: string; label: string }[] };
      contact: { title: string; subtitle: string; emailLabel: string; emailPlaceholder: string; phoneLabel: string; phonePlaceholder: string; nameLabel: string; namePlaceholder: string };
      payment: { title: string; subtitle: string; options: { value: string; label: string; description: string; icon: string }[] };
      confirm: { title: string; subtitle: string; submitButton: string; successTitle: string; successMessage: string; backToHome: string };
    };
    navigation: { next: string; previous: string; step: string; of: string };
  };
}

interface FormData {
  language: string;
  hoursPerWeek: string;
  preferredDays: string[];
  name: string;
  email: string;
  phone: string;
  paymentPreference: string;
}

const steps = ['language', 'availability', 'contact', 'payment', 'confirm'] as const;

// ---------------------------------------------------------
// Helper Component: Input Field with Icon Fix
// ---------------------------------------------------------
const InputField = ({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  isArabic = false,
  dir = "auto"
}: any) => (
  <div className="group">
    <label className="block text-sm font-semibold text-grey-700 dark:text-grey-300 mb-2 transition-colors group-focus-within:text-primary-500">
      {label}
    </label>
    <div className="relative">
      {/* THE FIX: 
         1. Absolute positioning for the icon.
         2. Dynamic spacing (left/right) based on language.
         3. pointer-events-none ensures clicks pass through to the input.
      */}
      <div className={`absolute inset-y-0 ${isArabic ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-grey-400 group-focus-within:text-primary-500 transition-colors`}>
        <Icon size={20} />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        dir={dir}
        // Applying padding to create space for the icon
        className={`
          w-full py-4 bg-white dark:bg-dark-bg border-2 border-grey-200 dark:border-dark-border rounded-xl
          focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none
          text-grey-900 dark:text-white placeholder-grey-400 font-mono transition-all
          ${isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'} 
        `}
      />
    </div>
  </div>
);

// ---------------------------------------------------------
// Main Component
// ---------------------------------------------------------

export default function CourseRegistrationForm({ locale, translations }: RegistrationFormProps) {
  const isArabic = locale === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    language: '', hoursPerWeek: '', preferredDays: [], name: '', email: '', phone: '', paymentPreference: '',
  });
  const [direction, setDirection] = useState(0);

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter((d) => d !== day)
        : [...prev.preferredDays, day],
    }));
  };

  const canProceed = () => {
    switch (steps[currentStep]) {
      case 'language': return formData.language !== '';
      case 'availability': return formData.hoursPerWeek !== '' && formData.preferredDays.length > 0;
      case 'contact': return formData.name !== '' && formData.email !== '' && formData.phone !== '';
      case 'payment': return formData.paymentPreference !== '';
      case 'confirm': return true;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const goToNext = () => { if (currentStep < steps.length - 1) { setDirection(1); setCurrentStep((prev) => prev + 1); } };
  const goToPrevious = () => { if (currentStep > 0) { setDirection(-1); setCurrentStep((prev) => prev - 1); } };

  // Framer Motion Variants
  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? (isArabic ? -50 : 50) : (isArabic ? 50 : -50), opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? (isArabic ? -50 : 50) : (isArabic ? 50 : -50), opacity: 0 }),
  };

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-white/50 dark:bg-dark-card/50 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/5 shadow-2xl">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-5xl text-white mb-8 shadow-glow-primary">
          <FiCheckCircle />
        </div>
        <h2 className="text-3xl font-bold text-grey-900 dark:text-white mb-4">{translations.steps.confirm.successTitle}</h2>
        <p className="text-lg text-grey-600 dark:text-grey-300 mb-8 max-w-md mx-auto">{translations.steps.confirm.successMessage}</p>
        <Link href={`/${locale}/web/home`} className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-glow-primary">
          {translations.steps.confirm.backToHome}
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Glass Card */}
      <div className="bg-white/80 dark:bg-dark-card/60 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-white/10 shadow-2xl overflow-hidden">

        {/* Progress Header */}
        <div className="px-8 pt-8 pb-4 border-b border-grey-100 dark:border-white/5">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-mono text-grey-500 dark:text-grey-400 uppercase tracking-widest">
              {translations.navigation.step} <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">{currentStep + 1}</span> {translations.navigation.of} {steps.length}
            </span>
            <div className="text-xs font-bold px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% COMPLETE
            </div>
          </div>
          {/* Glowing Progress Bar */}
          <div className="h-1.5 bg-grey-100 dark:bg-grey-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 md:p-12 min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="w-full"
            >
              {/* STEP 1: LANGUAGE */}
              {steps[currentStep] === 'language' && (
                <div className="text-center max-w-2xl mx-auto">
                  <div className="inline-block p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-6 text-4xl"><FiGlobe /></div>
                  <h2 className="text-3xl font-bold text-grey-900 dark:text-white mb-3">{translations.steps.language.title}</h2>
                  <p className="text-grey-600 dark:text-grey-400 mb-10">{translations.steps.language.subtitle}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {translations.steps.language.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateFormData('language', option.value)}
                        className={`
                          p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-4
                          ${formData.language === option.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 ring-2 ring-primary-500/20'
                            : 'border-grey-200 dark:border-dark-border bg-transparent hover:border-grey-300 dark:hover:border-grey-600 dark:text-grey-300'}
                        `}
                      >
                        <span className="text-4xl">{option.icon}</span>
                        <span className="font-bold">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: AVAILABILITY */}
              {steps[currentStep] === 'availability' && (
                <div className="text-center max-w-2xl mx-auto">
                  <div className="inline-block p-4 rounded-2xl bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 mb-6 text-4xl"><FiClock /></div>
                  <h2 className="text-3xl font-bold text-grey-900 dark:text-white mb-3">{translations.steps.availability.title}</h2>
                  <p className="text-grey-600 dark:text-grey-400 mb-10">{translations.steps.availability.subtitle}</p>

                  <div className="mb-10">
                    <label className="block text-sm font-semibold text-grey-700 dark:text-grey-300 mb-4">{translations.steps.availability.hoursLabel}</label>
                    <div className="flex flex-wrap justify-center gap-3">
                      {translations.steps.availability.hoursOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('hoursPerWeek', option.value)}
                          className={`
                            px-6 py-3 rounded-xl border-2 font-medium transition-all
                            ${formData.hoursPerWeek === option.value
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                              : 'border-grey-200 dark:border-dark-border text-grey-600 dark:text-grey-400 hover:border-grey-300'}
                          `}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-grey-700 dark:text-grey-300 mb-4">{translations.steps.availability.daysLabel}</label>
                    <div className="flex flex-wrap justify-center gap-3">
                      {translations.steps.availability.daysOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleDay(option.value)}
                          className={`
                            px-5 py-3 rounded-xl border-2 font-medium transition-all flex items-center gap-2
                            ${formData.preferredDays.includes(option.value)
                              ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 shadow-sm'
                              : 'border-grey-200 dark:border-dark-border text-grey-600 dark:text-grey-400 hover:border-grey-300'}
                          `}
                        >
                          {formData.preferredDays.includes(option.value) && <FiCheckCircle />}
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT (Fixed Inputs) */}
              {steps[currentStep] === 'contact' && (
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-grey-900 dark:text-white mb-2">{translations.steps.contact.title}</h2>
                    <p className="text-grey-600 dark:text-grey-400">{translations.steps.contact.subtitle}</p>
                  </div>

                  <div className="space-y-6">
                    <InputField
                      label={translations.steps.contact.nameLabel}
                      icon={FiUser}
                      value={formData.name}
                      onChange={(e: any) => updateFormData('name', e.target.value)}
                      placeholder={translations.steps.contact.namePlaceholder}
                      isArabic={isArabic}
                    />
                    <InputField
                      label={translations.steps.contact.emailLabel}
                      icon={FiMail}
                      type="email"
                      value={formData.email}
                      onChange={(e: any) => updateFormData('email', e.target.value)}
                      placeholder={translations.steps.contact.emailPlaceholder}
                      dir="ltr"
                      isArabic={isArabic}
                    />
                    <InputField
                      label={translations.steps.contact.phoneLabel}
                      icon={FiPhone}
                      type="tel"
                      value={formData.phone}
                      onChange={(e: any) => updateFormData('phone', e.target.value)}
                      placeholder={translations.steps.contact.phonePlaceholder}
                      dir="ltr"
                      isArabic={isArabic}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: PAYMENT */}
              {steps[currentStep] === 'payment' && (
                <div className="text-center max-w-2xl mx-auto">
                  <div className="inline-block p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 mb-6 text-4xl"><FiCreditCard /></div>
                  <h2 className="text-3xl font-bold text-grey-900 dark:text-white mb-3">{translations.steps.payment.title}</h2>
                  <p className="text-grey-600 dark:text-grey-400 mb-10">{translations.steps.payment.subtitle}</p>
                  <div className="grid grid-cols-1 gap-4">
                    {translations.steps.payment.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateFormData('paymentPreference', option.value)}
                        className={`
                          group relative p-6 rounded-2xl border-2 text-start transition-all duration-300
                          ${formData.paymentPreference === option.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg shadow-primary-500/10'
                            : 'border-grey-200 dark:border-dark-border hover:border-grey-300 bg-transparent'}
                        `}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`text-3xl mt-1 ${formData.paymentPreference === option.value ? 'text-primary-600' : 'text-grey-400'}`}>
                            {option.icon}
                          </div>
                          <div>
                            <div className={`font-bold text-lg mb-1 ${formData.paymentPreference === option.value ? 'text-primary-800 dark:text-primary-200' : 'text-grey-800 dark:text-white'}`}>
                              {option.label}
                            </div>
                            <div className="text-sm text-grey-500 dark:text-grey-400">
                              {option.description}
                            </div>
                          </div>
                        </div>
                        {formData.paymentPreference === option.value && (
                          <div className={`absolute top-6 ${isArabic ? 'left-6' : 'right-6'} text-primary-600`}>
                            <FiCheckCircle size={24} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: CONFIRMATION (Receipt Style) */}
              {steps[currentStep] === 'confirm' && (
                <div className="max-w-md mx-auto">
                  <h2 className="text-2xl font-bold text-center text-grey-900 dark:text-white mb-8">{translations.steps.confirm.title}</h2>

                  {/* Receipt Card */}
                  <div className="bg-grey-50 dark:bg-dark-bg p-6 rounded-2xl border border-grey-200 dark:border-dark-border font-mono text-sm shadow-inner">
                    <div className="space-y-4">
                      <div className="flex justify-between pb-4 border-b border-grey-200 dark:border-grey-700">
                        <span className="text-grey-500">Applicant</span>
                        <span className="font-bold text-grey-900 dark:text-white">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-grey-500">Language</span>
                        <span className="text-grey-900 dark:text-white">{formData.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-grey-500">Commitment</span>
                        <span className="text-grey-900 dark:text-white">{formData.hoursPerWeek}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-grey-500">Payment</span>
                        <span className="text-grey-900 dark:text-white">{formData.paymentPreference}</span>
                      </div>
                      <div className="pt-4 mt-4 border-t border-dashed border-grey-300 dark:border-grey-700">
                        <div className="flex justify-between items-center">
                          <span className="text-grey-500">Status</span>
                          <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 rounded text-xs font-bold uppercase">
                            Pending Review
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-6 bg-grey-50/50 dark:bg-black/20 border-t border-grey-100 dark:border-white/5 flex justify-between items-center">
          <button
            onClick={goToPrevious}
            disabled={currentStep === 0}
            className={`
              flex items-center gap-2 font-semibold transition-colors
              ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-grey-500 hover:text-grey-800 dark:text-grey-400 dark:hover:text-white'}
            `}
          >
            {isArabic ? <FiChevronRight /> : <FiChevronLeft />}
            {translations.navigation.previous}
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary-600/30 flex items-center gap-2 transition-all transform active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {translations.steps.confirm.submitButton}
                  <FiCheckCircle />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={goToNext}
              disabled={!canProceed()}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all
                ${canProceed()
                  ? 'bg-grey-900 dark:bg-white text-white dark:text-grey-900 hover:shadow-lg transform active:scale-95'
                  : 'bg-grey-200 dark:bg-grey-800 text-grey-400 cursor-not-allowed'}
              `}
            >
              {translations.navigation.next}
              {isArabic ? <FiChevronLeft /> : <FiChevronRight />}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}