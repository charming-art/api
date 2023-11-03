import { maybe } from "./maybe.js";

export function app$node() {
  return maybe(this._renderer, "node");
}
