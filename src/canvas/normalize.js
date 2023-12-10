import { color as d3Color } from "d3-color";

export function normalizeColor(color, opacity) {
  if (color === undefined || opacity === undefined) return color;
  const { r, g, b } = d3Color(color);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
