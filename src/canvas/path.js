import { normalizeColorString } from "../color.js";

function drawArc(context, x1, y1, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x2, y2) {
  // Ensure radii are valid.
  if (rx === 0 || ry === 0) {
    // Draw a straight line if one of the radii is zero.
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    return;
  }

  // Step 1: Compute (x1', y1')
  let dx2 = (x1 - x2) / 2.0;
  let dy2 = (y1 - y2) / 2.0;
  let x1p = Math.cos(xAxisRotation) * dx2 + Math.sin(xAxisRotation) * dy2;
  let y1p = -Math.sin(xAxisRotation) * dx2 + Math.cos(xAxisRotation) * dy2;

  // Ensure radii are large enough.
  let rxs = rx * rx;
  let rys = ry * ry;
  let x1ps = x1p * x1p;
  let y1ps = y1p * y1p;

  // Correct radii.
  let cr = x1ps / rxs + y1ps / rys;
  if (cr > 1) {
    let s = Math.sqrt(cr);
    rx = s * rx;
    ry = s * ry;
    rxs = rx * rx;
    rys = ry * ry;
  }

  // Step 2: Compute (cx', cy').
  let sign = largeArcFlag === sweepFlag ? -1 : 1;
  let sq = (rxs * rys - rxs * y1ps - rys * x1ps) / (rxs * y1ps + rys * x1ps);
  sq = sq < 0 ? 0 : sq;
  let coef = sign * Math.sqrt(sq);
  let cxp = (coef * (rx * y1p)) / ry;
  let cyp = (coef * -(ry * x1p)) / rx;

  // Step 3: Compute (cx, cy) from (cx', cy').
  let cx = Math.cos(xAxisRotation) * cxp - Math.sin(xAxisRotation) * cyp + (x1 + x2) / 2;
  let cy = Math.sin(xAxisRotation) * cxp + Math.cos(xAxisRotation) * cyp + (y1 + y2) / 2;

  // Step 4: Compute θ1 and Δθ.
  let ux = (x1p - cxp) / rx;
  let uy = (y1p - cyp) / ry;
  let vx = (-x1p - cxp) / rx;
  let vy = (-y1p - cyp) / ry;
  let n = Math.sqrt(ux * ux + uy * uy);
  let p = ux; // Initially angle start.
  sign = uy < 0 ? -1 : 1;
  let angleStart = sign * Math.acos(p / n);

  n = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
  p = ux * vx + uy * vy;
  sign = ux * vy - uy * vx < 0 ? -1 : 1;
  let angleExtent = sign * Math.acos(p / n);
  if (!sweepFlag && angleExtent > 0) {
    angleExtent -= 2 * Math.PI;
  } else if (sweepFlag && angleExtent < 0) {
    angleExtent += 2 * Math.PI;
  }

  // Some browsers require the angles to be modulated by 2π.
  angleStart = angleStart % (2 * Math.PI);
  angleExtent = angleExtent % (2 * Math.PI);

  // Draw the arc.
  context.ellipse(cx, cy, rx, ry, xAxisRotation, angleStart, angleStart + angleExtent, !sweepFlag);
}

function drawPath(context, d) {
  let px, py;
  for (const cmd of d) {
    const [c, ...args] = cmd;
    if (c === "M") {
      context.moveTo(...args);
      [px, py] = args;
    } else if (c === "L") {
      context.lineTo(...args);
      [px, py] = args;
    } else if (c === "C") {
      context.bezierCurveTo(...args);
      [px, py] = args.slice(-2);
    } else if (c === "Q") {
      context.quadraticCurveTo(...args);
      [px, py] = args.slice(-2);
    } else if (c === "Z") {
      context.closePath();
    } else if (c === "A") {
      const [rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y] = args;
      drawArc(context, px, py, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y);
      [px, py] = [x, y];
    } else if (c === "H") {
      context.lineTo(args[0], py);
      px = args[0];
    } else if (c === "V") {
      context.lineTo(px, args[0]);
      py = args[0];
    } else if (c === "v") {
      context.lineTo(px, py + args[0]);
      py += args[0];
    } else if (c === "h") {
      context.lineTo(px + args[0], py);
      px += args[0];
    } else if (c === "l") {
      context.lineTo(px + args[0], py + args[1]);
      px += args[0];
      py += args[1];
    } else if (c === "c") {
      context.bezierCurveTo(px + args[0], py + args[1], px + args[2], py + args[3], px + args[4], py + args[5]);
      px += args[4];
      py += args[5];
    } else if (c === "s") {
      context.bezierCurveTo(px + args[0], py + args[1], px + args[2], py + args[3], px + args[4], py + args[5]);
      px += args[2];
      py += args[3];
    } else if (c === "q") {
      context.quadraticCurveTo(px + args[0], py + args[1], px + args[2], py + args[3]);
      px += args[2];
      py += args[3];
    } else if (c === "t") {
      context.quadraticCurveTo(px + args[0], py + args[1], px + args[0], py + args[1]);
      px += args[0];
      py += args[1];
    } else if (c === "a") {
      const [rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y] = args;
      drawArc(context, px, py, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y);
      px += x;
      py += y;
    } else if (c === "z") {
      context.closePath();
    } else {
      console.warn(`Unknown command: ${c}`);
    }
  }
}

export function canvas$path({ x = 0, y = 0, d, stroke, strokeOpacity, fill, fillOpacity, strokeWidth }) {
  stroke = normalizeColorString(stroke, strokeOpacity);
  fill = normalizeColorString(fill, fillOpacity);
  const context = this._context;
  context.save();
  context.translate(x, y);
  if (strokeWidth) context.lineWidth = strokeWidth;
  if (fill) context.fillStyle = fill;
  if (stroke) context.strokeStyle = stroke;
  context.beginPath();
  if (typeof d === "string") {
    const path = new Path2D(d);
    if (fill) context.fill(path);
    if (stroke) context.stroke(path);
  } else if (Array.isArray(d)) {
    drawPath(context, d);
    if (fill) context.fill();
    if (stroke) context.stroke();
  }
  context.restore();
  return this;
}
