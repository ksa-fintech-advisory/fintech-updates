import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { AuthorNameText } from '@/core/components/web/layout/AuthorNameText';
import { ProfileAvatar } from '@/core/components/web/layout/ProfileAvatar';
import { FiMail } from 'react-icons/fi';

type Props = {
  authorName: string;
  authorTitle: string;
  authorBio: string;
  principleHeading: string;
  principleStatement: string;
  audienceCompanies: string;
  audienceDevelopers: string;
  avatarAlt: string;
  founderBadge: string;
  signatureLine: string;
  isArabic: boolean;
};

export function AboutProfileCard({
  authorName,
  authorTitle,
  authorBio,
  principleHeading,
  principleStatement,
  audienceCompanies,
  audienceDevelopers,
  avatarAlt,
  founderBadge,
  signatureLine,
  isArabic,
}: Props) {
  return (
    <section className="relative z-10 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="apple-card group relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-apple transition-shadow duration-500 hover:shadow-apple-hover dark:border-zinc-800 dark:bg-zinc-900">
            <div className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-primary-500/[0.07] blur-3xl dark:bg-primary-400/[0.08]" />
            <div className="pointer-events-none absolute -bottom-32 -start-20 h-64 w-64 rounded-full bg-primary-600/[0.05] blur-3xl dark:bg-primary-500/[0.06]" />
            {/* Top accent bar — full-width gradient instead of small corner stripe */}
            <div className="relative h-1 w-full bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600" />

            <div className="relative p-6 sm:p-8 md:p-12 lg:p-14">
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
                {/* Avatar area */}
                <div className="relative shrink-0">
                  <div className="relative">
                    <ProfileAvatar
                      size={176}
                      alt={avatarAlt}
                      fallbackText={authorName}
                      variant="rounded"
                      className="shadow-md ring-4 ring-zinc-100 dark:ring-zinc-800"
                      authorNameFont
                    />
                    {/* Availability dot */}
                    <div className="absolute bottom-2 end-2 h-4 w-4 rounded-full border-2 border-white bg-primary-500 dark:border-zinc-900" />
                  </div>
                  <div className="mt-3 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                      {founderBadge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 text-center md:text-start">
                  <h2 className="mb-1.5 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                    <AuthorNameText isArabic={isArabic} className="text-[1.06em] md:text-[1.05em]">
                      {authorName}
                    </AuthorNameText>
                  </h2>
                  <p className="mb-4 text-sm font-medium text-primary-600 dark:text-primary-400">
                    {authorTitle}
                  </p>

                  {/* Quick info pills */}
                  <div className="mb-6 flex flex-wrap justify-center gap-2 md:justify-start">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      <FiMail className="h-3 w-3" />
                      {isArabic ? 'متاح للاستشارة' : 'Available for consulting'}
                    </span>
                  </div>

                  <p className="text-pretty text-base leading-[1.7] text-zinc-600 dark:text-zinc-400 md:text-lg md:leading-relaxed">
                    {authorBio}
                  </p>

                  <div
                    className="mt-8 rounded-2xl border border-zinc-200/90 bg-gradient-to-br from-zinc-50/95 to-white p-6 text-start shadow-sm dark:border-zinc-700/80 dark:from-zinc-950/80 dark:to-zinc-900/40 md:p-8"
                    dir={isArabic ? 'rtl' : 'ltr'}
                  >
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                      {principleHeading}
                    </h3>
                    <blockquote className="mb-6 border-s-2 border-primary-500/50 ps-4 text-lg font-medium leading-snug text-zinc-800 dark:border-primary-400/40 dark:text-zinc-100 md:text-xl md:leading-snug">
                      {principleStatement}
                    </blockquote>
                    <ul className="space-y-3.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      <li className="border-s-2 border-primary-500/35 ps-4">{audienceCompanies}</li>
                      <li className="border-s-2 border-primary-500/35 ps-4">{audienceDevelopers}</li>
                    </ul>
                  </div>

                  <div className="mt-8 flex items-center gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                    <div className="hidden h-px flex-1 bg-zinc-200 md:block dark:bg-zinc-800" />
                    <span className="w-full text-center text-xs font-medium italic tracking-wide text-zinc-500 dark:text-zinc-500 md:w-auto md:text-start">
                      {signatureLine}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
