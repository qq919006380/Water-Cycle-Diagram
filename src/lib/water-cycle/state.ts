// Water Cycle State Management
// 集中管理动画状态，避免全局污染

import type { WaterCycleState, Particle, Cloud, Ripple } from './types';
import type { StepId } from './config';
import { CONFIG } from './config';

// 创建初始状态
export function createInitialState(): WaterCycleState {
  return {
    showLabels: true,
    showFlow: true,
    activeStep: null,
    particles: [],
    clouds: [],
    ripples: [],
    lightning: {
      active: false,
      timer: 0,
      x: 0,
    },
  };
}

// 状态操作函数
export function toggleLabels(state: WaterCycleState): void {
  state.showLabels = !state.showLabels;
}

export function toggleFlow(state: WaterCycleState): void {
  state.showFlow = !state.showFlow;
}

export function setActiveStep(state: WaterCycleState, stepId: StepId | null): void {
  state.activeStep = stepId;
}

export function addParticle(state: WaterCycleState, particle: Particle): void {
  state.particles.push(particle);
}

export function removeParticle(state: WaterCycleState, index: number): void {
  state.particles.splice(index, 1);
}

export function addRipple(state: WaterCycleState, ripple: Ripple): void {
  state.ripples.push(ripple);
}

export function removeRipple(state: WaterCycleState, index: number): void {
  state.ripples.splice(index, 1);
}

export function initializeClouds(
  state: WaterCycleState,
  width: number,
  height: number,
  random: (min: number, max: number) => number
): void {
  state.clouds = [];
  for (let i = 0; i < CONFIG.clouds.count; i++) {
    state.clouds.push({
      origX: random(width * CONFIG.clouds.positionX[0], width * CONFIG.clouds.positionX[1]),
      origY: random(height * CONFIG.clouds.positionY[0], height * CONFIG.clouds.positionY[1]),
      scale: 1,
    });
  }
}
