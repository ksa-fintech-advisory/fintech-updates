// import { Blog, BlogCategory } from '@/core/types/web/blog';

// // Blog Categories
// export const blogCategories: BlogCategory[] = [
//   {
//     id: 'blog-cat-1',
//     name: { en: 'Industry News', ar: 'أخبار الصناعة' },
//     slug: 'industry-news',
//     color: '#006747',
//     icon: '📰',
//   },

//   {
//     id: 'blog-cat-2',
//     name: { en: 'Expert Insights', ar: 'رؤى الخبراء' },
//     slug: 'expert-insights',
//     color: '#D4AF37',
//     icon: '💡',
//   },
//   {
//     id: 'blog-cat-3',
//     name: { en: 'Technology Trends', ar: 'اتجاهات التكنولوجيا' },
//     slug: 'technology-trends',
//     color: '#7C3AED',
//     icon: '🚀',
//   },
//   {
//     id: 'blog-cat-4',
//     name: { en: 'Regulatory Updates', ar: 'التحديثات التنظيمية' },
//     slug: 'regulatory-updates',
//     color: '#1E40AF',
//     icon: '⚖️',
//   },
//   {
//     id: 'blog-cat-5',
//     name: { en: 'Regulatory Updates', ar: 'التحديثات التنظيمية' },
//     slug: 'regulatory-updates',
//     color: '#1E40AF',
//     icon: '⚖️',
//   },
//   {
//     id: 'blog-cat-6',
//     name: { en: 'Crypto Fintech', ar: ' کریپتو' },
//     slug: 'crypto-fintech',
//     color: '#1E40AF',
//     icon: '⚖️',
//   },
// ];

