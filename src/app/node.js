import { _maybe } from "./_maybe.js";

export function app$node() {
  return _maybe(this._renderer, "node");
}
