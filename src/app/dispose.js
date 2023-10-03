import { _maybe } from "./_maybe.js";

export function app$dispose() {
  _maybe(this._renderer, "mousemove");
  if (this._timer) this._timer.stop();
  return this;
}
