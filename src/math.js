export function random(a, b) {
  const [min = 0, max = 1] = arguments.length === 1 ? [0, a] : [a, b];
  return min + (max - min) * Math.random();
}

export function clamp(x, min, max) {
  return Math.max(Math.min(max, x), min);
}
