import React from 'react';
import { Camera } from './Camera';
import { Canvas } from './Canvas';
import { Controls } from './Controls';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { useObjectDetection } from '../../hooks/useObjectDetection';

const modelConfig = {
  modelUrl: '/models/model.json', // Path to your converted model
  labelsUrl: '/models/labels.json', // Path to your labels file
  inputSize: 640, // Your model's input size
};

const ObjectDetection: React.FC = () => {
  const {
    webcamRef,
    canvasRef,
    isLoading,
    error,
    isCameraOn,
    toggleCamera,
  } = useObjectDetection(modelConfig);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'environment',
  };

  return (
    <div className="relative">
      <Controls isCameraOn={isCameraOn} onToggle={toggleCamera} />
      
      <div className="relative inline-block w-full">
        {isCameraOn && (
          <Camera
            ref={webcamRef}
            isLoading={isLoading}
            videoConstraints={videoConstraints}
          />
        )}
        <Canvas ref={canvasRef} />
      </div>

      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} />}
    </div>
  );
};

export default ObjectDetection;