import { addHook } from "./_hook.js";

export function app$mouseup(...params) {
  addHook(this, "mouseup", ...params);
  return this;
}
