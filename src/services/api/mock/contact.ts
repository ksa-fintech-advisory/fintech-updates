import { 
  ContactFormData, 
  ContactFormResponse, 
  NewsletterFormData, 
  NewsletterFormResponse 
} from '@/core/types/web/contact';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock storage for demonstration (in real app, this would be an API call)
const submittedContacts: ContactFormData[] = [];
const newsletterSubscribers: string[] = [];

export const contactService = {
  /**
   * Submit contact form
   */
  async submitContact(data: ContactFormData): Promise<ContactFormResponse> {
    await delay(800); // Simulate longer processing time
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        message: {
          en: 'Please fill in all required fields.',
          ar: 'يرجى ملء جميع الحقول المطلوبة.',
        },
        error: 'VALIDATION_ERROR',
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: {
          en: 'Please enter a valid email address.',
          ar: 'يرجى إدخال عنوان بريد إلكتروني صالح.',
        },
        error: 'INVALID_EMAIL',
      };
    }

    // Store submission (mock)
    submittedContacts.push({
      ...data,
    });

    return {
      success: true,
      message: {
        en: 'Thank you for contacting us! We will get back to you within 24 hours.',
        ar: 'شكراً لتواصلك معنا! سنرد عليك في غضون 24 ساعة.',
      },
    };
  },

  /**
   * Subscribe to newsletter
   */
  async subscribeNewsletter(data: NewsletterFormData): Promise<NewsletterFormResponse> {
    await delay(600);
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: {
          en: 'Please enter a valid email address.',
          ar: 'يرجى إدخال عنوان بريد إلكتروني صالح.',
        },
        error: 'INVALID_EMAIL',
      };
    }

    // Check if already subscribed
    if (newsletterSubscribers.includes(data.email.toLowerCase())) {
      return {
        success: false,
        message: {
          en: 'This email is already subscribed to our newsletter.',
          ar: 'هذا البريد الإلكتروني مشترك بالفعل في نشرتنا الإخبارية.',
        },
        error: 'ALREADY_SUBSCRIBED',
      };
    }

    // Store subscription (mock)
    newsletterSubscribers.push(data.email.toLowerCase());

    return {
      success: true,
      message: {
        en: 'Successfully subscribed! Check your email for confirmation.',
        ar: 'تم الاشتراك بنجاح! تحقق من بريدك الإلكتروني للتأكيد.',
      },
    };
  },
};
