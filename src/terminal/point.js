import { cfb } from "./cfb.js";
import { strokeOf } from "./color.js";

export function terminal$point({ x, y, ...rest }) {
  const stroke = strokeOf(rest);
  if (!stroke) this._backend.noStroke();
  this._backend.stroke(...cfb(stroke));
  this._backend.point(x, y);
}
