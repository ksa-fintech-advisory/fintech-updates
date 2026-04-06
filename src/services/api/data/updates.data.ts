/**
 * Static regulatory updates (previously seeded in Postgres).
 * Edit this file to add or change update entries — no database required.
 */
export interface StaticUpdateRecord {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  summaryEn: string;
  summaryAr: string;
  icon: string;
  featuredImage: string | null;
  /** JSON string of content blocks */
  content: string;
  source: string | null;
  category: string | null;
  /** JSON string array of { title, url } */
  references: string | null;
  pdfUrl: string | null;
  date: string;
  publishedAt: string;
  featured: boolean;
}

export const staticUpdateRecords: StaticUpdateRecord[] = [
  {
    id: 'sama-digital-payments-framework-2024',
    slug: 'sama-digital-payments-framework-2024',
    titleEn: 'SAMA Digital Payments Framework 2024',
    titleAr: 'إطار المدفوعات الرقمية 2024 من ساما',
    descriptionEn:
      'Saudi Central Bank announces comprehensive regulatory framework for digital payment services and e-wallets',
    descriptionAr:
      'البنك المركزي السعودي يعلن عن إطار تنظيمي شامل لخدمات المدفوعات الرقمية والمحافظ الإلكترونية',
    summaryEn: 'SAMA introduces new regulations to enhance digital payment security and innovation in the Kingdom',
    summaryAr: 'ساما تقدم لوائح جديدة لتعزيز أمان المدفوعات الرقمية والابتكار في المملكة',
    icon: '💳',
    featuredImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200',
    content: JSON.stringify([
      {
        type: 'paragraph',
        content:
          'The Saudi Central Bank (SAMA) has released a comprehensive framework governing digital payment services in the Kingdom.',
      },
      { type: 'heading', level: 2, content: 'Key Highlights' },
      {
        type: 'list',
        items: [
          'Enhanced security requirements for payment processors',
          'Standardized API protocols for fintech integration',
          'Consumer protection measures',
          'Real-time fraud detection mandates',
        ],
      },
      {
        type: 'highlight',
        content:
          'All licensed payment service providers must comply with the new framework by Q2 2025.',
      },
      {
        type: 'paragraph',
        content:
          'This framework aims to foster innovation while maintaining the highest security standards in the rapidly growing digital payments sector.',
      },
    ]),
    source: 'SAMA',
    category: 'Regulation',
    references: JSON.stringify([
      { title: 'SAMA Official Announcement', url: 'https://www.sama.gov.sa' },
      { title: 'Digital Payments Framework PDF', url: 'https://www.sama.gov.sa/framework-2024.pdf' },
    ]),
    pdfUrl: 'https://www.sama.gov.sa/digital-payments-framework-2024.pdf',
    date: '2024-12-15T00:00:00.000Z',
    publishedAt: '2024-12-15T00:00:00.000Z',
    featured: true,
  },
  {
    id: 'open-banking-api-guidelines',
    slug: 'open-banking-api-guidelines',
    titleEn: 'Open Banking API Guidelines',
    titleAr: 'إرشادات واجهات البرمجة المصرفية المفتوحة',
    descriptionEn:
      'Comprehensive guidelines for open banking implementation and data sharing standards in Saudi Arabia',
    descriptionAr: 'إرشادات شاملة لتنفيذ الخدمات المصرفية المفتوحة ومعايير مشاركة البيانات في السعودية',
    summaryEn: 'New technical standards enable secure data sharing between banks and licensed fintechs',
    summaryAr: 'معايير تقنية جديدة تمكن من مشاركة البيانات بشكل آمن بين البنوك وشركات التقنية المالية المرخصة',
    icon: '🏦',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
    content: JSON.stringify([
      {
        type: 'paragraph',
        content:
          'SAMA has published detailed technical guidelines for implementing open banking APIs across Saudi financial institutions.',
      },
      { type: 'heading', level: 2, content: 'Implementation Timeline' },
      {
        type: 'list',
        items: [
          'Phase 1: Account information APIs (Q1 2025)',
          'Phase 2: Payment initiation APIs (Q3 2025)',
          'Phase 3: Advanced services (Q1 2026)',
        ],
      },
      {
        type: 'paragraph',
        content:
          'The guidelines cover authentication, encryption, consent management, and data access protocols.',
      },
    ]),
    source: 'SAMA',
    category: 'Compliance',
    references: JSON.stringify([{ title: 'Open Banking Standards', url: 'https://www.sama.gov.sa/open-banking' }]),
    pdfUrl: null,
    date: '2024-12-10T00:00:00.000Z',
    publishedAt: '2024-12-10T00:00:00.000Z',
    featured: true,
  },
  {
    id: 'fintech-licensing-streamline',
    slug: 'fintech-licensing-streamline',
    titleEn: 'Streamlined Fintech Licensing Process',
    titleAr: 'عملية ترخيص مبسطة للتقنية المالية',
    descriptionEn: 'SAMA announces expedited licensing procedures for innovative fintech startups',
    descriptionAr: 'ساما تعلن عن إجراءات ترخيص سريعة للشركات الناشئة المبتكرة في مجال التقنية المالية',
    summaryEn: 'Fast-track licensing pathway reduces approval time from 6 months to 90 days for eligible fintechs',
    summaryAr: 'مسار ترخيص سريع يقلل وقت الموافقة من 6 أشهر إلى 90 يومًا للشركات المؤهلة',
    icon: '📋',
    featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200',
    content: JSON.stringify([
      {
        type: 'paragraph',
        content:
          'In a move to accelerate fintech innovation, SAMA has introduced a streamlined licensing framework.',
      },
      { type: 'heading', level: 2, content: 'Eligibility Criteria' },
      {
        type: 'list',
        items: [
          'Innovative technology solution',
          'Minimum viable product demonstrated',
          'Compliance roadmap in place',
          'Qualified management team',
        ],
      },
      {
        type: 'highlight',
        content: 'Startups can now launch in regulatory sandbox within 45 days of application.',
      },
    ]),
    source: 'SAMA',
    category: 'Announcement',
    references: JSON.stringify([]),
    pdfUrl: null,
    date: '2024-12-05T00:00:00.000Z',
    publishedAt: '2024-12-05T00:00:00.000Z',
    featured: true,
  },
  {
    id: 'cryptocurrency-regulations-clarification',
    slug: 'cryptocurrency-regulations-clarification',
    titleEn: 'Cryptocurrency Services Clarification',
    titleAr: 'توضيحات خدمات العملات المشفرة',
    descriptionEn: 'SAMA provides guidance on cryptocurrency trading and custody service regulations',
    descriptionAr: 'ساما تقدم إرشادات حول لوائح تداول وحفظ العملات المشفرة',
    summaryEn: 'Clear regulatory position on crypto asset services and licensing requirements',
    summaryAr: 'موقف تنظيمي واضح بشأن خدمات الأصول الرقمية ومتطلبات الترخيص',
    icon: '₿',
    featuredImage: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200',
    content: JSON.stringify([
      {
        type: 'paragraph',
        content:
          'SAMA has issued clarifications regarding the regulatory treatment of cryptocurrency-related services in Saudi Arabia.',
      },
      {
        type: 'list',
        items: [
          'Custody services require specific SAMA licensing',
          'Trading platforms must meet AML/KYC requirements',
          'Consumer protection measures mandatory',
        ],
      },
    ]),
    source: 'SAMA',
    category: 'Regulation',
    references: JSON.stringify([]),
    pdfUrl: null,
    date: '2024-11-28T00:00:00.000Z',
    publishedAt: '2024-11-28T00:00:00.000Z',
    featured: false,
  },
  {
    id: 'regtech-framework-2024',
    slug: 'regtech-framework-2024',
    titleEn: 'RegTech Framework Launch',
    titleAr: 'إطلاق إطار التقنية التنظيمية',
    descriptionEn:
      'New regulatory technology framework designed to enhance compliance efficiency across financial sector',
    descriptionAr: 'إطار تقني تنظيمي جديد مصمم لتعزيز كفاءة الامتثال في القطاع المالي',
    summaryEn: 'Automated compliance tools and real-time reporting standards introduced',
    summaryAr: 'تقديم أدوات امتثال آلية ومعايير إبلاغ فوري',
    icon: '⚖️',
    featuredImage: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=1200',
    content: JSON.stringify([
      {
        type: 'paragraph',
        content:
          'The new RegTech framework enables financial institutions to leverage technology for more efficient regulatory compliance.',
      },
      { type: 'heading', level: 2, content: 'Framework Components' },
      {
        type: 'list',
        items: [
          'Automated transaction monitoring',
          'Real-time suspicious activity reporting',
          'Standardized compliance APIs',
          'Machine learning for risk assessment',
        ],
      },
    ]),
    source: 'SAMA',
    category: 'Compliance',
    references: JSON.stringify([]),
    pdfUrl: null,
    date: '2024-11-20T00:00:00.000Z',
    publishedAt: '2024-11-20T00:00:00.000Z',
    featured: false,
  },
];
