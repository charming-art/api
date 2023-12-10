export function canvas$triangle({ x, y, x1, y1, x2, y2, fill, stroke, strokeWidth, rotate }) {
  const context = this._context;
  context.save();
  if (rotate) context.rotate(rotate);
  context.beginPath();
  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  context.fillStyle = fill;
  context.moveTo(x, y);
  context.lineTo(x1, y1);
  context.lineTo(x2, y2);
  context.closePath();
  context.fill();
  if (stroke) context.stroke();
  context.restore();
  return this;
}
