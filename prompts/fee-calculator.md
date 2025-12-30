You are a senior fintech backend engineer and product-focused frontend architect.

You are provided with a COMPLETE and FINAL JSON dataset that defines pricing rules for Saudi Arabian payment service providers (PSPs) at /src/data/saudi_psp_pricing.json

Your task is to IMPLEMENT the BUSINESS LOGIC and UI BEHAVIOR
for a Saudi payment gateway fee calculator.

━━━━━━━━━━━━━━━━━━━━━━
CORE PRINCIPLES (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━

- Pricing data is provided as a JSON file (single source of truth)
- All calculations MUST happen in the backend
- Frontend MUST contain zero pricing or calculation logic
- Frontend is responsible only for:
  - collecting user inputs
  - calling backend APIs
  - presenting results clearly

DO NOT:
- hardcode any pricing values
- duplicate logic between frontend and backend
- make assumptions outside the JSON

━━━━━━━━━━━━━━━━━━━━━━
BUSINESS DOMAIN CONTEXT
━━━━━━━━━━━━━━━━━━━━━━

The system calculates estimated monthly payment processing costs
for Saudi payment service providers (PSPs).

The pricing JSON includes:
- Monthly subscription fees
- Setup fees
- Per-transaction fixed fees
- Percentage fees per payment method
- Mada fee caps
- FX uplifts for international cards
- VAT applicability
- Settlement characteristics
- Confidence level for pricing accuracy

━━━━━━━━━━━━━━━━━━━━━━
BACKEND BUSINESS LOGIC (CRITICAL)
━━━━━━━━━━━━━━━━━━━━━━

Implement a PURE calculation engine that:

1. Accepts:
   - Provider name
   - Monthly processing volume (SAR)
   - Average transaction value (SAR)
   - Payment mix percentages per method

2. Derives:
   - Transaction count
     transactions = monthlyVolume / averageTransactionValue

3. Calculates variable fees per payment method:
   - percentage_fee × transaction_amount
   - + fixed_fee per transaction
   - Mada fees must respect cap limits per transaction
   - FX uplift applies ONLY to international Visa/Mastercard
   - VAT (15%) applies ONLY to total fees (not volume)

4. Calculates fixed costs:
   - Monthly subscription fee
   - Setup fee amortized over 12 months

5. Produces a result object containing:
   - Total monthly fees
   - Effective fee rate (%)
   - Net settlement amount
   - VAT amount
   - Fixed vs variable fee split
   - Per-method breakdown
   - Assumptions list derived from JSON metadata
   - Confidence level

The calculation engine must:
- Be deterministic
- Be fully data-driven
- Contain no HTTP or framework logic

━━━━━━━━━━━━━━━━━━━━━━
BACKEND VALIDATION RULES
━━━━━━━━━━━━━━━━━━━━━━

Backend MUST validate:
- Provider exists in pricing data
- Payment mix totals exactly 100%
- Positive numeric values only
- Supported payment methods only

Return clear, structured error responses.

━━━━━━━━━━━━━━━━━━━━━━
FRONTEND UI / UX LOGIC (NO STYLING)
━━━━━━━━━━━━━━━━━━━━━━

In desing wise, we already initiate the page under /[locale]/web/products/fee-calculator
Design the frontend behavior to:

INPUT PHASE
- Select payment provider
- Enter monthly volume
- Enter average transaction value
- Adjust payment mix with:
  - real-time percentage validation
  - visual feedback if total ≠ 100%

SUBMISSION
- Disable submit until inputs are valid
- Show loading state during calculation

RESULTS DISPLAY
- Show total monthly cost prominently
- Show effective rate (%)
- Show net settlement amount
- Display fee breakdown per payment method
- Clearly separate:
  - fixed fees
  - variable fees
  - VAT
- Display confidence level and assumptions subtly

UX RULES
- No financial guarantees
- No marketing language
- Treat results as estimations
- Merchant-friendly terminology

━━━━━━━━━━━━━━━━━━━━━━
DATA CONTRACT (STRICT)
━━━━━━━━━━━━━━━━━━━━━━

The frontend must treat the backend response as immutable.
All numbers must be displayed exactly as returned.

━━━━━━━━━━━━━━━━━━━━━━
CODE OUTPUT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━

- Produce real, production-ready TypeScript code
- Use clear function boundaries
- Include inline comments for financial logic
- Avoid abstractions that hide business rules
- No pseudo-code

This is a fintech calculation engine, not a demo.
Assume merchants rely on these results for decision-making.
