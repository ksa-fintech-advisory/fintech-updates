/** Public contact details (safe to ship to the client). */
export const PUBLIC_CONTACT_EMAIL = 'm.alhoomaidi@gmail.com' as const;

/**
 * WhatsApp chat deep link. Set `NEXT_PUBLIC_WHATSAPP_E164` in `.env` to your
 * number in international format **without** + (e.g. `966501234567`).
 */
export function getWhatsAppWaMeUrl(): string | undefined {
  const raw = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_WHATSAPP_E164 : '';
  const digits = (raw ?? '').replace(/\D/g, '');
  if (digits.length < 10) return undefined;
  return `https://wa.me/${digits}`;
}
