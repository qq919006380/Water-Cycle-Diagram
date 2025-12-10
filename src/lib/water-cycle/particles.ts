// Particle System for Water Cycle Animation
import type { Particle, Ripple, WaterCycleState } from './types';
import type p5 from 'p5';
import { CONFIG } from './config';

// 创建蒸发粒子
export function createVaporParticle(
  width: number,
  height: number,
  random: (min: number, max: number) => number
): Particle {
  const cfg = CONFIG.particles.vapor;
  return {
    type: 'vapor',
    x: random(width * 0.65, width * 0.95),
    y: height * 0.85,
    vx: 0,
    vy: random(cfg.speedY[0], cfg.speedY[1]),
    size: random(cfg.size[0], cfg.size[1]),
    life: 255,
  };
}

// 创建雨滴粒子
export function createRainParticle(
  width: number,
  height: number,
  random: (min: number, max: number) => number
): Particle {
  const cfg = CONFIG.particles.rain;
  return {
    type: 'rain',
    x: random(width * 0.2, width * 0.5),
    y: height * 0.35,
    vx: cfg.speedX,
    vy: random(cfg.speedY[0], cfg.speedY[1]),
    size: 2,
    life: 255,
  };
}

// 更新粒子状态
export function updateParticle(
  particle: Particle,
  height: number,
  frameCount: number,
  sin: (angle: number) => number
): boolean {
  particle.y += particle.vy;
  particle.x += particle.vx;

  if (particle.type === 'vapor') {
    particle.life -= CONFIG.particles.vapor.lifeDecay;
    // 添加波动效果
    particle.x += sin(frameCount * 0.05 + particle.y) * 0.5;
    return particle.life > 0;
  }

  if (particle.type === 'rain') {
    // 雨滴到达地面
    if (particle.y > height * 0.8) {
      return false; // 标记为需要移除，并创建涟漪
    }
  }

  return true;
}

// 绘制粒子
export function drawParticle(p: p5, particle: Particle): void {
  if (particle.type === 'vapor') {
    p.noStroke();
    p.fill(255, 255, 255, particle.life * 0.5);
    p.circle(particle.x, particle.y, particle.size);
  } else {
    p.stroke(64, 164, 223, 150);
    p.strokeWeight(2);
    p.line(particle.x, particle.y, particle.x + particle.vx * 2, particle.y + 10);
  }
}

// 创建涟漪
export function createRipple(x: number, y: number): Ripple {
  return {
    x,
    y,
    radius: 0,
    alpha: 200,
  };
}

// 更新涟漪
export function updateRipple(ripple: Ripple): boolean {
  ripple.radius += 1;
  ripple.alpha -= 5;
  return ripple.alpha > 0;
}

// 绘制涟漪
export function drawRipple(p: p5, ripple: Ripple): void {
  p.noFill();
  p.strokeWeight(2);
  p.stroke(64, 164, 223, ripple.alpha);
  p.ellipse(ripple.x, ripple.y, ripple.radius * 2, ripple.radius * 0.6);
}

// 批量更新粒子系统
export function updateParticleSystem(
  state: WaterCycleState,
  height: number,
  frameCount: number,
  sin: (angle: number) => number
): void {
  // 更新粒子
  for (let i = state.particles.length - 1; i >= 0; i--) {
    const particle = state.particles[i];
    const alive = updateParticle(particle, height, frameCount, sin);

    if (!alive) {
      // 雨滴落地时创建涟漪
      if (particle.type === 'rain') {
        state.ripples.push(createRipple(particle.x, particle.y));
      }
      state.particles.splice(i, 1);
    }
  }

  // 更新涟漪
  for (let i = state.ripples.length - 1; i >= 0; i--) {
    if (!updateRipple(state.ripples[i])) {
      state.ripples.splice(i, 1);
    }
  }
}
