import { AboutUsContent } from '@/core/types/web/aboutUs';

export const aboutUsData: AboutUsContent = {
  mission: {
    en:
      "My experience didn't start in slide decks—it was forged under delivery pressure: distributed systems (including microservices), payment stacks, and automated investing platforms (robo-advisory). I've seen how fuzzy requirements sink programmes—and how supervisors expect hardened infrastructure, not promises.",
    ar:
      'لم تبدأ خبرتي من قاعات العروض التقديمية، بل وُلدت من وسط ضغط التسليم، وهندسة الأنظمة الموزّعة (ومنها Microservices)، وبناء منصات الدفع والاستثمار الآلي (Robo-advisors). اختبرت شخصياً كيف يمكن للمتطلبات الضبابية أن تهدم مشروعاً، وكيف تتوقع الجهات الرقابية بنية تحتية صلبة لا مجرد وعود.',
  },
  vision: {
    en:
      'Through Maal Tech I put that field experience to work for you: the blog is my engineering notebook in public, the roadmap is your guide, and my consulting is where we reduce guesswork in your programme—so financial systems do not fall apart after launch week.',
    ar:
      'اليوم، من خلال «مال تك»، أضع هذه الخبرة بين يديك: المدونة هي مذكراتي الهندسية العلنية، وخارطة التعلم هي دليلك، أما عملي الاستشاري فهو مساحتنا المباشرة لتقليل التخمين في مشروعك، وبناء أنظمة مالية لا تنهار بعد أسبوع الإطلاق.',
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
          'سأخبرك بصراحة عندما تكون البنية المقترحة محفوفة بالمخاطر، وعندما يكون تأجيل دين تقني (Technical Debt) مكلفاً جداً في المستقبل. لا أقدّم لك الحل الأسهل، بل المسار الأصلح.',
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
          'أؤمن بالرهانات الموزونة. نبني المنتج الأدنى القابل للتطبيق (MVP) بذكاء، نختبر الفرضيات بنقاط تحقق قابلة للقياس، ونصمّم معمارية مرنة تتطور مع نمو أعمالك، بعيداً عن التعقيد الهندسي غير المبرر.',
      },
    },
    {
      id: '3',
      iconKey: 'partner',
      title: { en: 'In the trench with you', ar: 'شريك في الخندق' },
      description: {
        en:
          'Not a consultant who drops a PDF and vanishes. I join planning, review architecture, and stay in the sharp technical conversations that steer the compass.',
        ar:
          'لست مستشاراً يسلّم تقريراً ويختفي. أشارك فريقك في التخطيط، أراجع المعمارية، وأكون حاضراً في النقاشات الفنية الدقيقة لتوجيه البوصلة التقنية.',
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
          'أولي عناية قصوى للمناطق التي يكثر فيها الفشل: حماية الهوية الرقمية (IAM)، تكامل أنظمة الدفع، أمان البيانات، وبنية أنظمة متوافقة مع توقعات المدققين.',
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
        ar: 'معمارية موزّعة وآمنة',
      },
      description: {
        en:
          'Design grounded in ideas such as Zero Trust and hexagonal boundaries—systems that stay isolable, integrate cleanly with gateways and partners, and remain operable at scale.',
        ar:
          'تصميم يستند إلى مفاهيم مثل Zero Trust والمعمارية السداسية (Hexagonal Architecture)، لتكون منتجاتك آمنة، معزولة حيث يلزم، وقادرة على التكامل مع بوابات الدفع والخدمات الخارجية بكفاءة.',
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
          'مواءمة رؤية المنتج مع ثقافة السوق الخليجي؛ من تجربة المستخدم، إلى التكامل مع الشبكات المحلية (مثل مدى، سريع، وسداد)، حيث تختبئ أدق التفاصيل التشغيلية.',
      },
    },
  ],
};
