export function random(a, b) {
  const [min, max] = arguments.length === 1 ? [0, a] : [a, b];
  return min + (max - min) * Math.random();
}
