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
      payment: { title: string; subtitle: string; priceLabel?: string; options: { value: string; label: string; description: string; icon: string }[] };
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

// Language step commented out: course is Arabic only
  const steps = ['availability', 'contact', 'payment', 'confirm'] as const;

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
    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 transition-colors group-focus-within:text-primary-500">
      {label}
    </label>
    <div className="relative">
      {/* THE FIX: 
         1. Absolute positioning for the icon.
         2. Dynamic spacing (left/right) based on language.
         3. pointer-events-none ensures clicks pass through to the input.
      */}
      <div className={`absolute inset-y-0 ${isArabic ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none text-zinc-400 group-focus-within:text-primary-500 transition-colors`}>
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
          w-full py-4 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl
          focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none
          text-zinc-900 dark:text-white placeholder-zinc-400 font-mono transition-all
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
      // case 'language': return formData.language !== ''; // step commented out
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
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-white dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-inner">
        <div className="w-20 h-20 mx-auto rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-4xl text-primary-500 mb-8 border-2 border-primary-500/30">
          <FiCheckCircle />
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">{translations.steps.confirm.successTitle}</h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto">{translations.steps.confirm.successMessage}</p>
        <Link href={`/${locale}/courses/fintech-fundamentals`} className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-lg transition-all hover:bg-primary-600 dark:hover:bg-zinc-200">
          {translations.steps.confirm.backToHome}
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Card - course style */}
      <div className="bg-white dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-inner">

        {/* Progress Header */}
        <div className="px-8 pt-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
              {translations.navigation.step} <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">{currentStep + 1}</span> {translations.navigation.of} {steps.length}
            </span>
            <div className="text-xs font-bold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-primary-600 dark:text-primary-400 rounded-md font-mono uppercase tracking-wider">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% COMPLETE
            </div>
          </div>
          {/* Progress Bar */}
          <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 md:p-12 min-h-[500px] flex flex-col justify-center bg-zinc-50/30 dark:bg-black/20">
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
              {/* Language step commented out: course is Arabic only
              steps[currentStep] === 'language' && (
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
              ) */}

              {/* STEP 2: AVAILABILITY (now step 1) - course card pattern */}
              {steps[currentStep] === 'availability' && (
                <div className="max-w-2xl mx-auto text-center">
                  <div className="inline-block p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-primary-500 mb-6 border border-zinc-200 dark:border-zinc-700"><FiClock className="w-8 h-8" /></div>
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">{translations.steps.availability.title}</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-10">{translations.steps.availability.subtitle}</p>

                  {/* Hours per week - dark chips like course enroll bar */}
                  <div className="mb-10">
                    <span className="text-primary-600 dark:text-primary-400 font-mono text-xs uppercase tracking-widest mb-3 block text-left rtl:text-right">
                      {translations.steps.availability.hoursLabel}
                    </span>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      {translations.steps.availability.hoursOptions.map((option) => {
                        const isSelected = formData.hoursPerWeek === option.value;
                        return (
                          <button
                            key={option.value}
                            onClick={() => updateFormData('hoursPerWeek', option.value)}
                            className={`
                              px-6 py-3 rounded-lg border-2 font-medium text-sm transition-all duration-300 bg-transparent
                              ${isSelected
                                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                : 'border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-white'}
                            `}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Days - same dark chip style */}
                  <div>
                    <span className="text-primary-600 dark:text-primary-400 font-mono text-xs uppercase tracking-widest mb-3 block text-left rtl:text-right">
                      {translations.steps.availability.daysLabel}
                    </span>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      {translations.steps.availability.daysOptions.map((option) => {
                        const isSelected = formData.preferredDays.includes(option.value);
                        return (
                          <button
                            key={option.value}
                            onClick={() => toggleDay(option.value)}
                            className={`
                              flex items-center gap-2 px-5 py-3 rounded-lg border-2 font-medium text-sm transition-all duration-300 bg-transparent
                              ${isSelected
                                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                : 'border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400 hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-white'}
                            `}
                          >
                            {isSelected && <FiCheckCircle className="w-4 h-4 text-primary-400" />}
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT (Fixed Inputs) */}
              {steps[currentStep] === 'contact' && (
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-primary-500 mb-6 border border-zinc-200 dark:border-zinc-700"><FiUser className="w-8 h-8" /></div>
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{translations.steps.contact.title}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{translations.steps.contact.subtitle}</p>
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
                  <div className="inline-block p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-primary-500 mb-6 border border-zinc-200 dark:border-zinc-700"><FiCreditCard className="w-8 h-8" /></div>
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">{translations.steps.payment.title}</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">{translations.steps.payment.subtitle}</p>
                  {translations.steps.payment.priceLabel && (
                    <p className="text-lg font-mono font-bold text-primary-600 dark:text-primary-400 mb-8">
                      {translations.steps.payment.priceLabel}
                    </p>
                  )}
                  <div className="grid grid-cols-1 gap-4">
                    {translations.steps.payment.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateFormData('paymentPreference', option.value)}
                        className={`
                          group relative p-6 rounded-xl border-2 text-start transition-all duration-300
                          ${formData.paymentPreference === option.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-zinc-200 dark:border-zinc-800 hover:border-primary-500/50 bg-white dark:bg-zinc-900/40'}
                        `}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`text-3xl mt-1 ${formData.paymentPreference === option.value ? 'text-primary-500' : 'text-zinc-400'}`}>
                            {option.icon}
                          </div>
                          <div>
                            <div className={`font-bold text-lg mb-1 ${formData.paymentPreference === option.value ? 'text-primary-700 dark:text-primary-300' : 'text-zinc-900 dark:text-white'}`}>
                              {option.label}
                            </div>
                            <div className="text-sm text-zinc-500 dark:text-zinc-400">
                              {option.description}
                            </div>
                          </div>
                        </div>
                        {formData.paymentPreference === option.value && (
                          <div className={`absolute top-6 ${isArabic ? 'left-6' : 'right-6'} text-primary-500`}>
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
                  <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-8">{translations.steps.confirm.title}</h2>

                  {/* Receipt Card - course style */}
                  <div className="bg-white dark:bg-zinc-900/60 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-sm">
                    <div className="space-y-4">
                      <div className="flex justify-between pb-4 border-b border-zinc-200 dark:border-zinc-700">
                        <span className="text-zinc-500 uppercase tracking-wider text-xs">Applicant</span>
                        <span className="font-bold text-zinc-900 dark:text-white">{formData.name}</span>
                      </div>
                      {/* Language row commented out: course is Arabic only */}
                      <div className="flex justify-between">
                        <span className="text-zinc-500 uppercase tracking-wider text-xs">Commitment</span>
                        <span className="text-zinc-900 dark:text-white">{formData.hoursPerWeek}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 uppercase tracking-wider text-xs">Payment</span>
                        <span className="text-zinc-900 dark:text-white">{formData.paymentPreference}</span>
                      </div>
                      <div className="pt-4 mt-4 border-t border-dashed border-zinc-300 dark:border-zinc-700">
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500 uppercase tracking-wider text-xs">Status</span>
                          <span className="px-2 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded text-xs font-bold uppercase border border-primary-500/30">
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

        {/* Footer Navigation - course style */}
        <div className="px-8 py-6 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <button
            onClick={goToPrevious}
            disabled={currentStep === 0}
            className={`
              flex items-center gap-2 font-semibold transition-colors font-mono text-sm uppercase tracking-wider
              ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}
            `}
          >
            {isArabic ? <FiChevronRight /> : <FiChevronLeft />}
            {translations.navigation.previous}
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3 rounded-lg font-bold font-mono text-sm uppercase tracking-wider flex items-center gap-2 transition-all hover:bg-primary-600 dark:hover:bg-zinc-200"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {translations.steps.confirm.submitButton}
                  <FiCheckCircle className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={goToNext}
              disabled={!canProceed()}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-lg font-bold font-mono text-sm uppercase tracking-wider transition-all
                ${canProceed()
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-primary-600 dark:hover:bg-zinc-200'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'}
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