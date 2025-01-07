import * as tf from '@tensorflow/tfjs';

export const preprocessImage = async (
  video: HTMLVideoElement,
  targetSize: number
): Promise<tf.Tensor3D> => {
  const tensor = tf.browser.fromPixels(video);
  
  // Normalize and resize
  const normalized = tf.div(tensor, 255.0);
  const resized = tf.image.resizeBilinear(normalized, [targetSize, targetSize]);
  
  tf.dispose([tensor, normalized]);
  return resized;
};

export const drawDetections = (
  detections: Detection[],
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas size to match video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Clear previous drawings
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw each detection
  detections.forEach(detection => {
    const [x, y, width, height] = detection.bbox;
    const label = `${detection.class} ${Math.round(detection.score * 100)}%`;

    // Draw bounding box
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      x * canvas.width,
      y * canvas.height,
      width * canvas.width,
      height * canvas.height
    );

    // Draw label background
    ctx.fillStyle = '#00ff00';
    const textWidth = ctx.measureText(label).width;
    ctx.fillRect(
      x * canvas.width,
      y * canvas.height - 25,
      textWidth + 10,
      25
    );

    // Draw label text
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx.fillText(
      label,
      x * canvas.width + 5,
      y * canvas.height - 7
    );
  });
};