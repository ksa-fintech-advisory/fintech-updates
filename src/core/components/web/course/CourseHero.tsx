'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft, FiClock, FiGlobe, FiLayers, FiTerminal, FiHash, FiCode } from 'react-icons/fi';

interface CourseHeroProps {
  locale: string;
  translations: {
    title: string;
    subtitle: string;
    description: string;
    hero: {
      badge: string;
      phases: string;
      duration: string;
      language: string;
    };
    cta: {
      enroll: string;
      learnMore: string;
      contact: string;
    };
  };
}

export default function CourseHero({ locale, translations }: CourseHeroProps) {
  const isArabic = locale === 'ar';

  const features = [
    { icon: <FiLayers className="w-4 h-4" />, label: 'MODULES', value: translations.hero.phases, code: 'mod_count' },
    { icon: <FiClock className="w-4 h-4" />, label: 'DURATION', value: translations.hero.duration, code: 'est_time' },
    { icon: <FiGlobe className="w-4 h-4" />, label: 'LOCALE', value: translations.hero.language, code: 'lang_iso' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <section className="relative bg-zinc-50 dark:bg-black pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden min-h-[85vh] flex items-center border-b border-zinc-200 dark:border-zinc-800">

      {/* 1. Global Engineering Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* 2. Abstract Data Stream Animation (SVG Background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Vertical Data Lines */}
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${15 + i * 15}%`}
              y1="-10%"
              x2={`${15 + i * 15}%`}
              y2="110%"
              stroke="url(#grid-fade)"
              strokeWidth="1"
              className="text-primary-500"
              strokeDasharray="10 10"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: [0, -1000] }}
              transition={{ duration: 20 + i * 2, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Badge: Terminal Style */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest">
                {isArabic ? '// التسجيل_مفتوح' : '// OPEN_ENROLLMENT'}
              </span>
            </div>
          </motion.div>

          {/* Title: Sharp & Metallic */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-none text-zinc-900 dark:text-white"
          >
            {translations.title}
          </motion.h1>

          {/* Subtitle: Technical Context */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 text-zinc-600 dark:text-zinc-300 font-light max-w-3xl mx-auto border-l-4 border-primary-500 pl-6"
          >
            {translations.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg mb-12 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            {translations.description}
          </motion.p>

          {/* CTAs: Command Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20"
          >
            <Link
              href={`/${locale}/web/courses/fintech-fundamentals/register`}
              className="group relative w-full sm:w-auto px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-sm rounded transition-all duration-300 hover:bg-primary-600 dark:hover:bg-zinc-200 flex items-center justify-center gap-3 shadow-lg"
            >
              <FiHash className="w-4 h-4" />
              <span>{translations.cta.enroll}</span>
              {isArabic ? (
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              ) : (
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              )}
            </Link>

            <a
              href="#phases"
              className="group w-full sm:w-auto px-8 py-4 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-mono font-bold text-sm uppercase tracking-wider hover:border-zinc-900 dark:hover:border-white hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-black transition-all duration-300 flex items-center justify-center gap-3"
            >
              <FiTerminal className="w-4 h-4" />
              <span>{translations.cta.learnMore}</span>
            </a>
          </motion.div>

          {/* Technical Specs Row: The "JSON Object" Look */}
          <motion.div
            variants={itemVariants}
            className="inline-flex flex-wrap justify-center gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 px-6 py-4 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors min-w-[200px] text-left rtl:text-right"
              >
                <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-400 group-hover:text-primary-600 transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono font-bold">
                      {feature.label}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-300 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-900 px-1 rounded">
                      {feature.code}
                    </span>
                  </div>
                  <div className="text-zinc-900 dark:text-white font-bold text-sm md:text-base tracking-tight">
                    {feature.value}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}