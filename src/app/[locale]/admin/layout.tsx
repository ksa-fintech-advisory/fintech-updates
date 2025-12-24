import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { DashboardLayout } from "@/core/ui/layout/admin/DashboardLayout";
import { locales } from '@/core/i18n/config';
import '@/core/theme/globals.css';

export default async function DashboardLayoutWrapper({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
    params: { locale: string };
}) {
  // Validate locale logic similar to web layout, or trust middleware
  if (!locales.includes(locale as any)) {
    notFound();
  }

  console.log('Admin Layout Locale:', locale);

  let messages;
  try {
    // Explicitly importing JSON to ensure Next.js bundles it correctly
    // Depending on project setup, sometimes dynamic imports need to be very specific
    const messagesModule = await import(`../../../../messages/${locale}.json`);
    messages = messagesModule.default || messagesModule;
  } catch (error) {
    console.error('Failed to load messages for admin layout:', error);
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <DashboardLayout>{children}</DashboardLayout>
    </NextIntlClientProvider>
  );
}
