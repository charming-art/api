import { color as d3Color } from "d3-color";

const colorByValue = new Map();

export function rgba(value) {
  if (colorByValue.has(value)) return colorByValue.get(value);
  const color = d3Color(value).rgb();
  colorByValue.set(value, color);
  return color;
}

export function normalizeColor(color, opacity) {
  if (color === undefined) return color;
  if (color === "transparent") return [0, 0, 0, 0];
  const { r, g, b, opacity: a } = rgba(color);
  return [r, g, b, ((opacity ?? a ?? 1) * 255) | 0];
}

export function normalizeColorString(color, opacity) {
  if (typeof color !== "string") return color;
  const [r, g, b, a] = normalizeColor(color, opacity);
  return `rgba(${r},${g},${b},${a / 255})`;
}
