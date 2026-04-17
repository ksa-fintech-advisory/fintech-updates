import { NextResponse } from 'next/server';
import type { QuestionnaireFormData, QuestionnaireFormResponse } from '@/core/types/web/questionnaire';
import {
  SendGridApiError,
  SendGridNotConfiguredError,
  sendQuestionnaireEmail,
} from '@/server/email/sendQuestionnaireEmail';

export const runtime = 'edge';

const LIMITS = {
  name: 200,
  email: 320,
  difficulties: 12_000,
} as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function badRequest(message: QuestionnaireFormResponse['message']): NextResponse<QuestionnaireFormResponse> {
  return NextResponse.json<QuestionnaireFormResponse>({ success: false, message }, { status: 400 });
}

export async function POST(request: Request): Promise<NextResponse<QuestionnaireFormResponse>> {
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
  const region = typeof d.region === 'string' ? d.region : '';
  const otherRegion = typeof d.otherRegion === 'string' ? d.otherRegion.trim() : '';
  const projectType = typeof d.projectType === 'string' ? d.projectType : '';
  const otherProjectType = typeof d.otherProjectType === 'string' ? d.otherProjectType.trim() : '';
  const difficulties = typeof d.difficulties === 'string' ? d.difficulties.trim() : '';

  if (!name || !email || !region || !projectType || !difficulties) {
    return badRequest({
      en: 'Please fill in all required fields.',
      ar: 'يرجى تعبئة جميع الحقول المطلوبة.',
    });
  }

  // const validRegions = ['saudi_arabia', 'uae', 'bahrain', 'kuwait', 'jordan', 'lebanon', 'syria', 'iraq', 'qatar', 'oman','egypt', 'yemen','other'];
  // if (!validRegions.includes(region)) {
  //   return badRequest({
  //     en: 'Invalid region.',
  //     ar: 'المنطقة غير صالحة.',
  //   });
  // }

  if (region === 'other' && !otherRegion) {
    return badRequest({
      en: 'Please specify the region.',
      ar: 'يرجى تحديد المنطقة.',
    });
  }

  if (projectType === 'other' && !otherProjectType) {
    return badRequest({
      en: 'Please specify the project type.',
      ar: 'يرجى تحديد نوع المشروع.',
    });
  }

  if (!isValidEmail(email)) {
    return badRequest({
      en: 'Please enter a valid email address.',
      ar: 'يرجى إدخال بريد إلكتروني صالح.',
    });
  }

  const validProjectTypes = ['payments', 'open_banking', 'wealth_management', 'crypto', 'other'];
  if (!validProjectTypes.includes(projectType)) {
    return badRequest({
      en: 'Invalid project type.',
      ar: 'نوع المشروع غير صالح.',
    });
  }

  if (name.length > LIMITS.name || email.length > LIMITS.email || otherProjectType.length > 200 || otherRegion.length > 200) {
    return badRequest({
      en: 'One or more fields are too long.',
      ar: 'أحد الحقول أطول من المسموح.',
    });
  }

  if (difficulties.length > LIMITS.difficulties) {
    return badRequest({
      en: 'Description is too long.',
      ar: 'الوصف أطول من المسموح.',
    });
  }

  const payload: QuestionnaireFormData = { 
    name, 
    email,
    region: region as QuestionnaireFormData['region'],
    otherRegion,
    projectType: projectType as QuestionnaireFormData['projectType'], 
    otherProjectType,
    difficulties
  };

  try {
    await sendQuestionnaireEmail(payload);
  } catch (err) {
    if (err instanceof SendGridNotConfiguredError) {
      console.error('[api/questionnaire] SendGrid is not configured (missing SENDGRID_API_KEY or SENDGRID_FROM_EMAIL)');
      return NextResponse.json<QuestionnaireFormResponse>(
        {
          success: false,
          message: {
            en: 'Form is temporarily unavailable. Please try again later.',
            ar: 'النموذج غير متاح مؤقتاً. يرجى المحاولة لاحقاً.',
          },
        },
        { status: 503 },
      );
    }

    if (err instanceof SendGridApiError) {
      console.error('[api/questionnaire] SendGrid error', err.statusCode, err.responseBody);
    } else {
      console.error('[api/questionnaire] SendGrid error', err);
    }

    return NextResponse.json<QuestionnaireFormResponse>(
      {
        success: false,
        message: {
          en: 'Could not send your data. Please try again later.',
          ar: 'تعذّر الإرسال. حاول لاحقاً.',
        },
      },
      { status: 502 },
    );
  }

  return NextResponse.json<QuestionnaireFormResponse>({
    success: true,
    message: {
      en: 'Thank you. Your responses have been recorded.',
      ar: 'شكراً لك. تم تسجيل ردودك بنجاح.',
    },
  });
}
