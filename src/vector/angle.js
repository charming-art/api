export function vec$angle() {
  return Math.atan2(this.y, this.x);
}

export function vecAngle(a) {
  return vec$angle.call(a);
}
