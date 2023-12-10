import { context2d } from "../context.js";

export function canvas$init({ width, height, dpi }) {
  const context = context2d(width, height, dpi);
  Object.assign(this, { _context: context });
  Object.assign(this._props, { width, height });
  return this;
}
