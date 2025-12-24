import { Blog, BlogCategory } from '@/core/types/web/blog';

// Blog Categories
export const blogCategories: BlogCategory[] = [
  {
    id: 'blog-cat-1',
    name: { en: 'Industry News', ar: 'أخبار الصناعة' },
    slug: 'industry-news',
    color: '#006747',
    icon: '📰',
  },

  {
    id: 'blog-cat-2',
    name: { en: 'Expert Insights', ar: 'رؤى الخبراء' },
    slug: 'expert-insights',
    color: '#D4AF37',
    icon: '💡',
  },
  {
    id: 'blog-cat-3',
    name: { en: 'Technology Trends', ar: 'اتجاهات التكنولوجيا' },
    slug: 'technology-trends',
    color: '#7C3AED',
    icon: '🚀',
  },
  {
    id: 'blog-cat-4',
    name: { en: 'Regulatory Updates', ar: 'التحديثات التنظيمية' },
    slug: 'regulatory-updates',
    color: '#1E40AF',
    icon: '⚖️',
  },
  {
    id: 'blog-cat-5',
    name: { en: 'Regulatory Updates', ar: 'التحديثات التنظيمية' },
    slug: 'regulatory-updates',
    color: '#1E40AF',
    icon: '⚖️',
  },
  {
    id: 'blog-cat-6',
    name: { en: 'Crypto Fintech', ar: ' کریپتو' },
    slug: 'crypto-fintech',
    color: '#1E40AF',
    icon: '⚖️',
  },
];

