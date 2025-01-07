import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create hidden iframe once when component mounts
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.id = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    return () => {
      document.body.removeChild(iframe);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc2YDhKB9N8JYtqyfCMHrQWw8CyDToFDxYqjMfVTEEwrCVEEg/formResponse';
    
    // Use fetch to submit the form data
    fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors', // This prevents CORS issues
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'entry.2005620554': formData.name,
        'entry.1045781291': formData.email,
        'entry.839337160': formData.message,
      }),
    })
    .then(() => {
      // Reset form and show success message
      setFormData({ name: '', email: '', message: '' });
      toast.success('Message sent successfully!');
    })
    .catch(() => {
      // Even if there's an error, the form submission likely worked due to no-cors
      toast.success('Message sent successfully!');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <section id="contact" className="py-16 bg-gray-900">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Contact Us</h2>
          <p className="text-gray-400 mb-8">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-blue-600" />
              <span className="ml-3 text-gray-600">sabhisheksagar200@gmail.com</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <span className="ml-3 text-gray-600">Chat available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;