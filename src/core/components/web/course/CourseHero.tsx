'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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

  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white py-24 md:py-32 overflow-hidden min-h-[85vh] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[20%] w-96 h-96 bg-accent-500 rounded-full blur-[120px] opacity-20"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-[10%] w-80 h-80 bg-primary-400 rounded-full blur-[100px] opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent-500/10 to-transparent rounded-full"
        />

        {/* Floating Icons */}
        {['💳', '🏦', '📈', '₿', '⚖️', '🌐'].map((icon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              delay: index * 0.5,
            }}
            className="absolute text-4xl md:text-5xl"
            style={{
              top: `${15 + (index * 13) % 70}%`,
              left: `${5 + (index * 17) % 90}%`,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 text-accent-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              {translations.hero.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent drop-shadow-lg">
              {translations.title}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl mb-4 text-white/90 font-light tracking-wide"
          >
            {translations.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg mb-10 text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            {translations.description}
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: '📚', text: translations.hero.phases },
              { icon: '⏱️', text: translations.hero.duration },
              { icon: '🌍', text: translations.hero.language },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90"
              >
                <span>{feature.icon}</span>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              href={`/${locale}/web/courses/fintech-fundamentals/register`}
              className="group px-8 py-4 rounded-xl font-semibold bg-accent hover:bg-accent-600 text-white shadow-lg shadow-accent/30 transition-all duration-300 transform hover:scale-105 hover:shadow-glow-accent"
            >
              <span className="flex items-center gap-2">
                {translations.cta.enroll}
                <svg
                  className={`w-5 h-5 transition-transform ${isArabic ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <a
              href="#phases"
              className="group px-8 py-4 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                {translations.cta.learnMore}
                <svg
                  className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating Progress Button - More Accessible */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className={`fixed top-1/2 -translate-y-1/2 z-50 ${isArabic ? 'left-0' : 'right-0'}`}
      >
        <Link
          href={`/${locale}/web/courses/fintech-fundamentals/dashboard`}
          className={`group flex items-center gap-3 bg-white text-grey-800 px-4 py-3 shadow-xl hover:shadow-2xl border border-grey-200 transition-all duration-300 hover:bg-grey-50 ${isArabic ? 'rounded-r-xl' : 'rounded-l-xl'
            }`}
          aria-label={isArabic ? 'عرض لوحة التقدم' : 'View Progress Dashboard'}
        >
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 group-hover:bg-primary-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
            <span className="block text-sm font-bold text-grey-900">{isArabic ? 'تقدمي' : 'My Progress'}</span>
            <span className="block text-xs text-grey-500">{isArabic ? 'عرض اللوحة' : 'View Dashboard'}</span>
          </div>
        </Link>
      </motion.div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24 fill-grey-50">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}

