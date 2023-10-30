export function vec$dist(a) {
  return vecDist(this, a);
}

export function vec$dist2(a) {
  return vecDist2(this, a);
}

export function vecDist(a, b) {
  return Math.sqrt(vecDist2(a, b));
}

export function vecDist2(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}
