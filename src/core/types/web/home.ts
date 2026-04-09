import { Article } from './article';

export interface HomeContent {
  hero: HeroSection;
  featuredArticles: Article[];
  latestUpdates: LatestUpdate[];
  statistics: Statistic[];
}

export interface HeroSection {
  title: {
    en: string;
    ar: string;
  };
  /** Arabic hero title split: only `emphasis` is bold; rest stays regular weight. */
  titleArParts?: {
    before: string;
    emphasis: string;
    after: string;
  };
  subtitle: {
    en: string;
    ar: string;
  };
  /** First segment of subtitle (author name) styled distinctly in the hero. */
  subtitleLeadHighlight?: {
    en: { name: string; tail: string };
    ar: { name: string; tail: string };
  };

  ctaButtons: CTAButton[];
  backgroundImage?: string;
}

export interface CTAButton {
  label: {
    en: string;
    ar: string;
  };
  href: string;
  variant: 'primary' | 'secondary';
}

export interface LatestUpdate {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  date: string;
  category: string;
  icon?: string;
  link?: string;
}

export interface Statistic {
  id: string;
  label: {
    en: string;
    ar: string;
  };
  value: string;
  icon?: string;
  description?: {
    en: string;
    ar: string;
  };
}
