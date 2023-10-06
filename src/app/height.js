import { maybe } from "./_maybe.js";

export function app$height() {
  return maybe(this._renderer, "height");
}
