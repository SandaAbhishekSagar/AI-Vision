import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import { useContactForm } from './useContactForm';

const Contact: React.FC = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="py-16 bg-gray-900">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Contact Us</h2>
          <p className="text-gray-400 mb-8">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <ContactForm
            formData={formData}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
};

export default Contact;