export function random(a, b) {
  const [min = 0, max = 1] = arguments.length === 1 ? [0, a] : [a, b];
  return min + (max - min) * Math.random();
}

export function clamp(x, min, max) {
  return Math.max(Math.min(max, x), min);
}

export function range(length, start, end) {
  if (arguments.length === 1) return Array.from({ length }, (_, i) => i);
  if (arguments.length === 2) {
    if (typeof start === "function") return Array.from({ length }, start);
    [start, end] = [0, start];
  }
  const step = (end - start) / length;
  return Array.from({ length }, (_, i) => start + i * step);
}

export function radian(degree) {
  return (degree * Math.PI) / 180;
}
