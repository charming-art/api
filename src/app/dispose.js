export function app$dispose() {
  this._dispose();
  if (this._timer) this._timer.stop();
  return this;
}
