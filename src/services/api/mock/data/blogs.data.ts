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
      en: 'Open banking is set to revolutionize the Saudi financial landscape by enabling secure data sharing between banks and third-party providers through standardized APIs...',
      ar: 'من المقرر أن تحدث الخدمات المصرفية المفتوحة ثورة في المشهد المالي السعودي من خلال تمكين مشاركة البيانات الآمنة بين البنوك ومقدمي الطرف الثالث من خلال واجهات برمجة التطبيقات الموحدة...',
    },
    featuredImage: '/images/blogs/open-banking.jpg',
    category: blogCategories[1],
    tags: ['open-banking', 'apis', 'innovation'],
    author: {
      id: 'author-1',
      name: { en: 'Dr. Ahmed Al-Faisal', ar: 'د. أحمد الفيصل' },
      avatar: '/images/authors/ahmed.jpg',
    },
    publishedAt: '2024-11-22T10:00:00Z',
    readTime: 5,
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
      en: 'As FinTech continues to grow, cybersecurity becomes increasingly critical. This guide covers essential security practices including encryption, multi-factor authentication, and incident response planning...',
      ar: 'مع استمرار نمو التقنية المالية، يصبح الأمن السيبراني أكثر أهمية. يغطي هذا الدليل ممارسات الأمان الأساسية بما في ذلك التشفير والمصادقة متعددة العوامل وتخطيط الاستجابة للحوادث...',
    },
    featuredImage: '/images/blogs/cybersecurity.jpg',
    category: blogCategories[2],
    tags: ['cybersecurity', 'security', 'data-protection'],
    author: {
      id: 'author-2',
      name: { en: 'Sara Al-Mansour', ar: 'سارة المنصور' },
      avatar: '/images/authors/sara.jpg',
    },
    publishedAt: '2024-11-21T14:30:00Z',
    readTime: 6,
  },
  {
    id: 'blog-3',
    slug: 'ai-fraud-detection',
    title: {
      en: 'AI-Powered Fraud Detection: Protecting Saudi Consumers',
      ar: 'كشف الاحتيال المدعوم بالذكاء الاصطناعي: حماية المستهلكين السعوديين',
    },
    excerpt: {
      en: 'How artificial intelligence and machine learning are being used to detect and prevent financial fraud in real-time.',
      ar: 'كيف يتم استخدام الذكاء الاصطناعي والتعلم الآلي للكشف عن الاحتيال المالي ومنعه في الوقت الفعلي.',
    },
    content: {
      en: 'Financial institutions in Saudi Arabia are increasingly adopting AI-powered fraud detection systems. These advanced systems analyze millions of transactions in real-time, identifying suspicious patterns and preventing fraud before it occurs...',
      ar: 'تتبنى المؤسسات المالية في المملكة العربية السعودية بشكل متزايد أنظمة كشف الاحتيال المدعومة بالذكاء الاصطناعي. تحلل هذه الأنظمة المتقدمة ملايين المعاملات في الوقت الفعلي، وتحدد الأنماط المشبوهة وتمنع الاحتيال قبل حدوثه...',
    },
    featuredImage: '/images/blogs/ai-fraud.jpg',
    category: blogCategories[2],
    tags: ['ai', 'fraud-detection', 'machine-learning'],
    author: {
      id: 'author-3',
      name: { en: 'Mohammed Al-Rashid', ar: 'محمد الراشد' },
      avatar: '/images/authors/mohammed.jpg',
    },
    publishedAt: '2024-11-19T09:15:00Z',
    readTime: 7,
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
      en: 'Starting a FinTech company in Saudi Arabia requires obtaining the appropriate licenses from SAMA. This guide walks you through the entire process, from initial application to final approval...',
      ar: 'يتطلب بدء شركة تقنية مالية في المملكة العربية السعودية الحصول على التراخيص المناسبة من ساما. يرشدك هذا الدليل خلال العملية بأكملها، من التطبيق الأولي إلى الموافقة النهائية...',
    },
    featuredImage: '/images/blogs/sama-licensing.jpg',
    category: blogCategories[3],
    tags: ['sama', 'licensing', 'regulations', 'compliance'],
    author: {
      id: 'author-1',
      name: { en: 'Dr. Ahmed Al-Faisal', ar: 'د. أحمد الفيصل' },
      avatar: '/images/authors/ahmed.jpg',
    },
    publishedAt: '2024-11-17T11:00:00Z',
    readTime: 8,
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
      en: 'Mobile payment adoption in Saudi Arabia has accelerated dramatically, with over 75% of consumers now using mobile wallets for everyday transactions. This shift represents a fundamental change in consumer behavior...',
      ar: 'تسارع اعتماد الدفع عبر الهاتف المحمول في المملكة العربية السعودية بشكل كبير، حيث يستخدم أكثر من 75٪ من المستهلكين الآن المحافظ الرقمية للمعاملات اليومية. يمثلهذا التحول تغييراً أساسياً في سلوك المستهلك...',
    },
    featuredImage: '/images/blogs/mobile-payments.jpg',
    category: blogCategories[0],
    tags: ['mobile-payments', 'consumer-behavior', 'trends'],
    author: {
      id: 'author-2',
      name: { en: 'Sara Al-Mansour', ar: 'سارة المنصور' },
      avatar: '/images/authors/sara.jpg',
    },
    publishedAt: '2024-11-15T15:45:00Z',
    readTime: 5,
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
      en: 'Green finance initiatives are gaining momentum in Saudi Arabia, aligning with Vision 2030\'s sustainability goals. FinTech companies are playing a crucial role in democratizing access to sustainable investment opportunities...',
      ar: 'تكتسب مبادرات التمويل الأخضر زخماً في المملكة العربية السعودية، بما يتماشى مع أهداف الاستدامة لرؤية 2030. تلعب شركات التقنية المالية دوراً حاسماً في إضفاء الطابع الديمقراطي على إمكانية الوصول إلى فرص الاستثمار المستدام...',
    },
    featuredImage: '/images/blogs/green-finance.jpg',
    category: blogCategories[1],
    tags: ['green-finance', 'sustainability', 'esg', 'vision-2030'],
    author: {
      id: 'author-1',
      name: { en: 'Dr. Ahmed Al-Faisal', ar: 'د. أحمد الفيصل' },
      avatar: '/images/authors/ahmed.jpg',
    },
    publishedAt: '2024-11-13T12:30:00Z',
    readTime: 6,
  },
];
