import { NextResponse } from 'next/server';
import type { NewsletterFormData, NewsletterFormResponse } from '@/core/types/web/contact';
import {
  SendGridApiError,
  SendGridNotConfiguredError,
  sendNewsletterEmail,
} from '@/server/email/sendNewsletterEmail';

export const runtime = 'edge';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function badRequest(message: NewsletterFormResponse['message']): NextResponse<NewsletterFormResponse> {
  return NextResponse.json<NewsletterFormResponse>({ success: false, message }, { status: 400 });
}

export async function POST(request: Request): Promise<NextResponse<NewsletterFormResponse>> {
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
  const email = typeof d.email === 'string' ? d.email.trim() : '';

  if (!email) {
    return badRequest({
      en: 'Please enter your email',
      ar: 'يرجى إدخال بريدك الإلكتروني',
    });
  }

  if (!isValidEmail(email) || email.length > 320) {
    return badRequest({
      en: 'Please enter a valid email address.',
      ar: 'يرجى إدخال بريد إلكتروني صالح.',
    });
  }

  const payload: NewsletterFormData = { email };

  try {
    await sendNewsletterEmail(payload);
  } catch (err) {
    if (err instanceof SendGridNotConfiguredError) {
      console.error('[api/newsletter] SendGrid is not configured');
      return NextResponse.json<NewsletterFormResponse>(
        {
          success: false,
          message: {
            en: 'Subscription is temporarily unavailable.',
            ar: 'الاشتراك غير متاح مؤقتاً.',
          },
        },
        { status: 503 },
      );
    }

    if (err instanceof SendGridApiError) {
      console.error('[api/newsletter] SendGrid error', err.statusCode, err.responseBody);
    } else {
      console.error('[api/newsletter] SendGrid error', err);
    }

    return NextResponse.json<NewsletterFormResponse>(
      {
        success: false,
        message: {
          en: 'Could not subscribe. Please try again later.',
          ar: 'تعذّر الاشتراك. حاول لاحقاً.',
        },
      },
      { status: 502 },
    );
  }

  return NextResponse.json<NewsletterFormResponse>({
    success: true,
    message: {
      en: 'Thank you for subscribing.',
      ar: 'شكراً لاشتراكك.',
    },
  });
}
