import { staticize } from "./staticize.js";
import { memberize } from "./memberize.js";

function add(out, a, b) {
  out.x = a.x + b.x;
  out.y = a.y + b.y;
}

export const vec$add = memberize(add);

export const vecAdd = staticize(add);
