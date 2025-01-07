import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading AI Model...</p>
      </div>
    </div>
  );
};