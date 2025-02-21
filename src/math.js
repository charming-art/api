export function constrain(x, min, max) {
  return x < min ? min : x > max ? max : x;
}