// // Blogs
// export const blogs: Blog[] = [
//   {
//     id: 'blog-stablecoins-us-dominance',
//     slug: 'stablecoins-us-dominance',
//     title: {
//       en: 'Stablecoins and the New Form of Dollar Dominance',
//       ar: 'العملات المستقرة وهيمنة الدولار بصيغة جديدة',
//     },
//     excerpt: {
//       en: 'An overview of how the stablecoin market is largely dominated by US-based issuers and what that means for financial decentralization.',
//       ar: 'نظرة على هيمنة الشركات الأمريكية على سوق العملات المستقرة وتأثير ذلك على فكرة اللامركزية المالية.',
//     },
//     content: {
//       en: [
//         {
//           type: 'paragraph',
//           text: 'The global stablecoin market is largely dominated by a small number of US-based issuers, reflecting a new form of dollar-based financial influence.',
//         },
//       ],
//       ar: [
//         {
//           type: 'paragraph',
//           text: 'اليوم سوق العملات المستقرة Stablecoins يكاد يكون تحت سيطرة شركتين أمريكيتين بشكل شبه كامل، شركة Circle بعملتها USDC وشركة Tether بعملتها USDT.',
//         },
//         {
//           type: 'paragraph',
//           text: 'كلا العملتين تعتبر fiat-backed بمعنى أنها مدعومة بأصول نقدية حقيقية بالدولار الأمريكي أو ما يعادله من أدوات مالية قصيرة الأجل.',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'العملات المستقرة والهيمنة المالية',
//         },
//         {
//           type: 'paragraph',
//           text: 'مع أن الهدف من العملات المستقرة هو تقديم وسيلة دفع رقمية محايدة وعابرة للحدود، إلا أن الواقع يشير إلى هيمنة أمريكية واضحة، تشبه إلى حد كبير سيطرتها التاريخية على النظام المالي العالمي القائم على الدولار الورقي.',
//         },
//         {
//           type: 'paragraph',
//           text: 'الفرق الوحيد أن الأدوات تغيرت من أوراق نقدية وبنوك مراسلة إلى stablecoins تعمل فوق شبكات البلوكشين.',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'عملة Tether (USDT)',
//         },
//         {
//           type: 'paragraph',
//           text: 'بالنسبة لـ Tether (USDT) تعتبر الأكثر انتشاراً عالمياً خاصة في الأسواق الناشئة ومنصات التداول، وتمتاز بسيولة عالية جداً وسهولة الوصول إليها.',
//         },
//         {
//           type: 'paragraph',
//           text: 'من عيوبها أنها تواجه انتقادات مستمرة حول مستوى الشفافية وجودة الاحتياطيات.',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'عملة Circle (USDC)',
//         },
//         {
//           type: 'paragraph',
//           text: 'أما بالنسبة لـ Circle (USDC) فهي أقل انتشاراً من USDT لكنها أكثر انضباطاً من ناحية الامتثال والشفافية.',
//         },
//         {
//           type: 'paragraph',
//           text: 'تخضع لرقابة وتشريعات أمريكية صارمة مما يجعلها أقرب إلى النظام المالي التقليدي، وتستهدف المؤسسات والأسواق التي تبحث عن عملة مستقرة موثوقة ومنظمة.',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'وجهة نظر',
//         },
//         {
//           type: 'paragraph',
//           text: 'من وجهة نظري، رغم أن قطاع العملات الرقمية نشأ على فكرة اللامركزية والتحرر من سيطرة الدول، إلا أن جزءاً كبيراً من بنيته اليوم يعتمد على عملات مستقرة تتحكم بها مؤسسات أمريكية.',
//         },
//         {
//           type: 'paragraph',
//           text: 'هذا يعيد إنتاج نفس النفوذ المالي الذي مارسه الدولار لعقود طويلة ولكن بصيغة جديدة وبسرعة وانتشار أكبر.',
//         },
//       ],
//     },
//     featuredImage: '/images/blogs/stablecoins-us-dominance.jpg',
//     category: blogCategories.find(c => c.slug === 'crypto-fintech'),
//     tags: ['fintech', 'stablecoins', 'usdt', 'usdc', 'crypto', 'blockchain', 'stablecoins', 'usdt', 'usdc', 'crypto', 'blockchain'],
//     author: {
//       id: 'author-mohammed-gamal',
//       name: {
//         en: 'Mohammed Gamal',
//         ar: 'محمد جمال',
//       },
//     },
//     publishedAt: '2024-11-21T10:00:00Z',
//     readTime: 5,
//   }
//   ,
//   {
//     id: 'blog-2',
//     slug: 'cybersecurity-fintech',
//     title: {
//       en: 'Cybersecurity in FinTech: Best Practices for 2024',
//       ar: 'الأمن السيبراني في التقنية المالية: أفضل الممارسات لعام 2024',
//     },
//     excerpt: {
//       en: 'Essential cybersecurity measures every FinTech company should implement to protect customer data and maintain trust.',
//       ar: 'تدابير الأمن السيبراني الأساسية التي يجب على كل شركة تقنية مالية تنفيذها لحماية بيانات العملاء والحفاظ على الثقة.',
//     },
//     content: {
//       en: [
//         {
//           type: 'paragraph',
//           text: 'As FinTech continues to grow, cybersecurity becomes increasingly critical. This guide covers essential security practices including encryption, multi-factor authentication, and incident response planning.',
//         },
//       ],
//       ar: [
//         {
//           type: 'paragraph',
//           text: 'مع استمرار نمو التقنية المالية، يصبح الأمن السيبراني أكثر أهمية. يغطي هذا الدليل ممارسات الأمان الأساسية بما في ذلك التشفير والمصادقة متعددة العوامل وتخطيط الاستجابة للحوادث.',
//         },
//       ],
//     },
//     featuredImage: '/images/blogs/cybersecurity.jpg',
//     category: blogCategories[2],
//     tags: ['cybersecurity', 'security', 'data-protection'],
//     author: {
//       id: 'author-2',
//       name: { en: 'Sara Al-Mansour', ar: 'سارة المنصور' },
//       bio: {
//         en: 'Cybersecurity specialist focusing on securing financial infrastructures and protecting consumer data.',
//         ar: 'أخصائية أمن سيبراني تركز على تأمين البنية التحتية المالية وحماية بيانات المستهلك.',
//       },
//       role: {
//         en: 'Security Analyst',
//         ar: 'محلل أمني',
//       },
//       avatar: '/images/authors/sara.jpg',
//     },
//     publishedAt: '2024-11-21T14:30:00Z',
//     readTime: 6,
//     relatedPosts: ['blog-1', 'blog-cma-omnibus-structure'],
//   },
//   {
//     id: 'blog-cma-omnibus-structure',
//     slug: 'cma-omnibus-payment-gateway-structure',
//     title: {
//       en: 'Regulatory Note on Payment Gateway and Omnibus Accounts',
//       ar: 'ملاحظة تنظيمية حول بوابات الدفع وحسابات العملاء (Omnibus)',
//     },
//     excerpt: {
//       en: 'A regulatory clarification on structuring payment gateways and client funds under CMA regulations.',
//       ar: 'توضيح تنظيمي حول الهيكلة الصحيحة لبوابات الدفع وأموال العملاء وفق أنظمة هيئة السوق المالية.',
//     },
//     content: {
//       en: [
//         {
//           type: 'paragraph',
//           text: 'This article highlights a regulatory consideration related to payment gateway integration and client fund handling under capital market regulations.',
//         },
//       ],
//       ar: [
//         {
//           type: 'header',
//           level: 2,
//           text: 'ملاحظة تنظيمية مهمة في بناء منتجات الفنتك',
//         },
//         {
//           type: 'paragraph',
//           text: 'هذه ملاحظة مهمة جداً للمهتمين ببناء منتجات فنتك، وخصوصاً من يعملون تحت أنظمة هيئة السوق المالية (CMA).',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'الخطأ الشائع في ربط بوابات الدفع',
//         },
//         {
//           type: 'paragraph',
//           text: 'شركات كثيرة تروح تربط حساب بوابة الدفع مباشرة بحساب العملاء أو ما يسمى بحساب الـ Omnibus، وهذا خطأ تنظيمي واضح.',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'سبب المخالفة التنظيمية',
//         },
//         {
//           type: 'paragraph',
//           text: 'السبب أن أي عمولة تخصمها بوابة الدفع تعتبر مصروف تشغيلي يخص الشركة. بينما أنظمة هيئة السوق تشترط أن أموال العملاء تبقى أموال عملاء فقط ولا يخصم منها أي مصاريف أو عمولات تشغيلية.',
//         },
//         {
//           type: 'paragraph',
//           text: 'الربط المباشر يعني خلط أموال العملاء مع مصاريف الشركة، ويخل بمتطلبات الفصل بين الحسابات والـ safeguarding، وقد يؤدي إلى مشاكل تنظيمية خطيرة.',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'الهيكلة الصحيحة والمتوافقة تنظيمياً',
//         },
//         {
//           type: 'paragraph',
//           text: 'الهيكلة الصحيحة أن تستقبل بوابة الدفع الأموال في حساب عمليات الشركة أولاً، حيث تخصم العمولة وتسجل كمصروف تشغيل، ثم يُحول صافي المبلغ إلى حساب العملاء.',
//         },
//         {
//           type: 'paragraph',
//           text: 'هذا الفصل ضروري للحفاظ على الامتثال وضمان عدم اختلاط أموال العملاء مع أموال الشركة.',
//         },
//       ],
//     },
//     featuredImage: '/images/blogs/cma-omnibus-structure.jpg',
//     category: blogCategories[2],
//     tags: [
//       'fintech',
//       'cma',
//       'omnibus-account',
//       'payment-gateway',
//       'regulatory-compliance',
//     ],
//     author: {
//       id: 'author-mohammed-gamal',
//       name: {
//         en: 'Mohammed Gamal',
//         ar: 'محمد جمال',
//       },
//       bio: {
//         en: 'Compliance officer and regulatory expert with deep knowledge of CMA and SAMA regulations.',
//         ar: 'ضابط الامتثال وخبير تنظيمي ذو معرفة عميقة بلوائح هيئة السوق المالية وساما.',
//       },
//       role: {
//         en: 'Compliance Head',
//         ar: 'رئيس الامتثال',
//       },
//     },
//     publishedAt: '2024-11-20T10:00:00Z',
//     readTime: 4,
//     relatedPosts: ['blog-4', 'blog-2'],
//   },
//   {
//     id: 'blog-4',
//     slug: 'sama-licensing-guide',
//     title: {
//       en: 'SAMA Licensing: A Step-by-Step Guide for FinTech Startups',
//       ar: 'ترخيص ساما: دليل خطوة بخطوة للشركات الناشئة في التقنية المالية',
//     },
//     excerpt: {
//       en: 'A comprehensive guide to navigating the SAMA licensing process for new FinTech companies in Saudi Arabia.',
//       ar: 'دليل شامل للتنقل في عملية ترخيص ساما لشركات التقنية المالية الجديدة في المملكة العربية السعودية.',
//     },
//     content: {
//       en: [
//         {
//           type: 'paragraph',
//           text: 'Starting a FinTech company in Saudi Arabia requires obtaining the appropriate licenses from SAMA. This guide walks you through the entire process, from initial application to final approval.',
//         },
//       ],
//       ar: [
//         {
//           type: 'paragraph',
//           text: 'يتطلب بدء شركة تقنية مالية في المملكة العربية السعودية الحصول على التراخيص المناسبة من ساما. يرشدك هذا الدليل خلال العملية بأكملها، من التطبيق الأولي إلى الموافقة النهائية.',
//         },
//       ],
//     },
//     featuredImage: '/images/blogs/sama-licensing.jpg',
//     category: blogCategories[3],
//     tags: ['sama', 'licensing', 'regulations', 'compliance'],
//     author: {
//       id: 'author-1',
//       name: { en: 'Dr. Ahmed Al-Faisal', ar: 'د. أحمد الفيصل' },
//       bio: {
//         en: 'FinTech expert with over 15 years of experience in digital transformation and banking innovation.',
//         ar: 'خبير في التقنية المالية يتمتع بأكثر من 15 عاماً من الخبرة في التحول الرقمي والابتكار المصرفي.',
//       },
//       role: {
//         en: 'Senior FinTech Consultant',
//         ar: 'كبير مستشاري التقنية المالية',
//       },
//       avatar: '/images/authors/ahmed.jpg',
//     },
//     publishedAt: '2024-11-17T11:00:00Z',
//     readTime: 8,
//     relatedPosts: ['blog-cma-omnibus-structure', 'blog-1'],
//   },
//   {
//     id: 'blog-5',
//     slug: 'mobile-payments-growth',
//     title: {
//       en: 'Mobile Payments Surge: Analyzing Saudi Consumer Behavior',
//       ar: 'ارتفاع المدفوعات عبر الهاتف المحمول: تحليل سلوك المستهلك السعودي',
//     },
//     excerpt: {
//       en: 'Recent statistics and trends showing the dramatic shift toward mobile payment methods among Saudi consumers.',
//       ar: 'الإحصائيات والاتجاهات الأخيرة التي تظهر التحول الدراماتيكي نحو طرق الدفع عبر الهاتف المحمول بين المستهلكين السعوديين.',
//     },
//     content: {
//       en: [
//         {
//           type: 'paragraph',
//           text: 'Mobile payment adoption in Saudi Arabia has accelerated dramatically, with over 75% of consumers now using mobile wallets for everyday transactions. This shift represents a fundamental change in consumer behavior.',
//         },
//       ],
//       ar: [
//         {
//           type: 'paragraph',
//           text: 'تسارع اعتماد الدفع عبر الهاتف المحمول في المملكة العربية السعودية بشكل كبير، حيث يستخدم أكثر من 75٪ من المستهلكين الآن المحافظ الرقمية للمعاملات اليومية. يمثل هذا التحول تغييراً أساسياً في سلوك المستهلك.',
//         },
//       ],
//     },
//     featuredImage: '/images/blogs/mobile-payments.jpg',
//     category: blogCategories[0],
//     tags: ['mobile-payments', 'consumer-behavior', 'trends'],
//     author: {
//       id: 'author-2',
//       name: { en: 'Sara Al-Mansour', ar: 'سارة المنصور' },
//       bio: {
//         en: 'Cybersecurity specialist focusing on securing financial infrastructures and protecting consumer data.',
//         ar: 'أخصائية أمن سيبراني تركز على تأمين البنية التحتية المالية وحماية بيانات المستهلك.',
//       },
//       role: {
//         en: 'Security Analyst',
//         ar: 'محلل أمني',
//       },
//       avatar: '/images/authors/sara.jpg',
//     },
//     publishedAt: '2024-11-15T15:45:00Z',
//     readTime: 5,
//     relatedPosts: ['blog-6', 'blog-1'],
//   },
//   {
//     id: 'blog-6',
//     slug: 'green-finance-initiatives',
//     title: {
//       en: 'Green Finance: Saudi Arabia\'s Sustainable FinTech Future',
//       ar: 'التمويل الأخضر: مستقبل التقنية المالية المستدامة في السعودية',
//     },
//     excerpt: {
//       en: 'How green finance and sustainable investing are becoming integral to Saudi Arabia\'s FinTech ecosystem.',
//       ar: 'كيف يصبح التمويل الأخضر والاستثمار المستدام جزءاً لا يتجزأ من النظام البيئي للتقنية المالية في السعودية.',
//     },
//     content: {
//       en: [
//         {
//           type: 'paragraph',
//           text: 'Green finance initiatives are gaining momentum in Saudi Arabia, aligning with Vision 2030\'s sustainability goals. FinTech companies are playing a crucial role in democratizing access to sustainable investment opportunities.',
//         },
//       ],
//       ar: [
//         {
//           type: 'paragraph',
//           text: 'تكتسب مبادرات التمويل الأخضر زخماً في المملكة العربية السعودية، بما يتماشى مع أهداف الاستدامة لرؤية 2030. تلعب شركات التقنية المالية دوراً حاسماً في إضفاء الطابع الديمقراطي على إمكانية الوصول إلى فرص الاستثمار المستدام.',
//         },
//       ],
//     },
//     featuredImage: '/images/blogs/green-finance.jpg',
//     category: blogCategories[1],
//     tags: ['green-finance', 'sustainability', 'esg', 'vision-2030'],
//     author: {
//       id: 'author-1',
//       name: { en: 'Dr. Ahmed Al-Faisal', ar: 'د. أحمد الفيصل' },
//       bio: {
//         en: 'FinTech expert with over 15 years of experience in digital transformation and banking innovation.',
//         ar: 'خبير في التقنية المالية يتمتع بأكثر من 15 عاماً من الخبرة في التحول الرقمي والابتكار المصرفي.',
//       },
//       role: {
//         en: 'Senior FinTech Consultant',
//         ar: 'كبير مستشاري التقنية المالية',
//       },
//       avatar: '/images/authors/ahmed.jpg',
//     },
//     publishedAt: '2024-11-13T12:30:00Z',
//     readTime: 6,
//     relatedPosts: ['blog-5', 'blog-4'],
//   },
//   {
//     id: 'blog-open-banking-payment-initiation',
//     slug: 'open-banking-vs-payment-gateways',
//     title: {
//       en: 'Payment Gateways vs Open Banking: The Battle of Fees and UX',
//       ar: 'بوابات الدفع vs المصرفية المفتوحة: معركة الرسوم وتجربة العميل',
//     },
//     excerpt: {
//       en: 'Why Payment Initiation under Open Banking is set to revolutionize fintech transaction costs and user experience in Saudi Arabia.',
//       ar: 'لماذا ستغير خدمة بدء الدفع في المصرفية المفتوحة قواعد اللعبة في تكاليف العمليات وتجربة العميل لتطبيقات الفنتك في السعودية.',
//     },
//     content: {
//       ar: [
//         {
//           type: 'paragraph',
//           text: 'عمولات بوابات الدفع صارت عبء كبير على أي بزنس… خصوصا التطبيقات المالية. اليوم كثير من بوابات الدفع تأخذ نسبة مئوية من كل عملية + مبلغ ثابت + اشتراك شهري!',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'مثال واقعي',
//         },
//         {
//           type: 'paragraph',
//           text: 'عشان أوضح بصورة بسيطة، لو عندك تطبيق فنتك والعميل يودع 10,000 ريال عبر بوابة دفع تأخذ 1% + مبلغ ثابت (مثلاً 1 ريال):',
//         },
//         {
//           type: 'quote',
//           text: 'الصافي اللي يوصل لمحفظتك: 10000 – (10000 × 0.01) – 1 = 9899 ريال. يعني خسرت 101 ريال من عملية واحدة بس.',
//         },
//         {
//           type: 'paragraph',
//           text: 'فرق ضخم. قارن هذا بتحويل بنكي عادي، أحيانا العمولة 50 هللة فقط. لكن المشكلة مع التحويل البنكي التقليدي أو الـ Virtual IBAN إنه يُعامل كأنه تحويل لشخص آخر.',
//         },
//         {
//           type: 'paragraph',
//           text: 'يعني لازم المستخدم يطلع من تطبيقك… يروح لتطبيق بنكه… يدخل رقم الآيبان… ويرسل المبلغ. تجربة ثقيلة وغير سلسة وتسبب Drop عالي.',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'دور المصرفية المفتوحة (Open Banking)',
//         },
//         {
//           type: 'paragraph',
//           text: 'وهنا بيجي دور Open Banking. اليوم في السعودية ال Open Banking لسا في مرحلة Aggregation فقط (قراءة بيانات الحساب).',
//         },
//         {
//           type: 'paragraph',
//           text: 'وساما (البنك المركزي السعودي) حاليا شغال على المرحلة اللي بعدها وهي ال Payment Initiation واللي بتسمح لتطبيقك يطلب من بنك العميل تنفيذ التحويل مباشرة من داخل تطبيقك بدون ما يطلع برا.',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'هذا بيغير اللعبة بالكامل',
//         },
//         {
//           type: 'list',
//           style: 'unordered',
//           items: [
//             'بدون بوابات دفع',
//             'بدون رسوم ضخمة',
//             'بدون خروج من التطبيق',
//             'وبتجربة تحويل سريعة وآمنة',
//           ],
//         },
//       ],
//       en: [
//         {
//           type: 'paragraph',
//           text: 'Payment gateway commissions have become a major burden for any business… especially financial applications. Today, many payment gateways charge a percentage of every transaction + a fixed fee + a monthly subscription!',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'A Real-World Example',
//         },
//         {
//           type: 'paragraph',
//           text: 'To explain simply: If you have a fintech app and a customer deposits 10,000 SAR via a payment gateway taking 1% + a fixed amount (e.g., 1 SAR):',
//         },
//         {
//           type: 'quote',
//           text: 'The net amount reaching your wallet: 10,000 – (10,000 × 0.01) – 1 = 9,899 SAR. Meaning you lost 101 SAR from just one transaction.',
//         },
//         {
//           type: 'paragraph',
//           text: 'A huge difference. Compare this to a normal bank transfer; sometimes the fee is only 0.50 SAR. But the problem with traditional bank transfers or Virtual IBANs is that they are treated as transfers to another person.',
//         },
//         {
//           type: 'paragraph',
//           text: 'This means the user must leave your app… go to their bank app… enter the IBAN… and send the amount. A heavy and clunky experience that causes high drop-off rates.',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'The Role of Open Banking',
//         },
//         {
//           type: 'paragraph',
//           text: 'This is where Open Banking comes in. Today in Saudi Arabia, Open Banking is still in the Aggregation phase (reading account data) only.',
//         },
//         {
//           type: 'paragraph',
//           text: 'SAMA (Saudi Central Bank) is currently working on the next phase, which is Payment Initiation. This will allow your app to request the customer’s bank to execute the transfer directly from within your app without them having to leave.',
//         },
//         {
//           type: 'header',
//           level: 3,
//           text: 'This Changes the Game Completely',
//         },
//         {
//           type: 'list',
//           style: 'unordered',
//           items: [
//             'No payment gateways',
//             'No massive fees',
//             'No leaving the application',
//             'A fast and secure transfer experience',
//           ],
//         },
//       ],
//     },
//     featuredImage: '/images/blogs/open-banking-payment.png',
//     category: blogCategories[3], // Regulatory Updates
//     tags: ['fintech', 'open-banking', 'payment-gateway', 'sama', 'payment-initiation'],
//     author: {
//       id: 'author-mohammed-gamal',
//       name: {
//         en: 'Mohammed Gamal',
//         ar: 'محمد جمال',
//       },
//     },
//     publishedAt: '2024-12-24T09:00:00Z',
//     readTime: 3,
//     relatedPosts: ['blog-cma-omnibus-structure', 'blog-5'],
//   },
// ];


