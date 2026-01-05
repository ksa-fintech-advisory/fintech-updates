import { HomeContent } from '@/core/types/web/home';

export const homeData: HomeContent = {
  hero: {
    title: {
      en: 'Your Gateway to Middle Eastern FinTech',
      ar: 'بوابتك لعالم التقنية المالية',
    },
    subtitle: {
      en: 'Insights, Innovations & Trends Across the Arab World',
      ar: 'رؤى وابتكارات واتجاهات من العالم العربي',
    },
    description: {
      en: 'Comprehensive coverage of FinTech innovations, regulatory updates, and industry trends across the Arab world - from Saudi Arabia and the UAE to Egypt and beyond.',
      ar: 'تغطية شاملة لابتكارات التقنية المالية والتحديثات التنظيمية واتجاهات الصناعة في العالم العربي - من السعودية والإمارات إلى مصر وما بعدها.',
    },
    ctaButtons: [
      {
        label: { en: 'Explore Articles', ar: 'استكشف المقالات' },
        href: '/blog',
        variant: 'primary',
      },
      {
        label: { en: 'About Us', ar: 'من نحن' },
        href: '#about',
        variant: 'secondary',
      },
    ],
    backgroundImage: '/images/hero-bg.jpg',
  },
  featuredArticles: [], // Will be populated from articles.data.ts
  latestUpdates: [
    {
      id: 'update-1',
      title: {
        en: 'SAMA Announces New Digital Banking Guidelines',
        ar: 'ساما تعلن عن مبادئ توجيهية جديدة للخدمات المصرفية الرقمية',
      },
      description: {
        en: 'The Saudi Central Bank introduces comprehensive guidelines for digital banking operations, enhancing consumer protection and innovation.',
        ar: 'يقدم البنك المركزي السعودي مبادئ توجيهية شاملة لعمليات الخدمات المصرفية الرقمية، لتعزيز حماية المستهلك والابتكار.',
      },
      date: '2024-11-24T10:00:00Z',
      category: 'regulations',
      icon: '⚖️',
      link: '/article/sama-digital-banking-guidelines',
    },
    {
      id: 'update-2',
      title: {
        en: 'Mada Processes Record 2.5 Billion Transactions',
        ar: 'مدى تعالج رقماً قياسياً بلغ 2.5 مليار معاملة',
      },
      description: {
        en: 'Saudi payment network Mada achieves milestone, processing over 2.5 billion transactions with a total value exceeding SAR 550 billion.',
        ar: 'تحقق شبكة الدفع السعودية مدى معلماً هاماً، حيث عالجت أكثر من 2.5 مليار معاملة بقيمة إجمالية تتجاوز 550 مليار ريال سعودي.',
      },
      date: '2024-11-23T14:30:00Z',
      category: 'payments',
      icon: '💳',
      link: '/article/mada-record-transactions',
    },
    {
      id: 'update-3',
      title: {
        en: 'Saudi FinTech Funding Reaches $500M in 2024',
        ar: 'تمويل التقنية المالية السعودية يصل إلى 500 مليون دولار في 2024',
      },
      description: {
        en: 'Venture capital investment in Saudi FinTech startups hits record high, signaling strong investor confidence in the ecosystem.',
        ar: 'الاستثمار في رأس المال الاستثماري في الشركات الناشئة السعودية للتقنية المالية يصل إلى مستوى قياسي، مما يشير إلى ثقة قوية من المستثمرين في النظام البيئي.',
      },
      date: '2024-11-22T09:15:00Z',
      category: 'funding',
      icon: '💰',
      link: '/article/fintech-funding-2024',
    },
    {
      id: 'update-4',
      title: {
        en: 'Blockchain Pilot for Government Services Launched',
        ar: 'إطلاق مشروع تجريبي للبلوكشين للخدمات الحكومية',
      },
      description: {
        en: 'Saudi government initiates blockchain pilot program for document verification and land registry services.',
        ar: 'الحكومة السعودية تبدأ برنامج تجريبي للبلوكشين للتحقق من المستندات وخدمات سجل الأراضي.',
      },
      date: '2024-11-21T11:45:00Z',
      category: 'blockchain',
      icon: '🔗',
      link: '/article/blockchain-government-pilot',
    },
  ],
  statistics: [
    {
      id: 'stat-1',
      label: { en: 'Active FinTech Companies', ar: 'شركات التقنية المالية النشطة' },
      value: '180+',
      icon: '🏢',
      description: {
        en: 'Licensed FinTech companies operating in Saudi Arabia',
        ar: 'شركات التقنية المالية المرخصة العاملة في المملكة',
      },
    },
    {
      id: 'stat-2',
      label: { en: 'Digital Payment Transactions', ar: 'معاملات الدفع الرقمية' },
      value: '2.5B+',
      icon: '💳',
      description: {
        en: 'Annual transactions processed through Mada network',
        ar: 'المعاملات السنوية المعالجة عبر شبكة مدى',
      },
    },
    {
      id: 'stat-3',
      label: { en: 'FinTech Investment', ar: 'الاستثمار في التقنية المالية' },
      value: '$500M+',
      icon: '📈',
      description: {
        en: 'Total venture capital funding in 2024',
        ar: 'إجمالي تمويل رأس المال الاستثماري في 2024',
      },
    },
    {
      id: 'stat-4',
      label: { en: 'Digital Wallet Users', ar: 'مستخدمو المحفظة الرقمية' },
      value: '75%',
      icon: '📱',
      description: {
        en: 'Of Saudi consumers using mobile payment solutions',
        ar: 'من المستهلكين السعوديين يستخدمون حلول الدفع عبر الهاتف',
      },
    },
  ],
};
