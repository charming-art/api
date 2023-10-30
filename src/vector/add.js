import { staticize } from "./_staticize.js";
import { memberize } from "./_memberize.js";

function _add(out, a, b) {
  out.x = a.x + b.x;
  out.y = a.y + b.y;
}

export const vec$add = memberize(_add);

export const vecAdd = staticize(_add);