import { Blog, BlogCategory } from '@/core/types/web/blog';

// ==========================================
// 1. Categories (Expanded to fit all content)
// ==========================================
export const blogCategories: BlogCategory[] = [
  {
    id: 'cat-tech-trends',
    name: { en: 'Tech Trends & Architecture', ar: 'اتجاهات التكنولوجيا والمعمارية' },
    slug: 'technology-architecture',
    color: '#7C3AED', // Purple
    icon: '🏗️',
  },
  {
    id: 'cat-regulatory',
    name: { en: 'Regulations & Compliance', ar: 'الأنظمة والامتثال' },
    slug: 'regulatory-compliance',
    color: '#1E40AF', // Blue
    icon: '⚖️',
  },
  {
    id: 'cat-crypto',
    name: { en: 'Crypto & Blockchain', ar: 'العملات الرقمية والبلوكشين' },
    slug: 'crypto-blockchain',
    color: '#F59E0B', // Orange
    icon: '₿',
  },
  {
    id: 'cat-fintech-product',
    name: { en: 'Fintech Product & Biz', ar: 'منتجات الفنتك والأعمال' },
    slug: 'fintech-product',
    color: '#10B981', // Green
    icon: '💼',
  },
  {
    id: 'cat-payments',
    name: { en: 'Payments Infrastructure', ar: 'بنية المدفوعات التحتية' },
    slug: 'payments-infrastructure',
    color: '#EC4899', // Pink
    icon: '💳',
  },
];

