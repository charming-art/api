export function random(min, max) {
  [min = 0, max = 1] = arguments.length === 1 ? [0, min] : [min, max];
  return min + (max - min) * Math.random();
}
