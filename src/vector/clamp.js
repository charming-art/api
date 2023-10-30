import { memberize } from "./_memberize.js";
import { staticize } from "./_staticize.js";

function _clamp(out, a, m, m1) {
  const [min, max] = arguments.length === 3 ? [0, m] : [m, m1];
  const m0 = out.set(a).mag();
  if (m0 < min) out.mag(min);
  if (m0 > max) out.mag(max);
}

function _clampX(out, a, x, x1) {
  const [min, max] = arguments.length === 3 ? [0, x] : [x, x1];
  const x0 = Math.max(min, Math.min(max, a.x));
  out.x = x0;
  out.y = a.y;
}

function _clampY(out, a, y, y1) {
  const [min, max] = arguments.length === 3 ? [0, y] : [y, y1];
  const y0 = Math.max(min, Math.min(max, a.y));
  out.x = a.x;
  out.y = y0;
}

export const vec$clampX = memberize(_clampX);
export const vec$clampY = memberize(_clampY);
export const vec$clamp = memberize(_clamp);

export const vecClampX = staticize(_clampX);
export const vecClampY = staticize(_clampY);
export const vecClamp = staticize(_clamp);
