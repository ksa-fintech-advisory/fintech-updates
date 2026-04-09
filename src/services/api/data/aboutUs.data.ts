import { AboutUsContent } from '@/core/types/web/aboutUs';

export const aboutUsData: AboutUsContent = {
  mission: {
    en: 'Sharing field-tested FinTech engineering insights.',
    ar: 'مشاركة الخلاصات الميدانية لهندسة الفنتك.',
  },
  vision: {
    en: 'Field notes, roadmaps, and architecture consulting.',
    ar: 'ملاحظات ميدانية، خرائط تعلم، واستشارات هندسية.',
  },
  description: {
    en: 'Field notes on regulated FinTech. Simplicity in complexity; no buzzwords.',
    ar: 'ملاحظات ميدانية عن الفنتك الخاضع للرقابة. البساطة داخل التعقيد؛ بلا مفردات تسويقية.',
  },
  values: [
    {
      id: '1',
      iconKey: 'depth',
      title: { en: 'Architecture & Compliance', ar: 'المعمارية والامتثال' },
      description: {
        en: 'Scalable infrastructure designed to meet regulatory expectations from day one.',
        ar: 'بنية تحتية قابلة للتوسع ومصممة لتلبية متطلبات الجهات التنظيمية من اليوم الأول.',
      },
    },
    {
      id: '2',
      iconKey: 'lean',
      title: { en: 'MVP & Prototyping', ar: 'بناء الـ MVP' },
      description: {
        en: 'Turning ideas into functioning products with lean running costs.',
        ar: 'تحويل الفكرة إلى منتج أولي يثبت المفهوم بتكاليف تشغيل منخفضة.',
      },
    },
    {
      id: '3',
      iconKey: 'partner',
      title: { en: 'Technical Review', ar: 'المراجعة التقنية' },
      description: {
        en: 'Engineering reviews to unblock issues and ensure execution quality.',
        ar: 'مراجعات هندسية لحل العقد البرمجية وضمان جودة التنفيذ.',
      },
    },
  ],
  expertise: [
    {
      id: '1',
      iconKey: 'sandbox',
      title: {
        en: 'Regulatory Language',
        ar: 'لغة المشرّع',
      },
      description: {
        en: 'Translating Central Bank and CMA expectations into technical features.',
        ar: 'ترجمة متطلبات البنك المركزي وهيئة السوق المالية إلى ميزات برمجية.',
      },
    },
    {
      id: '2',
      iconKey: 'systems',
      title: {
        en: 'Secure Architecture',
        ar: 'بنية آمنة',
      },
      description: {
        en: 'Zero Trust design and clean integration with external partners.',
        ar: 'تصميم يعتمد على مبدأ (Zero Trust) لتكامل آمن مع الشركاء.',
      },
    },
    {
      id: '3',
      iconKey: 'local',
      title: {
        en: 'Local Context',
        ar: 'السياق المحلي',
      },
      description: {
        en: 'Aligning products with Gulf market behavior and domestic rails.',
        ar: 'مواءمة المنتجات مع ثقافة السوق الخليجي وشبكات الدفع المحلية.',
      },
    },
  ],
};
