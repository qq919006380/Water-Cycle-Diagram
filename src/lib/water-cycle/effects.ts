// Step-specific Effects for Water Cycle Animation
import type p5 from 'p5';
import type { WaterCycleState, Particle } from './types';
import { createRainParticle } from './particles';

// 绘制蒸发阶段效果 - 上升的波浪箭头
export function drawEvaporationEffect(p: p5, width: number, height: number): void {
  drawBigWavyArrow(p, width * 0.75, height * 0.85, height * 0.4, 0);
  drawBigWavyArrow(p, width * 0.85, height * 0.85, height * 0.35, 20);
  drawBigWavyArrow(p, width * 0.95, height * 0.85, height * 0.4, 40);
}

function drawBigWavyArrow(
  p: p5,
  x: number,
  startY: number,
  endY: number,
  offset: number
): void {
  const alpha = p.map(p.sin((p.frameCount + offset) * 0.05), -1, 1, 150, 255);
  p.stroke(255, 100, 100, alpha);
  p.strokeWeight(8);
  p.noFill();

  p.beginShape();
  const moveY = ((p.frameCount * 2 + offset) % (startY - endY));
  const currentY = startY - moveY;

  for (let i = 0; i <= 80; i += 5) {
    const y = currentY + i;
    if (y < startY && y > endY) {
      const xOff = p.sin(y * 0.05 + p.frameCount * 0.1) * 12;
      p.vertex(x + xOff, y);
    }
  }
  p.endShape();

  // 箭头头部
  if (currentY > endY) {
    const headX = x + p.sin(currentY * 0.05 + p.frameCount * 0.1) * 12;
    p.push();
    p.translate(headX, currentY);
    p.fill(255, 100, 100, alpha);
    p.noStroke();
    p.triangle(-10, 0, 10, 0, 0, -15);
    p.pop();
  }
}

// 绘制凝结阶段效果 - 文字提示
export function drawCondensationEffect(p: p5, width: number, height: number): void {
  p.fill(255);
  p.noStroke();
  p.textSize(24);
  p.textAlign(p.CENTER);
  p.text('Gas -> Liquid (Clouds)', width * 0.5, height * 0.12);
}

// 处理降水阶段效果 - 暴雨和闪电
export function handlePrecipitationEffect(
  p: p5,
  state: WaterCycleState,
  width: number,
  height: number
): void {
  // 加速生成雨滴
  if (p.frameCount % 2 === 0) {
    const particle = createRainParticle(width, height, p.random.bind(p));
    particle.vx = -2;
    particle.vy = p.random(10, 15);
    state.particles.push(particle);
  }

  // 闪电逻辑
  if (state.lightning.timer <= 0) {
    if (p.random(1) < 0.05) {
      state.lightning.active = true;
      state.lightning.timer = 15;
      state.lightning.x = p.random(width * 0.2, width * 0.45);
    }
  } else {
    state.lightning.timer--;
  }

  // 绘制闪电
  if (state.lightning.timer > 0 && state.lightning.timer > 5) {
    drawLightningBolt(p, state.lightning.x, height * 0.2, height);
    p.background(255, 255, 255, 80);
  }
}

function drawLightningBolt(p: p5, x: number, y: number, height: number): void {
  p.push();
  p.stroke(255, 255, 0);
  p.strokeWeight(4);
  p.noFill();
  p.drawingContext.shadowBlur = 30;
  p.drawingContext.shadowColor = 'yellow';

  p.beginShape();
  p.vertex(x, y);

  let currentX = x;
  let currentY = y;

  while (currentY < height * 0.7) {
    const nextX = currentX + p.random(-40, 40);
    const nextY = currentY + p.random(30, 60);
    p.vertex(nextX, nextY);
    currentX = nextX;
    currentY = nextY;
  }
  p.endShape();

  p.line(currentX, currentY, currentX - 20, currentY + 30);
  p.pop();
}

// 绘制汇集阶段效果 - 流动的河流高亮
export function drawCollectionEffect(p: p5, width: number, height: number): void {
  p.noFill();
  p.stroke(100, 200, 255);
  p.strokeWeight(10);
  p.strokeCap(p.ROUND);
  p.drawingContext.setLineDash([30, 30]);
  p.drawingContext.lineDashOffset = -p.frameCount * 3;
  p.drawingContext.shadowBlur = 20;
  p.drawingContext.shadowColor = '#4fc3f7';

  // 使用多个vertex代替bezierVertex，兼容p5.js v2
  p.beginShape();
  p.vertex(width * 0.45, height * 0.65);
  p.vertex(width * 0.48, height * 0.68);
  p.vertex(width * 0.52, height * 0.72);
  p.vertex(width * 0.58, height * 0.78);
  p.vertex(width * 0.65, height * 0.82);
  p.vertex(width * 0.7, height * 0.85);
  p.vertex(width * 0.8, height * 0.85);
  p.endShape();

  p.drawingContext.setLineDash([]);
  p.drawingContext.shadowBlur = 0;
}

// 根据当前阶段绘制对应效果
export function drawActiveStepEffects(
  p: p5,
  state: WaterCycleState,
  width: number,
  height: number
): void {
  switch (state.activeStep) {
    case 'evaporation':
      drawEvaporationEffect(p, width, height);
      break;
    case 'condensation':
      drawCondensationEffect(p, width, height);
      break;
    case 'precipitation':
      handlePrecipitationEffect(p, state, width, height);
      break;
    case 'collection':
      drawCollectionEffect(p, width, height);
      break;
  }
}
