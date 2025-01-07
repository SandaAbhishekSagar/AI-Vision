import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { Camera, CameraOff, AlertCircle } from 'lucide-react';

const ObjectDetection = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [model, setModel] = useState<cocossd.ObjectDetection | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestAnimationFrameRef = useRef<number>();

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        const loadedModel = await cocossd.load();
        setModel(loadedModel);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error loading model:', error);
        setError('Failed to load AI model. Please refresh the page and try again.');
        setIsLoading(false);
      }
    };
    loadModel();

    return () => {
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
  }, []);

  const detect = async () => {
    if (!model || !webcamRef.current || !canvasRef.current || !isCameraOn) return;

    const video = webcamRef.current.video;
    if (!video || video.readyState !== 4) {
      requestAnimationFrameRef.current = requestAnimationFrame(detect);
      return;
    }

    // Get Video Properties
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Set canvas height and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    try {
      // Make Detections
      const predictions = await model.detect(video);
      
      // Get canvas context
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      // Clear previous drawings
      ctx.clearRect(0, 0, videoWidth, videoHeight);
      
      // Draw predictions
      predictions.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        
        // Draw bounding box
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        
        // Draw label
        ctx.fillStyle = '#00FF00';
        ctx.font = '16px Arial';
        ctx.fillText(
          `${prediction.class} ${Math.round(prediction.score * 100)}%`,
          x,
          y > 10 ? y - 5 : 10
        );
      });

      // Continue detection
      requestAnimationFrameRef.current = requestAnimationFrame(detect);
    } catch (error) {
      console.error('Detection error:', error);
      setError('An error occurred during object detection. Please refresh the page.');
    }
  };

  useEffect(() => {
    if (!isLoading && isCameraOn) {
      detect();
    }
    return () => {
      if (requestAnimationFrameRef.current) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
  }, [isLoading, isCameraOn]);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "environment"
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsCameraOn(!isCameraOn)}
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
      
      <div className="relative inline-block w-full">
        {isCameraOn && (
          <Webcam
            ref={webcamRef}
            muted={true}
            className="rounded-lg shadow-xl w-full"
            videoConstraints={videoConstraints}
            style={{ visibility: isLoading ? 'hidden' : 'visible' }}
            onUserMediaError={() => {
              setError('Camera access denied. Please allow camera access and refresh the page.');
              setIsCameraOn(false);
            }}
          />
        )}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 z-10"
        />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center min-h-[400px] bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading AI Model...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center min-h-[400px] bg-red-50 rounded-lg">
          <div className="text-center p-6">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;