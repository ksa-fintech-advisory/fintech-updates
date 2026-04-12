import { buildEmailHtml } from './emailTemplate';
import type { NewsletterFormData } from '@/core/types/web/contact';

const SENDGRID_MAIL_SEND_URL = 'https://api.sendgrid.com/v3/mail/send';

function getInboxEmail(): string {
  return (
    process.env.CONTACT_FORM_TO_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    'm.alhoomaidi@gmail.com'
  );
}

function getFromEmail(): string | undefined {
  return process.env.SENDGRID_FROM_EMAIL?.trim();
}

/** Parses `Name <email@domain.com>` or plain `email@domain.com` for SendGrid JSON. */
function parseFromField(raw: string): { email: string; name?: string } {
  const trimmed = raw.trim();
  const m = trimmed.match(/^(.+?)\s*<([^>]+)>$/);
  if (m) {
    const name = m[1].replace(/^["']|["']$/g, '').trim();
    const email = m[2].trim();
    return name ? { email, name } : { email };
  }
  return { email: trimmed };
}

export class SendGridNotConfiguredError extends Error {
  constructor() {
    super('SENDGRID_NOT_CONFIGURED');
    this.name = 'SendGridNotConfiguredError';
  }
}

export class SendGridApiError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly responseBody: unknown,
  ) {
    super(message);
    this.name = 'SendGridApiError';
  }
}

export async function sendNewsletterEmail(data: NewsletterFormData): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  const fromRaw = getFromEmail();
  const to = getInboxEmail();

  if (!apiKey || !fromRaw) {
    throw new SendGridNotConfiguredError();
  }

  const from = parseFromField(fromRaw);
  const { email } = data;

  const text = `New Interest Registration from: ${email}`;

  const html = buildEmailHtml({
    formType: 'newsletter',
    title: 'New Interest Registration',
    fields: [
      { label: 'Email', value: email },
    ],
  });

  const body = {
    personalizations: [{ to: [{ email: to }] }],
    from,
    subject: `[Interest] New registration from ${email}`,
    content: [
      { type: 'text/plain', value: text },
      { type: 'text/html', value: html },
    ],
  };

  const res = await fetch(SENDGRID_MAIL_SEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    return;
  }

  let responseBody: unknown;
  const ct = res.headers.get('content-type') ?? '';
  try {
    const raw = await res.text();
    if (raw) {
      responseBody = ct.includes('application/json') ? JSON.parse(raw) : raw;
    }
  } catch {
    responseBody = undefined;
  }

  throw new SendGridApiError(`SendGrid returned ${res.status}`, res.status, responseBody);
}
