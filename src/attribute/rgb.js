export function rgb(r, g, b) {
  r = r | 0;
  g = g | 0;
  b = b | 0;
  if (arguments.length === 1) return `rgb(${r}, ${r}, ${r})`;
  return `rgb(${r}, ${g}, ${b})`;
}
