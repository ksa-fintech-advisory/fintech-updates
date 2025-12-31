import { ComplianceUpdate, ComplianceRegion, ComplianceCategory } from '@/core/types/web/compliance';

// Regions
export const complianceRegions: ComplianceRegion[] = [
  {
    id: 'region-ksa',
    name: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
    code: 'ksa',
    flag: '🇸🇦',
  },
  {
    id: 'region-uae',
    name: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
    code: 'uae',
    flag: '🇦🇪',
  },
  {
    id: 'region-bahrain',
    name: { en: 'Bahrain', ar: 'البحرين' },
    code: 'bahrain',
    flag: '🇧🇭',
  },
  {
    id: 'region-qatar',
    name: { en: 'Qatar', ar: 'قطر' },
    code: 'qatar',
    flag: '🇶🇦',
  },
  {
    id: 'region-kuwait',
    name: { en: 'Kuwait', ar: 'الكويت' },
    code: 'kuwait',
    flag: '🇰🇼',
  },
  {
    id: 'region-oman',
    name: { en: 'Oman', ar: 'عمان' },
    code: 'oman',
    flag: '🇴🇲',
  },
];

// Categories
export const complianceCategories: ComplianceCategory[] = [
  {
    id: 'cat-banking',
    name: { en: 'Banking Regulations', ar: 'اللوائح المصرفية' },
    color: '#006747',
  },
  {
    id: 'cat-payments',
    name: { en: 'Payment Systems', ar: 'أنظمة الدفع' },
    color: '#D4AF37',
  },
  {
    id: 'cat-licensing',
    name: { en: 'Licensing Requirements', ar: 'متطلبات الترخيص' },
    color: '#1E40AF',
  },
  {
    id: 'cat-cybersecurity',
    name: { en: 'Cybersecurity', ar: 'الأمن السيبراني' },
    color: '#7C3AED',
  },
  {
    id: 'cat-aml',
    name: { en: 'AML/CFT', ar: 'مكافحة غسل الأموال' },
    color: '#DC2626',
  },
];

// Compliance Updates
export const complianceUpdates: ComplianceUpdate[] = [
  {
    id: 'comp-1',
    region: complianceRegions[0], // KSA
    title: {
      en: 'SAMA Introduces New Open Banking Framework',
      ar: 'ساما تطلق إطار الخدمات المصرفية المفتوحة الجديد',
    },
    description: {
      en: 'The Saudi Central Bank (SAMA) has issued comprehensive guidelines for open banking, requiring all licensed banks to provide standardized APIs for third-party access by Q2 2025.',
      ar: 'أصدر البنك المركزي السعودي (ساما) مبادئ توجيهية شاملة للخدمات المصرفية المفتوحة، تتطلب من جميع البنوك المرخصة توفير واجهات برمجة تطبيقات موحدة للوصول من قبل الأطراف الثالثة بحلول الربع الثاني من 2025.',
    },
    category: complianceCategories[0],
    publishedAt: '2024-11-20T10:00:00Z',
    effectiveDate: '2025-04-01',
    source: 'SAMA',
    sourceUrl: 'https://www.sama.gov.sa',
  },
  {
    id: 'comp-2',
    region: complianceRegions[1], // UAE
    title: {
      en: 'UAE Central Bank Updates Payment Service Provider Regulations',
      ar: 'المصرف المركزي الإماراتي يحدث لوائح مزودي خدمات الدفع',
    },
    description: {
      en: 'The Central Bank of the UAE has updated regulations for Payment Service Providers (PSPs), introducing stricter capital requirements and enhanced consumer protection measures.',
      ar: 'قام المصرف المركزي للإمارات بتحديث اللوائح الخاصة بمزودي خدمات الدفع، مع تقديم متطلبات رأسمال أكثر صرامة وتدابير محسنة لحماية المستهلك.',
    },
    category: complianceCategories[1],
    publishedAt: '2024-11-18T14:00:00Z',
    effectiveDate: '2025-01-01',
    source: 'CBUAE',
    sourceUrl: 'https://www.centralbank.ae',
  },
  {
    id: 'comp-3',
    region: complianceRegions[2], // Bahrain
    title: {
      en: 'CBB Announces New Cybersecurity Framework for Financial Institutions',
      ar: 'مصرف البحرين المركزي يعلن عن إطار جديد للأمن السيبراني',
    },
    description: {
      en: 'The Central Bank of Bahrain (CBB) has released a comprehensive cybersecurity framework mandating all financial institutions to implement enhanced security controls and incident response procedures.',
      ar: 'أصدر مصرف البحرين المركزي إطاراً شاملاً للأمن السيبراني يلزم جميع المؤسسات المالية بتنفيذ ضوابط أمنية معززة وإجراءات الاستجابة للحوادث.',
    },
    category: complianceCategories[3],
    publishedAt: '2024-11-15T09:00:00Z',
    effectiveDate: '2025-03-01',
    source: 'CBB',
  },
  {
    id: 'comp-4',
    region: complianceRegions[0], // KSA
    title: {
      en: 'Updated AML/CFT Guidelines for FinTech Companies',
      ar: 'تحديث إرشادات مكافحة غسل الأموال لشركات التقنية المالية',
    },
    description: {
      en: 'SAMA has issued updated Anti-Money Laundering and Combating Financing of Terrorism guidelines specifically tailored for FinTech companies and digital payment providers.',
      ar: 'أصدرت ساما إرشادات محدثة لمكافحة غسل الأموال ومكافحة تمويل الإرهاب مصممة خصيصاً لشركات التقنية المالية ومزودي الدفع الرقمي.',
    },
    category: complianceCategories[4],
    publishedAt: '2024-11-12T11:00:00Z',
    effectiveDate: '2024-12-01',
    source: 'SAMA',
  },
  {
    id: 'comp-5',
    region: complianceRegions[3], // Qatar
    title: {
      en: 'QCB Introduces Digital Banking License Framework',
      ar: 'مصرف قطر المركزي يطلق إطار ترخيص الخدمات المصرفية الرقمية',
    },
    description: {
      en: 'Qatar Central Bank has introduced a new licensing framework for digital-only banks, enabling fully digital financial institutions to operate within Qatar.',
      ar: 'أطلق مصرف قطر المركزي إطاراً جديداً لترخيص البنوك الرقمية فقط، مما يتيح للمؤسسات المالية الرقمية بالكامل العمل داخل قطر.',
    },
    category: complianceCategories[2],
    publishedAt: '2024-11-10T13:00:00Z',
    effectiveDate: '2025-02-01',
    source: 'QCB',
  },
  {
    id: 'comp-6',
    region: complianceRegions[1], // UAE
    title: {
      en: 'Emirates Securities and Commodities Authority Updates Crypto Asset Regulations',
      ar: 'هيئة الأوراق المالية والسلع تحدث لوائح الأصول الرقمية',
    },
    description: {
      en: 'The Emirates Securities and Commodities Authority (SCA) has published updated regulations governing crypto asset service providers, including licensing and operational requirements.',
      ar: 'نشرت هيئة الأوراق المالية والسلع الإماراتية لوائح محدثة تحكم مزودي خدمات الأصول الرقمية، بما في ذلك متطلبات الترخيص والتشغيل.',
    },
    category: complianceCategories[2],
    publishedAt: '2024-11-08T10:00:00Z',
    effectiveDate: '2025-01-15',
    source: 'SCA',
  },
];
