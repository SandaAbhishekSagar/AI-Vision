import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-red-50 rounded-lg">
      <div className="text-center p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{message}</p>
      </div>
    </div>
  );
};