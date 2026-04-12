import type { ContactFormData } from '@/core/types/web/contact';

const SENDGRID_MAIL_SEND_URL = 'https://api.sendgrid.com/v3/mail/send';

import { buildEmailHtml } from './emailTemplate';

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

/**
 * Sends the public contact form payload to the site inbox via SendGrid (HTTP API, Edge-safe).
 * Requires `SENDGRID_API_KEY` and a verified `SENDGRID_FROM_EMAIL`.
 */
export async function sendContactFormEmail(data: ContactFormData): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  const fromRaw = getFromEmail();
  const to = getInboxEmail();

  if (!apiKey || !fromRaw) {
    throw new SendGridNotConfiguredError();
  }

  const from = parseFromField(fromRaw);
  const { name, email, phone, subject, message } = data;

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    '',
    `Subject: ${subject}`,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  const html = buildEmailHtml({
    formType: 'contact',
    title: 'New Contact Submission',
    fields: [
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone },
      { label: 'Subject', value: subject },
    ],
    messageLabel: 'Message',
    messageContent: message,
  });

  const body = {
    personalizations: [{ to: [{ email: to }] }],
    from,
    reply_to: { email },
    subject: `[Contact] ${subject}`,
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
