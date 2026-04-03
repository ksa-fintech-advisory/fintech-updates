import { AboutUsContent } from '@/core/types/web/aboutUs';

export const aboutUsData: AboutUsContent = {
  mission: {
    en: 'Reduce guesswork for people building under real supervisory pressure—fewer dead ends, more honest trade-offs, and architecture that still works after launch week.',
    ar: 'تقليل التخمين لمن يبنون تحت ضغط رقابي حقيقي — مسارات أقل مسدودة، ومفاضلات أوضح، وبنية ما زالت تعمل بعد أسبوع الإطلاق.',
  },
  vision: {
    en: 'A corner of the internet (and a calendar) where product, risk, and engineering can be discussed in one thread—especially for Saudi and Gulf FinTech.',
    ar: 'زاوية من الويب (وتقويم) يمكن فيها مناقشة المنتج والمخاطر والهندسة في سياق واحد — خصوصاً لتقنية المالية في السعودية والخليج.',
  },
  description: {
    en: 'If we work together, you get my attention—not a rotating cast. I translate what regulators and partners actually ask for into what your team should build, document, and instrument next.',
    ar: 'إذا تعاونا، تحصل على تركيزي — لا على وجوه متناوبة. أحوّل ما تطلبه الجهات الرقابية والشركاء فعلياً إلى ما ينبغي أن يبنيه فريقك ويوثقه ويراقبه في الخطوة التالية.',
  },
  values: [
    {
      id: '1',
      icon: '⚖️',
      title: { en: 'Candor', ar: 'الصراحة' },
      description: {
        en: "I'll tell you when I don't know, when something is risky, and when 'later' will cost more than 'now'.",
        ar: 'سأقول لك عندما لا أعلم، وعندما يكون أمرٌ محفوفاً بالمخاطر، وعندما «لاحقاً» يكلف أكثر من «الآن».',
      },
    },
    {
      id: '2',
      icon: '💡',
      title: { en: 'Small bets', ar: 'رهانات صغيرة' },
      description: {
        en: 'I like proofs you can demo: thin slices, measurable checkpoints, and fewer big-bang reveals.',
        ar: 'أفضّل أدلة يمكن عرضها: شرائح رفيعة، نقاط تحقق قابلة للقياس، وكشوف أقل «دفعة واحدة».',
      },
    },
    {
      id: '3',
      icon: '🤝',
      title: { en: 'Beside you', ar: 'بجانبك' },
      description: {
        en: "I join your Slack threads, calls, and docs—not only the final 'advisory PDF'.",
        ar: 'أشارك في قنواتكم والمكالمات والمستندات — لا فقط «ملف الاستشارة» النهائي.',
      },
    },
    {
      id: '4',
      icon: '🎯',
      title: { en: 'Depth where it hurts', ar: 'عمق حيث يوجع' },
      description: {
        en: 'Extra care on money movement, identity, data boundaries, and the questions auditors repeat.',
        ar: 'عناية إضافية بحركة الأموال والهوية وحدود البيانات والأسئلة التي يكررها المدققون.',
      },
    },
  ],
  expertise: [
    {
      id: '1',
      icon: '🏛️',
      title: { en: 'Licensing & sandbox mindset', ar: 'الترخيص وتفكير البيئة التجريبية' },
      description: {
        en: "SAMA/CMA journeys I've seen up close—what evidence tends to matter early, and what trips teams up.",
        ar: 'مسارات ساما/هيئة السوق عن قرب — ما الأدلة التي تهم مبكراً، وما الذي يعيق الفرق.',
      },
    },
    {
      id: '2',
      icon: '📊',
      title: { en: 'Product reality in KSA/GCC', ar: 'واقع المنتج في السعودية والخليج' },
      description: {
        en: 'Positioning and roadmaps that respect local expectations, partnerships, and speed of regulation.',
        ar: 'التموضع وخطط الطريق بما يراعي التوقعات المحلية والشراكات وسرعة التنظيم.',
      },
    },
    {
      id: '3',
      icon: '🛡️',
      title: { en: 'Controls that survive review', ar: 'ضوابط تنجو من المراجعة' },
      description: {
        en: 'AML/KYC, security basics, and operational controls designed for humans who actually run them.',
        ar: 'أساسيات مكافحة غسل الأموال والأمن والضوابط التشغيلية المصممة لمن ينفّذها فعلياً.',
      },
    },
    {
      id: '4',
      icon: '💰',
      title: { en: 'Rails & integrations', ar: 'القنوات والتكاملات' },
      description: {
        en: 'Practical threads on Mada, Sadad, SARIE-style flows—where the sharp edges usually hide.',
        ar: 'مناقشات عملية حول مدى وسداد وسريع — حيث تختبئ الزوايا الحادة عادةً.',
      },
    },
  ],
};
