import { memberize } from "./memberize.js";
import { staticize } from "./staticize.js";

function mult(out, a, s) {
  out.x = a.x * s;
  out.y = a.y * s;
}

export const vec$mult = memberize(mult);

export const vecMult = staticize(mult);
