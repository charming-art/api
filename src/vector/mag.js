import { Vec } from "./vec.js";

function _mag(out, s, mag) {
  if (mag !== 0) {
    const t = s / mag;
    out.mult(t);
  }
}

export function vec$mag(s) {
  const mag = Math.sqrt(this.x * this.x + this.y * this.y);
  if (arguments.length === 0) return mag;
  _mag(this, s, mag);
  return this;
}

export function vecMag(a, s) {
  const mag = Math.sqrt(a.x * a.x + a.y * a.y);
  if (arguments.length === 1) return mag;
  const out = new Vec().set(a);
  _mag(out, s, mag);
  return out;
}
