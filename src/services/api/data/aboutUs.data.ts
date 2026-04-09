import { AboutUsContent } from '@/core/types/web/aboutUs';

export const aboutUsData: AboutUsContent = {
  mission: {
    en:
      'Maal Tech is where I share what I have tested in FinTech engineering: content for developers, and consulting for teams building financial products—so what ships lasts, technically and regulatorily.',
    ar:
      'مال تك مساحة أشارك فيها ما اختبرته ميدانياً في هندسة الفنتك: محتوى للمطورين، واستشارات لفرق تبني منتجات مالية — ليبقى ما يُطلق متيناً تقنياً وتنظيمياً.',
  },
  vision: {
    en:
      'Knowledge: blog field notes. Guidance: stepped roadmap. Enablement: MVP and architecture consulting as a partnership.',
    ar:
      'المعرفة: ملاحظات ميدانية في المدونة. التوجيه: خارطة تعلم متدرّجة. التمكين: استشارات للـ MVP والمعمارية كشراكة عمل.',
  },
  description: {
    en:
      'Field notes on regulated FinTech—architecture trade-offs, compliance, and what still stands when auditors ask. Simplicity in complexity; no buzzwords.',
    ar:
      'ملاحظات ميدانية عن الفنتك الخاضع للرقابة: مفاضلات معمارية، امتثال، وما يصمد عند سؤال المشرّع. بساطة داخل التعقيد؛ بلا مفردات تسويقية.',
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
          'مواءمة رؤية المنتج مع ثقافة السوق الخليجي؛ من تجربة المستخدم إلى التكامل مع الشبكات المحلية مثل مدى وسداد وتدفقات تحويل مشابهة لسريع — حيث تفاصيل التشغيل تحدد جودة المنتج.',
      },
    },
  ],
};