const getCat = (slug: string) => blogCategories.find((c) => c.slug === slug)!;
const defaultAuthor = { id: 'auth-mohammed', name: { en: 'Mohammed Gamal', ar: 'محمد جمال' } };

export const blogs: Blog[] = [
  // Post 1: European Digital Identity Wallet
  {
    id: 'blog-eid-wallet-europe',
    slug: 'european-digital-identity-wallet',
    title: {
      en: 'The European Digital Identity Wallet: A New Economic Infrastructure',
      ar: 'المحفظة الرقمية الأوروبية: بنية تحتية جديدة للاقتصاد الرقمي',
    },
    excerpt: {
      en: 'Europe is building a unified digital identity wallet (EID) that will revolutionize how citizens interact with services, shifting control from institutions to users.',
      ar: 'أوروبا تعمل على واحد من أهم المشاريع الاقتصادية الرقمية (EID Wallet) لتوحيد الهوية والمعاملات عبر دول الاتحاد، مما ينقل التحكم في البيانات للمستخدم.',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'حالياً أوروبا بتشتغل على واحد من أهم المشاريع اللي ممكن تغير شكل الاقتصاد الرقمي بالكامل. المشروع ذا هو المحفظة الرقمية الأوروبية (European Digital Identity Wallet) أو (EID Wallet).',
        },
        {
          type: 'paragraph',
          text: 'الفكرة من ذا المشروع إن كل مواطن في الاتحاد الأوروبي بيكون معه محفظة هوية رسمية في جواله. يعني مش مجرد بطاقة هوية رقمية، إنما محفظة واحدة تجمع:',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'هويتك الشخصية والرخص.',
            'الشهادات الأكاديمية.',
            'حساباتك البنكية.',
            'تذاكر السفر والتوقيع الرقمي.',
          ],
        },
        {
          type: 'paragraph',
          text: 'والفكرة إن الـ wallet ذي تمثل هويتك ومعاملاتك الرقمية في أي خدمة داخل أي دولة، بكل بساطة وبأمان كامل.',
        },
        {
          type: 'header',
          level: 3,
          text: 'نهاية تشتت الهوية الرقمية',
        },
        {
          type: 'paragraph',
          text: 'اللي حاصل اليوم أن الهويات الرقمية مشتتة. في تطبيق للبنك، تطبيق للحكومة، تطبيق للتأمين، وتطبيق للجامعة، وكل واحد له طريقته في التحقق والربط. الـ EID Wallet بيلغي هذا كله ويقدم هوية موحدة تشتغل عبر كل الدول وكل المؤسسات.',
        },
        {
          type: 'highlight',
          variant: 'info',
          title: 'الخصوصية وتقنية Zero-Knowledge Proof',
          text: 'بدل ما كل مؤسسة تجمع بياناتك وتخزنها، الـ EID Wallet تعطي إثبات مباشر من جهازك بدون ما تنكشف بياناتك إلا بالحد الأدنى. مثلاً: لو بنك يريد يعرف إن عمرك فوق 18، المحفظة تثبت له هذا الشي بدون ما ترسل تاريخ ميلادك.',
        },
        {
          type: 'paragraph',
          text: 'اللي يصير هنا إن التحكم ينتقل من المؤسسات إلى المستخدم. المستخدم هو اللي يقرر من يشوف إيش؟ متى؟ ولأي غرض؟ وهذا الشي بيغير شكل الخدمات المالية والمعاملات الحكومية بشكل كبير.',
        },
        {
          type: 'quote',
          text: 'الـ EID Wallet مش مشروع تقني بقدر ما هو بنية تحتية جديدة لهوية الإنسان الرقمية.',
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'Europe is currently working on one of the most critical projects that could completely reshape the digital economy: The European Digital Identity Wallet (EID Wallet).',
        },
        {
          type: 'paragraph',
          text: 'The concept is that every EU citizen will have an official identity wallet on their phone. It’s not just a digital ID card, but a unified wallet aggregating:',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Personal ID and Licenses.',
            'Academic Certificates.',
            'Bank Accounts.',
            'Travel Tickets and Digital Signatures.',
          ],
        },
        {
          type: 'header',
          level: 3,
          text: 'Ending Digital Identity Fragmentation',
        },
        {
          type: 'paragraph',
          text: 'Currently, digital identities are fragmented across bank apps, government portals, insurance apps, etc. The EID Wallet eliminates this silos, offering a unified identity interoperable across all nations and institutions.',
        },
        {
          type: 'highlight',
          variant: 'info',
          title: 'Privacy & Zero-Knowledge Proof',
          text: 'Using technologies like Zero-Knowledge Proof and Verifiable Credentials, the wallet allows you to prove facts about yourself without revealing raw data. For example, proving you are over 18 to a bank without sharing your exact date of birth.',
        },
        {
          type: 'quote',
          text: 'The EID Wallet is not just a tech project; it is a new infrastructure for human digital identity.',
        },
      ],
    },
    featuredImage: '/images/blogs/eid-wallet.jpg',
    category: blogCategories.find(c => c.slug === 'technology-architecture')!,
    tags: ['identity-wallet', 'EID', 'digital-identity', 'zero-knowledge-proof', 'europe'],
    author: defaultAuthor,
    publishedAt: '2024-06-15T10:00:00Z',
    readTime: 4,
    relatedPosts: [],
  },

  // Post 2: Kafka in Fintech
  {
    id: 'blog-kafka-fintech-hype',
    slug: 'kafka-in-fintech-power-vs-hype',
    title: {
      en: 'Apache Kafka in Fintech: A Powerful Tool or Just Hype?',
      ar: 'Kafka في الفنتك: نقطة قوة أم مجرد "ترند"؟',
    },
    excerpt: {
      en: 'Kafka is essential for high-throughput financial systems, but treating it as a trend without understanding its complexity can turn it into a burden.',
      ar: 'يعتبر Kafka نقطة قوة لأي مؤسسة مالية، لكن استخدامه كـ "موضة" دون حاجة حقيقية قد يحوله من أداة قوة إلى عبء تشغيلي.',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'يعتبر استخدام Kafka نقطة قوة لأي مؤسسة مالية شغالة بمعمارية Microservices أو أي نظام يتعامل مع حجم ضخم من البيانات أو تدفّق لحظي (streams). الكافكا يعطيك سرعة، تحمل أعلى، وثبات في نقل البيانات بين الخدمات بدون ما تخنق قواعد البيانات أو تخلق bottleneck في الـ APIs.',
        },
        {
          type: 'header',
          level: 3,
          text: 'متى تبدأ الكارثة؟',
        },
        {
          type: 'paragraph',
          text: 'المشكلة تبدأ لما يتحول Kafka لـ ترند وتتسابق الشركات على استخدامه من باب hype مش من باب حاجة البزنس. الكافكا نظام كامل يحتاج خبرة، مراقبة، وضبط إعدادات (Partitions, Consumer Groups).',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'استهلاك عالي للموارد بدون سبب.',
            'تعقيد في الـ infrastructure يصعب إصلاحه.',
            'مشاكل في الـ offsets وتأخير في الـ consuming.',
            'تراكم رسائل وتضخم غير ضروري في الـ topics.',
          ],
        },
        {
          type: 'header',
          level: 3,
          text: 'متى تستخدم Kafka فعلياً؟',
        },
        {
          type: 'paragraph',
          text: 'مش كل منظومة تحتاج Kafka، ومش كل event لازم يكون stream. أحياناً الـ REST يكفي، وأحياناً Redis stream أفضل. استخدم Kafka لما يكون عندك:',
        },
        {
          type: 'list',
          style: 'ordered',
          items: [
            'حجم بيانات ضخم.',
            'اتصال بين خدمات يحتاج تحمل عالي (High Availability).',
            'تدفق لحظي للأحداث.',
            'سجلات (logs) تحتاج تخزين طويل.',
            'حاجة لإعادة تشغيل الاستهلاك (Replay) بدون خسارة بيانات.',
          ],
        },
        {
          type: 'quote',
          text: 'استخدم Kafka لما يكون حل… مش لما يكون موضة.',
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'Kafka is a powerhouse for any financial institution running on Microservices or handling massive data streams. It offers speed, high tolerance, and stability in data transfer without choking databases or creating API bottlenecks.',
        },
        {
          type: 'header',
          level: 3,
          text: 'When does the disaster start?',
        },
        {
          type: 'paragraph',
          text: 'Trouble begins when Kafka is adopted purely as a "trend" or hype. It is not just a library; it is a full system requiring deep expertise in monitoring, partitions, and consumer groups.',
        },
        {
          type: 'paragraph',
          text: 'Without proper expertise, it leads to high resource consumption, infrastructure complexity, offset issues, and message lags.',
        },
        {
          type: 'header',
          level: 3,
          text: 'When should you actually use Kafka?',
        },
        {
          type: 'paragraph',
          text: 'Not every system needs Kafka. Sometimes REST or Redis Streams are sufficient. Use Kafka when you genuinely have:',
        },
        {
          type: 'list',
          style: 'ordered',
          items: [
            'Massive data volume.',
            'Inter-service communication requiring high availability.',
            'Real-time event streaming.',
            'Logs requiring long-term storage.',
            'A need to replay consumption without data loss.',
          ],
        },
        {
          type: 'quote',
          text: 'Use Kafka when it is a solution, not when it is a fashion statement.',
        },
      ],
    },
    featuredImage: '/images/blogs/kafka-fintech.jpg',
    category: blogCategories.find(c => c.slug === 'technology-architecture')!,
    tags: ['kafka', 'microservices', 'software-architecture', 'backend', 'streaming'],
    author: defaultAuthor,
    publishedAt: '2024-06-20T14:30:00Z',
    readTime: 5,
    relatedPosts: [],
  },

  // Post 3: Hexagonal Architecture
  {
    id: 'blog-hexagonal-architecture',
    slug: 'hexagonal-architecture-fintech',
    title: {
      en: 'Hexagonal Architecture: Protecting Your Fintech Core',
      ar: 'المعمارية السداسية (Hexagonal): كيف تحمي جوهر تطبيقك المالي',
    },
    excerpt: {
      en: 'For backend developers in Fintech, Hexagonal Architecture is crucial for decoupling your core domain logic from third-party services like brokers or payment gateways.',
      ar: 'نصيحة لمطوري الباك إند: المعمارية السداسية هي الحل لفصل المنطق الأساسي (Domain) عن الخدمات الخارجية المتغيرة، مما يسهل التوسع والصيانة.',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'لو أنت باك آند وشغال في تطبيق مالي، فذي نصيحة ممكن تكون مفيدة لك. خصوصاً لو عندك منتج زي الـ Robo Advisory أو أي منتج معتمد بشكل كبير على Third Party.',
        },
        {
          type: 'header',
          level: 3,
          text: 'ما هي Hexagonal Architecture؟',
        },
        {
          type: 'paragraph',
          text: 'الفكرة من ذي المعمارية هي فصل المنطق الأساسي (Domain) عن أي خدمة خارجية (Broker أو غيره). تخيل الـ domain تبعك كأنه مقبس كهرباء (فيش)، والـ broker هو الشاحن. المقبس يشتغل مع أي شاحن… بس بشرط توفر محول مناسب.',
        },
        {
          type: 'highlight',
          variant: 'success',
          title: 'الـ Adapters',
          text: 'الـ Adapter هنا هو المحول. يعني لو نظامك معتمد على "دراية المالية" واحتجت تغير وتتعامل مع "Alpaca"، بتقدر تغيره أو تضيف غيره بدون ما تلمس سطر واحد في المنطق الأساسي (Business Logic).',
        },
        {
          type: 'paragraph',
          text: 'هذا يوفر عليك شغل كثير مستقبلًا سواء توسعت أو غيرت مزودين. الفكرة: أنت بس ركز تبني Domain قوي ونظيف، وخلي كل شيء خارجي عبارة عن Plug 🔌.',
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'If you are a backend developer in Fintech, especially working on products like Robo Advisory that rely heavily on third parties, this advice is for you.',
        },
        {
          type: 'header',
          level: 3,
          text: 'What is Hexagonal Architecture?',
        },
        {
          type: 'paragraph',
          text: 'The core idea is to decouple your Domain logic from any external service. Think of your domain as a wall socket, and the broker as a charger. The socket works with any charger, provided you have the right adapter.',
        },
        {
          type: 'highlight',
          variant: 'success',
          title: 'The Power of Adapters',
          text: 'If your system relies on a specific broker (e.g., Derayah) and you need to switch to another (e.g., Alpaca), you can do so by simply swapping the adapter without touching a single line of your core Business Logic.',
        },
        {
          type: 'paragraph',
          text: 'Build a clean, strong Domain, and treat everything external as a plug 🔌.',
        },
      ],
    },
    featuredImage: '/images/blogs/hexagonal-arch.jpg',
    category: blogCategories.find(c => c.slug === 'technology-architecture')!,
    tags: ['hexagonal-architecture', 'clean-code', 'software-design', 'backend'],
    author: defaultAuthor,
    publishedAt: '2024-07-05T09:00:00Z',
    readTime: 3,
    relatedPosts: ['blog-kafka-fintech-hype'],
  },
  // Post 4: Payment Flow (Behind the Scenes)
  {
    id: 'blog-payment-flow-explained',
    slug: 'payment-flow-behind-the-scenes',
    title: {
      en: 'What Happens When You Click "Pay"? The Hidden Journey',
      ar: 'ماذا يحدث خلف الكواليس عند الضغط على زر "دفع"؟',
    },
    excerpt: {
      en: 'A deep dive into the complex journey of a transaction involving Gateways, Acquirers, Schemes, and Issuers.',
      ar: 'شرح مبسط للرحلة المعقدة التي تقطعها أموالك في ثوانٍ بين بوابة الدفع، البنك المكتسب، شبكة البطاقات، والبنك المصدر.',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'لما تدفع أونلاين ممكن تتوقع إن العملية بسيطة: تدخل بيانات البطاقة، الفلوس تنخصم، وتوصل للتاجر. لكن الواقع؟ الفلو الحقيقي أعقد لأن شبكات الدفع مصممة تحمي كل طرف وتوزع الأدوار بين الأطراف بدقة.',
        },
        {
          type: 'header',
          level: 3,
          text: 'رحلة العملية (The Transaction Flow)',
        },
        {
          type: 'list',
          style: 'ordered',
          items: [
            'أنت تضغط "ادفع": الطلب يروح أولاً لـ بوابة الدفع (PSP) مثل PayTabs أو Moyasar.',
            'بوابة الدفع (PSP): ما تتواصل مع شبكة البطاقات مباشرة. هي فقط ترسل الطلب إلى البنك المكتسب (Acquirer).',
            'البنك المكتسب (Acquirer): هو "بنك التاجر"، وهو الطرف الوحيد المخول بالتواصل مع شبكة البطاقات (Visa/Mastercard/Mada) لإرسال الطلب.',
            'شبكة البطاقات (Scheme): توصل الطلب للبنك المصدر (Issuer Bank) - بنك العميل.',
            'البنك المصدر (Issuer): يوافق أو يرفض العملية، ويرجع الرد بنفس المسار العكسي.',
          ],
        },
        {
          type: 'highlight',
          variant: 'warning',
          title: 'لماذا هذا التعقيد؟',
          text: 'لأن شبكة البطاقات ما تسمح لأي طرف يدخل مباشرة. اللي يفتح البوابة هو البنك المكتسب لأنه هو الطرف الرسمي. بوابة الدفع مجرد ممهد للطريق.',
        },
        {
          type: 'paragraph',
          text: 'فهم المعمارية التقنية مهم جدًا في الفنتك عشان تعرف حدودك وتفهم من يملك القرار ومن اللي مجرد ناقل.',
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'When you pay online, you might think it\'s simple: enter card details, money is deducted, and the merchant gets paid. In reality, the flow is much more complex designed to protect all parties.',
        },
        {
          type: 'header',
          level: 3,
          text: 'The Transaction Flow',
        },
        {
          type: 'list',
          style: 'ordered',
          items: [
            'User clicks Pay: The request goes to the Payment Gateway (PSP).',
            'Payment Gateway (PSP): Does not talk to the card network directly. It forwards the request to the Acquirer.',
            'The Acquirer: The merchant\'s bank. This is the entity authorized to speak to the Card Schemes (Visa/Mastercard).',
            'Card Scheme: Routes the request to the Issuer Bank (Customer\'s Bank).',
            'The Issuer: Approves or declines the transaction and sends the response back through the same chain.',
          ],
        },
        {
          type: 'highlight',
          variant: 'warning',
          title: 'Why the complexity?',
          text: 'Card networks are gated communities. Only the Acquirer can open the door. The Gateway is just a facilitator. Understanding this architecture is crucial to knowing who holds the decision power vs. who is just a messenger.',
        },
      ],
    },
    featuredImage: '/images/blogs/payment-flow.jpg',
    category: blogCategories.find(c => c.slug === 'payments-infrastructure')!,
    tags: ['payments', 'acquirer', 'issuer', 'visa', 'mastercard', 'pci-dss'],
    author: defaultAuthor,
    publishedAt: '2024-08-10T11:00:00Z',
    readTime: 4,
    relatedPosts: [],
  },

  // Post 5: Virtual IBANs
  {
    id: 'blog-virtual-iban-reality',
    slug: 'virtual-iban-vs-real-account',
    title: {
      en: 'Virtual IBANs: The Reality Behind the Numbers',
      ar: 'الـ Virtual IBAN: الحقيقة خلف الحسابات الوهمية',
    },
    excerpt: {
      en: 'A Virtual IBAN is not a real bank account. It is a smart routing address pointing to a pooled Omnibus account.',
      ar: 'خطأ شائع: الـ Virtual IBAN ليس حساباً بنكياً حقيقياً، بل هو عنوان توجيه ذكي يصب في حساب مجمّع (Omnibus Account).',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'في خطأ شائع وموجود بكثرة بين مطورين الفنتك. ناس كثيرة تظن إن الـ Virtual IBAN هو حساب بنكي فعلي. ولكن في الواقع ما هو إلا عنوان افتراضي للإيداع.',
        },
        {
          type: 'header',
          level: 3,
          text: 'كيف يعمل الـ Omnibus Account؟',
        },
        {
          type: 'paragraph',
          text: 'أنت كشركة فنتك لما تفتح حساب عند بنك، غالباً البنك يعطيك ما يُسمى بـ Omnibus Account أو Client Pooled Account. هذا حساب واحد لكن يحتوي أموال كل عملاءك مجمعة.',
        },
        {
          type: 'header',
          level: 3,
          text: 'دور الـ Virtual IBAN',
        },
        {
          type: 'paragraph',
          text: 'طيب كيف نعرف كل إيداع تابع لأي عميل؟ هنا يجي دور الـ Virtual IBAN. لكل عميل يتم توليد IBAN مميز (مثلاً: SA...001). لما العميل يحول لهذا الآيبان، الفلوس توصل فعلياً للـ Omnibus Account، لكن نظامك يربط التحويل بالعميل الصح.',
        },
        {
          type: 'highlight',
          variant: 'info',
          title: 'نقاط مهمة',
          text: 'البنك فعلياً ما يفتح حساب مستقل لكل عميل. الـ Virtual IBAN مجرد توجيه داخلي. والتحويلات الخارجية (Inbound) فقط هي اللي تستخدمه.',
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'A common misconception among fintech developers is that a Virtual IBAN is a real bank account. In reality, it is just a virtual address for routing deposits.',
        },
        {
          type: 'header',
          level: 3,
          text: 'The Omnibus Account',
        },
        {
          type: 'paragraph',
          text: 'When a fintech opens a bank account, they get an Omnibus (or Pooled) Account. This single account holds the funds of all your customers mixed together.',
        },
        {
          type: 'header',
          level: 3,
          text: 'The Role of Virtual IBAN',
        },
        {
          type: 'paragraph',
          text: 'So how do we know whose money is whose? That\'s where the Virtual IBAN comes in. It acts as a reference. When funds are sent to it, they physically land in the Omnibus account, but your system recognizes the unique IBAN and credits the specific user.',
        },
        {
          type: 'highlight',
          variant: 'info',
          title: 'Key Takeaway',
          text: 'The bank does not open a separate account for each user. The Virtual IBAN is just smart internal routing, primarily used for Inbound transfers.',
        },
      ],
    },
    featuredImage: '/images/blogs/virtual-iban.jpg',
    category: blogCategories.find(c => c.slug === 'payments-infrastructure')!,
    tags: ['virtual-iban', 'banking', 'omnibus-account', 'ledger', 'fintech-infrastructure'],
    author: defaultAuthor,
    publishedAt: '2024-08-25T09:30:00Z',
    readTime: 5,
    relatedPosts: ['blog-payment-flow-explained'],
  },

  // Post 6: Clearance vs Settlement
  {
    id: 'blog-clearance-vs-settlement',
    slug: 'clearance-vs-settlement-banking',
    title: {
      en: 'Clearance vs. Settlement: The Backbone of Banking',
      ar: 'المقاصة والتسوية: الفرق الذي يحمي النظام المالي',
    },
    excerpt: {
      en: 'Why doesn\'t money move instantly? Understanding the difference between Clearance (verification) and Settlement (actual movement of funds).',
      ar: 'لماذا لا تتحرك الأموال فوراً؟ الفرق الجوهري بين عملية المقاصة (التحقق) وعملية التسوية (نقل الأموال الفعلي) ودورها في إدارة السيولة.',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'في أنظمة المدفوعات العالمية، تحويل الأموال يمر بمرحلتين بالتحديد هما أساس النظام المالي: المقاصة (Clearance) والتسوية (Settlement).',
        },
        {
          type: 'header',
          level: 3,
          text: 'أولاً: المقاصة (Clearance)',
        },
        {
          type: 'paragraph',
          text: 'المقاصة ما فيها نقل أموال فعلي. هي عملية تحقق ومطابقة للتأكد من أن كل عملية تحويل صحيحة قبل أن تتحرك أي أموال. هي صمام الأمان.',
        },
        {
          type: 'header',
          level: 3,
          text: 'ثانياً: التسوية (Settlement)',
        },
        {
          type: 'paragraph',
          text: 'هي المرحلة اللي يتم فيها التحويل الفعلي للأموال بين البنوك، وغالباً تتم عن طريق البنك المركزي. هنا تنتقل القيمة الحقيقية وتُغلق العملية مالياً.',
        },
        {
          type: 'quote',
          text: 'لو كل تحويل يُنفذ لحظياً، البنوك كانت بتحتاج سيولة ضخمة جداً. المقاصة تحسب "صافي الالتزامات" (Netting) لتقليل المخاطر.',
        },
        {
          type: 'paragraph',
          text: 'هذا المبدأ موجود في كل الأنظمة سواء RTGS، ACH، أو حتى UPI. المقاصة للأمان، والتسوية للنتائج الفعلية.',
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'In global payment systems, money transfer goes through two critical phases that form the backbone of finance: Clearance and Settlement.',
        },
        {
          type: 'header',
          level: 3,
          text: '1. Clearance',
        },
        {
          type: 'paragraph',
          text: 'No actual money moves here. It is a verification and matching process to ensure transaction validity. It acts as the safety valve.',
        },
        {
          type: 'header',
          level: 3,
          text: '2. Settlement',
        },
        {
          type: 'paragraph',
          text: 'This is where the actual funds move between banks, usually via the Central Bank. Here, the value is transferred, and the transaction is financially closed.',
        },
        {
          type: 'quote',
          text: 'If every transfer settled instantly, banks would need massive liquidity. Clearance allows for "Netting" to reduce risk and liquidity requirements.',
        },
        {
          type: 'paragraph',
          text: 'This principle applies everywhere, from RTGS and ACH to UPI. Clearance is for safety; Settlement is for finality.',
        },
      ],
    },
    featuredImage: '/images/blogs/clearance-settlement.jpg',
    category: blogCategories.find(c => c.slug === 'payments-infrastructure')!,
    tags: ['banking', 'settlement', 'clearance', 'central-bank', 'liquidity'],
    author: { id: 'author-me', name: { en: 'Fintech Poster', ar: 'Fintech Poster' } },
    publishedAt: '2024-09-01T13:00:00Z',
    readTime: 4,
    relatedPosts: [],
  },

  // Post 7: UPI (India)
  {
    id: 'blog-upi-india-fintech',
    slug: 'upi-india-payments-revolution',
    title: {
      en: 'How UPI Changed India\'s Economy Forever',
      ar: 'نظام UPI: كيف غيرت الهند شكل الاقتصاد الرقمي',
    },
    excerpt: {
      en: 'The Unified Payments Interface (UPI) connected banks, wallets, and users into one network, making transactions instantaneous using simple aliases.',
      ar: 'نظام المدفوعات الموحد (UPI) ربط البنوك والمحافظ في شبكة واحدة، مما جعل التحويل يتم في ثوانٍ باستخدام معرف بسيط (Ali@Bank) بدلاً من أرقام الحسابات.',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'نظام المدفوعات الهندي UPI (Unified Payments Interface) غير شكل الاقتصاد في الهند بالكامل. فكرته ربط كل البنوك والشركات المالية بنظام مركزي موحد.',
        },
        {
          type: 'header',
          level: 3,
          text: 'سهولة العنوان (Alias)',
        },
        {
          type: 'paragraph',
          text: 'النظام يتيح لأي شخص يحول أموال في ثواني بدون رقم حساب أو آيبان، فقط بمعرف بسيط مثل ali@hdfc. هذا المعرف مرتبط بحسابك البنكي مباشرة.',
        },
        {
          type: 'highlight',
          variant: 'success',
          title: 'النتائج',
          text: 'بفضل هذا الابتكار، الهند اليوم تنفّذ أكثر من 15 مليار عملية شهرية عبر UPI. صار النظام جزء من الحياة اليومية، من البقالة الصغيرة إلى الشركات الكبرى.',
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'India\'s Unified Payments Interface (UPI) completely reshaped its economy. The idea was to connect all banks and fintechs into one central unified system.',
        },
        {
          type: 'header',
          level: 3,
          text: 'Simplicity of Aliases',
        },
        {
          type: 'paragraph',
          text: 'The system allows anyone to transfer money in seconds without an account number or IBAN, using just a simple ID like ali@hdfc linked directly to the bank account.',
        },
        {
          type: 'highlight',
          variant: 'success',
          title: 'The Impact',
          text: 'Thanks to this innovation, India now executes over 15 billion transactions monthly via UPI. It has become part of daily life, from small grocery stores to major corporations.',
        },
      ],
    },
    featuredImage: '/images/blogs/upi-india.jpg',
    category: blogCategories.find(c => c.slug === 'payments-infrastructure')!,
    tags: ['upi', 'india', 'real-time-payments', 'fintech-innovation'],
    author: defaultAuthor,
    publishedAt: '2024-09-15T15:00:00Z',
    readTime: 3,
    relatedPosts: ['blog-clearance-vs-settlement'],
  },

  // Post 8: SAMA vs CMA
  {
    id: 'blog-sama-vs-cma-saudi',
    slug: 'sama-vs-cma-saudi-fintech-guide',
    title: {
      en: 'SAMA vs. CMA: Navigating the Saudi Fintech Regulatory Landscape',
      ar: 'ساما vs هيئة السوق المالية: دليلك لفهم المشهد التنظيمي في السعودية',
    },
    excerpt: {
      en: 'Launching a fintech in Saudi Arabia? You must know the difference between the Capital Market Authority (Investment) and SAMA (Payments & Banking).',
      ar: 'هل تخطط لإطلاق شركة فنتك في السعودية؟ يجب أن تعرف الفرق الجوهري بين هيئة السوق المالية (للاستثمار) والبنك المركزي (للمدفوعات).',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'لو أنت داخل سوق الفنتك السعودي، في جهتين لازم تفهم دورهم قبل ما تبدأ، لأن كل واحدة لها اختصاص مختلف تماماً.',
        },
        {
          type: 'header',
          level: 3,
          text: '1. هيئة السوق المالية (CMA)',
        },
        {
          type: 'paragraph',
          text: 'هذه الجهة مسؤولة عن تنظيم وإصدار التراخيص للشركات اللي تشتغل في مجال إدارة الاستثمارات والأصول. يعني لو تطبيقك يقدم خدمات زي:',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'المستشار الآلي (Robo Advisory).',
            'التداول في الأسهم.',
            'إدارة المحافظ والصناديق الاستثمارية.',
          ],
        },
        {
          type: 'paragraph',
          text: 'فأنت تحت مظلة CMA. التركيز هنا على حوكمة قوية، حماية المستثمرين، والإفصاح الكامل.',
        },
        {
          type: 'header',
          level: 3,
          text: '2. البنك المركزي السعودي (SAMA)',
        },
        {
          type: 'paragraph',
          text: 'هذه الجهة مسؤولة عن المدفوعات والخدمات المالية غير الاستثمارية. لو تطبيقك يقدم:',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'محافظ إلكترونية (Digital Wallets).',
            'بوابات دفع (Payment Gateways).',
            'خدمات اشترِ الآن وادفع لاحقاً (BNPL).',
          ],
        },
        {
          type: 'paragraph',
          text: 'فأنت تحت إشراف ساما. التركيز هنا على الأمن السيبراني، كفاية رأس المال، وحماية بيانات العملاء.',
        },
        {
          type: 'highlight',
          variant: 'info',
          title: 'الخلاصة',
          text: 'CMA تركز على الاستثمار والثقة في الأسواق. بينما SAMA تركز على الاستقرار المالي والأمان في المدفوعات.',
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'If you are entering the Saudi fintech market, you must understand the roles of two key regulators, as each has a completely different jurisdiction.',
        },
        {
          type: 'header',
          level: 3,
          text: '1. Capital Market Authority (CMA)',
        },
        {
          type: 'paragraph',
          text: 'Responsible for licensing companies in investment and asset management. You fall under CMA if your app offers:',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Robo Advisory.',
            'Stock Trading.',
            'Portfolio & Fund Management.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Focus here is on strong governance, investor protection, and full disclosure.',
        },
        {
          type: 'header',
          level: 3,
          text: '2. Saudi Central Bank (SAMA)',
        },
        {
          type: 'paragraph',
          text: 'Responsible for payments and non-investment financial services. You fall under SAMA if you offer:',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Digital Wallets.',
            'Payment Gateways.',
            'Buy Now Pay Later (BNPL).',
          ],
        },
        {
          type: 'highlight',
          variant: 'info',
          title: 'The Bottom Line',
          text: 'CMA focuses on Investment and Market Trust. SAMA focuses on Financial Stability and Payment Security.',
        },
      ],
    },
    featuredImage: '/images/blogs/sama-vs-cma.jpg',
    category: blogCategories.find(c => c.slug === 'regulatory-compliance')!,
    tags: ['sama', 'cma', 'saudi-fintech', 'regulations', 'licensing'],
    author: { id: 'author-me', name: { en: 'Fintech Poster', ar: 'Fintech Poster' } },
    publishedAt: '2024-05-20T10:00:00Z',
    readTime: 4,
    relatedPosts: [],
  },

  // Post 9: Compliance by Design
  {
    id: 'blog-compliance-by-design',
    slug: 'compliance-by-design-fintech',
    title: {
      en: 'Compliance by Design: The Startup\'s Secret Weapon',
      ar: 'الامتثال بالتصميم (Compliance by Design): السلاح السري للشركات الناشئة',
    },
    excerpt: {
      en: 'Why treating compliance as a core design principle—rather than an afterthought—saves startups from regulatory disasters.',
      ar: 'لماذا يعتبر بناء الامتثال داخل تصميم المنتج منذ اليوم الأول (وليس كإجراء لاحق) هو الطريقة الوحيدة للنجاة في الأسواق المنظمة.',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'لما نقول إن الامتثال في التصميم (Compliance By Design) هو السلاح السري للشركات الناشئة، إحنا نقصد طريقة تفكير مختلفة تماماً عن الأسلوب التقليدي.',
        },
        {
          type: 'paragraph',
          text: 'بدل ما تبني منتجك بسرعة ثم تضطر توقفه عشان تعالج مشاكل قانونية، تقدر تصمم كل شيء من البداية وكأن الامتثال جزء طبيعي من تجربة المستخدم، زي ما تهتم بسهولة الدفع أو سرعة التسجيل.',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'هل فعلاً أحتاج هذه المعلومة من العميل؟',
            'وين أخزنها؟',
            'كيف أقدر أحذفها لو طلب العميل؟',
          ],
        },
        {
          type: 'paragraph',
          text: 'الشركات الناشئة عندها فرصة ذهبية تبني أنظمتها على أسس مرنة تتكيف مع GDPR أو PDPL بدون ما تدخل في دوامة التعديل بعد الإطلاق.',
        },
        {
          type: 'quote',
          text: 'الامتثال في التصميم مو مجرد التزام قانوني، هو استثمار في المرونة والسرعة وثقة المستثمرين.',
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'When we say Compliance by Design is a secret weapon for startups, we mean a fundamentally different mindset from the traditional "build first, fix later" approach.',
        },
        {
          type: 'paragraph',
          text: 'Instead of rushing a product and then halting it to fix legal issues, you design everything from day one with compliance as a core feature, just like UX or speed.',
        },
        {
          type: 'paragraph',
          text: 'You must ask constantly:',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Do I really need this data?',
            'Where is it stored?',
            'How can I delete it if the user asks?',
          ],
        },
        {
          type: 'quote',
          text: 'Compliance by Design is not just legal obligation; it is an investment in agility, speed, and investor confidence.',
        },
      ],
    },
    featuredImage: '/images/blogs/compliance-design.jpg',
    category: blogCategories.find(c => c.slug === 'regulatory-compliance')!,
    tags: ['compliance-by-design', 'gdpr', 'pdpl', 'startups', 'regtech'],
    author: defaultAuthor,
    publishedAt: '2024-06-01T14:00:00Z',
    readTime: 3,
    relatedPosts: ['blog-sama-vs-cma-saudi'],
  },

  // Post 10: Deleting User Data (Technical)
  {
    id: 'blog-data-deletion-microservices',
    slug: 'user-data-deletion-in-microservices',
    title: {
      en: 'The Nightmare of Deleting User Data in Microservices',
      ar: 'كابوس حذف بيانات المستخدم في معمارية Microservices',
    },
    excerpt: {
      en: 'Deleting a user is not just a DELETE SQL query. In a distributed fintech system, it requires a complex orchestration across KYC, Wallets, and Ledgers.',
      ar: 'حذف المستخدم ليس مجرد أمر DELETE في قاعدة البيانات. في أنظمة الفنتك الموزعة، العملية تتطلب تنسيقاً دقيقاً بين خدمات الهوية، المحافظ، والسجلات المحاسبية.',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'في تطبيقات الـ Fintech المبنية على Microservices، حذف بيانات المستخدم عملية مركبة تتطلب وعي كامل ببنية النظام. البيانات ليست في مكان واحد، بل منتشرة عبر عشرات الخدمات:',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'KYC: مستندات الهوية والمطابقة.',
            'Wallet: أرصدة وحركات.',
            'Ledger: المعاملات المحاسبية (لا تقبل التلاعب).',
            'CRM & Analytics: سجلات الدعم والتحليل.',
          ],
        },
        {
          type: 'header',
          level: 3,
          text: 'كيف ننفذ "حق النسيان"؟',
        },
        {
          type: 'paragraph',
          text: 'لتطبيق قوانين مثل PDPL أو GDPR، أفضل الحلول هو:',
        },
        {
          type: 'list',
          style: 'ordered',
          items: [
            'خريطة بيانات (Data Map): معرفة كل نقطة تخزين.',
            'واجهة حذف (API/Event): لكل خدمة آلية للحذف.',
            'الاحتفاظ القانوني: بيانات AML لا تُحذف بل يتم إخفاء هوية صاحبها (Anonymization).',
            'سجلات التدقيق (Audit Logs): توثيق عملية الحذف للامتثال.',
          ],
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'In Fintech apps built on Microservices, user deletion is a complex orchestration. Data is not in one place; it is scattered across dozens of services:',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'KYC Service: ID documents and biometrics.',
            'Wallet Service: Balances and transaction history.',
            'Ledger: Immutable accounting records.',
            'CRM & Analytics: Support logs.',
          ],
        },
        {
          type: 'header',
          level: 3,
          text: 'Executing the "Right to be Forgotten"',
        },
        {
          type: 'paragraph',
          text: 'To comply with PDPL or GDPR, you need:',
        },
        {
          type: 'list',
          style: 'ordered',
          items: [
            'Data Mapping: Knowing exactly where data lives.',
            'Deletion API/Events: Each service must handle a deletion request.',
            'Legal Retention: AML data cannot be deleted; it must be Anonymized.',
            'Audit Logs: Documenting the deletion process for regulators.',
          ],
        },
      ],
    },
    featuredImage: '/images/blogs/data-deletion.jpg',
    category: blogCategories.find(c => c.slug === 'regulatory-compliance')!,
    tags: ['microservices', 'data-privacy', 'pdpl', 'gdpr', 'system-design'],
    author: defaultAuthor,
    publishedAt: '2024-07-15T09:00:00Z',
    readTime: 5,
    relatedPosts: ['blog-compliance-by-design'],
  },

  // Post 11: GDPR vs CCPA
  {
    id: 'blog-gdpr-vs-ccpa',
    slug: 'why-meta-pays-fines-europe-vs-usa',
    title: {
      en: 'Why Meta Pays Billions in Europe but Not in the US',
      ar: 'لماذا تدفع ميتا المليارات في أوروبا وتسلم في أمريكا؟',
    },
    excerpt: {
      en: 'The fundamental difference between Europe\'s GDPR (Opt-in) and California\'s CCPA (Opt-out) explains the disparity in tech fines.',
      ar: 'الفرق الجوهري بين قانون GDPR الأوروبي (الموافقة المسبقة) وقانون CCPA الأمريكي (حق الانسحاب) يفسر تباين العقوبات على شركات التقنية.',
    },
    content: {
      ar: [
        {
          type: 'paragraph',
          text: 'ليش شركات زي ميتا (فيسبوك سابقًا) تضطر أنها تدفع غرامات في أوروبا… لكنها في أمريكا تمشي عادي؟ الجواب باختصار: الفرق بين قانون GDPR الأوروبي وقانون كاليفورنيا CCPA.',
        },
        {
          type: 'header',
          level: 3,
          text: 'الفرق في المنهجية',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'أوروبا (GDPR): يمنع جمع البيانات إلا بإذن صريح (Opt-in). أي جمع بدون شفافية يعرضك للعقوبة.',
            'أمريكا (CCPA): يركز على "الحق في الانسحاب" (Opt-out). لا يمنع الجمع من البداية، لكن يعطي المستخدم حق الرفض لاحقاً.',
          ],
        },
        {
          type: 'paragraph',
          text: 'لهذا السبب، تم تغريم ميتا في أوروبا. القوانين اليوم تحدد شكل الثقة بينك وبين المستخدم. لما تبني منتج يحترم الخصوصية تلقائياً، أنت تصنع فرقاً بين شركة مؤقتة وشركة تدوم.',
        },
      ],
      en: [
        {
          type: 'paragraph',
          text: 'Why do companies like Meta pay huge fines in Europe but seem fine in the US? The answer lies in the difference between GDPR and California\'s CCPA.',
        },
        {
          type: 'header',
          level: 3,
          text: 'The Methodological Difference',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Europe (GDPR): Strictly forbids data collection without explicit prior consent (Opt-in).',
            'USA (CCPA): Focuses on the "Right to Opt-out". It doesn\'t stop collection initially but gives users the right to say no later.',
          ],
        },
        {
          type: 'paragraph',
          text: 'This is why Meta gets fined in Europe. Laws today define trust. Building a product that respects privacy by default distinguishes a lasting company from a temporary one.',
        },
      ],
    },
    featuredImage: '/images/blogs/gdpr-ccpa.jpg',
    category: blogCategories.find(c => c.slug === 'regulatory-compliance')!,
    tags: ['gdpr', 'ccpa', 'data-privacy', 'meta', 'regulations'],
    author:defaultAuthor,
    publishedAt: '2024-08-05T12:00:00Z',
    readTime: 3,
    relatedPosts: ['blog-data-deletion-microservices'],
  },


];

