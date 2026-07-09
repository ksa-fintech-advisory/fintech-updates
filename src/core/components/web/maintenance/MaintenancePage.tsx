import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { FiArrowLeft, FiArrowRight, FiShield } from 'react-icons/fi';

type Props = {
  locale: string;
};

export default async function MaintenancePage({ locale }: Props) {
  const isArabic = locale === 'ar';
  const t = await getTranslations({ locale, namespace: 'web.maintenance' });
  const ArrowIcon = isArabic ? FiArrowLeft : FiArrowRight;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/60 to-zinc-950" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[280px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t('badge')}
        </p>

        <h1
          lang={isArabic ? 'ar' : undefined}
          className={`mb-6 text-3xl font-bold tracking-tight text-[#f0f0f0] sm:text-4xl md:text-5xl ${
            isArabic ? 'font-normal leading-[1.35]' : 'leading-[1.15]'
          }`}
        >
          {t('title')}
        </h1>

        <p
          lang={isArabic ? 'ar' : undefined}
          className={`mx-auto mb-10 max-w-lg whitespace-pre-line font-light text-zinc-400 ${
            isArabic ? 'text-lg leading-[1.85]' : 'text-base leading-relaxed sm:text-lg'
          }`}
        >
          {t('description')}
        </p>

        <Link
          href={`/${locale}/products/compliance-checker`}
          className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-7 text-sm font-bold text-white transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500 hover:text-zinc-950"
        >
          <FiShield className="h-4 w-4 shrink-0" aria-hidden />
          <span>{t('complianceCta')}</span>
          <ArrowIcon
            className={`h-4 w-4 shrink-0 transition-transform ${
              isArabic ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
            }`}
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
