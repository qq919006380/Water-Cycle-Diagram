// Water Cycle Animation - Main Sketch Entry
// 使用p5.js实例模式，避免全局污染

import type p5 from 'p5';
import type { WaterCycleState, Sun } from './types';
import type { StepId } from './config';
import { CONFIG, STEP_DEFINITIONS } from './config';
import { createInitialState, initializeClouds } from './state';
import {
  createVaporParticle,
  createRainParticle,
  updateParticleSystem,
  drawParticle,
  drawRipple,
} from './particles';
import {
  drawSky,
  drawSun,
  drawMountains,
  drawLandAndRiver,
  drawOcean,
  drawCloud,
  drawFlowLines,
  drawLabels,
  drawFocusOverlay,
} from './drawing';
import { drawActiveStepEffects } from './effects';

// 导出配置供外部使用
export { CONFIG, STEP_DEFINITIONS };
export type { StepId };

// Sketch工厂函数 - 返回p5实例模式的sketch
export function createWaterCycleSketch(containerId: string) {
  let state: WaterCycleState;
  let sun: Sun;
  let stepTimer: ReturnType<typeof setTimeout> | null = null;

  // 事件回调
  let onStepChange: ((stepId: StepId | null) => void) | null = null;

  return function sketch(p: p5) {
    p.setup = () => {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Container #${containerId} not found`);
        return;
      }

      const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
      canvas.parent(containerId);

      // 初始化状态
      state = createInitialState();
      sun = {
        x: p.width * CONFIG.sun.positionX,
        y: p.height * CONFIG.sun.positionY,
        radius: CONFIG.sun.radius,
      };

      // 初始化云朵
      initializeClouds(state, p.width, p.height, p.random.bind(p));
    };

    p.windowResized = () => {
      const container = document.getElementById(containerId);
      if (!container) return;

      p.resizeCanvas(container.offsetWidth, container.offsetHeight);
      sun = {
        x: p.width * CONFIG.sun.positionX,
        y: p.height * CONFIG.sun.positionY,
        radius: CONFIG.sun.radius,
      };
    };

    p.draw = () => {
      if (!state) return;

      // 背景层
      drawSky(p, p.width, p.height, state.activeStep);
      drawSun(p, sun, state.activeStep);
      drawMountains(p, p.width, p.height);
      drawLandAndRiver(p, p.width, p.height);
      drawOcean(p, p.width, p.height);

      // 粒子系统
      spawnParticles(p, state);
      updateParticleSystem(state, p.height, p.frameCount, p.sin.bind(p));
      state.particles.forEach((particle) => drawParticle(p, particle));
      state.ripples.forEach((ripple) => drawRipple(p, ripple));

      // 云朵
      state.clouds.forEach((cloud) => drawCloud(p, cloud, state.activeStep));

      // 流动线条
      if (state.showFlow) {
        drawFlowLines(p, p.width, p.height);
      }

      // 活动阶段效果
      if (state.activeStep) {
        drawFocusOverlay(p, p.width, p.height, state.activeStep);
        drawActiveStepEffects(p, state, p.width, p.height);
      }

      // 标签
      if (state.showLabels) {
        drawLabels(p, p.width, p.height, state.activeStep);
      }
    };

    // 生成粒子
    function spawnParticles(p: p5, state: WaterCycleState): void {
      if (p.frameCount % CONFIG.particles.vapor.spawnInterval === 0) {
        state.particles.push(createVaporParticle(p.width, p.height, p.random.bind(p)));
      }
      if (p.frameCount % CONFIG.particles.rain.spawnInterval === 0) {
        state.particles.push(createRainParticle(p.width, p.height, p.random.bind(p)));
      }
    }

    // 公开API - 通过返回对象暴露控制方法
    return {
      setActiveStep(stepId: StepId | null): void {
        if (!state) return;

        if (state.activeStep === stepId) {
          state.activeStep = null;
        } else {
          state.activeStep = stepId;

          if (stepTimer) clearTimeout(stepTimer);
          stepTimer = setTimeout(() => {
            state.activeStep = null;
            onStepChange?.(null);
          }, CONFIG.stepHighlightDuration);
        }

        onStepChange?.(state.activeStep);
      },

      toggleLabels(): boolean {
        if (!state) return true;
        state.showLabels = !state.showLabels;
        return state.showLabels;
      },

      toggleFlow(): boolean {
        if (!state) return true;
        state.showFlow = !state.showFlow;
        return state.showFlow;
      },

      downloadImage(): void {
        p.saveCanvas('water-cycle-diagram', 'png');
      },

      onStepChange(callback: (stepId: StepId | null) => void): void {
        onStepChange = callback;
      },

      getState(): WaterCycleState | null {
        return state;
      },
    };
  };
}

// Quiz数据
export const QUIZ_DATA = [
  {
    question: 'What happens when water vapor cools in the atmosphere?',
    options: [
      'It forms clouds (Condensation)',
      'It falls as rain immediately',
      'It evaporates more',
    ],
    correctAnswer: 0,
    correctMessage: 'Correct! Water vapor condenses to form clouds.',
    incorrectMessage: 'Try again! Think about what happens when warm air rises and cools.',
  },
  {
    question: 'Which stage of the water cycle involves water falling from clouds?',
    options: ['Evaporation', 'Precipitation', 'Collection'],
    correctAnswer: 1,
    correctMessage: 'Correct! Precipitation is when water falls from clouds as rain or snow.',
    incorrectMessage: "Try again! Think about what happens when clouds get too heavy.",
  },
  {
    question: "Where does most of the water evaporation come from on Earth?",
    options: ['Rivers and lakes', 'Oceans and seas', 'Mountains'],
    correctAnswer: 1,
    correctMessage: "Correct! Oceans cover 71% of Earth's surface and provide most evaporation.",
    incorrectMessage: 'Try again! Think about which water body covers most of our planet.',
  },
];
