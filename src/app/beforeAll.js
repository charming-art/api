import { addHook } from "./_hook.js";

export function app$beforeAll(...params) {
  addHook(this, "beforeAll", ...params);
  return this;
}
