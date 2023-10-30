export function vec$dot(a) {
  return vecDot(this, a);
}

export function vecDot(a, b) {
  return a.x * b.x + a.y * b.y;
}
