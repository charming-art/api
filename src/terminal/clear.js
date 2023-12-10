export function terminal$clear({ fill = "#000" }) {
  const { pixelWidth, pixelHeight } = this._props;
  this._context.fillStyle = fill;
  this._context.fillRect(0, 0, pixelWidth, pixelHeight);
}
