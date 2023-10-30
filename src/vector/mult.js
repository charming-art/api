import { memberize } from "./_memberize.js";
import { staticize } from "./_staticize.js";

function _mult(out, a, s) {
  out.x = a.x * s;
  out.y = a.y * s;
}

export const vec$mult = memberize(_mult);

export const vecMult = staticize(_mult);
