export function randomInt(min, max) {
  [min = 0, max = 1] = arguments.length === 1 ? [0, min] : [min, max];
  min = Math.floor(min);
  max = Math.floor(max) - min;
  return Math.floor(Math.random() * max + min);
}
