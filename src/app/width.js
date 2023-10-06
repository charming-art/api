import { maybe } from "./_maybe.js";

export function app$width() {
  return maybe(this._renderer, "width");
}