// Blogs
export const blogs: Blog[] = [
  {
    id: 'blog-stablecoins-us-dominance',
    slug: 'stablecoins-us-dominance',
    title: {
      en: 'Stablecoins and the New Form of Dollar Dominance',
      ar: 'العملات المستقرة وهيمنة الدولار بصيغة جديدة',
    },
    excerpt: {
      en: 'An overview of how the stablecoin market is largely dominated by US-based issuers and what that means for financial decentralization.',
      ar: 'نظرة على هيمنة الشركات الأمريكية على سوق العملات المستقرة وتأثير ذلك على فكرة اللامركزية المالية.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'The global stablecoin market is largely dominated by a small number of US-based issuers, reflecting a new form of dollar-based financial influence.',
        },
      ],
      ar: [
        {
          type: 'paragraph',
          text: 'اليوم سوق العملات المستقرة Stablecoins يكاد يكون تحت سيطرة شركتين أمريكيتين بشكل شبه كامل، شركة Circle بعملتها USDC وشركة Tether بعملتها USDT.',
        },
        {
          type: 'paragraph',
          text: 'كلا العملتين تعتبر fiat-backed بمعنى أنها مدعومة بأصول نقدية حقيقية بالدولار الأمريكي أو ما يعادله من أدوات مالية قصيرة الأجل.',
        },
        {
          type: 'header',
          level: 3,
          text: 'العملات المستقرة والهيمنة المالية',
        },
        {
          type: 'paragraph',
          text: 'مع أن الهدف من العملات المستقرة هو تقديم وسيلة دفع رقمية محايدة وعابرة للحدود، إلا أن الواقع يشير إلى هيمنة أمريكية واضحة، تشبه إلى حد كبير سيطرتها التاريخية على النظام المالي العالمي القائم على الدولار الورقي.',
        },
        {
          type: 'paragraph',
          text: 'الفرق الوحيد أن الأدوات تغيرت من أوراق نقدية وبنوك مراسلة إلى stablecoins تعمل فوق شبكات البلوكشين.',
        },
        {
          type: 'header',
          level: 3,
          text: 'عملة Tether (USDT)',
        },
        {
          type: 'paragraph',
          text: 'بالنسبة لـ Tether (USDT) تعتبر الأكثر انتشاراً عالمياً خاصة في الأسواق الناشئة ومنصات التداول، وتمتاز بسيولة عالية جداً وسهولة الوصول إليها.',
        },
        {
          type: 'paragraph',
          text: 'من عيوبها أنها تواجه انتقادات مستمرة حول مستوى الشفافية وجودة الاحتياطيات.',
        },
        {
          type: 'header',
          level: 3,
          text: 'عملة Circle (USDC)',
        },
        {
          type: 'paragraph',
          text: 'أما بالنسبة لـ Circle (USDC) فهي أقل انتشاراً من USDT لكنها أكثر انضباطاً من ناحية الامتثال والشفافية.',
        },
        {
          type: 'paragraph',
          text: 'تخضع لرقابة وتشريعات أمريكية صارمة مما يجعلها أقرب إلى النظام المالي التقليدي، وتستهدف المؤسسات والأسواق التي تبحث عن عملة مستقرة موثوقة ومنظمة.',
        },
        {
          type: 'header',
          level: 3,
          text: 'وجهة نظر',
        },
        {
          type: 'paragraph',
          text: 'من وجهة نظري، رغم أن قطاع العملات الرقمية نشأ على فكرة اللامركزية والتحرر من سيطرة الدول، إلا أن جزءاً كبيراً من بنيته اليوم يعتمد على عملات مستقرة تتحكم بها مؤسسات أمريكية.',
        },
        {
          type: 'paragraph',
          text: 'هذا يعيد إنتاج نفس النفوذ المالي الذي مارسه الدولار لعقود طويلة ولكن بصيغة جديدة وبسرعة وانتشار أكبر.',
        },
      ],
    },
    featuredImage: '/images/blogs/stablecoins-us-dominance.jpg',
    category: blogCategories.find(c => c.slug === 'crypto-fintech'),
    tags: ['fintech', 'stablecoins', 'usdt', 'usdc', 'crypto', 'blockchain', 'stablecoins', 'usdt', 'usdc', 'crypto', 'blockchain'],
    author: {
      id: 'author-mohammed-gamal',
      name: {
        en: 'Mohammed Gamal',
        ar: 'محمد جمال',
      },
    },
    publishedAt: '2024-11-21T10:00:00Z',
    readTime: 5,
  }
  ,
  {
    id: 'blog-2',
    slug: 'cybersecurity-fintech',
    title: {
      en: 'Cybersecurity in FinTech: Best Practices for 2024',
      ar: 'الأمن السيبراني في التقنية المالية: أفضل الممارسات لعام 2024',
    },
    excerpt: {
      en: 'Essential cybersecurity measures every FinTech company should implement to protect customer data and maintain trust.',
      ar: 'تدابير الأمن السيبراني الأساسية التي يجب على كل شركة تقنية مالية تنفيذها لحماية بيانات العملاء والحفاظ على الثقة.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'As FinTech continues to grow, cybersecurity becomes increasingly critical. This guide covers essential security practices including encryption, multi-factor authentication, and incident response planning.',
        },
      ],
      ar: [
        {
          type: 'paragraph',
          text: 'مع استمرار نمو التقنية المالية، يصبح الأمن السيبراني أكثر أهمية. يغطي هذا الدليل ممارسات الأمان الأساسية بما في ذلك التشفير والمصادقة متعددة العوامل وتخطيط الاستجابة للحوادث.',
        },
      ],
    },
    featuredImage: '/images/blogs/cybersecurity.jpg',
    category: blogCategories[2],
    tags: ['cybersecurity', 'security', 'data-protection'],
    author: {
      id: 'author-2',
      name: { en: 'Sara Al-Mansour', ar: 'سارة المنصور' },
      bio: {
        en: 'Cybersecurity specialist focusing on securing financial infrastructures and protecting consumer data.',
        ar: 'أخصائية أمن سيبراني تركز على تأمين البنية التحتية المالية وحماية بيانات المستهلك.',
      },
      role: {
        en: 'Security Analyst',
        ar: 'محلل أمني',
      },
      avatar: '/images/authors/sara.jpg',
    },
    publishedAt: '2024-11-21T14:30:00Z',
    readTime: 6,
    relatedPosts: ['blog-1', 'blog-cma-omnibus-structure'],
  },
  {
    id: 'blog-cma-omnibus-structure',
    slug: 'cma-omnibus-payment-gateway-structure',
    title: {
      en: 'Regulatory Note on Payment Gateway and Omnibus Accounts',
      ar: 'ملاحظة تنظيمية حول بوابات الدفع وحسابات العملاء (Omnibus)',
    },
    excerpt: {
      en: 'A regulatory clarification on structuring payment gateways and client funds under CMA regulations.',
      ar: 'توضيح تنظيمي حول الهيكلة الصحيحة لبوابات الدفع وأموال العملاء وفق أنظمة هيئة السوق المالية.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'This article highlights a regulatory consideration related to payment gateway integration and client fund handling under capital market regulations.',
        },
      ],
      ar: [
        {
          type: 'header',
          level: 2,
          text: 'ملاحظة تنظيمية مهمة في بناء منتجات الفنتك',
        },
        {
          type: 'paragraph',
          text: 'هذه ملاحظة مهمة جداً للمهتمين ببناء منتجات فنتك، وخصوصاً من يعملون تحت أنظمة هيئة السوق المالية (CMA).',
        },
        {
          type: 'header',
          level: 3,
          text: 'الخطأ الشائع في ربط بوابات الدفع',
        },
        {
          type: 'paragraph',
          text: 'شركات كثيرة تروح تربط حساب بوابة الدفع مباشرة بحساب العملاء أو ما يسمى بحساب الـ Omnibus، وهذا خطأ تنظيمي واضح.',
        },
        {
          type: 'header',
          level: 3,
          text: 'سبب المخالفة التنظيمية',
        },
        {
          type: 'paragraph',
          text: 'السبب أن أي عمولة تخصمها بوابة الدفع تعتبر مصروف تشغيلي يخص الشركة. بينما أنظمة هيئة السوق تشترط أن أموال العملاء تبقى أموال عملاء فقط ولا يخصم منها أي مصاريف أو عمولات تشغيلية.',
        },
        {
          type: 'paragraph',
          text: 'الربط المباشر يعني خلط أموال العملاء مع مصاريف الشركة، ويخل بمتطلبات الفصل بين الحسابات والـ safeguarding، وقد يؤدي إلى مشاكل تنظيمية خطيرة.',
        },
        {
          type: 'header',
          level: 3,
          text: 'الهيكلة الصحيحة والمتوافقة تنظيمياً',
        },
        {
          type: 'paragraph',
          text: 'الهيكلة الصحيحة أن تستقبل بوابة الدفع الأموال في حساب عمليات الشركة أولاً، حيث تخصم العمولة وتسجل كمصروف تشغيل، ثم يُحول صافي المبلغ إلى حساب العملاء.',
        },
        {
          type: 'paragraph',
          text: 'هذا الفصل ضروري للحفاظ على الامتثال وضمان عدم اختلاط أموال العملاء مع أموال الشركة.',
        },
      ],
    },
    featuredImage: '/images/blogs/cma-omnibus-structure.jpg',
    category: blogCategories[2],
    tags: [
      'fintech',
      'cma',
      'omnibus-account',
      'payment-gateway',
      'regulatory-compliance',
    ],
    author: {
      id: 'author-mohammed-gamal',
      name: {
        en: 'Mohammed Gamal',
        ar: 'محمد جمال',
      },
      bio: {
        en: 'Compliance officer and regulatory expert with deep knowledge of CMA and SAMA regulations.',
        ar: 'ضابط الامتثال وخبير تنظيمي ذو معرفة عميقة بلوائح هيئة السوق المالية وساما.',
      },
      role: {
        en: 'Compliance Head',
        ar: 'رئيس الامتثال',
      },
    },
    publishedAt: '2024-11-20T10:00:00Z',
    readTime: 4,
    relatedPosts: ['blog-4', 'blog-2'],
  },
  {
    id: 'blog-4',
    slug: 'sama-licensing-guide',
    title: {
      en: 'SAMA Licensing: A Step-by-Step Guide for FinTech Startups',
      ar: 'ترخيص ساما: دليل خطوة بخطوة للشركات الناشئة في التقنية المالية',
    },
    excerpt: {
      en: 'A comprehensive guide to navigating the SAMA licensing process for new FinTech companies in Saudi Arabia.',
      ar: 'دليل شامل للتنقل في عملية ترخيص ساما لشركات التقنية المالية الجديدة في المملكة العربية السعودية.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'Starting a FinTech company in Saudi Arabia requires obtaining the appropriate licenses from SAMA. This guide walks you through the entire process, from initial application to final approval.',
        },
      ],
      ar: [
        {
          type: 'paragraph',
          text: 'يتطلب بدء شركة تقنية مالية في المملكة العربية السعودية الحصول على التراخيص المناسبة من ساما. يرشدك هذا الدليل خلال العملية بأكملها، من التطبيق الأولي إلى الموافقة النهائية.',
        },
      ],
    },
    featuredImage: '/images/blogs/sama-licensing.jpg',
    category: blogCategories[3],
    tags: ['sama', 'licensing', 'regulations', 'compliance'],
    author: {
      id: 'author-1',
      name: { en: 'Dr. Ahmed Al-Faisal', ar: 'د. أحمد الفيصل' },
      bio: {
        en: 'FinTech expert with over 15 years of experience in digital transformation and banking innovation.',
        ar: 'خبير في التقنية المالية يتمتع بأكثر من 15 عاماً من الخبرة في التحول الرقمي والابتكار المصرفي.',
      },
      role: {
        en: 'Senior FinTech Consultant',
        ar: 'كبير مستشاري التقنية المالية',
      },
      avatar: '/images/authors/ahmed.jpg',
    },
    publishedAt: '2024-11-17T11:00:00Z',
    readTime: 8,
    relatedPosts: ['blog-cma-omnibus-structure', 'blog-1'],
  },
  {
    id: 'blog-5',
    slug: 'mobile-payments-growth',
    title: {
      en: 'Mobile Payments Surge: Analyzing Saudi Consumer Behavior',
      ar: 'ارتفاع المدفوعات عبر الهاتف المحمول: تحليل سلوك المستهلك السعودي',
    },
    excerpt: {
      en: 'Recent statistics and trends showing the dramatic shift toward mobile payment methods among Saudi consumers.',
      ar: 'الإحصائيات والاتجاهات الأخيرة التي تظهر التحول الدراماتيكي نحو طرق الدفع عبر الهاتف المحمول بين المستهلكين السعوديين.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'Mobile payment adoption in Saudi Arabia has accelerated dramatically, with over 75% of consumers now using mobile wallets for everyday transactions. This shift represents a fundamental change in consumer behavior.',
        },
      ],
      ar: [
        {
          type: 'paragraph',
          text: 'تسارع اعتماد الدفع عبر الهاتف المحمول في المملكة العربية السعودية بشكل كبير، حيث يستخدم أكثر من 75٪ من المستهلكين الآن المحافظ الرقمية للمعاملات اليومية. يمثل هذا التحول تغييراً أساسياً في سلوك المستهلك.',
        },
      ],
    },
    featuredImage: '/images/blogs/mobile-payments.jpg',
    category: blogCategories[0],
    tags: ['mobile-payments', 'consumer-behavior', 'trends'],
    author: {
      id: 'author-2',
      name: { en: 'Sara Al-Mansour', ar: 'سارة المنصور' },
      bio: {
        en: 'Cybersecurity specialist focusing on securing financial infrastructures and protecting consumer data.',
        ar: 'أخصائية أمن سيبراني تركز على تأمين البنية التحتية المالية وحماية بيانات المستهلك.',
      },
      role: {
        en: 'Security Analyst',
        ar: 'محلل أمني',
      },
      avatar: '/images/authors/sara.jpg',
    },
    publishedAt: '2024-11-15T15:45:00Z',
    readTime: 5,
    relatedPosts: ['blog-6', 'blog-1'],
  },
  {
    id: 'blog-6',
    slug: 'green-finance-initiatives',
    title: {
      en: 'Green Finance: Saudi Arabia\'s Sustainable FinTech Future',
      ar: 'التمويل الأخضر: مستقبل التقنية المالية المستدامة في السعودية',
    },
    excerpt: {
      en: 'How green finance and sustainable investing are becoming integral to Saudi Arabia\'s FinTech ecosystem.',
      ar: 'كيف يصبح التمويل الأخضر والاستثمار المستدام جزءاً لا يتجزأ من النظام البيئي للتقنية المالية في السعودية.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'Green finance initiatives are gaining momentum in Saudi Arabia, aligning with Vision 2030\'s sustainability goals. FinTech companies are playing a crucial role in democratizing access to sustainable investment opportunities.',
        },
      ],
      ar: [
        {
          type: 'paragraph',
          text: 'تكتسب مبادرات التمويل الأخضر زخماً في المملكة العربية السعودية، بما يتماشى مع أهداف الاستدامة لرؤية 2030. تلعب شركات التقنية المالية دوراً حاسماً في إضفاء الطابع الديمقراطي على إمكانية الوصول إلى فرص الاستثمار المستدام.',
        },
      ],
    },
    featuredImage: '/images/blogs/green-finance.jpg',
    category: blogCategories[1],
    tags: ['green-finance', 'sustainability', 'esg', 'vision-2030'],
    author: {
      id: 'author-1',
      name: { en: 'Dr. Ahmed Al-Faisal', ar: 'د. أحمد الفيصل' },
      bio: {
        en: 'FinTech expert with over 15 years of experience in digital transformation and banking innovation.',
        ar: 'خبير في التقنية المالية يتمتع بأكثر من 15 عاماً من الخبرة في التحول الرقمي والابتكار المصرفي.',
      },
      role: {
        en: 'Senior FinTech Consultant',
        ar: 'كبير مستشاري التقنية المالية',
      },
      avatar: '/images/authors/ahmed.jpg',
    },
    publishedAt: '2024-11-13T12:30:00Z',
    readTime: 6,
    relatedPosts: ['blog-5', 'blog-4'],
  },
  {
    id: 'blog-open-banking-payment-initiation',
    slug: 'open-banking-vs-payment-gateways',
    title: {
      en: 'Payment Gateways vs Open Banking: The Battle of Fees and UX',
      ar: 'بوابات الدفع vs المصرفية المفتوحة: معركة الرسوم وتجربة العميل',
    },
    excerpt: {
      en: 'Why Payment Initiation under Open Banking is set to revolutionize fintech transaction costs and user experience in Saudi Arabia.',
      ar: 'لماذا ستغير خدمة بدء الدفع في المصرفية المفتوحة قواعد اللعبة في تكاليف العمليات وتجربة العميل لتطبيقات الفنتك في السعودية.',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'عمولات بوابات الدفع صارت عبء كبير على أي بزنس… خصوصا التطبيقات المالية. اليوم كثير من بوابات الدفع تأخذ نسبة مئوية من كل عملية + مبلغ ثابت + اشتراك شهري!',
        },
        {
          type: 'header',
          level: 3,
          text: 'مثال واقعي',
        },
        {
          type: 'paragraph',
          text: 'عشان أوضح بصورة بسيطة، لو عندك تطبيق فنتك والعميل يودع 10,000 ريال عبر بوابة دفع تأخذ 1% + مبلغ ثابت (مثلاً 1 ريال):',
        },
        {
          type: 'quote',
          text: 'الصافي اللي يوصل لمحفظتك: 10000 – (10000 × 0.01) – 1 = 9899 ريال. يعني خسرت 101 ريال من عملية واحدة بس.',
        },
        {
          type: 'paragraph',
          text: 'فرق ضخم. قارن هذا بتحويل بنكي عادي، أحيانا العمولة 50 هللة فقط. لكن المشكلة مع التحويل البنكي التقليدي أو الـ Virtual IBAN إنه يُعامل كأنه تحويل لشخص آخر.',
        },
        {
          type: 'paragraph',
          text: 'يعني لازم المستخدم يطلع من تطبيقك… يروح لتطبيق بنكه… يدخل رقم الآيبان… ويرسل المبلغ. تجربة ثقيلة وغير سلسة وتسبب Drop عالي.',
        },
        {
          type: 'header',
          level: 3,
          text: 'دور المصرفية المفتوحة (Open Banking)',
        },
        {
          type: 'paragraph',
          text: 'وهنا بيجي دور Open Banking. اليوم في السعودية ال Open Banking لسا في مرحلة Aggregation فقط (قراءة بيانات الحساب).',
        },
        {
          type: 'paragraph',
          text: 'وساما (البنك المركزي السعودي) حاليا شغال على المرحلة اللي بعدها وهي ال Payment Initiation واللي بتسمح لتطبيقك يطلب من بنك العميل تنفيذ التحويل مباشرة من داخل تطبيقك بدون ما يطلع برا.',
        },
        {
          type: 'header',
          level: 3,
          text: 'هذا بيغير اللعبة بالكامل',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'بدون بوابات دفع',
            'بدون رسوم ضخمة',
            'بدون خروج من التطبيق',
            'وبتجربة تحويل سريعة وآمنة',
          ],
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'Payment gateway commissions have become a major burden for any business… especially financial applications. Today, many payment gateways charge a percentage of every transaction + a fixed fee + a monthly subscription!',
        },
        {
          type: 'header',
          level: 3,
          text: 'A Real-World Example',
        },
        {
          type: 'paragraph',
          text: 'To explain simply: If you have a fintech app and a customer deposits 10,000 SAR via a payment gateway taking 1% + a fixed amount (e.g., 1 SAR):',
        },
        {
          type: 'quote',
          text: 'The net amount reaching your wallet: 10,000 – (10,000 × 0.01) – 1 = 9,899 SAR. Meaning you lost 101 SAR from just one transaction.',
        },
        {
          type: 'paragraph',
          text: 'A huge difference. Compare this to a normal bank transfer; sometimes the fee is only 0.50 SAR. But the problem with traditional bank transfers or Virtual IBANs is that they are treated as transfers to another person.',
        },
        {
          type: 'paragraph',
          text: 'This means the user must leave your app… go to their bank app… enter the IBAN… and send the amount. A heavy and clunky experience that causes high drop-off rates.',
        },
        {
          type: 'header',
          level: 3,
          text: 'The Role of Open Banking',
        },
        {
          type: 'paragraph',
          text: 'This is where Open Banking comes in. Today in Saudi Arabia, Open Banking is still in the Aggregation phase (reading account data) only.',
        },
        {
          type: 'paragraph',
          text: 'SAMA (Saudi Central Bank) is currently working on the next phase, which is Payment Initiation. This will allow your app to request the customer’s bank to execute the transfer directly from within your app without them having to leave.',
        },
        {
          type: 'header',
          level: 3,
          text: 'This Changes the Game Completely',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'No payment gateways',
            'No massive fees',
            'No leaving the application',
            'A fast and secure transfer experience',
          ],
        },
      ],
    },
    featuredImage: '/images/blogs/open-banking-payment.png',
    category: blogCategories[3], // Regulatory Updates
    tags: ['fintech', 'open-banking', 'payment-gateway', 'sama', 'payment-initiation'],
    author: {
      id: 'author-mohammed-gamal',
      name: {
        en: 'Mohammed Gamal',
        ar: 'محمد جمال',
      },
    },
    publishedAt: '2024-12-24T09:00:00Z',
    readTime: 3,
    relatedPosts: ['blog-cma-omnibus-structure', 'blog-5'],
  },
];
