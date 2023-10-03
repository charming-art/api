import { _maybe } from "./_maybe.js";

export function app$height() {
  return _maybe(this._renderer, "height");
}
