import { memberize } from "./_memberize.js";
import { staticize } from "./_staticize.js";

export function _neg(out, a) {
  out.x = a.x * -1;
  out.y = a.y * -1;
}

export function _negX(out, a) {
  out.x = a.x * -1;
  out.y = a.y;
}

export function _negY(out, a) {
  out.x = a.x;
  out.y = a.y * -1;
}

export const vec$neg = memberize(_neg);
export const vec$negX = memberize(_negX);
export const vec$negY = memberize(_negY);

export const vecNeg = staticize(_neg);
export const vecNegX = staticize(_negX);
export const vecNegY = staticize(_negY);
