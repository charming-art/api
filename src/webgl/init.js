import { contextGL } from "../context.js";

export function webgl$init({ width, height, dpi = null }) {
  const gl = contextGL(width, height, dpi);
  Object.assign(this._props, { width, height });
  Object.assign(this, { _gl: gl });
  return this;
}
