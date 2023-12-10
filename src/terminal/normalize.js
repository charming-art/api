export function normalizeColor(color, width, height) {
  if (typeof color === "function") return color(width, height);
  return () => color;
}
