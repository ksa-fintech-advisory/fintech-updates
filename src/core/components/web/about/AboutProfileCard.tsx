import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { ProfileAvatar } from '@/core/components/web/layout/ProfileAvatar';

type Props = {
  authorName: string;
  authorTitle: string;
  authorBio: string;
  avatarAlt: string;
  founderBadge: string;
  signatureLine: string;
};

export function AboutProfileCard({
  authorName,
  authorTitle,
  authorBio,
  avatarAlt,
  founderBadge,
  signatureLine,
}: Props) {
  return (
    <section className="relative z-10 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="group relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 md:p-12">
            <div className="absolute end-0 top-0 h-1 w-32 bg-primary-500" />

            <div className="flex flex-col items-start gap-10 md:flex-row md:gap-12">
              <div className="relative shrink-0 mx-auto md:mx-0">
                <ProfileAvatar
                  size={176}
                  alt={avatarAlt}
                  fallbackText={authorName}
                  variant="rounded"
                  className="shadow-md"
                />
                <div className="absolute -bottom-3 -end-3 rounded-lg border border-zinc-200 bg-white px-3 py-1 text-xs font-mono font-bold text-zinc-500 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
                  {founderBadge}
                </div>
              </div>

              <div className="min-w-0 flex-1 text-center md:text-start">
                <h2 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                  {authorName}
                </h2>
                <p className="mb-6 text-sm font-mono font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                  {'//'} {authorTitle}
                </p>

                <div className="prose prose-zinc max-w-none dark:prose-invert">
                  <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{authorBio}</p>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                  <div className="hidden h-px flex-1 bg-zinc-200 md:block dark:bg-zinc-800" />
                  <span className="w-full text-center text-xs font-mono uppercase tracking-widest text-zinc-400 md:w-auto md:text-start">
                    {signatureLine}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
