export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export type FormType = 'contact' | 'questionnaire' | 'rate';

interface BuildEmailParams {
  formType: FormType;
  title: string;
  fields: { label: string; value: string | boolean | null | undefined }[];
  messageLabel?: string;
  messageContent?: string;
}

export function buildEmailHtml({
  formType,
  title,
  fields,
  messageLabel,
  messageContent,
}: BuildEmailParams): string {
  const colors = {
    contact: '#0F172A',
    questionnaire: '#2563EB',
    rate: '#059669',
  };

  const headerColor = colors[formType] || colors.contact;

  const validFields = fields.filter((f) => f.value !== null && f.value !== undefined && f.value !== '');

  const fieldsHtml = validFields
    .map(
      (f) => `
      <tr>
        <td style="padding: 14px 16px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #4b5563; width: 35%; font-size: 14px;">${escapeHtml(f.label)}</td>
        <td style="padding: 14px 16px; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 15px;">${escapeHtml(
          typeof f.value === 'boolean' ? (f.value ? 'Yes' : 'No') : String(f.value)
        )}</td>
      </tr>
    `
    )
    .join('');

  const messageHtml = messageContent
    ? `
      <div style="margin-top: 32px;">
        <h3 style="color: #374151; margin-bottom: 12px; font-size: 16px; font-weight: 600;">${escapeHtml(
          messageLabel || 'Message'
        )}</h3>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; font-family: system-ui, -apple-system, sans-serif; white-space: pre-wrap; color: #1f2937; line-height: 1.6; font-size: 15px;">${escapeHtml(
          messageContent
        )}</div>
      </div>
    `
    : '';

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
      <!-- Header -->
      <div style="background-color: ${headerColor}; padding: 32px 24px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;">${escapeHtml(title)}</h2>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">${escapeHtml(formType)} Form</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 32px;">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <tbody>
            ${fieldsHtml}
          </tbody>
        </table>
        
        ${messageHtml}
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #f3f4f6;">
        <p style="margin: 0; color: #9ca3af; font-size: 13px;">This is an automated message from the KSA Fintech Advisory platform.</p>
      </div>
    </div>
  </body>
</html>
  `.trim();
}
