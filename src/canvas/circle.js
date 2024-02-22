import { normalizeColorString } from "../color.js";

export function canvas$circle({ x = 0, y = 0, r = 0, stroke, strokeWidth, fill, fillOpacity, strokeOpacity }) {
  const context = this._context;
  stroke = normalizeColorString(stroke, strokeOpacity);
  fill = normalizeColorString(fill, fillOpacity);
  context.save();
  context.beginPath();
  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  context.fillStyle = fill;
  context.arc(x, y, r, 0, Math.PI * 2);
  context.fill();
  if (stroke) context.stroke();
  context.closePath();
  context.restore();
  return this;
}
