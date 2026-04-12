import type { QuestionnaireFormData } from '@/core/types/web/questionnaire';

const SENDGRID_MAIL_SEND_URL = 'https://api.sendgrid.com/v3/mail/send';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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
 * Sends the public questionnaire payload to the site inbox via SendGrid.
 */
export async function sendQuestionnaireEmail(data: QuestionnaireFormData): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  const fromRaw = getFromEmail();
  const to = getInboxEmail();

  if (!apiKey || !fromRaw) {
    throw new SendGridNotConfiguredError();
  }

  const from = parseFromField(fromRaw);
  const { name, email, region, otherRegion, projectType, otherProjectType, difficulties } = data;

  const displayProjectType = projectType === 'other' && otherProjectType ? `Other (${otherProjectType})` : projectType;
  const displayRegion = region === 'other' && otherRegion ? `Other (${otherRegion})` : region.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Region: ${displayRegion}`,
    `Project Type: ${displayProjectType}`,
    '',
    `Difficulties Faced:`,
    difficulties,
  ].join('\n');

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Region:</strong> ${escapeHtml(displayRegion)}</p>
    <p><strong>Project Type:</strong> ${escapeHtml(displayProjectType)}</p>
    <hr />
    <p><strong>Difficulties Faced:</strong></p>
    <pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;">${escapeHtml(difficulties)}</pre>
  `.trim();

  const body = {
    personalizations: [{ to: [{ email: to }] }],
    from,
    reply_to: { email },
    subject: `[Questionnaire] ${displayProjectType} from ${name}`,
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
