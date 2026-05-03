import React from 'react';
import Link from 'next/link';

interface BlogAuthorCardProps {
  locale: string;
}

export function BlogAuthorCard({ locale }: BlogAuthorCardProps) {
  const isArabic = locale === 'ar';

  return (
    <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-zinc-800/40 p-5 sm:p-6">
      <div className="shrink-0">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-lg font-bold text-zinc-950">
          {isArabic ? 'م' : 'M'}
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/70 mb-1">
          {isArabic ? 'الكاتب' : 'Author'}
        </p>
        <p className="text-base font-bold text-zinc-100">
          {isArabic ? 'محمد عبده' : 'Mohammed Abdo'}
        </p>
        <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
          {isArabic
            ? 'مهندس برمجيات متخصص في التقنية المالية. أكتب عن الهندسة، الامتثال، وبناء المنتجات.'
            : 'Software engineer specializing in FinTech. I write about engineering, compliance, and building products.'}
        </p>
        <Link
          href={`/${locale}/about`}
          className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          {isArabic ? 'المزيد عني ←' : 'More about me →'}
        </Link>
      </div>
    </div>
  );
}
