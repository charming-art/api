import { addHook } from "./_hook.js";

export function app$beforeEach(...params) {
  addHook(this, "beforeEach", ...params);
  return this;
}
