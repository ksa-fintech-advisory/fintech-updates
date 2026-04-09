import { AboutUsContent } from '@/core/types/web/aboutUs';

export const aboutUsData: AboutUsContent = {
  mission: {
    en:
      'A platform focused on simplifying and engineering financial technology: we combine learning content for developers with advisory solutions for companies—so financial systems are built to last and stay aligned with regulation.',
    ar:
      'منصة شخصية أهدف من خلالها إلى تبسيط هندسة التقنية المالية؛ عبر تقديم محتوى تعليمي للمطورين، وحلول استشارية للشركات، لضمان بناء أنظمة متينة ومطابقة للتشريعات.',
  },
  vision: {
    en:
      'Knowledge: real engineering field notes. Guidance: stepped learning paths (roadmap). Enablement: technical consulting for MVP build and architecture design.',
    ar:
      'المعرفة: تجارب هندسية واقعية (في المدونة). التوجيه: مسارات تعلم متدرجة (خارطة طريق). التمكين: استشارات تقنية لبناء الـ MVP وتصميم المعمارية.',
  },
  description: {
    en:
      'journal.txt — field notes on regulated FinTech, architecture trade-offs, and what actually holds up in review.',
    ar:
      'journal.txt —توثيق لتجارب بناء الأنظمة المالية؛ نناقش هنا المفاضلات الهندسية، معايير الامتثال، وكيفية تحويل الأنظمة المعقدة إلى منتجات قابلة للتوسع.',
  },
  values: [
    {
      id: '1',
      iconKey: 'depth',
      title: { en: 'Architecture & compliance', ar: 'المعمارية والامتثال' },
      description: {
        en:
          'System architecture shaped to your business and what regulators expect. The focus is scalable infrastructure and meeting compliance expectations from day one.',
        ar:
          'تصميم معمارية الأنظمة بما يتناسب مع طبيعة نشاطك ومتطلبات الجهات التنظيمية. نركز على بناء بنية تحتية تقبل التوسع وتلبي معايير الامتثال من اليوم الأول.',
      },
    },
    {
      id: '2',
      iconKey: 'lean',
      title: { en: 'MVP build & prototyping', ar: 'بناء الـ MVP والنمذجة' },
      description: {
        en:
          'Turn your idea into an MVP you can show investors—balancing a sharp core idea with lean running costs and a faster path to launch.',
        ar:
          'تحويل فكرتك إلى منتج أولي (MVP) جاهز لإثبات الفكرة قبل البدء الفعلي بالتطوير. موازنة دقيقة بين الحفاظ على جوهر الفكرة وتقليل تكاليف التشغيل والسرعة في الإطلاق.',
      },
    },
    {
      id: '3',
      iconKey: 'partner',
      title: { en: 'Review & technical support', ar: 'المراجعة والدعم التقني' },
      description: {
        en:
          'Full engineering review of your current stack—code and architecture. I act as an extra pair of hands for your team: unblocking hard technical issues and keeping execution quality high.',
        ar:
          'مراجعة هندسية شاملة لمعمارية مشروعك الحالي (Code & Architecture Review). أعمل كذراع داعم لفريقك التقني لحل العقد البرمجية وضمان جودة التنفيذ.',
      },
    },
    // {
    //   id: '4',
    //   iconKey: 'depth',
    //   title: { en: 'Depth on sensitive surfaces', ar: 'التركيز على المناطق الحساسة' },
    //   description: {
    //     en:
    //       'Extra rigour where failures cluster: digital identity (IAM), payment integration, data protection, and designs that auditors and risk teams can actually inspect.',
    //     ar:
    //       'عناية إضافية حيث يتكدّس الخطر: الهوية الرقمية (IAM)، تكامل المدفوعات، أمان البيانات، وتصميم يتحمّل تدقيق المخاطر.',
    //   },
    // },
  ],
  expertise: [
    {
      id: '1',
      iconKey: 'sandbox',
      title: {
        en: 'Sandbox, licensing, and supervisory language',
        ar: 'البيئة التجريبية والترخيص ولغة المشرّع',
      },
      description: {
        en:
          'I can help your team translate regulatory expectations (for example Saudi Central Bank and CMA) into concrete product features and technical evidence from day one.',
        ar:
          'أساعد فريقك على ترجمة توقعات الجهات الرقابية (مثل البنك المركزي السعودي وهيئة السوق المالية) إلى ميزات برمجية وأدلة تقنية ملموسة منذ اليوم الأول.',
      },
    },
    {
      id: '2',
      iconKey: 'systems',
      title: {
        en: 'Distributed, security-minded architecture',
        ar: 'بنية تحتية مرنة وآمنة',
      },
      description: {
        en:
          'Design grounded in ideas such as Zero Trust and hexagonal boundaries—systems that stay isolable, integrate cleanly with gateways and partners, and remain operable at scale.',
        ar:
          'تصميم يعتمد على Zero Trust وعزل النواة عن الخدمات الخارجية: أمان في الطبقات الحساسة، وتكامل مع الشركاء دون تعقيد زائد.',
      },
    },
    {
      id: '3',
      iconKey: 'local',
      title: {
        en: 'Financial products in local context',
        ar: 'المنتج المالي في السياق المحلي',
      },
      description: {
        en:
          'Aligning product intent with Gulf market behaviour—from UX expectations to integration with domestic rails such as Mada, SARIE-style flows, and Sadad, where operational detail matters.',
        ar:
          'مواءمة رؤية المنتج مع ثقافة السوق الخليجي؛ من تجربة المستخدم، إلى التكامل مع الشبكات المحلية ',
      },
    },
  ],
};
