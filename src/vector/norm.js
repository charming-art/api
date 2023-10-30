import { memberize } from "./_memberize.js";
import { staticize } from "./_staticize.js";

function _norm(out, a) {
  const mag = a.mag();
  if (mag !== 0) out.set(a).div(mag);
}

export const vec$norm = memberize(_norm);

export const vecNorm = staticize(_norm);
