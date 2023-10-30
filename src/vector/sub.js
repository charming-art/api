import { staticize } from "./_staticize.js";
import { memberize } from "./_memberize.js";

function _sub(out, a, b) {
  out.x = a.x - b.x;
  out.y = a.y - b.y;
}

export const vec$sub = memberize(_sub);

export const vecSub = staticize(_sub);
