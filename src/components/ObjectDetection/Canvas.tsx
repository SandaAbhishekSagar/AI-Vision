import React, { forwardRef } from 'react';

export const Canvas = forwardRef<HTMLCanvasElement>((props, ref) => {
  return (
    <canvas
      ref={ref}
      className="absolute top-0 left-0 z-10"
    />
  );
});

Canvas.displayName = 'Canvas';