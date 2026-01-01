'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface RegistrationFormProps {
  locale: string;
  translations: {
    title: string;
    subtitle: string;
    steps: {
      language: {
        title: string;
        subtitle: string;
        options: { value: string; label: string; icon: string }[];
      };
      availability: {
        title: string;
        subtitle: string;
        hoursLabel: string;
        hoursOptions: { value: string; label: string }[];
        daysLabel: string;
        daysOptions: { value: string; label: string }[];
      };
      contact: {
        title: string;
        subtitle: string;
        emailLabel: string;
        emailPlaceholder: string;
        phoneLabel: string;
        phonePlaceholder: string;
        nameLabel: string;
        namePlaceholder: string;
      };
      payment: {
        title: string;
        subtitle: string;
        options: { value: string; label: string; description: string; icon: string }[];
      };
      confirm: {
        title: string;
        subtitle: string;
        submitButton: string;
        successTitle: string;
        successMessage: string;
        backToHome: string;
      };
    };
    navigation: {
      next: string;
      previous: string;
      step: string;
      of: string;
    };
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

export default function CourseRegistrationForm({ locale, translations }: RegistrationFormProps) {
  const isArabic = locale === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    language: '',
    hoursPerWeek: '',
    preferredDays: [],
    name: '',
    email: '',
    phone: '',
    paymentPreference: '',
  });

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
      case 'language':
        return formData.language !== '';
      case 'availability':
        return formData.hoursPerWeek !== '' && formData.preferredDays.length > 0;
      case 'contact':
        return formData.name !== '' && formData.email !== '' && formData.phone !== '';
      case 'payment':
        return formData.paymentPreference !== '';
      case 'confirm':
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isArabic ? -300 : 300) : isArabic ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? (isArabic ? -300 : 300) : isArabic ? 300 : -300,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const goToNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-5xl text-white mb-8 shadow-lg">
          ✓
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-grey-900 mb-4">
          {translations.steps.confirm.successTitle}
        </h2>
        <p className="text-lg text-grey-600 mb-8 max-w-md mx-auto">
          {translations.steps.confirm.successMessage}
        </p>
        <Link
          href={`/${locale}/web/home`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all"
        >
          {translations.steps.confirm.backToHome}
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-grey-500">
            {translations.navigation.step} {currentStep + 1} {translations.navigation.of} {steps.length}
          </span>
          <span className="text-sm font-medium text-primary-600">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-grey-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex flex-col items-center ${index <= currentStep ? 'text-primary-600' : 'text-grey-400'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  index < currentStep
                    ? 'bg-primary-600 text-white'
                    : index === currentStep
                    ? 'bg-primary-100 text-primary-600 ring-2 ring-primary-600'
                    : 'bg-grey-200 text-grey-500'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            {/* Step 1: Language */}
            {steps[currentStep] === 'language' && (
              <div className="text-center">
                <div className="text-6xl mb-6">🌍</div>
                <h2 className="text-2xl md:text-3xl font-bold text-grey-900 mb-3">
                  {translations.steps.language.title}
                </h2>
                <p className="text-grey-600 mb-8">{translations.steps.language.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {translations.steps.language.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData('language', option.value)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                        formData.language === option.value
                          ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-100'
                          : 'border-grey-200 hover:border-grey-300 bg-white'
                      }`}
                    >
                      <div className="text-4xl mb-3">{option.icon}</div>
                      <div className="font-bold text-grey-900">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Availability */}
            {steps[currentStep] === 'availability' && (
              <div className="text-center">
                <div className="text-6xl mb-6">📅</div>
                <h2 className="text-2xl md:text-3xl font-bold text-grey-900 mb-3">
                  {translations.steps.availability.title}
                </h2>
                <p className="text-grey-600 mb-8">{translations.steps.availability.subtitle}</p>
                
                {/* Hours per week */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-grey-700 mb-3">
                    {translations.steps.availability.hoursLabel}
                  </label>
                  <div className="flex flex-wrap justify-center gap-3">
                    {translations.steps.availability.hoursOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateFormData('hoursPerWeek', option.value)}
                        className={`px-6 py-3 rounded-xl border-2 font-medium transition-all ${
                          formData.hoursPerWeek === option.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-grey-200 hover:border-grey-300 text-grey-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred days */}
                <div>
                  <label className="block text-sm font-semibold text-grey-700 mb-3">
                    {translations.steps.availability.daysLabel}
                  </label>
                  <div className="flex flex-wrap justify-center gap-3">
                    {translations.steps.availability.daysOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => toggleDay(option.value)}
                        className={`px-5 py-3 rounded-xl border-2 font-medium transition-all ${
                          formData.preferredDays.includes(option.value)
                            ? 'border-accent-500 bg-accent-50 text-accent-700'
                            : 'border-grey-200 hover:border-grey-300 text-grey-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {steps[currentStep] === 'contact' && (
              <div className="text-center">
                <div className="text-6xl mb-6">📧</div>
                <h2 className="text-2xl md:text-3xl font-bold text-grey-900 mb-3">
                  {translations.steps.contact.title}
                </h2>
                <p className="text-grey-600 mb-8">{translations.steps.contact.subtitle}</p>
                <div className="space-y-6 max-w-md mx-auto text-start">
                  <div>
                    <label className="block text-sm font-semibold text-grey-700 mb-2">
                      {translations.steps.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder={translations.steps.contact.namePlaceholder}
                      className="w-full px-5 py-4 rounded-xl border-2 border-grey-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-grey-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-grey-700 mb-2">
                      {translations.steps.contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder={translations.steps.contact.emailPlaceholder}
                      className="w-full px-5 py-4 rounded-xl border-2 border-grey-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-grey-900"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-grey-700 mb-2">
                      {translations.steps.contact.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder={translations.steps.contact.phonePlaceholder}
                      className="w-full px-5 py-4 rounded-xl border-2 border-grey-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-grey-900"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {steps[currentStep] === 'payment' && (
              <div className="text-center">
                <div className="text-6xl mb-6">💳</div>
                <h2 className="text-2xl md:text-3xl font-bold text-grey-900 mb-3">
                  {translations.steps.payment.title}
                </h2>
                <p className="text-grey-600 mb-8">{translations.steps.payment.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {translations.steps.payment.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData('paymentPreference', option.value)}
                      className={`p-6 rounded-2xl border-2 text-start transition-all duration-300 hover:scale-[1.02] ${
                        formData.paymentPreference === option.value
                          ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-100'
                          : 'border-grey-200 hover:border-grey-300 bg-white'
                      }`}
                    >
                      <div className="text-3xl mb-3">{option.icon}</div>
                      <div className="font-bold text-grey-900 mb-1">{option.label}</div>
                      <div className="text-sm text-grey-500">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Confirm */}
            {steps[currentStep] === 'confirm' && (
              <div className="text-center">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-2xl md:text-3xl font-bold text-grey-900 mb-3">
                  {translations.steps.confirm.title}
                </h2>
                <p className="text-grey-600 mb-8">{translations.steps.confirm.subtitle}</p>
                
                {/* Summary Card */}
                <div className="bg-grey-50 rounded-2xl p-6 text-start max-w-md mx-auto space-y-4">
                  <div className="flex justify-between">
                    <span className="text-grey-500">Language:</span>
                    <span className="font-semibold text-grey-900">{formData.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey-500">Hours/Week:</span>
                    <span className="font-semibold text-grey-900">{formData.hoursPerWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey-500">Preferred Days:</span>
                    <span className="font-semibold text-grey-900">{formData.preferredDays.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey-500">Name:</span>
                    <span className="font-semibold text-grey-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey-500">Email:</span>
                    <span className="font-semibold text-grey-900" dir="ltr">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey-500">Phone:</span>
                    <span className="font-semibold text-grey-900" dir="ltr">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey-500">Payment:</span>
                    <span className="font-semibold text-grey-900">{formData.paymentPreference}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12">
        <button
          onClick={goToPrevious}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
            currentStep === 0
              ? 'opacity-50 cursor-not-allowed text-grey-400'
              : 'text-grey-700 hover:bg-grey-100'
          }`}
        >
          <svg className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {translations.navigation.previous}
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-200 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              translations.steps.confirm.submitButton
            )}
          </button>
        ) : (
          <button
            onClick={goToNext}
            disabled={!canProceed()}
            className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              canProceed()
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200'
                : 'bg-grey-200 text-grey-400 cursor-not-allowed'
            }`}
          >
            {translations.navigation.next}
            <svg className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
