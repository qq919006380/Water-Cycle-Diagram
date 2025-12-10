// Water Cycle Type Definitions
import type p5 from 'p5';
import type { StepId } from './config';

export interface WaterCycleState {
  showLabels: boolean;
  showFlow: boolean;
  activeStep: StepId | null;
  particles: Particle[];
  clouds: Cloud[];
  ripples: Ripple[];
  lightning: LightningState;
}

export interface Particle {
  type: 'vapor' | 'rain';
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
}

export interface Cloud {
  origX: number;
  origY: number;
  scale: number;
}

export interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export interface LightningState {
  active: boolean;
  timer: number;
  x: number;
}

export interface Sun {
  x: number;
  y: number;
  radius: number;
}

export interface Label {
  text: string;
  x: number;
  y: number;
}

// p5实例类型扩展
export type P5Instance = p5;

// 事件类型
export interface WaterCycleEvents {
  'step-change': StepId | null;
  'toggle-labels': boolean;
  'toggle-flow': boolean;
  'download': void;
}
