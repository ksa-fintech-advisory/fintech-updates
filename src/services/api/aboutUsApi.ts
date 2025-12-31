
export interface BilingualText {
  en: string;
  ar: string;
}

export interface ValueItem {
  id: string;
  icon: string;
  title: BilingualText;
  description: BilingualText;
}

export interface ExpertiseItem {
  id: string;
  icon: string;
  title: BilingualText;
  description: BilingualText;
}

export interface AboutUsContent {
  mission: BilingualText;
  vision: BilingualText;
  description: BilingualText;
  values: ValueItem[];
  expertise: ExpertiseItem[];
}

const aboutUsData: AboutUsContent = {
  mission: {
    en: "To empower financial institutions and fintech startups in Saudi Arabia with actionable insights, regulatory guidance, and strategic advisory to navigate the evolving financial landscape.",
    ar: "تمكين المؤسسات المالية والشركات الناشئة في مجال التقنية المالية في المملكة العربية السعودية من خلال الرؤى القابلة للتنفيذ، والتوجيه التنظيمي، والاستشارات الاستراتيجية للتنقل في المشهد المالي المتطور."
  },
  vision: {
    en: "To be the leading catalyst for fintech innovation and regulatory excellence in the Kingdom, contributing to Vision 2030's financial sector development goals.",
    ar: "أن نكون المحفز الرائد لابتكار التقنية المالية والتميز التنظيمي في المملكة، والمساهمة في أهداف تطوير القطاع المالي لرؤية 2030."
  },
  description: {
    en: "We bridge the gap between complex regulatory frameworks and innovative financial solutions. Our deep understanding of SAMA and CMA regulations, combined with market intelligence, ensures your fintech venture is built on solid ground.",
    ar: "نحن نسد الفجوة بين الأطر التنظيمية المعقدة والحلول المالية المبتكرة. فهمنا العميق للوائح البنك المركزي السعودي وهيئة السوق المالية، جنبًا إلى جنب مع ذكاء السوق، يضمن بناء مشروع التقنية المالية الخاص بك على أرض صلبة."
  },
  values: [
    {
      id: '1',
      icon: '⚖️',
      title: {
        en: "Integrity",
        ar: "النزاهة"
      },
      description: {
        en: "We operate with the highest standards of professional ethics and transparency.",
        ar: "نعمل بأعلى معايير الأخلاق المهنية والشفافية."
      }
    },
    {
      id: '2',
      icon: '💡',
      title: {
        en: "Innovation",
        ar: "الابتكار"
      },
      description: {
        en: "We embrace new technologies and methodologies to solve traditional problems.",
        ar: "نتبنى تقنيات ومنهجيات جديدة لحل المشكلات التقليدية."
      }
    },
    {
      id: '3',
      icon: '🤝',
      title: {
        en: "Partnership",
        ar: "الشراكة"
      },
      description: {
        en: "We view our clients as long-term partners, invested in their sustainable growth.",
        ar: "ننظر لعملائنا كشركاء على المدى الطويل، ونستثمر في نموهم المستدام."
      }
    },
    {
      id: '4',
      icon: '🎯',
      title: {
        en: "Excellence",
        ar: "التميز"
      },
      description: {
        en: "We strive for perfection in every report, advisory session, and solution we deliver.",
        ar: "نسعى للكمال في كل تقرير وجلسة استشارية وحل نقدمه."
      }
    }
  ],
  expertise: [
    {
      id: '1',
      icon: '🏛️',
      title: {
        en: "Regulatory Licensing",
        ar: "تراخيص الجهات التنظيمية"
      },
      description: {
        en: "Guidance on SAMA & CMA license applications and sandbox testing.",
        ar: "توجيه بشأن طلبات تراخيص البنك المركزي وهيئة السوق واختبارات البيئة التجريبية."
      }
    },
    {
      id: '2',
      icon: '📊',
      title: {
        en: "Market Strategy",
        ar: "استراتيجية السوق"
      },
      description: {
        en: "Go-to-market strategies tailored for the unique Saudi fintech ecosystem.",
        ar: "استراتيجيات دخول السوق المصممة خصيصًا لمنظومة التقنية المالية السعودية."
      }
    },
    {
      id: '3',
      icon: '🛡️',
      title: {
        en: "Compliance Audits",
        ar: "تدقيق الامتثال"
      },
      description: {
        en: "Comprehensive reviews to ensure ongoing adherence to cybersecurity/AML rules.",
        ar: "مراجعات شاملة لضمان الالتزام المستمر بقواعد الأمن السيبراني ومكافحة غسل الأموال."
      }
    },
    {
      id: '4',
      icon: '💰',
      title: {
        en: "Payment Infrastructure",
        ar: "البنية التحتية للمدفوعات"
      },
      description: {
        en: "Technical advisory on integrating with Mada, Sadad, and Sarie.",
        ar: "استشارات فنية حول التكامل مع مدى، سداد، وسريع."
      }
    }
  ]
};

export const aboutUsApiService = {
  getAboutUsContent: async (lang: string = 'en'): Promise<AboutUsContent> => {
    // Simulate API delay
    // await new Promise((resolve) => setTimeout(resolve, 100));
    return aboutUsData;
  }
};
