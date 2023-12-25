import { cfb } from "./cfb.js";

export function terminal$line({ x, y, x1, y1, stroke }) {
  if (!stroke) this._backend.noStroke();
  else this._backend.stroke(...cfb(stroke));
  this._backend.noFill();
  this._backend.line(x, y, x1, y1);
}
