
export type MarketVertical = 'payments' | 'lending' | 'insurtech' | 'capital_markets';

export interface MarketData {
  tam: number; // Total Addressable Market in Billions SAR
  cagr: number; // Compound Annual Growth Rate
  activeCompanies: number;
  growthTrend: number[]; // 5-year trend (e.g., 2023-2027)
  topPlayers: { name: string; share: number }[];
  insight: {
    en: string;
    ar: string;
  };
}

export const MARKET_DATA: Record<MarketVertical, MarketData> = {
  payments: {
    tam: 65.2,
    cagr: 18.5,
    activeCompanies: 45,
    growthTrend: [40, 48, 55, 65, 78],
    topPlayers: [
      { name: 'STC Pay', share: 35 },
      { name: 'UrPay', share: 20 },
      { name: 'Geidea', share: 15 },
    ],
    insight: {
      en: 'The payments sector is the most mature, driving 60% of KSA FinTech activity. Open Banking regulations are expected to boost P2P transfers by 25% YoY.',
      ar: 'يعد قطاع المدفوعات الأكثر نضجاً، حيث يمثل 60% من نشاط التقنية المالية في المملكة. من المتوقع أن تعزز تشريعات المصرفية المفتوحة التحويلات بين الأفراد بنسبة 25% سنوياً.',
    }
  },
  lending: {
    tam: 32.8,
    cagr: 22.1,
    activeCompanies: 28,
    growthTrend: [15, 20, 25, 32, 42],
    topPlayers: [
      { name: 'Lendo', share: 18 },
      { name: 'Raqamyah', share: 15 },
      { name: 'Tamara', share: 25 }, // BNPL categorized here for demo simplicity
    ],
    insight: {
      en: 'Buy Now Pay Later (BNPL) and SME lending are growing rapidly. The new SAMA debt crowdfunding rules have increased institutional participation.',
      ar: 'يشهد قطاع "الشراء الآن والدفع لاحقاً" وإقراض المنشآت الصغيرة والمتوسطة نمواً سريعاً. أدت قواعد ساما الجديدة للتمويل الجماعي بالدين إلى زيادة مشاركة المؤسسات.',
    }
  },
  insurtech: {
    tam: 12.5,
    cagr: 15.4,
    activeCompanies: 18,
    growthTrend: [8, 9, 10, 12, 14],
    topPlayers: [
      { name: 'Tameeni', share: 30 },
      { name: 'BCare', share: 25 },
    ],
    insight: {
      en: 'Digital insurance aggregation is saturating. The next wave of growth is in usage-based insurance (UBI) and specialized healthtech integrations.',
      ar: 'وصلت مرحلة جمع وثائق التأمين رقمياً إلى التشبع. الموجة القادمة من النمو تكمن في التأمين القائم على الاستخدام وتكامل التقنيات الصحية.',
    }
  },
  capital_markets: {
    tam: 24.0,
    cagr: 28.9,
    activeCompanies: 22,
    growthTrend: [5, 10, 16, 24, 35],
    topPlayers: [
      { name: 'Abyan', share: 20 },
      { name: 'Tamra', share: 18 },
      { name: 'Manna', share: 12 },
    ],
    insight: {
      en: 'Robo-advisory and equity crowdfunding are booming. Retail investor participation in IPOs via digital channels has doubled since 2022.',
      ar: 'تشهد المستشارون الآليون والتمويل الجماعي للمحكية ازدهاراً كبيراً. تضاعفت مشاركة المستثمرين الأفراد في الاكتتابات العامة عبر القنوات الرقمية منذ عام 2022.',
    }
  }
};

export const VERTICAL_LABELS: Record<MarketVertical, { en: string; ar: string }> = {
  payments: { en: 'Payments', ar: 'المدفوعات' },
  lending: { en: 'Lending & Finance', ar: 'التمويل والإقراض' },
  insurtech: { en: 'InsurTech', ar: 'التقنية التأمينية' },
  capital_markets: { en: 'Capital Markets', ar: 'أسواق المال' },
};
