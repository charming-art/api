import { normalizeColor } from "./normalize.js";

// @TODO More command.
export function canvas$path({ x = 0, y = 0, d, stroke = "#000", strokeOpacity, fill, fillOpacity, strokeWidth }) {
  stroke = normalizeColor(stroke, strokeOpacity);
  fill = normalizeColor(fill, fillOpacity);
  const context = this._context;
  context.save();
  context.strokeStyle = stroke;
  context.translate(x, y);
  if (strokeWidth) context.lineWidth = strokeWidth;
  if (fill) context.fillStyle = fill;
  context.beginPath();
  for (const [type, ...params] of d) {
    if (type === "M") context.moveTo(...params);
    else if (type === "L") context.lineTo(...params);
  }
  if (fill) context.fill();
  if (stroke) context.stroke();
  context.restore();
  return this;
}
