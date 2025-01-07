import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { submitContactForm } from '../../services/contactService';
import type { ContactFormData } from '../../types/contact';

const initialFormState: ContactFormData = {
  name: '',
  email: '',
  message: '',
  timestamp: ''
};

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a plain object with only the data we need
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString()
      };

      await submitContactForm(submissionData);
      toast.success('Message sent successfully!');
      resetForm();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit
  };
};