/**
 * FinTech learner journey: zero background → job-ready mental models.
 * Each topic includes what to learn + curated external references (verify links periodically).
 */

export interface RoadmapResource {
  id: string;
  label: { en: string; ar: string };
  href: string;
}

export interface RoadmapTopic {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  resources: RoadmapResource[];
}

export interface RoadmapPhase {
  id: string;
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  /** Short bullets: what you can do after this phase */
  outcomes: { en: string[]; ar: string[] };
  topics: RoadmapTopic[];
}

const r = (
  id: string,
  en: string,
  ar: string,
  href: string
): RoadmapResource => ({
  id,
  label: { en, ar },
  href,
});

export const fintechLearnerPhases: RoadmapPhase[] = [
  {
    id: 'getting-started',
    title: { en: 'Start here — zero FinTech background', ar: 'ابدأ من هنا — بلا خلفية مسبقة في الفنتك' },
    summary: {
      en: 'If the word “FinTech” is new, start here. You’ll get a plain-language map of what it is, who the players are, and how to study without drowning in jargon.',
      ar: 'إن كانت «التقنية المالية» جديدة عليك، ابدأ من هذه المرحلة: خريطة بلغة بسيطة لما هي، من الفاعلون، وكيف تدرس دون أن تغرق في المصطلحات.',
    },
    outcomes: {
      en: [
        'Explain FinTech to a friend in under a minute',
        'Recognise regulators, banks, payment firms, and startups in a typical flow',
      ],
      ar: [
        'شرح الفنتك لشخص آخر في أقل من دقيقة',
        'تمييز الجهات الرقابية والمصارف وشركات المدفوعات والناشئين في مسار نموذجي',
      ],
    },
    topics: [
      {
        id: 'gs1',
        title: { en: 'What is FinTech, really?', ar: 'ما المقصود بالتقنية المالية؟' },
        description: {
          en: 'Technology used to build, deliver, or improve financial services: moving money, lending, saving, investing, identity, and risk checks—often faster or cheaper than paper-only processes.',
          ar: 'تقنية تُستخدم لبناء أو تقديم أو تحسين الخدمات المالية: تحويل الأموال، الإقراض، الادخار، الاستثمار، الهوية، وفحوص المخاطر — غالباً بسرعة أو تكلفة أفضل من الإجراءات الورقية فقط.',
        },
        resources: [
          r('gs1a', 'Investopedia: FinTech', 'إنفستوبيديا: الفنتك', 'https://www.investopedia.com/terms/f/fintech.asp'),
          r('gs1b', 'World Bank: FinTech overview', 'البنك الدولي: نظرة على الفنتك', 'https://www.worldbank.org/en/topic/financialsector/brief/fintech'),
        ],
      },
      {
        id: 'gs2',
        title: { en: 'FinTech vs “a bank app”', ar: 'الفنتك مقابل «تطبيق بنك»' },
        description: {
          en: 'A mobile banking app is one product. FinTech is the wider industry of builders, rails, schemes, and rules that make digital money movement possible—including startups that are not banks but partner with them.',
          ar: 'تطبيق مصرفي هو منتج واحد. أما الفنتك فصناعة أوسع من البناة والقنوات والأنظمة والقواعد التي تجعل الحركة المالية الرقمية ممكنة — بما فيها شركات ناشئة ليست بنوكاً لكنها تتعامل معها.',
        },
        resources: [
          r('gs2a', 'Wikipedia: Financial technology', 'ويكيبيديا: التقنية المالية', 'https://en.wikipedia.org/wiki/Financial_technology'),
          r('gs2b', 'IMF: FinTech topic hub', 'صندوق النقد: موضوع الفنتك', 'https://www.imf.org/en/Topics/fintech'),
        ],
      },
      {
        id: 'gs3',
        title: { en: 'Who is in the room?', ar: 'من الموجود في السلسلة؟' },
        description: {
          en: 'Customer, merchant, bank or wallet, card network or national scheme, payment processor, regulator, and sometimes telco or platform. Money almost never moves in a single hop.',
          ar: 'العميل، التاجر، البنك أو المحفظة، شبكة البطاقات أو المخطط الوطني، معالج المدفوعات، الجهة الرقابية، وأحياناً الاتصالات أو المنصة. النادر أن تنتقل الأموال بقفزة واحدة.',
        },
        resources: [
          r('gs3a', 'BIS: Payment systems primer', 'بنك التسويات: مدخل أنظمة الدفع', 'https://www.bis.org/publ/bppdf/bispap106.pdf'),
          r('gs3b', 'MAS Singapore: FinTech', 'هيئة سنغافورة: الفنتك', 'https://www.mas.gov.sg/development/fintech'),
        ],
      },
      {
        id: 'gs4',
        title: { en: 'Pick a lane to learn first', ar: 'اختر مساراً أولاً' },
        description: {
          en: 'Product, compliance/risk, engineering, data, or operations—you do not need all at once. Pick one based on your current job or degree, then steal sideways into neighbouring skills.',
          ar: 'منتج، امتثال/مخاطر، هندسة، بيانات، أو عمليات — لا تحتاج كل ذلك دفعة واحدة. اختر حسب وظيفتك أو تخصصك، ثم توسّع تدريجياً للمجاور.',
        },
        resources: [
          r('gs4a', 'Coursera: FinTech (overview course)', 'كورسيرا: مقدمة في الفنتك', 'https://www.coursera.org/learn/fintech'),
          r('gs4b', 'CFTE: FinTech industry map', 'سي إف تي إي: خريطة الصناعة', 'https://courses.cfte.education/'),
        ],
      },
      {
        id: 'gs5',
        title: { en: 'How to use this roadmap', ar: 'كيف تستخدم هذه الخارطة' },
        description: {
          en: 'Read top-to-bottom once, then loop back. Take notes, open every reference you can, and tie each topic to one real example (a product you use or a regulator notice). Ask questions on the contact page when stuck.',
          ar: 'اقرأ من الأعلى للأسفل مرة، ثم أعد الزيارة للأجزاء التي تناسبك. دوّن، افتح المراجع قدر الإمكان، واربط كل موضوع بمثال واقعي (منتج تستخدمه أو قرار تنظيمي). اسأل عبر صفحة التواصل عند الاشتباك.',
        },
        resources: [
          r('gs5a', 'Roadmap.sh (study method inspiration)', 'Roadmap.sh (أسلوب التعلم)', 'https://roadmap.sh/'),
          r('gs5b', 'This site — blog (regional notes)', 'هذا الموقع — المدونة', 'internal:/web/blog'),
        ],
      },
    ],
  },
  {
    id: 'foundations',
    title: { en: 'Foundations', ar: 'الأساسيات' },
    summary: {
      en: 'Money, accounts, and how payments actually clear—so later topics (rails, regulation) have something to attach to.',
      ar: 'المال والحسابات وكيف تُسوَّى المدفوعات فعلياً — حتى ترتبط المواضيع اللاحقة (القنوات، التنظيم) بقاعدة صلبة.',
    },
    outcomes: {
      en: [
        'Describe how a card payment differs from an A2A transfer in plain language',
        'Read a simple regulatory notice and guess which team cares first',
      ],
      ar: [
        'شرح فرق دفع بالبطاقة عن تحويل بين حسابات بلغة بسيطة',
        'قراءة إشعار تنظيمي بسيط وتخمين أي فريق يهتم أولاً',
      ],
    },
    topics: [
      {
        id: 'f1',
        title: { en: 'Money & banking basics', ar: 'أساسيات المال والمصارف' },
        description: {
          en: 'Deposits, lending, liquidity, central bank vs commercial bank, and why “digital money” is still backed by rules and ledgers.',
          ar: 'الودائع، الإقراض، السيولة، الفرق بين البنك المركزي والتجاري، ولماذا «المال الرقمي» ما زال مرتبطاً بقواعد وسجلات.',
        },
        resources: [
          r('f1a', 'Khan Academy: Money & banking (series)', 'خان أكاديمي: المال والمصارف', 'https://www.khanacademy.org/economics-finance-domain/core-finance/money-and-banking'),
          r('f1b', 'Bank for International Settlements', 'بنك التسويات الدولية', 'https://www.bis.org/'),
        ],
      },
      {
        id: 'f2',
        title: { en: 'Payments lifecycle', ar: 'دورة المدفوعات' },
        description: {
          en: 'Authorisation, clearing, settlement, chargebacks, and settlement windows—why “paid” on screen is not always “money moved”.',
          ar: 'التفويض، المقاصة، التسوية، الاسترداد، ونوافذ التسوية — لماذا «تم الدفع» على الشاشة ليس دائماً «انتقل المال».',
        },
        resources: [
          r('f2a', 'Stripe: How payments work', 'سترايب: كيف تعمل المدفوعات', 'https://stripe.com/docs/payments/how-payments-work'),
          r('f2b', 'European Central Bank: Payment systems', 'البنك المركزي الأوروبي: أنظمة الدفع', 'https://www.ecb.europa.eu/paym/intro/html/index.en.html'),
        ],
      },
      {
        id: 'f3',
        title: { en: 'FinTech vs traditional finance', ar: 'الفنتك والتمويل التقليدي' },
        description: {
          en: 'Speed, partnerships, embedded finance, and why incumbents and startups often need each other—not a simple “disruption” story.',
          ar: 'السرعة، الشراكات، التمويل المدمج، ولماذا الكبار والناشئين يحتاجون بعضهم — ليست قصة «الإزاحة» فقط.',
        },
        resources: [
          r('f3a', 'McKinsey: Global payments report (annual)', 'ماكينزي: تقرير المدفوعات العالمية', 'https://www.mckinsey.com/industries/financial-services/our-insights'),
          r('f3b', 'World Economic Forum: FinTech', 'المنتدى الاقتصادي العالمي', 'https://www.weforum.org/topics/financial-and-monetary-systems/'),
        ],
      },
      {
        id: 'f4',
        title: { en: 'KSA & GCC context', ar: 'سياق السعودية والخليج' },
        description: {
          en: 'Vision-linked digitisation, local schemes (e.g. Mada), sandboxes, and why “copy Silicon Valley” rarely fits wholesale.',
          ar: 'الرقمنة المرتبطة برؤية المحلية، المخططات المحلية (مثل مدى)، البيئات التجريبية، ولماذا «نسخ وادي السيليكون» نادراً ينجح حرفياً.',
        },
        resources: [
          r('f4a', 'SAMA — Saudi Central Bank', 'ساما — البنك المركزي السعودي', 'https://www.sama.gov.sa/'),
          r('f4b', 'CMA Saudi Arabia', 'هيئة السوق المالية', 'https://cma.org.sa/'),
        ],
      },
      {
        id: 'f5',
        title: { en: 'Career tracks snapshot', ar: 'لمحة عن المسارات المهنية' },
        description: {
          en: 'Typical entry paths: risk & compliance, product management, software, data science, and partnerships—each with different “first skills”.',
          ar: 'مسارات دخول شائعة: المخاطر والامتثال، إدارة المنتج، البرمجة، علوم البيانات، والشراكات — لكل منها «مهارات أولى» مختلفة.',
        },
        resources: [
          r('f5a', 'LinkedIn FinTech skills (trends)', 'لينكدإن: مهارات الفنتك', 'https://www.linkedin.com/business/talent/blog/talent-strategy/fintech-jobs'),
          r('f5b', 'OECD: FinTech & jobs', 'منظمة التعاون: الفنتك والوظائف', 'https://www.oecd.org/finance/fintech.htm'),
        ],
      },
    ],
  },
  {
    id: 'rails',
    title: { en: 'Rails & money movement', ar: 'القنوات وحركة الأموال' },
    summary: {
      en: 'Cards, wallets, instant payments, and open data—how value moves and where fees and risk sit.',
      ar: 'البطاقات، المحافظ، المدفوعات الفورية، والبيانات المفتوحة — كيف تتحرك القيمة وأين تجلس الرسوم والمخاطر.',
    },
    outcomes: {
      en: [
        'Sketch a simple payment flow with at least four parties',
        'Name one trade-off between card rails and account-to-account rails',
      ],
      ar: [
        'رسم مسار دفع بسيط بأربعة فاعلين على الأقل',
        'ذكر مفاضلة واحدة بين قنوات البطاقات والتحويل بين الحسابات',
      ],
    },
    topics: [
      {
        id: 'r1',
        title: { en: 'Cards & POS', ar: 'البطاقات ونقاط البيع' },
        description: {
          en: 'Issuing vs acquiring, interchange, PCI scope, and why POS reliability is an operations problem—not only engineering.',
          ar: 'الإصدار مقابل الاستحواذ، التبادل، نطاق PCI، ولماذا موثوقية نقاط البيع مسألة تشغيل — وليست هندسة فقط.',
        },
        resources: [
          r('r1a', 'PCI Security Standards', 'معايير أمن بطاقات الدفع', 'https://www.pcisecuritystandards.org/'),
          r('r1b', 'Visa: How VisaNet works (overview)', 'فيزا: كيف يعمل الشبكة', 'https://usa.visa.com/run-your-business/small-business-tools/payment-technology.html'),
        ],
      },
      {
        id: 'r2',
        title: { en: 'Instant / account-to-account', ar: 'الفوري والتحويل بين الحسابات' },
        description: {
          en: 'Real-time gross settlement flavours, request-to-pay ideas, and why liquidity and fraud controls differ from cards.',
          ar: 'أنماط التسوية اللحظية، أفكار الطلب للدفع، ولماذا السيولة وضوابط الاحتيال تختلف عن البطاقات.',
        },
        resources: [
          r('r2a', 'Open Banking UK — what is OB?', 'المصرفية المفتوحة UK', 'https://www.openbanking.org.uk/what-is-open-banking/'),
          r('r2b', 'BIS: Fast payments', 'بنك التسويات: المدفوعات السريعة', 'https://www.bis.org/cpmi/publ/d174.pdf'),
        ],
      },
      {
        id: 'r3',
        title: { en: 'Wallets & stored value', ar: 'المحافظ والقيمة المخزنة' },
        description: {
          en: 'E-money institutions, float, reconciliation, and consumer protection expectations when balances are not traditional deposits.',
          ar: 'مؤسسات النقود الإلكترونية، العائم، التسوية، وتوقعات حماية المستهلك عندما الأرصدة ليست ودائع تقليدية.',
        },
        resources: [
          r('r3a', 'ECB: Electronic money', 'البنك المركزي الأوروبي: النقود الإلكترونية', 'https://www.ecb.europa.eu/paym/intro/money-matters/html/emoney.en.html'),
          r('r3b', 'GSMA: Mobile money', 'جي إس إم إيه: المال عبر الجوال', 'https://www.gsma.com/mobilefordevelopment/mobile-money/'),
        ],
      },
      {
        id: 'r4',
        title: { en: 'Open banking & data sharing', ar: 'المصرفية المفتوحة ومشاركة البيانات' },
        description: {
          en: 'APIs, consent, liability splits, and why “open” still means audited, scoped, and revocable access.',
          ar: 'واجهات البرمجة، الموافقة، تقسيم المسؤولية، ولماذا «المفتوح» يعني وصولاً مُدققاً ومحدوداً وقابلاً للإلغاء.',
        },
        resources: [
          r('r4a', 'Open Banking Implementation Entity', 'كيان تنفيذ المصرفية المفتوحة', 'https://www.openbanking.org.uk/'),
          r('r4b', 'Berlin Group: NextGenPSD2', 'مجموعة برلين: PSD2', 'https://www.berlin-group.org/'),
        ],
      },
      {
        id: 'r5',
        title: { en: 'Cross-border & FX basics', ar: 'العابرة للحدود والصرف' },
        description: {
          en: 'Correspondent banking, messaging (e.g. SWIFT family), FX spreads, and compliance screening in international flows.',
          ar: 'المراسلة المصرفية، الرسائل (مثل عائلة سويفت)، فروق الصرف، وفحص الامتثال في التدفقات الدولية.',
        },
        resources: [
          r('r5a', 'SWIFT: What we do', 'سويفت: ماذا نفعل', 'https://www.swift.com/about-us'),
          r('r5b', 'World Bank: Remittance prices', 'البنك الدولي: أسعار التحويلات', 'https://remittanceprices.worldbank.org/'),
        ],
      },
    ],
  },
  {
    id: 'regulation',
    title: { en: 'Regulation, risk & trust', ar: 'التنظيم والمخاطر والثقة' },
    summary: {
      en: 'Licences, AML/KYC, fraud, and privacy—how rules shape what you can ship and what evidence you must keep.',
      ar: 'التراخيص، مكافحة غسل الأموال واعرف عميلك، الاحتيال، والخصوصية — كيف تشكل القواعد ما يمكن إطلاقه والأدلة التي يجب الإبقاء عليها.',
    },
    outcomes: {
      en: [
        'List three artefacts a compliance team usually asks for before go-live',
        'Explain why KYC is both UX and risk problem',
      ],
      ar: [
        'ذكر ثلاثة مستندات عادةً يطلبها فريق الامتثال قبل الإطلاق',
        'شرح لماذا اعرف عميلك مسألة تجربة مستخدم ومخاطر معاً',
      ],
    },
    topics: [
      {
        id: 'g1',
        title: { en: 'Licensing & sandboxes', ar: 'الترخيص والبيئات التجريبية' },
        description: {
          en: 'Authorisation vs registration, restricted pilots, and how sandboxes buy time—but do not replace full licensing evidence.',
          ar: 'الترخيص مقابل التسجيل، التجارب المحدودة، وكيف تمنح الرمل وقتاً — دون أن تحل محل أدلة الترخيص الكامل.',
        },
        resources: [
          r('g1a', 'FinTech Saudi (ecosystem & programs)', 'فنتك السعودية', 'https://fintechsaudi.com/'),
          r('g1b', 'IOSCO: FinTech workstream', 'أيوسكو: مسار الفنتك', 'https://www.iosco.org/'),
        ],
      },
      {
        id: 'g2',
        title: { en: 'AML / CTF fundamentals', ar: 'أساسيات مكافحة غسل الأموال وتمويل الإرهاب' },
        description: {
          en: 'Risk-based approach, suspicious activity reporting, sanctions screening, and why “checklist only” programs fail.',
          ar: 'النهج القائم على المخاطر، الإبلاغ عن نشاط مشبوه، فحص العقوبات، ولماذا برامج «القائمة فقط» تفشل.',
        },
        resources: [
          r('g2a', 'FATF: Recommendations', 'فاتف: التوصيات', 'https://www.fatf-gafi.org/en/publications/Fatfrecommendations.html'),
          r('g2b', 'UNODC: Money-laundering', 'مكتب الأمم المتحدة: غسل الأموال', 'https://www.unodc.org/unodc/en/money-laundering/overview.html'),
        ],
      },
      {
        id: 'g3',
        title: { en: 'KYC & digital identity', ar: 'اعرف عميلك والهوية الرقمية' },
        description: {
          en: 'Document vs biometric verification, liveness, re-KYC triggers, and Nafath-style national ID flows in regional context.',
          ar: 'التحقق بالوثائق مقابل السمات الحيوية، الحيوية، محفزات إعادة اعرف عميلك، وتدفقات الهوية الوطنية مثل نفاذ في السياق الإقليمي.',
        },
        resources: [
          r('g3a', 'Onfido: Identity verification guide', 'أونفيدو: دليل التحقق من الهوية', 'https://onfido.com/guides/identity-verification'),
          r('g3b', 'NIST: Digital identity guidelines (US)', 'نيست: إرشادات الهوية الرقمية', 'https://pages.nist.gov/800-63-3/'),
        ],
      },
      {
        id: 'g4',
        title: { en: 'Fraud & monitoring', ar: 'الاحتيال والمراقبة' },
        description: {
          en: 'ATO, friendly fraud, mule accounts, velocity rules, and balancing false positives with customer friction.',
          ar: 'استيلاء على الحساب، احتيال «ودي»، حسابات الحمير، قواعد السرعة، وموازنة الإيجابيات الكاذبة مع احتكاك العميل.',
        },
        resources: [
          r('g4a', 'FFIEC: Authentication guidance', 'إرشادات التوثيق المصرفي الأمريكية', 'https://www.ffiec.gov/pdf/authentication_guide.pdf'),
          r('g4b', 'UK Finance: Fraud report', 'UK Finance: تقرير الاحتيال', 'https://www.ukfinance.org.uk/policy-and-guidance/reports-and-publications/fraud-report'),
        ],
      },
      {
        id: 'g5',
        title: { en: 'Privacy & data residency', ar: 'الخصوصية وإقامة البيانات' },
        description: {
          en: 'PDPL in KSA mindset, purpose limitation, cross-border transfers, DPIAs, and vendor subprocessors.',
          ar: 'منطق نظام حماية البيانات في السعودية، حدود الغرض، النقل عبر الحدود، تقييمات أثر الخصوصية، والمعالجون من البائعين.',
        },
        resources: [
          r('g5a', 'SDAIA: PDPL portal (KSA)', 'سدايا: نظام حماية البيانات', 'https://sdaia.gov.sa/'),
          r('g5b', 'ICO UK: Guide to GDPR', 'مكتب مفوض المعلومات UK', 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/'),
        ],
      },
    ],
  },
  {
    id: 'product',
    title: { en: 'Product & customers', ar: 'المنتج والعملاء' },
    summary: {
      en: 'Discovery, onboarding, pricing, and trust—shipping regulated products people actually finish signing up for.',
      ar: 'الاستكشاف، الإدماج، التسعير، والثقة — إطلاق منتجات خاضعة للتنظيم ينجح الناس في إكمال التسجيل لها.',
    },
    outcomes: {
      en: [
        'Write a one-page PRD section for onboarding with compliance touchpoints called out',
        'Identify two trust leaks in a hypothetical FinTech signup you would fix first',
      ],
      ar: [
        'كتابة جزء PRD لصفحة واحدة للإدماج مع تسمية نقاط الامتثال',
        'تحديد تسريبَي ثقة في تسجيل فنتك افتراضي وتصحيحهما أولاً',
      ],
    },
    topics: [
      {
        id: 'p1',
        title: { en: 'Problem & segment', ar: 'المشكلة والشريحة' },
        description: {
          en: 'Jobs-to-be-done for money products, wedge vs platform dreams, and honest “who is not our user”.',
          ar: 'وظائف المستخدم لمنتجات المال، الإسفين مقابل حلم المنصة، وصراحة «من ليس مستخدمنا».',
        },
        resources: [
          r('p1a', 'Intercom: Jobs-to-be-done', 'إنتركوم: وظائف المستخدم', 'https://www.intercom.com/blog/jobs-to-be-done/'),
          r('p1b', 'NN/g: Personas vs JTBD', 'نيلسن نورمان: الشخصيات مقابل JTBD', 'https://www.nngroup.com/articles/personas-jobs-to-be-done/'),
        ],
      },
      {
        id: 'p2',
        title: { en: 'Onboarding & verification UX', ar: 'تجربة الإدماج والتحقق' },
        description: {
          en: 'Progressive profiling, drop-off analytics, accessibility, and pairing legal copy with understandable UI.',
          ar: 'الملف التدريجي، تحليلات التسرب، إمكانية الوصول، واقتران النص القانوني بواجهة مفهومة.',
        },
        resources: [
          r('p2a', 'Baymard: Checkout UX', 'بايمارد: تجربة الدفع', 'https://baymard.com/checkout-usability'),
          r('p2b', 'GOV.UK Design System', 'نظام تصميم حكومة UK', 'https://design-system.service.gov.uk/'),
        ],
      },
      {
        id: 'p3',
        title: { en: 'Pricing & transparency', ar: 'التسعير والشفافية' },
        description: {
          en: 'Fee structures, APR/APY literacy, comparison sites, and conduct risk when marketing “free”.',
          ar: 'هياكل الرسوم، فهم APR/APY، مواقع المقارنة، ومخاطر السلوك عند التسويق لـ«مجاني».',
        },
        resources: [
          r('p3a', 'FCA: Consumer duty (UK)', 'هيئة السلوك المالي UK', 'https://www.fca.org.uk/consumers/consumer-duty'),
          r('p3b', 'CFPB: Consumer tools (US)', 'مكتب الحماية المالية الأمريكي', 'https://www.consumerfinance.gov/consumer-tools/'),
        ],
      },
      {
        id: 'p4',
        title: { en: 'Metrics that survive audits', ar: 'مؤشرات تنجو من التدقيق' },
        description: {
          en: 'North-star vs guardrails, funnel integrity, incident-linked metrics, and evidence you can export when asked.',
          ar: 'نجم الشمال مقابل الحواجز، سلامة القمع، مؤشرات مرتبطة بالحوادث، وأدلة يمكن تصديرها عند الطلب.',
        },
        resources: [
          r('p4a', 'Amplitude: Product metrics', 'أمبليتيود: مؤشرات المنتج', 'https://amplitude.com/blog/product-metrics'),
          r('p4b', 'Lean Analytics (book site)', 'Lean Analytics', 'https://leananalyticsbook.com/'),
        ],
      },
    ],
  },
  {
    id: 'systems',
    title: { en: 'Systems & engineering', ar: 'الأنظمة والهندسة' },
    summary: {
      en: 'Architecture patterns, APIs, security basics, and operations—where “it works on my machine” dies in production.',
      ar: 'أنماط الهندسة، واجهات البرمجة، أساسيات الأمان، والتشغيل — حيث يموت «يعمل على جهازي» في الإنتاج.',
    },
    outcomes: {
      en: [
        'Draw a C4-style box diagram for a simple wallet top-up flow',
        'Name three API security checks you would demand before exposing a webhook',
      ],
      ar: [
        'رسم مخطط صناديق بسيط لتدفق شحن محفظة',
        'ذكر ثلاث فحوص أمنية لواجهة برمجة تطلبها قبل كشف خطاف ويب',
      ],
    },
    topics: [
      {
        id: 's1',
        title: { en: 'Core systems & ledgers', ar: 'الأنظمة الأساسية والسجلات' },
        description: {
          en: 'Double-entry thinking, reconciliation, chart of accounts at high level, and event vs balance sources of truth.',
          ar: 'تفكير القيد المزدوج، التسوية، دليل الحسابات بمستوى عالٍ، ومصادر الحقيقة بين الأحداث والأرصدة.',
        },
        resources: [
          r('s1a', 'Martin Fowler: Event sourcing', 'مارتن فاولر: تتبع الأحداث', 'https://martinfowler.com/eaaDev/EventSourcing.html'),
          r('s1b', 'AWS: Banking core on cloud (paper)', 'أمازون: النواة المصرفية على السحابة', 'https://aws.amazon.com/financial-services/banking-core/'),
        ],
      },
      {
        id: 's2',
        title: { en: 'APIs, webhooks, reliability', ar: 'واجهات البرمجة والخطافات والموثوقية' },
        description: {
          en: 'Idempotency keys, retries, signing, rate limits, and dead-letter queues when partners misbehave.',
          ar: 'مفاتيح الإيديمبوتنسي، إعادة المحاولة، التوقيع، حدود المعدل، وطوابير الرسائل الميتة عند سوء سلوك الشركاء.',
        },
        resources: [
          r('s2a', 'Stripe: Idempotency', 'سترايب: الإيديمبوتنسي', 'https://stripe.com/docs/api/idempotent_requests'),
          r('s2b', 'OWASP API Security Top 10', 'أواسب أمن واجهات البرمجة', 'https://owasp.org/www-project-api-security/'),
        ],
      },
      {
        id: 's3',
        title: { en: 'AuthN, AuthZ, sessions', ar: 'المصادقة والتفويض والجلسات' },
        description: {
          en: 'OAuth/OIDC roles, scopes, step-up auth, device binding, and why passwords alone are insufficient for money apps.',
          ar: 'أدوار OAuth/OIDC، النطاقات، التوثيق التصاعدي، ربط الجهاز، ولماذا كلمات المرور وحدها غير كافية لتطبيقات المال.',
        },
        resources: [
          r('s3a', 'OAuth 2.0 (IETF)', 'OAuth 2.0', 'https://oauth.net/2/'),
          r('s3b', 'OpenID Connect', 'أوبن آي دي كونكت', 'https://openid.net/connect/'),
        ],
      },
      {
        id: 's4',
        title: { en: 'Observability & incidents', ar: 'المراقبة والحوادث' },
        description: {
          en: 'Logs/metrics/traces, SLOs for payments, runbooks, blameless postmortems, and regulatory notification clocks.',
          ar: 'السجلات والمقاييس والمسارات، أهداف مستوى الخدمة للمدفوعات، كتيبات التشغيل، مراجعات ما بعد الحادث، وساعات إخطار الجهات.',
        },
        resources: [
          r('s4a', 'Google SRE: Books & resources', 'غوغل SRE', 'https://sre.google/books/'),
          r('s4b', 'Honeycomb: Observability primer', 'هونيكومب: مدخل المراقبة', 'https://www.honeycomb.io/blog/what-is-observability'),
        ],
      },
    ],
  },
  {
    id: 'ship',
    title: { en: 'Ship, operate & iterate', ar: 'الإطلاق والتشغيل والتحسين' },
    summary: {
      en: 'Go-live discipline: pilots, vendor attestations, control evidence, and learning loops that survive real supervision.',
      ar: 'انضباط الإطلاق: التجارب، شهادات البائعين، أدلة الضوابط، وحلقات التعلم التي تصمد أمام الإشراف الفعلي.',
    },
    outcomes: {
      en: [
        'Draft a minimal go-live checklist with owners',
        'Plan one post-launch metric review tied to risk appetite',
      ],
      ar: [
        'صياغة قائمة إطلاق دنيا مع المسؤولين',
        'تخطيط مراجعة مؤشر واحد بعد الإطلاق مرتبطة بشهية المخاطر',
      ],
    },
    topics: [
      {
        id: 'sh1',
        title: { en: 'Pilot → production', ar: 'من التجريبي إلى الإنتاج' },
        description: {
          en: 'Feature flags, canaries, rollback drills, and communication plans when money movement is involved.',
          ar: 'أعلام الميزات، الكناري، تدريبات التراجع، وخطط الاتصال عندما يتعلق الأمر بحركة الأموال.',
        },
        resources: [
          r('sh1a', 'NIST: Cybersecurity Framework', 'نيست: إطار الأمن السيبراني', 'https://www.nist.gov/cyberframework'),
          r('sh1b', 'ITIL / ITSM primers (Axelos)', 'آي تي آي إل', 'https://www.axelos.com/best-practice-solutions/itil'),
        ],
      },
      {
        id: 'sh2',
        title: { en: 'Vendor & scheme readiness', ar: 'جاهزية البائعين والأنظمة' },
        description: {
          en: 'Due diligence questionnaires, SOC reports, penetration test scope, and scheme certification timelines.',
          ar: 'استبيانات العناية الواجبة، تقارير SOC، نطاق اختبار الاختراق، وجداول شهادات المخطط.',
        },
        resources: [
          r('sh2a', 'AICPA: SOC reports overview', 'AICPA: تقارير SOC', 'https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc1report.html'),
          r('sh2b', 'Cloud Security Alliance', 'تحالف أمن السحابة', 'https://cloudsecurityalliance.org/'),
        ],
      },
      {
        id: 'sh3',
        title: { en: 'Controls & evidence', ar: 'الضوابط والأدلة' },
        description: {
          en: 'Control narratives, sampling, ticketing traceability, and audit trails that humans can actually retrieve.',
          ar: 'سرد الضوابط، العينات، تتبع التذاكر، وسجلات تدقيق يمكن للبشر استرجاعها فعلياً.',
        },
        resources: [
          r('sh3a', 'COSO: Internal control', 'كوسو: الضبط الداخلي', 'https://www.coso.org/Pages/Internal-Control-Integrated-Framework.aspx'),
          r('sh3b', 'ISO 27001 (overview)', 'آيزو 27001', 'https://www.iso.org/isoiec-27001-information-security.html'),
        ],
      },
      {
        id: 'sh4',
        title: { en: 'Learn in public & community', ar: 'التعلم العلني والمجتمع' },
        description: {
          en: 'Writing, meetups, open-source, and mentorship—compound learning by teaching and shipping small proofs.',
          ar: 'الكتابة، اللقاءات، المصدر المفتوح، والإرشاد — تضاعف التعلم بالتعليم وبناء إثباتات صغيرة.',
        },
        resources: [
          r('sh4a', 'GitHub: Awesome FinTech lists', 'جيت هاب: قوائم الفنتك', 'https://github.com/search?q=awesome+fintech&type=repositories'),
          r('sh4b', 'Meetup: FinTech groups', 'ميت أب: مجموعات الفنتك', 'https://www.meetup.com/find/?keywords=fintech'),
        ],
      },
    ],
  },
];
