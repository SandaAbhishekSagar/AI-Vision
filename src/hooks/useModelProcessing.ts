import { useCallback, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { processImage } from '../utils/imageProcessing';
import { drawPredictions } from '../utils/drawing';

export const useModelProcessing = (
  webcamRef: React.RefObject<Webcam>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const modelRef = useRef<any>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Initialize your model here
        // modelRef.current = await loadCustomModel();
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    loadModel();
  }, []);

  const processFrame = useCallback(async () => {
    if (!webcamRef.current?.video || !canvasRef.current || !modelRef.current) return;

    const video = webcamRef.current.video;
    const imageData = await processImage(video);
    
    try {
      const predictions = await modelRef.current.detect(imageData);
      drawPredictions(predictions, canvasRef.current, video);
    } catch (error) {
      console.error('Error processing frame:', error);
    }
  }, [webcamRef, canvasRef]);

  return { processFrame };
};