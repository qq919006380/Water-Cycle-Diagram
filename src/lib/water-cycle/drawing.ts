// Drawing Functions for Water Cycle Animation
import type p5 from 'p5';
import type { Sun, Cloud, Label } from './types';
import { CONFIG, STEP_DEFINITIONS } from './config';

// 绘制天空渐变
export function drawSky(p: p5, width: number, height: number, activeStep: string | null): void {
  p.noFill();

  let c1: p5.Color, c2: p5.Color;

  if (activeStep === 'precipitation') {
    c1 = p.color(...CONFIG.colors.stormSkyTop);
    c2 = p.color(...CONFIG.colors.stormSkyBottom);
  } else {
    c1 = p.color(...CONFIG.colors.skyTop);
    c2 = p.color(...CONFIG.colors.skyBottom);
  }

  // 优化：使用更大的步长减少绘制次数
  for (let i = 0; i <= height; i += 10) {
    const inter = p.map(i, 0, height, 0, 1);
    const c = p.lerpColor(c1, c2, inter);
    p.stroke(c);
    p.strokeWeight(11);
    p.line(0, i, width, i);
  }
}

// 绘制太阳
export function drawSun(p: p5, sun: Sun, activeStep: string | null): void {
  if (activeStep === 'precipitation') return;

  const sizeMult = activeStep === 'evaporation' ? 1.3 : 1.0;

  p.drawingContext.shadowBlur = 40;
  p.drawingContext.shadowColor = 'orange';
  p.noStroke();
  p.fill(...CONFIG.colors.sun);
  p.circle(sun.x, sun.y, sun.radius * 2 * sizeMult);
  p.drawingContext.shadowBlur = 0;
}

// 绘制山脉 - 使用简单的多边形代替bezier曲线
export function drawMountains(p: p5, width: number, height: number): void {
  p.noStroke();
  p.fill(...CONFIG.colors.mountain);

  // 使用简单的vertex绘制山脉轮廓
  p.beginShape();
  p.vertex(0, height);
  p.vertex(0, height * 0.5);
  p.vertex(width * 0.25, height * 0.35);
  // 使用多个vertex模拟曲线
  p.vertex(width * 0.35, height * 0.45);
  p.vertex(width * 0.45, height * 0.6);
  p.vertex(width * 0.55, height * 0.75);
  p.vertex(width * 0.6, height * 0.85);
  p.vertex(width * 0.6, height);
  p.endShape(p.CLOSE);

  // 山顶积雪
  p.fill(255);
  p.beginShape();
  p.vertex(width * 0.25, height * 0.35);
  p.vertex(width * 0.18, height * 0.45);
  p.vertex(width * 0.32, height * 0.45);
  p.endShape(p.CLOSE);
}

// 绘制陆地和河流
export function drawLandAndRiver(p: p5, width: number, height: number): void {
  // 陆地
  p.fill(...CONFIG.colors.land);
  p.noStroke();
  p.rect(0, height * 0.85, width, height * 0.15);

  // 河流 - 使用简单的多边形
  p.fill(64, 164, 223);
  p.beginShape();
  p.vertex(width * 0.45, height * 0.65);
  p.vertex(width * 0.48, height * 0.68);
  p.vertex(width * 0.52, height * 0.72);
  p.vertex(width * 0.58, height * 0.78);
  p.vertex(width * 0.65, height * 0.82);
  p.vertex(width * 0.7, height * 0.85);
  p.vertex(width * 0.8, height * 0.85);
  p.vertex(width * 0.8, height * 0.88);
  p.vertex(width * 0.68, height * 0.88);
  p.vertex(width * 0.6, height * 0.85);
  p.vertex(width * 0.55, height * 0.8);
  p.vertex(width * 0.5, height * 0.73);
  p.vertex(width * 0.48, height * 0.65);
  p.endShape(p.CLOSE);
}

// 绘制海洋
export function drawOcean(p: p5, width: number, height: number): void {
  p.fill(...CONFIG.colors.ocean);
  p.noStroke();
  p.rect(width * 0.6, height * 0.85, width * 0.4, height * 0.15);
}

