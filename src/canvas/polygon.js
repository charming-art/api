import { normalizeColorString } from "../color.js";

export function canvas$polygon({ x: X, y: Y, fill, stroke, strokeWidth, fillOpacity, strokeOpacity }) {
  stroke = normalizeColorString(stroke, strokeOpacity);
  fill = normalizeColorString(fill, fillOpacity);
  const context = this._context;
  context.save();
  context.beginPath();
  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  context.fillStyle = fill;
  const x0 = X[0];
  const y0 = Y[0];
  context.moveTo(x0, y0);
  for (let i = 1; i < X.length; i++) {
    const x = X[i];
    const y = Y[i];
    context.lineTo(x, y);
  }
  context.closePath();
  context.fill();
  if (stroke) context.stroke();
  context.restore();
  return this;
}
