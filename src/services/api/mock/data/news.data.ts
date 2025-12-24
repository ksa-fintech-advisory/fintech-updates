import { NewsUpdate } from '@/core/types/web/news';

export const newsUpdates: NewsUpdate[] = [
  {
    id: 'news-1',
    slug: 'sama-open-banking-framework-update',
    title: {
      en: 'SAMA Releases Updated Open Banking Framework',
      ar: 'البنك المركزي السعودي يصدر إطار العمل المحدث للمصرفية المفتوحة',
    },
    summary: {
      en: 'The Saudi Central Bank (SAMA) has published version 2.0 of the Open Banking Framework, introducing new technical standards.',
      ar: 'أصدر البنك المركزي السعودي الإصدار 2.0 من إطار العمل المصرفي المفتوح، مقدماً معايير فنية جديدة.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'The Saudi Central Bank (SAMA) continues to drive innovation in the financial sector with the release of the updated Open Banking Framework.',
        },
        {
                type: 'image',
                src: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2940&auto=format&fit=crop',
                alt: 'Open Banking Dashboard',
                caption: 'The new open banking interface standards.'
            },
            {
            type: 'quote',
            text: 'This update is a significant milestone in our journey towards a fully established fintech ecosystem.',
            author: 'SAMA Spokesperson'
        },
        {
            type: 'paragraph',
                text: 'Key highlights of the new framework include:',
            },
            {
                type: 'list',
                style: 'unordered',
                items: [
                    'Enhanced data security standards (FAPI 1.0 Advanced)',
                    'Standardized API specifications for account information services',
                    'New guidelines for Third Party Providers (TPPs) onboarding',
                    'Improved dispute resolution mechanisms'
                ]
            },
            {
                type: 'paragraph',
          text: 'New requirements focus on enhanced data security standards and improved API performance metrics for third-party providers (TPPs).',
        },
            {
                type: 'highlight',
                title: 'Executive Summary',
                text: 'The updated Open Banking Framework (v2.0) mandates strict adherence to FAPI 1.0 Advanced security profiles and introduces standardized API specifications to streamline TPP onboarding. Financial institutions must comply by Q2 2025.',
                variant: 'info'
            },
            {
                type: 'header',
                level: 2,
                text: 'Compliance Timeline'
            },
            {
                type: 'timeline',
                items: [
                    { date: 'Q1 2024', title: 'Consultation Period', description: 'Industry feedback gathered and reviewed.', status: 'completed' },
                    { date: 'Dec 2024', title: 'Framework Release', description: 'Publication of v2.0 standards.', status: 'active' },
                    { date: 'Q2 2025', title: 'Full Compliance Deadline', description: 'All financial institutions must implement new specs.', status: 'upcoming' }
                ]
            }
      ],
      ar: [
        {
          type: 'paragraph',
          text: 'يواصل البنك المركزي السعودي دفع عجلة الابتكار في القطاع المالي من خلال إصدار إطار المصرفية المفتوحة المحدث.',
        },
        {
              type: 'image',
              src: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=2940&auto=format&fit=crop',
              alt: 'لوحة معلومات المصرفية المفتوحة',
              caption: 'معايير واجهة المصرفية المفتوحة الجديدة.'
          },
          {
            type: 'quote',
            text: 'يعد هذا التحديث علامة فارقة في رحلتنا نحو نظام بيئي متكامل للتقنية المالية.',
            author: 'المتحدث الرسمي لساما'
        },
        {
              type: 'paragraph',
              text: 'أبرز ما جاء في الإطار الجديد:',
          },
          {
              type: 'list',
              style: 'unordered',
              items: [
                  'معايير أمن بيانات محسنة (FAPI 1.0 Advanced)',
                  'مواصفات موحدة لواجهات برمجة التطبيقات لخدمات معلومات الحساب',
                  'إرشادات جديدة لتأهيل مقدمي الخدمات من الطرف الثالث',
                  'آليات محسنة لفض النزاعات'
              ]
          },
          {
          type: 'paragraph',
          text: 'تركز المتطلبات الجديدة على معايير أمن البيانات المحسنة ومقاييس أداء واجهة برمجة التطبيقات المحسنة لمقدمي الخدمات من الطرف الثالث.',
        },
          {
              type: 'highlight',
              title: 'ملخص تنفيذي',
              text: 'يفرض إطار المصرفية المفتوحة المحدث (الإصدار 2.0) التزاماً صارماً بملفات الأمان المتقدمة FAPI 1.0 ويدخل مواصفات موحدة لواجهة برمجة التطبيقات لتبسيط عملية تأهيل مقدمي الخدمات. يجب على المؤسسات المالية الامتثال بحلول الربع الثاني من عام 2025.',
              variant: 'info'
          }
      ],
    },
    date: '2024-12-20',
    category: 'Regulation',
    source: {
      en: 'Saudi Central Bank (SAMA)',
      ar: 'البنك المركزي السعودي',
    },
    pdfUrl: 'https://www.salaamfintech.com/wp-content/uploads/2023/07/Open-Banking-Framework-EN.pdf', // Placeholder
    isImportant: true,
  },
  {
    id: 'news-2',
    slug: 'cma-fintech-licenses-q4-2024',
    title: {
      en: 'CMA Grants 5 New FinTech Licenses in Q4 2024',
      ar: 'هيئة السوق المالية تمنح 5 تراخيص تقنية مالية جديدة في الربع الرابع 2024',
    },
    summary: {
      en: 'The Capital Market Authority (CMA) has listed new companies in the FinTech Lab, expanding the robo-advisory and crowdfunding sectors.',
      ar: 'أدرجت هيئة السوق المالية شركات جديدة في مختبر التقنية المالية، موسعة بذلك قطاعات الاستشارة الآلية والتمويل الجماعي.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'The Capital Market Authority announces the approval of five new fintech companies to join the FinTech Lab. These companies will provide innovative solutions in robo-advisory and debt crowdfunding.',
        },
      ],
      ar: [
        {
          type: 'paragraph',
          text: 'تعلن هيئة السوق المالية عن الموافقة على انضمام خمس شركات تقنية مالية جديدة إلى مختبر التقنية المالية. ستقدم هذه الشركات حلولاً مبتكرة في مجال الاستشارة الآلية والتمويل الجماعي بالدين.',
        },
      ],
    },
    date: '2024-12-15',
    category: 'Market',
    source: {
      en: 'Capital Market Authority',
      ar: 'هيئة السوق المالية',
    },
    isImportant: false,
  },
  {
    id: 'news-3',
    slug: 'vat-invoicing-phase-2-deadline',
    title: {
      en: 'ZATCA Reminds Businesses of Phase 2 E-Invoicing Deadline',
      ar: 'الزكاة والضريبة تذكر منشآت الأعمال بموعد المرحلة الثانية للفوترة الإلكترونية',
    },
    summary: {
      en: 'The Zakat, Tax and Customs Authority reminds taxpayers that the deadline for Phase 2 integration is approaching.',
      ar: 'تذكر هيئة الزكاة والضريبة والجمارك المكلفين بأن الموعد النهائي لتكامل المرحلة الثانية يقترب.',
    },
    content: {
      en: [
        {
          type: 'paragraph',
          text: 'Businesses with revenues exceeding the specified threshold must ensure their systems are fully integrated with the Fatoora platform by the end of the month.',
        },
      ],
      ar: [
        {
          type: 'paragraph',
          text: 'يجب على المنشآت التي تتجاوز إيراداتها الحد المحدد التأكد من تكامل أنظمتها بشكل كامل مع منصة "فاتورة" بحلول نهاية الشهر.',
        },
      ],
    },
    date: '2024-12-10',
    category: 'Compliance',
    source: {
      en: 'ZATCA',
      ar: 'الزكاة والضريبة والجمارك',
    },
    pdfUrl: 'https://zatca.gov.sa/ar/E-Invoicing/Documents/User_Manual.pdf', // Placeholder
    isImportant: true,
  },
];
