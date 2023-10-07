import { addHook } from "./_hook.js";

export function app$mousedown(...params) {
  addHook(this, "mousedown", ...params);
  return this;
}
