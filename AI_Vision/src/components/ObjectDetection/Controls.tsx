import React from 'react';
import { Camera, CameraOff } from 'lucide-react';

interface ControlsProps {
  isCameraOn: boolean;
  onToggle: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ isCameraOn, onToggle }) => {
  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={onToggle}
        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label={isCameraOn ? 'Turn camera off' : 'Turn camera on'}
      >
        {isCameraOn ? (
          <Camera className="w-6 h-6 text-gray-800" />
        ) : (
          <CameraOff className="w-6 h-6 text-gray-800" />
        )}
      </button>
    </div>
  );
};