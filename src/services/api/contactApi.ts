
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: {
    en: string;
    ar: string;
  };
}

export const contactApiService = {
  submitContactForm: async (data: ContactFormData): Promise<ContactResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success
    return {
      success: true,
      message: {
        en: "Thank you for contacting us. We will get back to you shortly.",
        ar: "شكراً لتواصلك معنا. سنقوم بالرد عليك قريباً."
      }
    };
  }
};
