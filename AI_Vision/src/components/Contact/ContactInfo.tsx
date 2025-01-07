import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

export const ContactInfo: React.FC = () => (
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex items-center">
      <Mail className="w-6 h-6 text-blue-600" />
      <span className="ml-3 text-gray-600">support@aivision.com</span>
    </div>
    <div className="flex items-center">
      <MessageSquare className="w-6 h-6 text-blue-600" />
      <span className="ml-3 text-gray-600">Live chat available 24/7</span>
    </div>
  </div>
);