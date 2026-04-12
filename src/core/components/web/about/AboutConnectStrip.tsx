import Link from 'next/link';
import { AnimatedSection } from '@/core/components/web/home/HomeAnimations';
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiLinkedin, FiMail } from 'react-icons/fi';

const LINKEDIN_URL = 'https://www.linkedin.com/in/mohfintech/';

type Props = {
  locale: string;
  isArabic: boolean;
  title: string;
  linkedInLabel: string;
  contactLabel: string;
  blogLabel: string;
};

export function AboutConnectStrip({
  locale,
  isArabic,
  
  title,
  linkedInLabel,
  contactLabel,
  blogLabel,
}: Props) {
  const Arrow = isArabic ? FiArrowLeft : FiArrowRight;
  const cards = [
    {
      href: LINKEDIN_URL,
      external: true,
      label: linkedInLabel,
      Icon: FiLinkedin,
    },
    {
      href: `/${locale}/contact`,
      external: false,
      label: contactLabel,
      Icon: FiMail,
    },
    {
      href: `/${locale}/blog`,
      external: false,
      label: blogLabel,
      Icon: FiBookOpen,
    },
  ] as const;

  return (
    <section
      className="border-t border-zinc-200/50 bg-white py-16 dark:border-zinc-800/50 dark:bg-zinc-950 md:py-24"
      aria-label={title}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 md:mb-16">
          <div className="mx-auto max-w-3xl" dir={isArabic ? 'rtl' : 'ltr'}>
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
        </AnimatedSection>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-12">
          {cards.map(({ href, external, label, Icon }) => (
            <AnimatedSection key={href} delay={0.06}>
              <Link
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center justify-between border-b border-zinc-200 py-6 transition-colors hover:border-primary-500/50 dark:border-zinc-800 dark:hover:border-primary-400/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-primary-50 group-hover:text-primary-600 dark:bg-zinc-800/50 dark:text-zinc-400 dark:group-hover:bg-primary-900/20 dark:group-hover:text-primary-400">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <span className="font-mono text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">{label}</span>
                </div>
                <Arrow className="h-5 w-5 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-1 rtl:rotate-180 group-hover:rtl:-translate-x-1 dark:text-zinc-600" />
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
