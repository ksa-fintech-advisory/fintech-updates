import { NextResponse } from 'next/server';
import type { ContactFormData, ContactFormResponse } from '@/core/types/web/contact';
import {
  SendGridApiError,
  SendGridNotConfiguredError,
  sendContactFormEmail,
} from '@/server/email/sendContactFormEmail';

export const runtime = 'edge';

const LIMITS = {
  name: 200,
  email: 320,
  phone: 50,
  subject: 300,
  message: 12_000,
} as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function badRequest(message: ContactFormResponse['message']): NextResponse<ContactFormResponse> {
  return NextResponse.json<ContactFormResponse>({ success: false, message }, { status: 400 });
}

export async function POST(request: Request): Promise<NextResponse<ContactFormResponse>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest({
      en: 'Invalid request body.',
      ar: 'محتوى الطلب غير صالح.',
    });
  }

  if (!body || typeof body !== 'object') {
    return badRequest({
      en: 'Invalid request body.',
      ar: 'محتوى الطلب غير صالح.',
    });
  }

  const d = body as Record<string, unknown>;
  const name = typeof d.name === 'string' ? d.name.trim() : '';
  const email = typeof d.email === 'string' ? d.email.trim() : '';
  const phone = typeof d.phone === 'string' ? d.phone.trim() : '';
  const subject = typeof d.subject === 'string' ? d.subject.trim() : '';
  const message = typeof d.message === 'string' ? d.message.trim() : '';

  if (!name || !email || !subject || !message) {
    return badRequest({
      en: 'Please fill in all required fields.',
      ar: 'يرجى تعبئة جميع الحقول المطلوبة.',
    });
  }

  if (!isValidEmail(email)) {
    return badRequest({
      en: 'Please enter a valid email address.',
      ar: 'يرجى إدخال بريد إلكتروني صالح.',
    });
  }

  if (name.length > LIMITS.name || email.length > LIMITS.email || phone.length > LIMITS.phone) {
    return badRequest({
      en: 'One or more fields are too long.',
      ar: 'أحد الحقول أطول من المسموح.',
    });
  }

  if (subject.length > LIMITS.subject || message.length > LIMITS.message) {
    return badRequest({
      en: 'Subject or message is too long.',
      ar: 'العنوان أو الرسالة أطول من المسموح.',
    });
  }

  const payload: ContactFormData = { name, email, phone, subject, message };

  try {
    await sendContactFormEmail(payload);
  } catch (err) {
    if (err instanceof SendGridNotConfiguredError) {
      console.error('[api/contact] SendGrid is not configured (missing SENDGRID_API_KEY or SENDGRID_FROM_EMAIL)');
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          message: {
            en: 'Contact form is temporarily unavailable. Please email us directly.',
            ar: 'نموذج التواصل غير متاح مؤقتاً. يرجى مراسلتنا عبر البريد مباشرة.',
          },
        },
        { status: 503 },
      );
    }

    if (err instanceof SendGridApiError) {
      console.error('[api/contact] SendGrid error', err.statusCode, err.responseBody);
    } else {
      console.error('[api/contact] SendGrid error', err);
    }

    return NextResponse.json<ContactFormResponse>(
      {
        success: false,
        message: {
          en: 'Could not send your message. Please try again later or email us directly.',
          ar: 'تعذّر إرسال رسالتك. حاول لاحقاً أو راسلنا عبر البريد مباشرة.',
        },
      },
      { status: 502 },
    );
  }

  return NextResponse.json<ContactFormResponse>({
    success: true,
    message: {
      en: 'Thank you for your message. I will get back to you shortly.',
      ar: 'شكراً لرسالتك. سأعود إليك قريباً.',
    },
  });
}
