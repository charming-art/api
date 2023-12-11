import { normalizeColorString } from "../color.js";

export function canvas$rect({
  stroke,
  fill,
  x,
  y,
  width,
  height,
  rotate,
  anchor,
  fillOpacity,
  strokeOpacity,
  strokeWidth,
}) {
  if (anchor === "center") {
    x = x - width / 2;
    y = y - height / 2;
  }
  stroke = normalizeColorString(stroke, strokeOpacity);
  fill = normalizeColorString(fill, fillOpacity);
  const context = this._context;
  context.save();
  context.translate(x + width / 2, y + height / 2);
  if (rotate) context.rotate(rotate);
  context.beginPath();
  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  context.fillStyle = fill;
  context.rect(-width / 2, -height / 2, width, height);
  context.fill();
  if (stroke) context.stroke();
  context.closePath();
  context.restore();
  return this;
}
