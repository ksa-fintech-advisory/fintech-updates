/**
 * Contact and newsletter payloads/results for the public web app.
 */

/** Bilingual string returned by APIs or shown after submit */
export type LocalizedMessage = {
  en: string;
  ar: string;
};

/** Fields collected by the contact form */
export interface ContactFormData {
  name: string;
  email: string;
  /** Optional — if the sender prefers a call or SMS/WhatsApp follow-up */
  phone: string;
  subject: string;
  message: string;
}

/** Result of a contact form submission */
export interface ContactFormResponse {
  success: boolean;
  message: LocalizedMessage;
  error?: string;
}

/** Newsletter / subscription signup payload */
export interface NewsletterFormData {
  email: string;
}

/** Result of a newsletter signup */
export interface NewsletterFormResponse {
  success: boolean;
  message: LocalizedMessage;
  error?: string;
}
