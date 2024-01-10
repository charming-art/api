export function hsl(h, s, l) {
  h = h | 0;
  s = s | 0;
  l = l | 0;
  return `hsl(${h}, ${s}%, ${l}%)`;
}
