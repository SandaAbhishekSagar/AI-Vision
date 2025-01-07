import React, { forwardRef } from 'react';
import Webcam from 'react-webcam';

interface CameraProps {
  isLoading: boolean;
  videoConstraints: {
    width: number;
    height: number;
    facingMode: string;
  };
}

export const Camera = forwardRef<Webcam, CameraProps>(
  ({ isLoading, videoConstraints }, ref) => {
    return (
      <Webcam
        ref={ref}
        muted={true}
        className="rounded-lg shadow-xl w-full"
        videoConstraints={videoConstraints}
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      />
    );
  }
);

Camera.displayName = 'Camera';