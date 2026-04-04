# Fintech Fundamentals Course – References & Links Audit

**Purpose:** Documentation for government entity. Last checked: 2025.

---

## 1. Content correction applied

### Mada (مدى) – category fix
- **Issue:** Mada was listed under **Lending** (الإقراض). Mada is the **national payment network** (Saudi Payments Network), not a lending company.
- **Fix:** In `src/data/courseData.ts` (Session 1 – Saudi Companies Map):
  - **AR:** Mada moved to Payments: `المدفوعات: STC Pay، Hala، urpay، Paylink، مدى (Mada)`; Lending set to `الإقراض: Lendo ومنصات تمويل أخرى`.
  - **EN:** Same: Payments include Mada; Lending set to `Lending: Lendo and other licensed lending platforms`.

---

## 2. Government & regulatory entities (official)

| Entity | Label (EN) | Label (AR) | URL in course | Status |
|--------|------------|------------|----------------|--------|
| Saudi Central Bank | Saudi Central Bank (SAMA) | البنك المركزي السعودي (ساما) | https://www.sama.gov.sa | ✅ Official (sama.gov.sa) |
| Capital Market Authority | Capital Market Authority | هيئة السوق المالية | https://cma.org.sa | ✅ Official (cma.gov.sa also valid) |
| Vision 2030 | Vision 2030 | رؤية 2030 | https://www.vision2030.gov.sa | ✅ Updated to www |
| PDPL | Personal Data Protection Law | نظام حماية البيانات الشخصية | https://sdaia.gov.sa/ar/PDPL/ | ✅ SDAIA official |
| Nafath | Absher - Nafath / Nafath - National Portal | أبشر - نفاذ | https://www.my.gov.sa/wps/portal/snp/main/nafath | ✅ Government portal |
| SAMA Sandbox | SAMA Sandbox | SAMA Sandbox | https://www.sama.gov.sa/en-US/FinTech/Pages/Sandbox.aspx | ⚠️ Verify on SAMA site (paths may change) |
| Payment Systems Law | Payment Systems Law - SAMA | نظام المدفوعات - ساما | https://www.sama.gov.sa/ar-SA/Laws/Pages/PaymentSystemsLaw.aspx | ⚠️ Verify under SAMA Laws |

---

## 3. Government-linked / ecosystem (Saudi)

| Entity | URL in course | Notes |
|--------|----------------|--------|
| Fintech Saudi | https://fintechsaudi.com | ✅ Verified – FSDP initiative (SAMA + CMA) |
| Fintech Saudi Programs | https://fintechsaudi.com/en/programs | ✅ Same site |
| Monsha'at (منشآت) | https://www.monshaat.gov.sa | ✅ Ministry – verify when documenting |
| Badir | https://badir.com.sa | ⚠️ May return 503 at times – entity is valid (Badir for Technology) |
| SIMAH | https://www.simah.com | ✅ Saudi Credit Bureau – SAMA supervised |

---

## 4. Companies & products referenced in course content

- **Payments:** STC Pay, Hala, urpay, Paylink, Mada (network) – real entities.
- **BNPL:** Tamara, Tabby, Spotii – real.
- **Lending:** Lendo – real; text now says “Lendo and other licensed lending platforms”.
- **Insurtech:** Tameeni, Salama, Najm – real.
- **Wealthtech:** Wahed, Derayah, Scopeer – real.
- **Infrastructure:** Lean Technologies, Geidea, Rewaa – real.
- **External docs (non-Saudi):** Stripe (https://stripe.com/docs), Plaid (https://plaid.com/docs/) – correct.

---

## 5. Where references appear

- **Course data (links & names):** `src/data/courseData.ts` (sessions 1–4, `importantLinks`, `keyTerms`).
- **Messages (labels only):** `messages/en.json`, `messages/ar.json` under `fintechFundamentals` and `courseRegistration`.
- **Session pages:** `src/app/[locale]/web/courses/fintech-fundamentals/session/[id]/page.tsx` (uses `courseData`).
- **Landing/register/dashboard:** Same messages + links from `courseData` where used.

---

## 6. Recommendations for government documentation

1. **Re-verify closer to submission:** Open each URL in the table (especially SAMA Sandbox and Payment Systems Law) on https://www.sama.gov.sa in case paths change.
2. **CMA:** Prefer **https://cma.gov.sa** if the entity requires a .gov.sa domain; current **https://cma.org.sa** is also official.
3. **Company names:** All listed companies (STC Pay, Tamara, Lendo, etc.) are real; no fictional names in course content after this audit.
4. **No certificate:** Course materials no longer promise a “certified completion certificate” (removed in messages).

---

## 7. File list (course-specific)

| File | Role |
|------|------|
| `src/data/courseData.ts` | Session content, links, key terms, company map |
| `src/data/fintechFundamentalsData.ts` | Phase IDs and styling only |
| `src/data/skillBadgesData.ts` | Badges/certificates (if still shown) |
| `messages/en.json` | EN labels for course & registration |
| `messages/ar.json` | AR labels for course & registration |

This audit and the Mada/Lending fix keep references and links accurate and suitable for government entity documentation.
