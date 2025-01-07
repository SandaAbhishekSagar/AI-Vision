export interface Detection {
  bbox: number[];
  score: number;
  class: string;
}

export interface ModelConfig {
  modelUrl: string;
  labelsUrl: string;
  inputSize: number;
}