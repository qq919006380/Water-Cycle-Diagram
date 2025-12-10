// Water Cycle Animation Configuration
// 所有配置集中管理，方便调整和维护

export const CONFIG = {
  colors: {
    skyTop: [135, 206, 235] as const,
    skyBottom: [230, 245, 255] as const,
    ocean: [64, 164, 223] as const,
    oceanDeep: [41, 128, 185] as const,
    mountain: [120, 144, 156] as const,
    land: [165, 214, 167] as const,
    sun: [255, 213, 79] as const,
    // 降水模式天空颜色
    stormSkyTop: [50, 50, 80] as const,
    stormSkyBottom: [100, 100, 120] as const,
  },

  // 粒子系统配置
  particles: {
    vapor: {
      spawnInterval: 4,
      lifeDecay: 1.5,
      speedY: [-2, -1] as const,
      size: [3, 6] as const,
    },
    rain: {
      spawnInterval: 3,
      speedY: [4, 7] as const,
      speedX: -0.5,
    },
  },

  // 云朵配置
  clouds: {
    count: 4,
    positionX: [0.3, 0.6] as const,
    positionY: [0.15, 0.25] as const,
  },

  // 太阳配置
  sun: {
    positionX: 0.85,
    positionY: 0.15,
    radius: 50,
  },

  // 步骤高亮持续时间(ms)
  stepHighlightDuration: 4000,
} as const;

// 水循环四个阶段的定义
export const STEP_DEFINITIONS = [
  {
    id: 'evaporation',
    name: 'Evaporation',
    desc: 'Sun heats water, turning it into rising vapor.',
    focus: { x: 0.8, y: 0.8 },
  },
  {
    id: 'condensation',
    name: 'Condensation',
    desc: 'Vapor cools down to form clouds.',
    focus: { x: 0.5, y: 0.2 },
  },
  {
    id: 'precipitation',
    name: 'Precipitation',
    desc: 'Clouds release water as rain or snow.',
    focus: { x: 0.3, y: 0.5 },
  },
  {
    id: 'collection',
    name: 'Collection',
    desc: 'Water flows into rivers and oceans.',
    focus: { x: 0.6, y: 0.85 },
  },
] as const;

export type StepId = typeof STEP_DEFINITIONS[number]['id'];
