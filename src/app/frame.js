import { addHook } from "./_hook.js";

export function app$frame(...params) {
  addHook(this, "frame", ...params);
  return this;
}
