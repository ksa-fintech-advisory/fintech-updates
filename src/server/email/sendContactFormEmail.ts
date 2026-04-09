import sgMail from '@sendgrid/mail';
import type { ContactFormData } from '@/core/types/web/contact';

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

export class SendGridNotConfiguredError extends Error {
  constructor() {
    super('SENDGRID_NOT_CONFIGURED');
    this.name = 'SendGridNotConfiguredError';
  }
}

/**
 * Sends the public contact form payload to the site inbox via SendGrid.
 * Requires `SENDGRID_API_KEY` and a verified `SENDGRID_FROM_EMAIL`.
 */
export async function sendContactFormEmail(data: ContactFormData): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  const from = getFromEmail();
  const to = getInboxEmail();

  if (!apiKey || !from) {
    throw new SendGridNotConfiguredError();
  }

  sgMail.setApiKey(apiKey);

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

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <hr />
    <pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;">${escapeHtml(message)}</pre>
  `.trim();

  await sgMail.send({
    to,
    from,
    replyTo: email,
    subject: `[Contact] ${subject}`,
    text,
    html,
  });
}
