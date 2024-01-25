export function canvas$line({ stroke, strokeWidth, strokeCap, x, y, x1, y1, rotate, transformOrigin = "start" }) {
  const context = this._context;
  context.save();
  context.beginPath();

  if (rotate) {
    const [mx, my] =
      transformOrigin === "center" ? [(x + x1) / 2, (y + y1) / 2] : transformOrigin === "end" ? [x1, y1] : [x, y];
    context.translate(mx, my);
    context.rotate(rotate);
    context.translate(-mx, -my);
  }

  if (stroke) context.strokeStyle = stroke;
  if (strokeWidth) context.lineWidth = strokeWidth;
  if (strokeCap) context.lineCap = 'round';
  context.moveTo(x, y);
  context.lineTo(x1, y1);
  if (stroke) context.stroke();
  context.closePath();
  context.restore();
  return this;
}
