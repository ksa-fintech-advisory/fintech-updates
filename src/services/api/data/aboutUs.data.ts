import { AboutUsContent } from '@/core/types/web/aboutUs';

export const aboutUsData: AboutUsContent = {
  mission: {
    en:
      "My experience didn't start in slide decks—it was forged under delivery pressure: distributed systems (including microservices), payment stacks, and automated investing platforms (robo-advisory). I've seen how fuzzy requirements sink programmes—and how supervisors expect hardened infrastructure, not promises.",
    ar:
      'خبرة ميدانية تحت ضغط التسليم: أنظمة موزعة، مدفوعات، ومنصّات استثمار آلي. المتطلبات الضبابية تُخرّب البرامج؛ والمشرّع يتوقع بنية تحتية تتحمّل المراجعة لا وعوداً على ورق.',
  },
  vision: {
    en:
      'Through Maal Tech I put that field experience to work for you: the blog is my engineering notebook in public, the roadmap is your guide, and my consulting is where we reduce guesswork in your programme—so financial systems do not fall apart after launch week.',
    ar:
      '«مال تك» يضع هذه الخبرة في خدمتك: مدونة كسجلّ هندسي، خارطة تعلم كدليل للبداية، واستشارات تقلّل التخمين — لنظام مالي لا ينهار بعد أسبوع الإطلاق.',
  },
  description: {
    en:
      'journal.txt — field notes on regulated FinTech, architecture trade-offs, and what actually holds up in review.',
    ar:
      'journal.txt — مذكرات ميدانية عن التقنية المالية الخاضعة للتنظيم، ومفاضلات المعمارية، وما يصمد فعلياً عند المراجعة.',
  },
  values: [
    {
      id: '1',
      iconKey: 'candor',
      title: { en: 'Radical candor', ar: 'الوضوح الجذري' },
      description: {
        en:
          'I will be direct when proposed architecture is fragile, or when deferring technical debt will cost far more later. I sell you the sound path—not the easy story.',
        ar:
          'تقييم صريح عندما تكون البنية ضعيفة أو عندما يكون تأجيل الدين التقني كلفة لاحقة. المسار الأصلح، لا الأسهل في العرض.',
      },
    },
    {
      id: '2',
      iconKey: 'lean',
      title: { en: 'Engineering without excess', ar: 'هندسة بلا تعقيد زائد' },
      description: {
        en:
          'Measured bets: an MVP built with intent, hypotheses tested at clear checkpoints, and an architecture that can grow—without unjustified complexity.',
        ar:
          'MVP بوعي، فرضيات تُختبر عند محطات واضحة، ومعمارية تنمو مع النمو — بلا تعقيد غير مبرر.',
      },
    },
    {
      id: '3',
      iconKey: 'partner',
      title: { en: 'With you in delivery', ar: 'معك في التنفيذ' },
      description: {
        en:
          'Not a "PDF and goodbye" handoff. I step into planning, architecture review, and steering technical conversations only when the programme actually needs that depth.',
        ar:
          'ليس نموذج «تقرير ثم انصراف». عند الحاجة فقط: مشاركة في التخطيط، ومراجعة المعمارية، والنقاش الفني الذي يوجّه القرار.',
      },
    },
    {
      id: '4',
      iconKey: 'depth',
      title: { en: 'Depth on sensitive surfaces', ar: 'التركيز على المناطق الحساسة' },
      description: {
        en:
          'Extra rigour where failures cluster: digital identity (IAM), payment integration, data protection, and designs that auditors and risk teams can actually inspect.',
        ar:
          'عناية إضافية حيث يتكدّس الخطر: الهوية الرقمية (IAM)، تكامل المدفوعات، أمان البيانات، وتصميم يتحمّل تدقيق المخاطر.',
      },
    },
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
