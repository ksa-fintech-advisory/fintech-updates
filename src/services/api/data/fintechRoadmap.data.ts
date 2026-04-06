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
    title: {
      en: 'Starting point: framing the mindset (no prior background)',
      ar: 'البداية: تأسيس العقلية (بلا خلفية مسبقة)',
    },
    summary: {
      en: 'If FinTech is new to you, this is the on-ramp. We establish a shared vocabulary and a clear picture of the whole board—who holds real power in the market, and how banks, regulators, and startups connect—without getting lost in heavy jargon first.',
      ar: 'إذا كان عالم التقنية المالية جديداً عليك، فهنا نقطة الانطلاق. في هذه المرحلة نؤسس لغة مشتركة ونبني تصوراً واضحاً للصورة الكبرى؛ من هم اللاعبون في السوق؟ وكيف تترابط البنوك مع المشرّعين والشركات الناشئة؟ كل ذلك دون الغرق في المصطلحات التقنية المعقدة.',
    },
    outcomes: {
      en: [
        'Deconstruct what “FinTech” means and explain it clearly in under a minute',
        'Sketch a mental map of the actors—regulators, banks, and payment providers',
        'Choose the next stretch of this roadmap that best fits your role and project',
      ],
      ar: [
        'تفكيك مفهوم التقنية المالية وشرحه بوضوح وفي أقل من دقيقة',
        'رسم خريطة ذهنية للأطراف الفاعلة (الجهات الرقابية، البنوك، مزودي المدفوعات)',
        'تحديد المسار الأنسب لك لاستكمال رحلة التعلم',
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
          r('gs5b', 'This site — blog (regional notes)', 'هذا الموقع — المدونة', 'internal:/blog'),
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
    id: 'fintech-domains',
    title: { en: 'FinTech applications & domains', ar: 'تطبيقات الفنتك والمجالات' },
    summary: {
      en: 'FinTech is not only checkout. Map the main product lanes—lending, wealth, crypto, treasury, insurance—so you know where your interest fits and which regulators usually show up.',
      ar: 'الفنتك ليس مجرد دفع في المتجر. ارسم مسارات المنتج الرئيسة — الإقراض، الثروة، الأصول الرقمية، الخزينة، التأمين — لتعرف أين يقع اهتمامك وأي جهات تنظيمية تظهر عادة.',
    },
    outcomes: {
      en: [
        'Name at least six FinTech application areas and one example product in each',
        'Explain why the same payment rail can power different “apps” (wallet vs merchant vs payroll)',
      ],
      ar: [
        'ذكر ستة مجالات تطبيقية للفنتك على الأقل مع مثال منتج في كل منها',
        'شرح لماذا قناة دفع واحدة قد تخدم «تطبيقات» مختلفة (محفظة مقابل تاجر مقابل رواتب)',
      ],
    },
    topics: [
      {
        id: 'fd1',
        title: { en: 'Payments, acquiring & merchant services', ar: 'المدفوعات والاستحواذ وخدمات التاجر' },
        description: {
          en: 'One important lane—but only one: gateways, POS, subscriptions, payouts, and embedded checkout. Understand it as infrastructure other apps sit on top of.',
          ar: 'مسار مهم — لكنه واحد فقط: بوابات الدفع، نقاط البيع، الاشتراكات، المدفوعات للأطراف، والدفع المدمج. افهمه كبنية يبني فوقها تطبيقات أخرى.',
        },
        resources: [
          r('fd1a', 'McKinsey: Global Payments', 'ماكينزي: المدفوعات العالمية', 'https://www.mckinsey.com/industries/financial-services/our-insights'),
          r('fd1b', 'BIS: Retail payments', 'بنك التسويات: مدفوعات التجزئة', 'https://www.bis.org/cpmi/publ/d207.pdf'),
        ],
      },
      {
        id: 'fd2',
        title: { en: 'Lending, credit & BNPL', ar: 'الإقراض والائتمان والدفع لاحقاً' },
        description: {
          en: 'Balance-sheet lending vs marketplace models, credit scoring, collections ethics, and why BNPL is regulated as credit in many jurisdictions.',
          ar: 'الإقراض من الميزانية مقابل الأسواق، تسجيل الائتمان، أخلاقيات التحصيل، ولماذا يُعامل الدفع لاحقاً كائتمان في كثير من الأنظمة.',
        },
        resources: [
          r('fd2a', 'CFPB: BNPL market (US)', 'مكتب الحماية المالية: سوق الدفع لاحقاً', 'https://www.consumerfinance.gov/about-us/newsroom/cfpb-research-releases-buy-now-pay-later-report/'),
          r('fd2b', 'World Bank: Digital credit', 'البنك الدولي: الائتمان الرقمي', 'https://www.worldbank.org/en/topic/financialsector/brief/digital-credit'),
        ],
      },
      {
        id: 'fd3',
        title: { en: 'Wealth, trading & robo-advisory', ar: 'الثروة والتداول والاستشارة الآلية' },
        description: {
          en: 'Brokerage stacks, fee compression, suitability rules, and how algorithms allocate across ETFs—ties to portfolio science in the “engines” phase.',
          ar: 'بنية الوساطة، ضغط العمولات، قواعد الملاءمة، وكيف توزع الخوارزميات على صناديق المؤشرات — يرتبط بعلم المحافظ في مرحلة «المحركات».',
        },
        resources: [
          r('fd3a', 'SEC: Robo-advisers (investor bulletin)', 'هيئة الأوراق الأمريكية: الروبو-مستشار', 'https://www.sec.gov/oiea/investor-alerts-bulletins/ib_robo-advisers'),
          r('fd3b', 'IOSCO: Retail market conduct', 'أيوسكو: سلوك سوق التجزئة', 'https://www.iosco.org/'),
        ],
      },
      {
        id: 'fd4',
        title: { en: 'Digital assets, custody & market structure', ar: 'الأصول الرقمية والحفظ وهيكل السوق' },
        description: {
          en: 'Trading venues vs brokers, cold/hot custody, stablecoins vs CBDC narratives, and why “crypto FinTech” still intersects payments and securities law.',
          ar: 'منصات التداول مقابل الوسطاء، الحفظ البارد/الساخن، العملات المستقرة مقابل سرد العملة الرقمية للبنك المركزي، ولماذا «فنتك الكريبتو» يتقاطع مع قانون المدفوعات والأوراق.',
        },
        resources: [
          r('fd4a', 'FATF: Virtual assets guidance', 'فاتف: إرشادات الأصول الافتراضية', 'https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Guidance-rba-virtual-assets-vasps.html'),
          r('fd4b', 'BIS: CBDC tracker', 'بنك التسويات: تتبع العملة الرقمية للبنك المركزي', 'https://www.bis.org/about/bisih/topics/cbdc.htm'),
        ],
      },
      {
        id: 'fd5',
        title: { en: 'Crowdfunding & alternative finance', ar: 'التمويل الجماعي والتمويل البديل' },
        description: {
          en: 'Equity vs reward vs debt crowdfunding, platform due diligence, and regional limits on public solicitation.',
          ar: 'تمويل جماعي بالأسهم مقابل المكافأة مقابل الدين، العناية الواجبة على المنصات، وحدود الطرح العلني إقليمياً.',
        },
        resources: [
          r('fd5a', 'Cambridge: Alternative finance reports', 'كامبريدج: تقارير التمويل البديل', 'https://www.jbs.cam.ac.uk/faculty-research/centres/alternative-finance/publications/'),
          r('fd5b', 'EC: Crowdfunding regulation (EU context)', 'المفوضية الأوروبية: تنظيم التمويل الجماعي', 'https://finance.ec.europa.eu/crowdfunding_en'),
        ],
      },
      {
        id: 'fd6',
        title: { en: 'Corporate, treasury & embedded B2B finance', ar: 'الشركات والخزينة والتمويل المدمج B2B' },
        description: {
          en: 'AP/AR automation, supply-chain finance, FX hedging tools, and APIs that embed invoices, credit lines, or insurance into ERP and marketplaces.',
          ar: 'أتمتة الذمم الدائنة/المدينة، تمويل سلسلة الإمداد، أدوات تحوط الصرف، وواجهات تدمج الفواتير أو خطوط الائتمان أو التأمين في أنظمة تخطيط الموارد والأسواق.',
        },
        resources: [
          r('fd6a', 'WEF: Trade tech / supply chain finance', 'المنتدى الاقتصادي: تكنولوجيا التجارة', 'https://www.weforum.org/stories/'),
          r('fd6b', 'ICC: Trade finance register', 'الغرفة الدولية: سجل تمويل التجارة', 'https://iccwbo.org/'),
        ],
      },
      {
        id: 'fd7',
        title: { en: 'InsurTech & embedded insurance', ar: 'التأمين التقني والتأمين المدمج' },
        description: {
          en: 'Parametric products, usage-based models, distribution through non-insurance apps, and conduct expectations when insurance is sold in three taps.',
          ar: 'منتجات شبهية، نماذج حسب الاستخدام، التوزيع عبر تطبيقات ليست تأمينية، وتوقعات السلوك عند بيع التأمين في ثلاث نقرات.',
        },
        resources: [
          r('fd7a', 'IAIS: FinTech / InsurTech', 'الجمعية الدولية للإشراف التأميني', 'https://www.iaisweb.org/page/supervision/fintech'),
          r('fd7b', 'OECD: Technology in insurance', 'منظمة التعاون: التكنولوجيا في التأمين', 'https://www.oecd.org/finance/insurance/'),
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
    id: 'protocols-engines',
    title: { en: 'Networks, protocols & quant engines', ar: 'الشبكات والبروتوكولات والمحركات الكمية' },
    summary: {
      en: 'Under the product screens: messaging networks (SWIFT), national instant stacks (UPI-style), standards like ISO 20022, and the math that powers portfolios and trading systems—not exhaustive, but enough to speak credibly with engineers and quants.',
      ar: 'تحت واجهات المنتج: شبكات الرسائل (سويفت)، البنى الفورية الوطنية (أسلوب يو بي آي)، معايير مثل ISO 20022، والرياضيات التي تشغل المحافظ وأنظمة التداول — ليس شاملاً، لكن يكفي للحديث بجدية مع المهندسين ومحللي الكمّ.',
    },
    outcomes: {
      en: [
        'Contrast messaging rails (e.g. SWIFT) with clearing/settlement layers in one diagram',
        'Name where portfolio optimisation and matching engines sit in wealth and trading stacks',
      ],
      ar: [
        'مقارنة قنوات الرسائل (مثل سويفت) مع طبقات المقاصة/التسوية في مخطط واحد',
        'تحديد مكان تحسين المحافظ ومحركات المطابقة في بنى الثروة والتداول',
      ],
    },
    topics: [
      {
        id: 'pe1',
        title: { en: 'SWIFT, MT/MX & ISO 20022', ar: 'سويفت وMT/MX وISO 20022' },
        description: {
          en: 'Financial messaging—not “a blockchain”—carrying payment instructions between institutions. Understand MT vs MX, the ISO 20022 migration, and where SWIFT gpi fits in transparency.',
          ar: 'رسائل مالية — ليست «بلوكشين» — تحمل تعليمات الدفع بين المؤسسات. افهم MT مقابل MX، انتقال ISO 20022، ومكان سويفت جي بي آي في الشفافية.',
        },
        resources: [
          r('pe1a', 'SWIFT: About us & standards', 'سويفت: من نحن والمعايير', 'https://www.swift.com/about-us'),
          r('pe1b', 'ISO 20022 (official)', 'ISO 20022', 'https://www.iso20022.org/'),
        ],
      },
      {
        id: 'pe2',
        title: { en: 'UPI & national instant payment stacks', ar: 'يو بي آي والبنى الوطنية للدفع الفوري' },
        description: {
          en: 'India’s Unified Payments Interface as a reference: single identity, multi-bank apps, real-time debits. Compare mentally to Faster Payments, PIX, or regional instant schemes—common pattern, different governance.',
          ar: 'الواجهة الموحدة للمدفوعات في الهند كمرجع: هوية واحدة، تطبيقات متعددة للبنوك، خصم فوري. قارن ذهنياً بـ Faster Payments أو بيكس أو المخططات الفورية الإقليمية — نمط مشابه وحوكمة مختلفة.',
        },
        resources: [
          r('pe2a', 'NPCI: UPI product overview', 'NPCI: نظرة على يو بي آي', 'https://www.npci.org.in/what-we-do/upi/product-overview'),
          r('pe2b', 'BIS CPMI: Fast retail payments', 'بنك التسويات: المدفوعات السريعة للتجزئة', 'https://www.bis.org/cpmi/publ/d409.pdf'),
        ],
      },
      {
        id: 'pe3',
        title: { en: 'Card networks vs domestic schemes', ar: 'شبكات البطاقات مقابل المخططات المحلية' },
        description: {
          en: 'Four-party model, interchange caps, tokenisation, and how national switches (e.g. Mada) coexist with global brands in many countries.',
          ar: 'نموذج الأربعة أطراف، سقوف التبادل، الرمز المميز، وكيف تعيش المفاتيح الوطنية (مثل مدى) مع العلامات العالمية في كثير من الدول.',
        },
        resources: [
          r('pe3a', 'Visa: How network operates (basics)', 'فيزا: كيف تعمل الشبكة', 'https://usa.visa.com/run-your-business/small-business-tools/payment-technology.html'),
          r('pe3b', 'EU: Interchange regulation context', 'الاتحاد الأوروبي: سياق تنظيم التبادل', 'https://finance.ec.europa.eu/consumer-finance-and-payments/payment-services/interchange-fees_en'),
        ],
      },
      {
        id: 'pe4',
        title: { en: 'RTGS, ACH & correspondent banking', ar: 'التسوية الإجمالية الفورية وACH والمراسلة المصرفية' },
        description: {
          en: 'High-value gross settlement vs batch retail rails, liquidity timing, nostro/vostro, and why cross-border still feels slow even when domestic is instant.',
          ar: 'التسوية الإجمالية للقيم العالية مقابل قنوات التجزئة الدفعية، توقيت السيولة، نسترو/فوسترو، ولماذا العابر للحدود ما زال بطيئاً حين يكون المحلي فورياً.',
        },
        resources: [
          r('pe4a', 'BIS: Payment, clearing & settlement', 'بنك التسويات: الدفع والمقاصة والتسوية', 'https://www.bis.org/cpmi/publ/d174.pdf'),
          r('pe4b', 'New York Fed: Large-value systems', 'الاحتياطي الفيدرالي نيويورك: أنظمة القيم الكبيرة', 'https://www.newyorkfed.org/financial-services-and-infrastructure'),
        ],
      },
      {
        id: 'pe5',
        title: { en: 'Modern portfolio theory & robo allocation', ar: 'نظرية المحافظ الحديثة والتوزيع الآلي' },
        description: {
          en: 'Mean-variance intuition, efficient frontier, risk parity flavours, and how consumer apps implement “set and forget” portfolios under regulatory constraints—not personal investment advice.',
          ar: 'حدس المتوسط-التباين، الحدود الفعالة، أشكال توازن المخاطر، وكيف تطبق تطبيقات الاستهلاك محافظ «اضبط وانسَ» تحت قيود تنظيمية — وليس نصيحة استثمارية شخصية.',
        },
        resources: [
          r('pe5a', 'Investopedia: Modern Portfolio Theory', 'إنفستوبيديا: نظرية المحافظ الحديثة', 'https://www.investopedia.com/terms/m/modernportfoliotheory.asp'),
          r('pe5b', 'CFA Institute: Portfolio management basics', 'معهد CFA: أساسيات إدارة المحافظ', 'https://www.cfainstitute.org/en/research/foundation/2015/portfolio-management-concepts'),
        ],
      },
      {
        id: 'pe6',
        title: { en: 'Matching engines & market microstructure', ar: 'محركات المطابقة وبنية السوق الدقيقة' },
        description: {
          en: 'Order books, price-time priority, latency fairness, and where FinTech trading apps plug into exchanges or internalisers—useful context for engineering and product roles.',
          ar: 'دفاتر الأوامر، أولوية السعر-الزمن، عدالة التأخير، وأين تتصل تطبيقات تداول الفنتك بالبورصات أو المعالجات الداخلية — سياق مفيد لأدوار الهندسة والمنتج.',
        },
        resources: [
          r('pe6a', 'SEC: National market system (US overview)', 'هيئة الأوراق: النظام الوطني للسوق', 'https://www.sec.gov/rules-regulations/study-and-reports-on-regulatory-system/national-market-system'),
          r('pe6b', 'BIS: Market liquidity & structure', 'بنك التسويات: سيولة السوق والبنية', 'https://www.bis.org/publ/work405.pdf'),
        ],
      },
      {
        id: 'pe7',
        title: { en: 'FIX, APIs & connectivity layers', ar: 'FIX وواجهات البرمجة وطبقات الربط' },
        description: {
          en: 'FIX protocol culture in institutional trading vs REST/JSON in banking APIs; webhooks, streaming market data, and operational differences between “screen” and “machine” workflows.',
          ar: 'ثقافة بروتوكول FIX في التداول المؤسسي مقابل REST/JSON في واجهات المصارف؛ خطافات الويب، بث بيانات السوق، والفروق التشغيلية بين سير عمل «الشاشة» و«الآلة».',
        },
        resources: [
          r('pe7a', 'FIX Trading Community', 'مجتمع تداول FIX', 'https://www.fixtrading.org/'),
          r('pe7b', 'OpenAPI Initiative', 'مبادرة OpenAPI', 'https://www.openapis.org/'),
        ],
      },
    ],
  },
  {
    id: 'regulation',
    title: { en: 'Regulation, risk & trust', ar: 'التنظيم والمخاطر والثقة' },
    summary: {
      en: 'Licences, AML/KYC, fraud, and privacy—including PDPL, GDPR, CCPA/CPRA, and how other data laws layer on what you can ship and what evidence you must keep.',
      ar: 'التراخيص، مكافحة غسل الأموال واعرف عميلك، الاحتيال، والخصوصية — بما فيها نظام حماية البيانات السعودي وGDPR وCCPA/CPRA، وكيف تتراكب قوانين البيانات على ما يمكن إطلاقه والأدلة المطلوبة.',
    },
    outcomes: {
      en: [
        'List three artefacts a compliance team usually asks for before go-live',
        'Explain why KYC is both UX and risk problem',
        'Contrast PDPL, GDPR, and CCPA/CPRA on notices, consent, and cross-border transfers at a headline level',
      ],
      ar: [
        'ذكر ثلاثة مستندات عادةً يطلبها فريق الامتثال قبل الإطلاق',
        'شرح لماذا اعرف عميلك مسألة تجربة مستخدم ومخاطر معاً',
        'مقارنة عناوينية بين نظام حماية البيانات السعودي وGDPR وCCPA/CPRA في الإشعارات والموافقة والنقل عبر الحدود',
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
        title: { en: 'Privacy principles (any jurisdiction)', ar: 'مبادئ الخصوصية (أي اختصاص قضائي)' },
        description: {
          en: 'Ideas that show up everywhere: purpose limitation, data minimisation, retention, records of processing, DPIAs/PIAs, subprocessors, and breach playbooks. Learn the pattern once, then map it to PDPL, GDPR, CCPA, and others.',
          ar: 'أفكار تتكرر في كل مكان: حدود الغرض، تقليل البيانات، الاحتفاظ، سجلات المعالجة، تقييمات أثر الخصوصية، المعالجون الفرعيون، وخطط الاختراق. افهم النمط مرة ثم طبّقه على نظام حماية البيانات السعودي وGDPR وCCPA وغيرها.',
        },
        resources: [
          r('g5a', 'OECD: Privacy principles', 'منظمة التعاون: مبادئ الخصوصية', 'https://www.oecd.org/digital/privacy/'),
          r('g5b', 'ENISA: Data protection engineering', 'إنيسا: هندسة حماية البيانات', 'https://www.enisa.europa.eu/topics/data-protection'),
        ],
      },
      {
        id: 'g6',
        title: { en: 'Saudi PDPL & national data governance', ar: 'نظام حماية البيانات الشخصية السعودي وحوكمة البيانات الوطنية' },
        description: {
          en: 'KSA Personal Data Protection Law: lawful processing, rights of data subjects, cross-border transfer rules, and how SDAIA/NDMO guidance fits FinTech (cloud, analytics, open banking). Always read the official Arabic legal text and your counsel’s memo—not blog summaries alone.',
          ar: 'نظام حماية البيانات الشخصية في المملكة: المعالجة المشروعة، حقوق أصحاب البيانات، قواعد النقل عبر الحدود، وكيف تتكامل إرشادات سدايا/المركز الوطني لإدارة البيانات مع الفنتك (السحابة، التحليلات، المصرفية المفتوحة). اقرأ النص القانوني الرسمي ومذكرة مستشارك — لا تعتمد على المدونات وحدها.',
        },
        resources: [
          r('g6a', 'SDAIA — Saudi data & AI authority', 'سدايا', 'https://sdaia.gov.sa/en'),
          r('g6b', 'NDMO — National Data Management Office (KSA)', 'المركز الوطني لإدارة البيانات', 'https://ndmo.gov.sa/en'),
        ],
      },
      {
        id: 'g7',
        title: { en: 'EU GDPR & UK GDPR', ar: 'اللائحة العامة لحماية البيانات في الاتحاد الأوروبي والمملكة المتحدة' },
        description: {
          en: 'Lawful bases (consent, contract, legitimate interests), data subject rights, DPO triggers, SCCs/IDT for third-country transfers, and headline fines. EU GDPR and UK GDPR are similar but not identical—treat UK as a separate regime post-Brexit.',
          ar: 'الأسس القانونية (الموافقة، العقد، المصالح المشروعة)، حقوق أصحاب البيانات، متى يلزم مسؤول حماية البيانات، البنود التعاقدية/آليات النقل لدول ثالثة، والغرامات البارزة. اللائحة الأوروبية والبريطانية متقاربتان لكنهما ليستا متطابقتين — عالج المملكة المتحدة كنظام مستقل بعد بريكست.',
        },
        resources: [
          r('g7a', 'EUR-Lex: GDPR (legal text)', 'يور-لكس: نص GDPR', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679'),
          r('g7b', 'ICO UK: Guide to data protection', 'مكتب مفوض المعلومات UK', 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/'),
        ],
      },
      {
        id: 'g8',
        title: { en: 'US: CCPA, CPRA & state privacy patchwork', ar: 'الولايات المتحدة: CCPA وCPRA وتشريعات الولايات' },
        description: {
          en: 'California led with CCPA; CPRA added a “sensitive data” layer and the CPPA. Other states (VA, CO, CT, UT, and more) have their own acts—FinTechs often need a matrix of rights, opt-outs, and definitions. Federal sector rules (GLBA for financial data) still matter alongside state law.',
          ar: 'كاليفورنيا قادت بـCCPA؛ وأضافت CPRA طبقة «البيانات الحساسة» وهيئة CPPA. ولايات أخرى لديها قوانينها — غالباً تحتاج جدولاً لحقوق النسيان/الإلغاء والتعاريف. القواعد الفيدرالية القطاعية (مثل GLBA للبيانات المالية) ما زالت مهمة إلى جانب قوانين الولايات.',
        },
        resources: [
          r('g8a', 'California AG: CCPA overview', 'النائب العام لكاليفورنيا: نظرة على CCPA', 'https://oag.ca.gov/privacy/ccpa'),
          r('g8b', 'California CPPA', 'هيئة حماية خصوصية المستهلك كاليفورنيا', 'https://cppa.ca.gov/'),
        ],
      },
      {
        id: 'g9',
        title: { en: 'Global snapshot: LGPD, DPDP, PIPL & more', ar: 'لمحة عالمية: LGPD وDPDP وPIPL وغيرها' },
        description: {
          en: 'Brazil LGPD, India DPDP Act, China PIPL, Canada PIPEDA/Privacy Act reforms—useful when your FinTech serves expats, processes vendor data abroad, or runs multi-region marketing. Goal is to know what to ask legal, not to self-diagnose every statute.',
          ar: 'البرازيل LGPD، الهند DPDP، الصين PIPL، وإصلاحات كندا — مفيد عندما يخدم فنتك الجاليات، أو يعالج بيانات عبر الحدود، أو يتسوّق في أكثر من إقليم. الهدف أن تعرف ماذا تسأل القانوني، لا أن تُصدر حكماً على كل نص بنفسك.',
        },
        resources: [
          r('g9a', 'Brazil LGPD (gov portal)', 'البرازيل: LGPD', 'https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd'),
          r('g9b', 'India: Digital Personal Data Protection', 'الهند: حماية البيانات الشخصية الرقمية', 'https://www.meity.gov.in/data-protection-framework'),
          r('g9c', 'IAPP: Global privacy legislation directory', 'IAPP: دليل التشريعات', 'https://iapp.org/resources/global-privacy-directory/'),
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
