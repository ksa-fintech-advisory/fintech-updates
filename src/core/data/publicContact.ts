/** Public contact details (safe to ship to the client). Override with `NEXT_PUBLIC_CONTACT_EMAIL` in `.env`. */
const DEFAULT_CONTACT_EMAIL = 'm.alhoomaidi@gmail.com';

function resolvePublicContactEmail(): string {
  const fromEnv =
    typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() : '';
  return fromEnv || DEFAULT_CONTACT_EMAIL;
}

export const PUBLIC_CONTACT_EMAIL = resolvePublicContactEmail();

/** `mailto:` URL for the public contact address (opens the visitor’s mail client). */
export function getPublicMailtoHref(): string {
  return `mailto:${PUBLIC_CONTACT_EMAIL}`;
}

/** Default WhatsApp (E.164 digits, no +). Override with `NEXT_PUBLIC_WHATSAPP_E164` in `.env`. */
const DEFAULT_WHATSAPP_E164 = '967771511569';

/**
 * WhatsApp chat deep link (`wa.me`). Uses env `NEXT_PUBLIC_WHATSAPP_E164` if set,
 * otherwise the default number above. Value should be digits only or include +/spaces (stripped).
 */
export function getWhatsAppWaMeUrl(): string | undefined {
  const raw = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_WHATSAPP_E164 : '';
  const source = (raw ?? '').trim() || DEFAULT_WHATSAPP_E164;
  const digits = source.replace(/\D/g, '');
  if (digits.length < 10) return undefined;
  return `https://wa.me/${digits}`;
}
