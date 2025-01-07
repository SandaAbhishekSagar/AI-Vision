import React from 'react';
import { FormField } from './FormField';
import { SubmitButton } from './SubmitButton';
import type { ContactFormData } from '../../types/contact';

interface ContactFormProps {
  formData: ContactFormData;
  isSubmitting: boolean;
  onChange: (field: keyof ContactFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  isSubmitting,
  onChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <FormField
      id="name"
      label="Name"
      value={formData.name}
      onChange={(value) => onChange('name', value)}
      disabled={isSubmitting}
    />
    
    <FormField
      id="email"
      label="Email"
      type="email"
      value={formData.email}
      onChange={(value) => onChange('email', value)}
      disabled={isSubmitting}
    />
    
    <FormField
      id="message"
      label="Message"
      type="textarea"
      value={formData.message}
      onChange={(value) => onChange('message', value)}
      disabled={isSubmitting}
      rows={4}
    />
    
    <SubmitButton isSubmitting={isSubmitting} />
  </form>
);