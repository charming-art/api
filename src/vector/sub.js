import { staticize } from "./staticize.js";
import { memberize } from "./memberize.js";

function sub(out, a, b) {
  out.x = a.x - b.x;
  out.y = a.y - b.y;
}

export const vec$sub = memberize(sub);

export const vecSub = staticize(sub);
