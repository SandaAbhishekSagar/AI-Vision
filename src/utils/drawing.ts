export const drawPredictions = (
  predictions: any[],
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.clearRect(0, 0, video.videoWidth, video.videoHeight);

  predictions.forEach(pred => {
    const [x, y, width, height] = pred.bbox;
    
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    ctx.fillStyle = '#00FF00';
    ctx.font = '16px Arial';
    ctx.fillText(
      `${pred.class} ${Math.round(pred.confidence * 100)}%`,
      x,
      y > 10 ? y - 5 : 10
    );
  });
};