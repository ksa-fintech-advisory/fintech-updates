'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-grey-50 to-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/30 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-accent-100/20 rounded-full blur-3xl -z-10" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Floating 404 Icon */}
        <div className="mb-10 inline-block animate-slide-down">
          <div className="relative">
            <div className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-saudi leading-none select-none opacity-20 blur-sm absolute top-4 left-4">
              404
            </div>
            <div className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-saudi leading-none select-none relative z-10 drop-shadow-2xl">
              404
            </div>
          </div>
        </div>

        {/* Text Content with Staggered Animation */}
        <div className="space-y-6 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-grey-900 tracking-tight">
            Page Not Found
            <span className="block text-2xl md:text-3xl text-primary-600 mt-2 font-arabic">الصفحة غير موجودة</span>
          </h2>
          
          <p className="text-lg text-grey-600 max-w-md mx-auto leading-relaxed">
            The digital path you are following seems to have disconnected. Let&apos;s get you back on track.
            <span className="block mt-1 text-sm text-grey-400 font-arabic">
              يبدو أن المسار الرقمي الذي تتبعه قد انقطع. دعنا نعيدك إلى المسار الصحيح.
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-4">
            <Link
              href="/en/web/home"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-primary-600 rounded-full hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
                Return Home
              </span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-primary-700/50"></div>
            </Link>

            <Link
              href="/ar/web/home"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-primary-700 transition-all duration-200 bg-primary-50 rounded-full border border-primary-100 hover:bg-white hover:border-primary-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-arabic"
            >
              <span className="relative z-10 flex items-center gap-2">
                العودة للرئيسية
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Pattern */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-grey-200 to-transparent" />
    </div>
  );
}
