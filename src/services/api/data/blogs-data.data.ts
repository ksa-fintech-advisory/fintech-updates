import { Blog, BlogCategory } from '@/core/types/web/blog';
import { linkedInSharesBlogs } from './linkedin-shares.blogs';

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
    author: { id: 'author-me', name: { en: 'Fintech Poster', ar: 'Fintech Poster' } },
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
    author: { id: 'author-me', name: { en: 'Fintech Poster', ar: 'Fintech Poster' } },
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
    author: { id: 'author-me', name: { en: 'Fintech Poster', ar: 'Fintech Poster' } },
    publishedAt: '2024-07-05T09:00:00Z',
    readTime: 3,
    relatedPosts: ['blog-kafka-fintech-hype'],
  },
  ...linkedInSharesBlogs,
];

