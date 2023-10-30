export function vec$inX(x, x1) {
  const [min, max] = arguments.length == 1 ? [0, x] : [x, x1];
  return this.x >= min && this.x <= max;
}

export function vec$inY(y, y1) {
  const [min, max] = arguments.length == 1 ? [0, y] : [y, y1];
  return this.y >= min && this.y <= max;
}

export function vecInX(...params) {
  return vec$inX.call(...params);
}

export function vecInY(...params) {
  return vec$inY.call(...params);
}
