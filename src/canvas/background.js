export function canvas_background({fill}) {
  const context = this._ctx;
  context.save();
  context.fillStyle = fill;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.restore();
}
