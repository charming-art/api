import { memberize } from "./memberize.js";
import { staticize } from "./staticize.js";

function norm(out, a) {
  const mag = a.mag();
  if (mag !== 0) out.set(a).div(mag);
}

export const vec$norm = memberize(norm);

export const vecNorm = staticize(norm);
