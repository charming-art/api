import { _maybe } from "./_maybe.js";

export function app$width() {
  return _maybe(this._renderer, "width");
}
