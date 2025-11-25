import { Guide, GuideCategory } from '@/core/types/web/guide';

// Categories
export const guideCategories: GuideCategory[] = [
  {
    id: 'cat-architecture',
    name: { en: 'System Architecture', ar: 'بنية الأنظمة' },
    slug: 'architecture',
    color: '#006747',
    icon: '🏗️',
  },
  {
    id: 'cat-security',
    name: { en: 'Security & Compliance', ar: 'الأمن والامتثال' },
    slug: 'security',
    color: '#DC2626',
    icon: '🔐',
  },
  {
    id: 'cat-apis',
    name: { en: 'API Design', ar: 'تصميم واجهات برمجة التطبيقات' },
    slug: 'apis',
    color: '#7C3AED',
    icon: '🔌',
  },
  {
    id: 'cat-payments',
    name: { en: 'Payment Systems', ar: 'أنظمة الدفع' },
    slug: 'payments',
    color: '#D4AF37',
    icon: '💳',
  },
];

// Guides
export const guides: Guide[] = [
  {
    id: 'guide-1',
    slug: 'building-payment-gateway-architecture',
    title: {
      en: 'Building a Secure Payment Gateway: Complete Architecture Guide',
      ar: 'بناء بوابة دفع آمنة: دليل البنية الكامل',
    },
    description: {
      en: 'Learn how to design and implement a production-ready payment gateway with PCI DSS compliance, fraud detection, and real-time transaction processing. Covers microservices architecture, database design, and API security.',
      ar: 'تعلم كيفية تصميم وتنفيذ بوابة دفع جاهزة للإنتاج مع الامتثال لمعايير PCI DSS، واكتشاف الاحتيال، ومعالجة المعاملات في الوقت الفعلي. يغطي بنية الخدمات المصغرة وتصميم قواعد البيانات وأمن واجهات برمجة التطبيقات.',
    },
    category: guideCategories[0],
    difficulty: 'advanced',
    duration: '60 min read',
    icon: '💳',
    topics: ['Microservices', 'PCI DSS', 'Transaction Processing', 'API Gateway', 'Database Design'],
    publishedAt: '2024-11-01T08:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
  },
  {
    id: 'guide-2',
    slug: 'digital-wallet-implementation',
    title: {
      en: 'Implementing a Digital Wallet: From Design to Deployment',
      ar: 'تنفيذ محفظة رقمية: من التصميم إلى النشر',
    },
    description: {
      en: 'Step-by-step guide to building a digital wallet system similar to Apple Pay or STC Pay. Includes balance management, peer-to-peer transfers, QR code payments, and transaction history with high availability architecture.',
      ar: 'دليل خطوة بخطوة لبناء نظام محفظة رقمية مشابه لـ Apple Pay أو STC Pay. يتضمن إدارة الرصيد، والتحويلات بين الأقران، ومدفوعات رمز الاستجابة السريعة، وسجل المعاملات مع بنية عالية التوافر.',
    },
    category: guideCategories[3],
    difficulty: 'intermediate',
    duration: '45 min read',
    icon: '👛',
    topics: ['Wallet Architecture', 'P2P Transfers', 'QR Payments', 'Load Balancing', 'Caching Strategy'],
    publishedAt: '2024-10-15T09:00:00Z',
    updatedAt: '2024-11-18T14:00:00Z',
  },
  {
    id: 'guide-3',
    slug: 'kyc-aml-system-design',
    title: {
      en: 'KYC/AML System Design: Regulatory Compliance in FinTech',
      ar: 'تصميم نظام اعرف عميلك ومكافحة غسل الأموال: الامتثال التنظيمي في التقنية المالية',
    },
    description: {
      en: 'Comprehensive guide to designing KYC and AML systems that comply with SAMA regulations. Covers identity verification, document processing with OCR, risk scoring algorithms, and automated compliance reporting.',
      ar: 'دليل شامل لتصميم أنظمة اعرف عميلك ومكافحة غسل الأموال المتوافقة مع لوائح ساما. يغطي التحقق من الهوية، ومعالجة المستندات بتقنية التعرف البصري على الحروف، وخوارزميات تقييم المخاطر، وإعداد التقارير التلقائية للامتثال.',
    },
    category: guideCategories[1],
    difficulty: 'advanced',
    duration: '50 min read',
    icon: '🔍',
    topics: ['Identity Verification', 'OCR Processing', 'Risk Scoring', 'SAMA Compliance', 'Automated Reporting'],
    publishedAt: '2024-10-20T10:00:00Z',
    updatedAt: '2024-11-15T11:00:00Z',
  },
  {
    id: 'guide-4',
    slug: 'real-time-transaction-processing',
    title: {
      en: 'Real-Time Transaction Processing: Event-Driven Architecture',
      ar: 'معالجة المعاملات في الوقت الفعلي: البنية الموجهة بالأحداث',
    },
    description: {
      en: 'Master event-driven architecture for processing thousands of transactions per second. Learn about message queues, event sourcing, CQRS patterns, and building resilient distributed systems for financial applications.',
      ar: 'إتقان البنية الموجهة بالأحداث لمعالجة آلاف المعاملات في الثانية. تعلم عن قوائم انتظار الرسائل، ومصادر الأحداث، وأنماط CQRS، وبناء أنظمة موزعة مرنة للتطبيقات المالية.',
    },
    category: guideCategories[0],
    difficulty: 'advanced',
duration: '55 min read',
    icon: '⚡',
    topics: ['Event Sourcing', 'CQRS', 'Message Queues', 'Apache Kafka', 'Distributed Systems'],
    publishedAt: '2024-10-25T08:30:00Z',
    updatedAt: '2024-11-12T09:00:00Z',
  },
  {
    id: 'guide-5',
    slug: 'api-security-best-practices',
    title: {
      en: 'API Security Best Practices for FinTech Applications',
      ar: 'أفضل ممارسات أمن واجهات برمجة التطبيقات لتطبيقات التقنية المالية',
    },
    description: {
      en: 'Complete guide to securing FinTech APIs. Covers OAuth 2.0, JWT authentication, rate limiting, API gateway patterns, encryption strategies, and defending against common attacks like SQL injection and XSS.',
      ar: 'دليل كامل لتأمين واجهات برمجة التطبيقات للتقنية المالية. يغطي OAuth 2.0، ومصادقة JWT، وتحديد المعدل، وأنماط بوابة API، واستراتيجيات التشفير، والدفاع ضد الهجمات الشائعة مثل حقن SQL وXSS.',
    },
    category: guideCategories[1],
    difficulty: 'intermediate',
    duration: '40 min read',
    icon: '🛡️',
    topics: ['OAuth 2.0', 'JWT', 'Rate Limiting', 'Encryption', 'API Gateway', 'Security Headers'],
    publishedAt: '2024-11-05T07:00:00Z',
    updatedAt: '2024-11-20T08:00:00Z',
  },
  {
    id: 'guide-6',
    slug: 'microservices-fintech-architecture',
    title: {
      en: 'Microservices Architecture for FinTech: Design Patterns & Best Practices',
      ar: 'بنية الخدمات المصغرة للتقنية المالية: أنماط التصميم وأفضل الممارسات',
    },
    description: {
      en: 'Learn how to structure FinTech platforms using microservices. Covers service boundaries, inter-service communication, data consistency, distributed transactions, and deployment strategies for financial services.',
      ar: 'تعلم كيفية بناء منصات التقنية المالية باستخدام الخدمات المصغرة. يغطي حدود الخدمات، والاتصال بين الخدمات، واتساق البيانات، والمعاملات الموزعة، واستراتيجيات النشر للخدمات المالية.',
    },
    category: guideCategories[0],
    difficulty: 'intermediate',
    duration: '50 min read',
    icon: '🔧',
    topics: ['Service Mesh', 'API Gateway', 'Service Discovery', 'Circuit Breaker', 'Saga Pattern'],
    publishedAt: '2024-11-08T09:00:00Z',
    updatedAt: '2024-11-19T10:30:00Z',
  },
];
