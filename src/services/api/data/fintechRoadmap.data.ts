/** Learner-oriented FinTech study path (inspired by roadmap.sh-style topic maps). */

export interface RoadmapTopic {
  id: string;
  title: { en: string; ar: string };
}

export interface RoadmapPhase {
  id: string;
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  topics: RoadmapTopic[];
}

export const fintechLearnerPhases: RoadmapPhase[] = [
  {
    id: 'foundations',
    title: {
      en: 'Foundations',
      ar: 'الأساسيات',
    },
    summary: {
      en: 'Build intuition for how money, institutions, and “FinTech” fit together before diving into products or code.',
      ar: 'ابنِ حدساً لكيفية ارتباط المال والمؤسسات و«التقنية المالية» قبل التعمق في المنتجات أو البرمجة.',
    },
    topics: [
      { id: 'f1', title: { en: 'Money & banking 101', ar: 'المال والمصارف — مدخل' } },
      { id: 'f2', title: { en: 'Payments lifecycle', ar: 'دورة المدفوعات' } },
      { id: 'f3', title: { en: 'FinTech vs traditional finance', ar: 'الفنتك مقابل التمويل التقليدي' } },
      { id: 'f4', title: { en: 'KSA / GCC market context', ar: 'سياق السوق السعودي والخليجي' } },
      { id: 'f5', title: { en: 'Career tracks overview', ar: 'نظرة على المسارات المهنية' } },
    ],
  },
  {
    id: 'rails',
    title: {
      en: 'Rails & money movement',
      ar: 'القنوات وحركة الأموال',
    },
    summary: {
      en: 'Understand how value moves—schemes, clearing, wallets, and partner rails—so product and engineering decisions stay grounded.',
      ar: 'افهم كيف تنتقل القيمة — الأنظمة، التسوية، المحافظ، وقنوات الشركاء — لقرارات منتج وهندسة واقعية.',
    },
    topics: [
      { id: 'r1', title: { en: 'Cards & POS ecosystems', ar: 'البطاقات وأنظمة نقاط البيع' } },
      { id: 'r2', title: { en: 'Account-to-account / instant payments', ar: 'التحويل بين الحسابات والمدفوعات الفورية' } },
      { id: 'r3', title: { en: 'Wallets & stored value', ar: 'المحافظ والقيمة المخزنة' } },
      { id: 'r4', title: { en: 'Open banking & data sharing', ar: 'المصرفية المفتوحة ومشاركة البيانات' } },
      { id: 'r5', title: { en: 'Cross-border & FX basics', ar: 'أساسيات العابرة للحدود والصرف' } },
    ],
  },
  {
    id: 'regulation',
    title: {
      en: 'Regulation, risk & trust',
      ar: 'التنظيم والمخاطر والثقة',
    },
    summary: {
      en: 'Learn the guardrails: licensing sandboxes, AML/KYC, fraud, privacy, and how supervisors think about evidence.',
      ar: 'تعلّم حدود اللعب: الترخيص والرمل، مكافحة غسل الأموال واعرف عميلك، الاحتيال، الخصوصية، وأدلة الجهات الرقابية.',
    },
    topics: [
      { id: 'g1', title: { en: 'Licensing & sandbox paths', ar: 'مسارات الترخيص والبيئة التجريبية' } },
      { id: 'g2', title: { en: 'AML / CTF fundamentals', ar: 'أساسيات مكافحة غسل الأموال وتمويل الإرهاب' } },
      { id: 'g3', title: { en: 'KYC / identity assurance', ar: 'اعرف عميلك وتأكيد الهوية' } },
      { id: 'g4', title: { en: 'Fraud patterns & monitoring', ar: 'أنماط الاحتيال والمراقبة' } },
      { id: 'g5', title: { en: 'PDPL / data residency awareness', ar: 'الوعي بحماية البيانات وإقامة البيانات' } },
    ],
  },
  {
    id: 'product',
    title: {
      en: 'Product & customers',
      ar: 'المنتج والعملاء',
    },
    summary: {
      en: 'Ship something people trust: journeys, disclosures, support, and metrics that matter in regulated products.',
      ar: 'قدّم ما يثق به الناس: الرحلات، الإفصاح، الدعم، والمؤشرات المهمة في المنتجات الخاضعة للتنظيم.',
    },
    topics: [
      { id: 'p1', title: { en: 'Problem & segment clarity', ar: 'وضوح المشكلة والشريحة' } },
      { id: 'p2', title: { en: 'Onboarding & verification UX', ar: 'تجربة الإدماج والتحقق' } },
      { id: 'p3', title: { en: 'Pricing, fees & transparency', ar: 'التسعير والرسوم والشفافية' } },
      { id: 'p4', title: { en: 'Trust, complaints & conduct', ar: 'الثقة والشكاوى والسلوك' } },
      { id: 'p5', title: { en: 'North-star metrics', ar: 'مؤشرات النجاح الأساسية' } },
    ],
  },
  {
    id: 'systems',
    title: {
      en: 'Systems & engineering',
      ar: 'الأنظمة والهندسة',
    },
    summary: {
      en: 'Connect product intent to technical reality: APIs, security basics, ledgers, reconciliation, and operational runbooks.',
      ar: 'اربط نية المنتج بالواقع التقني: واجهات البرمجة، أساسيات الأمان، السجلات، التسوية، وسيناريوهات التشغيل.',
    },
    topics: [
      { id: 's1', title: { en: 'Core banking vs ledgers', ar: 'النواة المصرفية مقابل السجلات' } },
      { id: 's2', title: { en: 'APIs, webhooks & idempotency', ar: 'واجهات البرمجة والخطافات وإيديمبوتنسي' } },
      { id: 's3', title: { en: 'AuthN / AuthZ patterns', ar: 'أنماط المصادقة والتفويض' } },
      { id: 's4', title: { en: 'Encryption & key hygiene', ar: 'التشفير وصحة المفاتيح' } },
      { id: 's5', title: { en: 'Observability & incidents', ar: 'المراقبة والحوادث' } },
    ],
  },
  {
    id: 'ship',
    title: {
      en: 'Ship, operate & iterate',
      ar: 'الإطلاق والتشغيل والتحسين',
    },
    summary: {
      en: 'Go live responsibly: rollout, vendor/partner alignment, audits, and continuous learning from the field.',
      ar: 'أطلق بمسؤولية: الإطلاق التدريجي، مواءمة البائعين والشركاء، التدقيق، والتعلم المستمر من الميدان.',
    },
    topics: [
      { id: 'sh1', title: { en: 'Pilot → production checklist', ar: 'قائمة من التجريبي إلى الإنتاج' } },
      { id: 'sh2', title: { en: 'Vendor & scheme certifications', ar: 'شهادات البائعين والأنظمة' } },
      { id: 'sh3', title: { en: 'Control testing & evidence', ar: 'اختبار الضوابط والأدلة' } },
      { id: 'sh4', title: { en: 'Post-launch reviews', ar: 'مراجعات ما بعد الإطلاق' } },
      { id: 'sh5', title: { en: 'Portfolio & community learning', ar: 'التعلم عبر المجتمع والمعرض' } },
    ],
  },
];
