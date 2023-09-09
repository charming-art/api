export function app$background(color) {
  this._context.save();
  this._context.fillStyle = color;
  this._context.fillRect(0, 0, this.width(), this.height());
  this._context.restore();
  return this;
}
