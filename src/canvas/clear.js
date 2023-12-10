export function canvas$clear({ fill }) {
  this._context.fillStyle = fill;
  this._context.fillRect(0, 0, this._props.width, this._props.height);
  return this;
}
