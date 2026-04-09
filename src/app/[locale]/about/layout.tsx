import { Libre_Baskerville } from 'next/font/google';

const portfolioSerif = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-portfolio-serif',
  display: 'swap',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <div className={portfolioSerif.variable}>{children}</div>;
}
