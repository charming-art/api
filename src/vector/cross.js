export function vec$cross(a) {
  return vecCross(this, a);
}

export function vecCross(a, b) {
  return a.x * b.y - a.y * b.x;
}
