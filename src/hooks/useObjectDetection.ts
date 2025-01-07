import { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import { ModelLoader } from '../services/modelLoader';
import { preprocessImage, drawDetections } from '../utils/imageProcessing';
import type { ModelConfig, Detection } from '../types/detection';

export const useObjectDetection = (modelConfig: ModelConfig) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);

  // Initialize model
  useEffect(() => {
    const initModel = async () => {
      try {
        const modelLoader = ModelLoader.getInstance();
        await modelLoader.loadModel(modelConfig.modelUrl, modelConfig.labelsUrl);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to load model');
        setIsLoading(false);
      }
    };

    initModel();
  }, [modelConfig]);

  // Process frame
  const processFrame = useCallback(async () => {
    if (!webcamRef.current?.video || !canvasRef.current || isLoading) return;

    try {
      const video = webcamRef.current.video;
      const tensor = await preprocessImage(video, modelConfig.inputSize);
      
      const modelLoader = ModelLoader.getInstance();
      const detections = await modelLoader.detect(tensor);
      
      drawDetections(detections, canvasRef.current, video);
      tf.dispose(tensor);
    } catch (error) {
      console.error('Error processing frame:', error);
    }
  }, [isLoading, modelConfig.inputSize]);

  // Animation loop
  useEffect(() => {
    if (!isLoading && isCameraOn) {
      let animationFrame: number;
      
      const animate = () => {
        processFrame();
        animationFrame = requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [isLoading, isCameraOn, processFrame]);

  const toggleCamera = () => setIsCameraOn(prev => !prev);

  return {
    webcamRef,
    canvasRef,
    isLoading,
    error,
    isCameraOn,
    toggleCamera,
  };
};