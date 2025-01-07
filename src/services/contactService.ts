import type { ContactFormData } from '../types/contact';

// Google Form configuration based on the provided prefill URL
const GOOGLE_FORM = {
  formId: '1FAIpQLSc2YDhKB9N8JYtqyfCMHrQWw8CyDToFDxYqjMfVTEEwrCVEEg',
  fields: {
    name: 'entry.839337160',
    email: 'entry.1045781291',
    message: 'entry.2005620554'
  }
};

export const submitContactForm = async (formData: ContactFormData): Promise<void> => {
  try {
    const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM.formId}/formResponse`;
    const params = new URLSearchParams();
    
    // Append form fields with correct entry IDs
    params.append(GOOGLE_FORM.fields.name, formData.name);
    params.append(GOOGLE_FORM.fields.email, formData.email);
    params.append(GOOGLE_FORM.fields.message, formData.message);

    // Use CORS proxy to avoid cross-origin issues
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    
    const response = await fetch(corsProxy + formUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    if (!response.ok) {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    throw new Error('Failed to submit form');
  }
};