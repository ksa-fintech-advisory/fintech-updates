'use client';

import { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  isArabic: boolean;
  heading: string;
  companiesCaption: string;
  quote: string;
};

const COMPANIES = [
  { 
    name: 'Ikea', 
    role: 'Senior Micro Frontends',
    href: 'https://www.ikea.com/',
    logo: '/logos/ikea.svg',
    desc: 'Customer bank portal architecture'
  },
  { 
    name: 'Tide', 
    role: 'Fintech Engineering',
    href: 'https://www.tide.co/',
    logo: '/logos/tide.svg',
    desc: 'Business banking platform'
  },
  { 
    name: 'Seqa Group', 
    role: 'Senior Full Stack',
    href: 'https://www.seqagroup.com.sa/',
    logo: '/logos/seqa-lo.png',
    desc: 'E-commerce & payment gateways'
  },
  { 
    name: 'Siolla', 
    role: 'Backend Team Lead',
    href: 'https://www.siolla.com/',
    logo: '/logos/siolla.jpeg',
    desc: 'Financial technology infrastructure'
  },
  { 
    name: 'Awqef Capital', 
    role: 'Tech Lead',
    href: 'https://awqef.sa/',
    logo: '/logos/awqef.svg',
    desc: 'Digital endowment platform'
  },
];

function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const move = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
  }, []);

  const leave = useCallback(() => setGlow((g) => ({ ...g, active: false })), []);

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(420px circle at ${glow.x}px ${glow.y}px, rgba(52,211,153,0.12), transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export function AboutExperienceBento({
  isArabic,
  
  heading,
  companiesCaption,
  quote,
}: Props) {
  return (
    <section
      id="about-experience"
      className="scroll-mt-28 border-b border-white/10 bg-zinc-900 py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .continuous-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}} />
      
      {/* Decorative grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 flex max-w-6xl flex-col items-start gap-4 md:mb-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className={`text-3xl font-bold tracking-tight text-white md:text-4xl ${isArabic ? 'font-arabic' : ''}`}>
              {heading}
            </h2>
          </div>
          
          
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:gap-8">
          <SpotlightCard className="p-6 md:p-8">
            <div className="relative w-full overflow-hidden">
              {/* Fade masks for smooth edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-zinc-900 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-zinc-900 to-transparent" />

              <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView="auto"
                loop
                autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
                speed={4000}
                className="w-full continuous-swiper"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {COMPANIES.map((company, i) => (
                  <SwiperSlide key={`${company.name}-${i}`} style={{ width: 'auto' }}>
                    <div className="group relative flex w-[280px] shrink-0 flex-col justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.04] md:w-[320px]">
                      <div className="flex h-12 w-full items-center justify-start opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                        {company.logo ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img 
                            src={company.logo} 
                            alt={`${company.name} logo`} 
                            className={`max-h-full max-w-[120px] object-contain transition-all duration-300 ${
                              company.name === 'Awqef Capital' || company.name === 'Tide' ? 'brightness-0 invert' : ''
                            }`}
                          />
                        ) : (
                          <span className="font-mono text-xl font-bold text-zinc-400 group-hover:text-emerald-400">
                            {company.name}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-mono text-base font-semibold text-zinc-300 transition-colors group-hover:text-white">
                          {company.href ? (
                            <a href={company.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {company.name}
                            </a>
                          ) : (
                            company.name
                          )}
                        </h3>
                        <p className="mb-2 text-xs text-zinc-500">{company.role}</p>
                        {company.desc && (
                          <p className="line-clamp-2 text-xs text-zinc-400">{company.desc}</p>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </SpotlightCard>

          <SpotlightCard className="min-h-[120px] p-6 md:p-8">
            <p className={`text-lg font-medium leading-relaxed text-zinc-200 md:text-xl ${isArabic ? 'font-arabic' : ''}`}>
              {quote}
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

