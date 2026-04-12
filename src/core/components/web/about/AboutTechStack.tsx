'use client';

import { motion } from 'framer-motion';
import { UserCheck, Wallet, Database, CreditCard } from 'lucide-react';

type Props = {
  isArabic: boolean;
  heading: string;
  sub: string;
};

const MODULES = [
  {
    id: 'wallet',
    title: { en: 'Digital Wallet & Virtual IBAN', ar: 'Digital Wallets (Virtual IBAN)' },
    desc: { 
      en: 'Secure ledger architecture for individual and corporate fund management, tightly integrated with local banking infrastructure.', 
      ar: 'بنية سجل آمنة لإدارة أموال الأفراد والشركات، متكاملة تماماً مع البنية التحتية المصرفية المحلية.' 
    },
    icon: Wallet,
  },
  {
    id: 'pooled',
    title: { en: 'Pooled Account Management', ar: 'Pooled Account (Omnibus)' },
    desc: { 
      en: 'Real-time reconciliation, ledger segregation, and transparent fund management to satisfy strict regulatory compliance.', 
      ar: 'تسوية لحظية، فصل السجلات، وإدارة شفافة للأموال لضمان الامتثال الصارم للمتطلبات الرقابية.' 
    },
    icon: Database,
  },
  {
    id: 'onboarding',
    title: { en: 'Automated Onboarding', ar: 'تسجيل آلي للعملاء' },
    desc: { 
      en: 'Identity verification, e-KYC/KYB workflows, and AML screening embedded seamlessly into the customer acquisition journey.', 
      ar: 'التحقق من الهوية، إجراءات اعرف عميلك، وفحص مكافحة غسيل الأموال مدمجة بسلاسة في رحلة اكتساب العملاء.' 
    },
    icon: UserCheck,
  },
  {
    id: 'psp',
    title: { en: 'PSP Integration', ar: 'الربط مع بوابات الدفع' },
    desc: { 
      en: 'Multi-rail payment routing, secure gateway integrations, and robust settlement engines for high-volume transactions.', 
      ar: 'توجيه المدفوعات المتعددة، والربط الآمن مع بوابات الدفع، ومحركات التسوية القوية للتعامل مع العمليات العالية.' 
    },
    icon: CreditCard,
  },
];

export function AboutTechStack({ isArabic,  heading, sub }: Props) {
  return (
    <section
      id="about-tech"
      className="relative scroll-mt-28 overflow-hidden border-b border-white/10 bg-zinc-900 py-20 md:py-28"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`text-3xl font-bold tracking-tight text-white md:text-4xl ${isArabic ? 'font-arabic' : ''}`}>
            {heading}
          </h2>
          <p className={`mt-4 text-sm text-zinc-500 md:text-base ${isArabic ? 'font-arabic' : ''}`}>{sub}</p>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Animated Background Connectors (Hidden on mobile) */}
          <div className="absolute inset-0 z-0 hidden md:block">
             {/* Horizontal connector */}
             <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
             {/* Vertical connector */}
             <div className="absolute left-1/2 top-[10%] bottom-[10%] w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />
             
             {/* Central Hub Core */}
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-zinc-950 border-2 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] z-10" />
                <motion.div 
                   className="absolute h-16 w-16 rounded-full border border-emerald-500/30"
                   animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                   className="absolute h-24 w-24 rounded-full border border-emerald-500/10"
                   animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                   transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                />
             </div>
          </div>

          {/* Modules Grid */}
          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-20 md:gap-y-16 lg:gap-x-24">
            {MODULES.map((mod, i) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative flex flex-col rounded-3xl border border-white/5 bg-zinc-950/80 p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all hover:border-emerald-500/40 hover:bg-zinc-950 hover:shadow-[0_0_60px_rgba(16,185,129,0.15)]"
              >
                {/* Hover Top Glow */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-emerald-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }} />
                
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-emerald-500/10 group-hover:ring-emerald-500/50">
                  <mod.icon className="h-6 w-6 text-zinc-400 transition-colors duration-500 group-hover:text-emerald-400" />
                </div>
                
                <h3 className={`mb-3 text-lg font-bold text-zinc-100 transition-colors group-hover:text-white ${isArabic ? 'font-arabic' : ' tracking-tight'}`}>
                  {isArabic ? mod.title.ar : mod.title.en}
                </h3>
                
                <p className={`text-sm leading-relaxed text-zinc-400 transition-colors group-hover:text-zinc-300 ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? mod.desc.ar : mod.desc.en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
