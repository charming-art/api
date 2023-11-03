import { memberize } from "./memberize.js";
import { staticize } from "./staticize.js";

export function neg(out, a) {
  out.x = a.x * -1;
  out.y = a.y * -1;
}

export function negX(out, a) {
  out.x = a.x * -1;
  out.y = a.y;
}

export function negY(out, a) {
  out.x = a.x;
  out.y = a.y * -1;
}

export const vec$neg = memberize(neg);
export const vec$negX = memberize(negX);
export const vec$negY = memberize(negY);

export const vecNeg = staticize(neg);
export const vecNegX = staticize(negX);
export const vecNegY = staticize(negY);
