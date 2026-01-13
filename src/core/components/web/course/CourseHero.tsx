'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiArrowLeft, FiClock, FiGlobe, FiLayers, FiTerminal } from 'react-icons/fi';

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
    { icon: <FiLayers className="w-5 h-5" />, label: 'Modules', value: translations.hero.phases },
    { icon: <FiClock className="w-5 h-5" />, label: 'Duration', value: translations.hero.duration },
    { icon: <FiGlobe className="w-5 h-5" />, label: 'Locale', value: translations.hero.language },
  ];

  // Fix 2: Explicitly type the variants to satisfy TypeScript
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <section className="relative bg-white dark:bg-zinc-950 pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden min-h-[80vh] flex items-center border-b border-zinc-100 dark:border-zinc-800/50 transition-colors duration-300">

      {/* Fix 1: Use style prop for complex data URIs to avoid JSX quoting syntax errors */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Subtle top gradient glow */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary-50/50 via-transparent to-transparent dark:from-primary-900/10 dark:via-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-zinc-900/80 border border-primary-100 dark:border-zinc-700 text-xs font-medium text-primary-800 dark:text-primary-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
              </span>
              <span className="tracking-wide uppercase">{translations.hero.badge}</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight text-zinc-900 dark:text-white"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-800 to-primary-700 dark:from-white dark:via-zinc-200 dark:to-primary-400">
              {translations.title}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-6 text-zinc-600 dark:text-zinc-300 font-light max-w-3xl mx-auto"
          >
            {translations.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg mb-10 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            {translations.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              href={`/${locale}/web/courses/fintech-fundamentals/register`}
              className="group relative w-full sm:w-auto px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md shadow-primary-500/20"
            >
              <span>{translations.cta.enroll}</span>
              {isArabic ? (
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              ) : (
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              )}
            </Link>

            <a
              href="#phases"
              className="group w-full sm:w-auto px-8 py-3.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-primary-500 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 bg-transparent transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <FiTerminal className="w-5 h-5 text-zinc-400 group-hover:text-primary-500 transition-colors" />
              <span>{translations.cta.learnMore}</span>
            </a>
          </motion.div>

          {/* Technical Specs Row */}
          <motion.div
            variants={itemVariants}
            className="inline-flex flex-wrap justify-center gap-x-12 gap-y-6 py-5 px-8 bg-white/80 dark:bg-zinc-900/80 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm backdrop-blur-md"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-left rtl:text-right">
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                  {feature.icon}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold hidden md:block mb-0.5">
                    {feature.label}
                  </div>
                  <div className="text-zinc-900 dark:text-white font-bold text-base">
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