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
];

// Blogs
export const blogs: Blog[] = [
  {
    id: 'blog-1',
    slug: 'open-banking-saudi-arabia',
    title: {
      en: 'Open Banking: The Next Frontier for Saudi FinTech',
      ar: 'الخدمات المصرفية المفتوحة: الحدود التالية للتقنية المالية السعودية',
    },
    excerpt: {
      en: 'Exploring how open banking APIs are creating new opportunities for innovation in the Saudi financial sector.',
      ar: 'استكشاف كيفية إنشاء واجهات برمجة التطبيقات المصرفية المفتوحة فرصاً جديدة للابتكار في القطاع المالي السعودي.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'Open banking is set to revolutionize the Saudi financial landscape by enabling secure data sharing between banks and third-party providers through standardized APIs.',
        },
        {
          type: 'header',
          level: 2,
          text: 'What is Open Banking?',
        },
        {
          type: 'paragraph',
          text: 'Open banking allows customers to share their financial data securely with third-party providers, enabling new services and products.',
        },
        {
          type: 'quote',
          text: 'Open banking is not just a regulatory requirement; it is a catalyst for financial inclusion and innovation.',
          author: 'SAMA Governor',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Enhanced customer experience',
            'Increased competition',
            'New innovative products',
          ],
        },
      ],
      ar: [
        {
          type: 'paragraph',
          text: 'من المقرر أن تحدث الخدمات المصرفية المفتوحة ثورة في المشهد المالي السعودي من خلال تمكين مشاركة البيانات الآمنة بين البنوك ومقدمي الطرف الثالث من خلال واجهات برمجة التطبيقات الموحدة.',
        },
        {
          type: 'header',
          level: 2,
          text: 'ما هي المصرفية المفتوحة؟',
        },
        {
          type: 'paragraph',
          text: 'تتيح المصرفية المفتوحة للعملاء مشاركة بياناتهم المالية بشكل آمن مع مقدمي خدمات من أطراف ثالثة، مما يتيح خدمات ومنتجات جديدة.',
        },
        {
          type: 'quote',
          text: 'المصرفية المفتوحة ليست مجرد متطلب تنظيمي، بل هي حافز للشمول المالي والابتكار.',
          author: 'محافظ البنك المركزي السعودي',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'تحسين تجربة العميل',
            'زيادة المنافسة',
            'منتجات مبتكرة جديدة',
          ],
        },
      ],
    },
    featuredImage: '/images/blogs/open-banking.jpg',
    category: blogCategories[1],
    tags: ['open-banking', 'apis', 'innovation'],
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
    publishedAt: '2024-11-22T10:00:00Z',
    readTime: 5,
    relatedPosts: ['blog-2', 'blog-4'],
  },
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
];
