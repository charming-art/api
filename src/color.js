export function rgb(r, g, b) {
  if (arguments.length === 1) return `rgb(${r}, ${r}, ${r})`;
  return `rga(${r}, ${g}, ${b})`;
}
