You are a senior fintech frontend engineer and financial calculation specialist.

You are provided with a COMPLETE and FINAL JSON dataset that defines pricing rules for Saudi Arabian payment service providers (PSPs) at /src/data/saudi_psp_pricing.json

⚠️ CRITICAL RULE:
You MUST strictly use the provided JSON as-is.
- Do NOT invent fields
- Do NOT rename keys
- Do NOT hardcode pricing values
- All calculations must dynamically read from the JSON

Your task is to GENERATE REAL, PRODUCTION-READY CODE for a payment fee calculator.



━━━━━━━━━━━━━━━━━━━━━━
DATA CONTRACT (STRICT)
━━━━━━━━━━━━━━━━━━━━━━

The JSON contains:
- providers[]
- pricing.monthly_fee
- pricing.setup_fee
- pricing.payment_methods
- settlement_days
- additional_fees
- confidence_level

You MUST:
- Parse this JSON into typed TypeScript interfaces
- Use it as the single source of truth
- Make the calculator fully data-driven

━━━━━━━━━━━━━━━━━━━━━━
FUNCTIONAL REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━

The calculator MUST support:

1) User Inputs
- Monthly transaction volume (SAR)
- Average transaction value (SAR)
- Payment mix (%):
  - mada
  - visa_mc_local
  - visa_mc_international
- Provider selection:
  - Single provider
  - Comparison (up to 3 providers)

2) Validation
- Payment mix must equal 100%
- Average transaction value > 0
- Volume > 0

━━━━━━━━━━━━━━━━━━━━━━
CALCULATION ENGINE (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━

Implement a pure calculation engine that:

- Calculates number of transactions:
  transactions = volume / avg_transaction_value

- Calculates fees PER payment method using JSON rules:
  - Percentage fees
  - Fixed fees
  - Mada cap logic:
      fee_per_tx = min(tx_amount * percentage, cap)
  - FX uplift applied ONLY to visa_mc_international
  - VAT (15%) applied ONLY to fees

- Adds:
  - Monthly fees
  - Setup fees (amortized monthly, assume 12 months)

- Refunds:
  - Do NOT refund original fees

All logic must be deterministic and reusable.

━━━━━━━━━━━━━━━━━━━━━━
UI COMPONENTS TO GENERATE
━━━━━━━━━━━━━━━━━━━━━━

Generate REAL React components:

1) <CalculatorForm />
   - Controlled inputs
   - Sliders for payment mix
   - Provider selector (single & compare)

2) <ResultsSummary />
   - Total monthly fees
   - Effective blended rate
   - Net settlement amount

3) <BreakdownTable />
   - Fees by payment method
   - Fixed vs variable fees

4) <AssumptionsPanel />
   - Shows assumptions dynamically from JSON
   - Confidence level per provider

━━━━━━━━━━━━━━━━━━━━━━
CODE OUTPUT FORMAT (STRICT)
━━━━━━━━━━━━━━━━━━━━━━

Return the code in this EXACT order:

Follow the same code structure we are using
━━━━━━━━━━━━━━━━━━━━━━
QUALITY & SAFETY
━━━━━━━━━━━━━━━━━━━━━━

- Type-safe (no `any`)
- Financial logic must be commented
- No legal or commercial guarantees in UI text
- Clear separation of data, logic, and UI

This is a REAL fintech product.
Assume it will be used by merchants to make financial decisions.
Code quality and correctness are critical.
