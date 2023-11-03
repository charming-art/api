import { maybe } from "./maybe.js";

export function app$dispose() {
  maybe(this._renderer, "mousemove");
  maybe(this._renderer, "mouseup");
  maybe(this._renderer, "mousedown");
  if (this._timer) this._timer.stop();
  this._emitter.emit("afterAll", this);
  this._emitter.off();
  return this;
}
