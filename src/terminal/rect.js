import { cfb } from "./cfb.js";
import { strokeOf } from "./color.js";

export function terminal$rect({ x, y, width, height, fill, ...rest }) {
  const stroke = strokeOf(rest);

  if (!stroke) this._backend.noStroke();
  else this._backend.stroke(...cfb(stroke));

  if (!fill) this._backend.noFill();
  else this._backend.fill(...cfb(fill));

  this._backend.rect(x, y, width, height);
}
