import { memberize } from "./memberize.js";
import { staticize } from "./staticize.js";

function div(out, a, s) {
  out.x = a.x / s;
  out.y = a.y / s;
}

export const vec$div = memberize(div);

export const vecDiv = staticize(div);
