import React from 'react';
import { Send } from 'lucide-react';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => (
  <button
    type="submit"
    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={isSubmitting}
  >
    <Send className="w-5 h-5 mr-2" />
    {isSubmitting ? 'Sending...' : 'Send Message'}
  </button>
);