import { maybe } from "./_maybe.js";
import { useHook } from "./_hook.js";

export function app$dispose() {
  maybe(this._renderer, "mousemove");
  maybe(this._renderer, "mouseup");
  maybe(this._renderer, "mousedown");
  if (this._timer) this._timer.stop();
  useHook(this, "afterAll");
  return this;
}
