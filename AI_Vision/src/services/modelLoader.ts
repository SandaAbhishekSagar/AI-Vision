import * as tf from '@tensorflow/tfjs';

export class ModelLoader {
  private static instance: ModelLoader;
  private model: tf.GraphModel | null = null;
  private labels: string[] = [];

  private constructor() {}

  static getInstance(): ModelLoader {
    if (!ModelLoader.instance) {
      ModelLoader.instance = new ModelLoader();
    }
    return ModelLoader.instance;
  }

  async loadModel(modelUrl: string, labelsUrl: string): Promise<void> {
    try {
      // Load model
      this.model = await tf.loadGraphModel(modelUrl);
      
      // Load labels
      const response = await fetch(labelsUrl);
      this.labels = await response.json();
      
      // Warm up the model
      const dummyInput = tf.zeros([1, 640, 640, 3]);
      await this.model.predict(dummyInput) as tf.Tensor;
      tf.dispose(dummyInput);
    } catch (error) {
      console.error('Error loading model:', error);
      throw new Error('Failed to load model');
    }
  }

  async detect(image: tf.Tensor3D): Promise<Detection[]> {
    if (!this.model) throw new Error('Model not loaded');

    const batched = tf.expandDims(image);
    const predictions = await this.model.predict(batched) as tf.Tensor;
    const [boxes, scores, classes] = this.processModelOutput(predictions);
    
    tf.dispose([batched, predictions]);

    return this.createDetections(boxes, scores, classes);
  }

  private processModelOutput(predictions: tf.Tensor): [number[][], number[], number[]] {
    // Process model output based on your model's specific format
    // This is an example implementation - adjust according to your model
    const boxes = predictions.slice([0, 0, 0], [1, -1, 4]).dataSync();
    const scores = predictions.slice([0, 0, 4], [1, -1, 1]).dataSync();
    const classes = predictions.slice([0, 0, 5], [1, -1, 1]).dataSync();

    return [
      Array.from(boxes).map((_, i) => [
        boxes[i * 4],
        boxes[i * 4 + 1],
        boxes[i * 4 + 2],
        boxes[i * 4 + 3]
      ]),
      Array.from(scores),
      Array.from(classes)
    ];
  }

  private createDetections(
    boxes: number[][],
    scores: number[],
    classes: number[]
  ): Detection[] {
    const detections: Detection[] = [];
    const threshold = 0.5;

    for (let i = 0; i < scores.length; i++) {
      if (scores[i] > threshold) {
        detections.push({
          bbox: boxes[i],
          score: scores[i],
          class: this.labels[classes[i]],
        });
      }
    }

    return detections;
  }
}