import { Vec } from "./vec.js";

function mag(out, s, mag) {
  if (mag !== 0) {
    const t = s / mag;
    out.mult(t);
  }
}

export function vec$mag(s) {
  const m = Math.sqrt(this.x * this.x + this.y * this.y);
  if (arguments.length === 0) return m;
  mag(this, s, m);
  return this;
}

export function vecMag(a, s) {
  const m = Math.sqrt(a.x * a.x + a.y * a.y);
  if (arguments.length === 1) return m;
  const out = new Vec().set(a);
  mag(out, s, m);
  return out;
}