// 绘制云朵
export function drawCloud(p: p5, cloud: Cloud, activeStep: string | null): void {
  const targetScale = activeStep === 'condensation' ? 1.3 : 1.0;
  cloud.scale = p.lerp(cloud.scale, targetScale, 0.1);

  const isStorm = activeStep === 'precipitation';
  const baseColor = isStorm ? 80 : 255;

  p.push();
  p.translate(cloud.origX, cloud.origY);
  p.scale(cloud.scale);
  p.fill(baseColor, baseColor, baseColor, 230);
  p.noStroke();
  p.circle(0, 0, 50);
  p.circle(-30, 10, 40);
  p.circle(30, 10, 40);
  p.circle(0, -20, 40);
  p.pop();
}

// 绘制流动线条
export function drawFlowLines(p: p5, width: number, height: number): void {
  drawFlowPath(p, width * 0.8, height * 0.85, width * 0.8, height * 0.25, -50, 'up');
  drawFlowPath(p, width * 0.75, height * 0.2, width * 0.3, height * 0.25, 0, 'left');
  drawFlowPath(p, width * 0.25, height * 0.3, width * 0.35, height * 0.6, 20, 'down');
  drawFlowPath(p, width * 0.4, height * 0.7, width * 0.75, height * 0.88, 30, 'right');
}

function drawFlowPath(
  p: p5,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  offset: number,
  type: string
): void {
  const t = (p.millis() % 2000) / 2000;
  const cx = (x1 + x2) / 2 + (type === 'up' || type === 'down' ? offset : 0);
  const cy = (y1 + y2) / 2 + (type === 'left' || type === 'right' ? offset : 0);

  p.noFill();
  p.stroke(255, 255, 255, 100);
  p.strokeWeight(2);
  p.drawingContext.setLineDash([5, 10]);
  p.bezier(x1, y1, cx, cy, cx, cy, x2, y2);
  p.drawingContext.setLineDash([]);

  // 移动的点
  const bx = p.bezierPoint(x1, cx, cx, x2, t);
  const by = p.bezierPoint(y1, cy, cy, y2, t);
  p.fill(41, 128, 185);
  p.noStroke();
  p.circle(bx, by, 8);
}

// 绘制标签
export function drawLabels(p: p5, width: number, height: number, activeStep: string | null): void {
  p.textSize(14);
  p.textStyle(p.BOLD);
  p.textAlign(p.CENTER, p.CENTER);

  const labels: Label[] = [
    { text: 'Evaporation', x: width * 0.85, y: height * 0.65 },
    { text: 'Condensation', x: width * 0.5, y: height * 0.15 },
    { text: 'Precipitation', x: width * 0.25, y: height * 0.5 },
    { text: 'Collection', x: width * 0.6, y: height * 0.92 },
  ];

  labels.forEach((label) => {
    let opacity = activeStep ? 50 : 220;
    const stepDef = STEP_DEFINITIONS.find((s) => s.id === activeStep);

    if (activeStep && stepDef?.name.includes(label.text)) {
      opacity = 255;
      p.fill(255, 255, 255);
      p.stroke(0);
    } else {
      p.fill(255, 255, 255, opacity);
      p.noStroke();
    }

    p.rectMode(p.CENTER);
    p.rect(label.x, label.y, p.textWidth(label.text) + 20, 26, 13);
    p.rectMode(p.CORNER);

    p.fill(0, 0, 0, activeStep ? (opacity > 100 ? 255 : 50) : 200);
    p.noStroke();
    p.text(label.text, label.x, label.y + 1);
  });
}

// 绘制聚焦遮罩
export function drawFocusOverlay(
  p: p5,
  width: number,
  height: number,
  activeStep: string
): void {
  p.noStroke();
  p.fill(0, 0, 0, 120);
  p.rect(0, 0, width, height);

  const step = STEP_DEFINITIONS.find((s) => s.id === activeStep);
  if (!step) return;

  const targetX = width * step.focus.x;
  const targetY = height * step.focus.y;

  p.drawingContext.save();
  const grad = p.drawingContext.createRadialGradient(targetX, targetY, 0, targetX, targetY, 250);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  p.drawingContext.fillStyle = grad;
  p.drawingContext.beginPath();
  p.drawingContext.arc(targetX, targetY, 350, 0, p.TWO_PI);
  p.drawingContext.fill();
  p.drawingContext.restore();

  // 脉冲圈
  const pulse = (p.sin(p.frameCount * 0.1) + 1) * 0.5;
  p.noFill();
  p.stroke(255, 255, 255, 150 - pulse * 50);
  p.strokeWeight(3);
  p.circle(targetX, targetY, 120 + pulse * 40);
}
