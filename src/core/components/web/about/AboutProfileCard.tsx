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
    <section id="about-profile" className="scroll-mt-28 relative z-10 py-16 md:py-24 border-b border-zinc-200/50 dark:border-zinc-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Sticky Sidebar Profile */}
          <div className="lg:sticky lg:top-32 lg:col-span-4">
            <AnimatedSection>
              <div className="relative mb-6 inline-block">
                <ProfileAvatar
                  size={160}
                  alt={avatarAlt}
                  fallbackText={authorName}
                  variant="rounded"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                  authorNameFont
                />
                <div className="absolute -bottom-3 -end-3 rounded bg-zinc-900 px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-white dark:bg-white dark:text-zinc-900 shadow-sm">
                  {founderBadge}
                </div>
              </div>

              <h2 className="mb-2 mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
                <AuthorNameText isArabic={isArabic} className="text-[1.06em]">
                  {authorName}
                </AuthorNameText>
              </h2>
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-400">
                {authorTitle}
              </p>
              
              <div className="mb-6 h-px w-12 bg-zinc-200 dark:bg-zinc-800" />
              
              <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-500">
                <FiMail className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  {isArabic ? 'متاح للاستشارة' : 'Available for consulting'}
                </span>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-8 lg:pt-4">
            <AnimatedSection delay={0.1}>
              <h3 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
                {isArabic ? '// النبذة' : '// PROFILE'}
              </h3>
              
              <p className="mb-16 text-xl font-medium leading-[1.7] text-zinc-900 dark:text-zinc-100 md:text-2xl md:leading-[1.7]">
                {authorBio}
              </p>
              
              <div className="relative border-s-2 border-primary-500/30 ps-6 md:ps-8" dir={isArabic ? 'rtl' : 'ltr'}>
                <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
                  {principleHeading}
                </h3>
                <blockquote className="mb-10 text-2xl font-medium leading-snug tracking-tight text-zinc-800 dark:text-zinc-200 md:text-3xl md:leading-[1.3]">
                  &quot;{principleStatement}&quot;
                </blockquote>
                
                <div className="space-y-8">
                  <div>
                    <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                      01 / {isArabic ? 'للشركات' : 'Organisations'}
                    </div>
                    <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl">
                      {audienceCompanies}
                    </p>
                  </div>
                  <div>
                    <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                      02 / {isArabic ? 'للمطورين' : 'Developers'}
                    </div>
                    <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl">
                      {audienceDevelopers}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex items-center gap-4">
                <div className="h-px w-8 bg-zinc-200 dark:bg-zinc-800" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                  {signatureLine}
                </span>
              </div>
            </AnimatedSection>
          </div>
          
        </div>
      </div>
    </section>
  );
}
