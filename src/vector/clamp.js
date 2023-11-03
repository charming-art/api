import { memberize } from "./memberize.js";
import { staticize } from "./staticize.js";

function clamp(out, a, m, m1) {
  const [min, max] = arguments.length === 3 ? [0, m] : [m, m1];
  const m0 = out.set(a).mag();
  if (m0 < min) out.mag(min);
  if (m0 > max) out.mag(max);
}

function clampX(out, a, x, x1) {
  const [min, max] = arguments.length === 3 ? [0, x] : [x, x1];
  const x0 = Math.max(min, Math.min(max, a.x));
  out.x = x0;
  out.y = a.y;
}

function clampY(out, a, y, y1) {
  const [min, max] = arguments.length === 3 ? [0, y] : [y, y1];
  const y0 = Math.max(min, Math.min(max, a.y));
  out.x = a.x;
  out.y = y0;
}

export const vec$clampX = memberize(clampX);
export const vec$clampY = memberize(clampY);
export const vec$clamp = memberize(clamp);

export const vecClampX = staticize(clampX);
export const vecClampY = staticize(clampY);
export const vecClamp = staticize(clamp);
