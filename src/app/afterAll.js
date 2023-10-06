import { addHook } from "./_hook.js";

export function app$afterAll(...params) {
  addHook(this, "afterAll", ...params);
  return this;
}
