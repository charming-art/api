export function app$dispose() {
  this._renderer.mousemove();
  if (this._timer) this._timer.stop();
  return this;
}
