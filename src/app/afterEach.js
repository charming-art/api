import { addHook } from "./_hook.js";

export function app$afterEach(...params) {
  addHook(this, "afterEach", ...params);
  return this;
}
