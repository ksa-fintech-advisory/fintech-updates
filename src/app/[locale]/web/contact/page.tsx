'use client';

import { useState } from 'react';
import { contactService } from '@/services/api/mock';
import { useLocale } from 'next-intl';

export default function ContactPage() {
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await contactService.submitContact(formData);
      setResult({
        success: response.success,
        message: locale === 'ar' ? response.message.ar : response.message.en,
      });

      if (response.success) {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setResult({
        success: false,
        message: locale === 'ar' ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-saudi text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            </h1>
            <p className="text-xl text-white/90">
              {locale === 'ar' ? 'تواصل مع فريقنا' : 'Get in touch with our team'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-grey-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-medium p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-grey-700 mb-2">
                  {locale === 'ar' ? 'الاسم' : 'Name'} <span className="text-danger-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={locale === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-grey-700 mb-2">
                  {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'} <span className="text-danger-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={locale === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-grey-700 mb-2">
                  {locale === 'ar' ? 'الموضوع' : 'Subject'} <span className="text-danger-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={locale === 'ar' ? 'أدخل الموضوع' : 'Enter subject'}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-grey-700 mb-2">
                  {locale === 'ar' ? 'الرسالة' : 'Message'} <span className="text-danger-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder={locale === 'ar' ? 'اكتب رسالتك هنا' : 'Write your message here'}
                />
              </div>

              {/* Result Message */}
              {result && (
                <div
                  className={`p-4 rounded-lg ${
                    result.success ? 'bg-success-50 text-success-700' : 'bg-danger-50 text-danger-700'
                  }`}
                >
                  {result.message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-saudi text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? locale === 'ar'
                    ? 'جاري الإرسال...'
                    : 'Sending...'
                  : locale === 'ar'
                  ? 'إرسال الرسالة'
                  : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
