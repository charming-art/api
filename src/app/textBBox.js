import { maybe } from "./maybe.js";

export function app$textBBox(options) {
  return maybe(this._renderer, "textBBox", options);
}
