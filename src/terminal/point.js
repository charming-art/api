import { cfb } from "./cfb.js";

export function terminal$point({ x, y, stroke }) {
  if (!stroke) this._backend.noStroke();
  this._backend.stroke(...cfb(stroke));
  this._backend.point(x, y);
}
