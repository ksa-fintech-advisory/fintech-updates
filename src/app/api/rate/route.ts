import { NextResponse } from 'next/server';
import type { RateFormData, RateFormResponse } from '@/core/types/web/rate';
import {
  SendGridApiError,
  SendGridNotConfiguredError,
  sendRateFormEmail,
} from '@/server/email/sendRateFormEmail';

export const runtime = 'edge';

const LIMITS = {
  name: 200,
  description: 12_000,
} as const;

function badRequest(message: RateFormResponse['message']): NextResponse<RateFormResponse> {
  return NextResponse.json<RateFormResponse>({ success: false, message }, { status: 400 });
}

export async function POST(request: Request): Promise<NextResponse<RateFormResponse>> {
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
  const serviceType = typeof d.serviceType === 'string' ? d.serviceType : '';
  const description = typeof d.description === 'string' ? d.description.trim() : '';
  const agreeToShare = typeof d.agreeToShare === 'boolean' ? d.agreeToShare : false;

  if (!name || !serviceType || !description) {
    return badRequest({
      en: 'Please fill in all required fields.',
      ar: 'يرجى تعبئة جميع الحقول المطلوبة.',
    });
  }

  if (serviceType !== 'consulting' && serviceType !== 'technical') {
    return badRequest({
      en: 'Invalid service type.',
      ar: 'نوع الخدمة غير صالح.',
    });
  }

  if (name.length > LIMITS.name) {
    return badRequest({
      en: 'Name is too long.',
      ar: 'الاسم أطول من المسموح.',
    });
  }

  if (description.length > LIMITS.description) {
    return badRequest({
      en: 'Description is too long.',
      ar: 'الوصف أطول من المسموح.',
    });
  }

  const payload: RateFormData = { name, serviceType: serviceType as 'consulting' | 'technical', description, agreeToShare };

  try {
    await sendRateFormEmail(payload);
  } catch (err) {
    if (err instanceof SendGridNotConfiguredError) {
      console.error('[api/rate] SendGrid is not configured (missing SENDGRID_API_KEY or SENDGRID_FROM_EMAIL)');
      // If Sendgrid fails or isn't set up, we still pretend it succeeded for UX, or we can return failure. 
      // Because contact form returned 503, let's keep consistency.
      return NextResponse.json<RateFormResponse>(
        {
          success: false,
          message: {
            en: 'Feedback form is temporarily unavailable. Please try again later.',
            ar: 'نموذج التقييم غير متاح مؤقتاً. يرجى المحاولة لاحقاً.',
          },
        },
        { status: 503 },
      );
    }

    if (err instanceof SendGridApiError) {
      console.error('[api/rate] SendGrid error', err.statusCode, err.responseBody);
    } else {
      console.error('[api/rate] SendGrid error', err);
    }

    return NextResponse.json<RateFormResponse>(
      {
        success: false,
        message: {
          en: 'Could not send your feedback. Please try again later.',
          ar: 'تعذّر إرسال تقييمك. حاول لاحقاً.',
        },
      },
      { status: 502 },
    );
  }

  return NextResponse.json<RateFormResponse>({
    success: true,
    message: {
      en: 'Thank you for your feedback.',
      ar: 'شكراً لتقييمك.',
    },
  });
}
