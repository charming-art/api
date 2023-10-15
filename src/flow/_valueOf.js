import { linear as scaleLinear } from "../scale/linear.js";

function extent(array) {
  return [Math.min(...array), Math.max(...array)];
}

function normalizeOptions(options) {
  return Object.entries(options).map(([key, value]) => [
    key,
    normalizeProperty(value),
  ]);
}

function normalizeProperty(property) {
  if (typeof property === "object") return property;
  if (typeof property === "function") return { value: property };
  return { value: () => property };
}

export function valueOf(data, options) {
  const normalized = normalizeOptions(options);
  const values = normalized.map(([key, property]) => {
    const { value, range, scale = scaleLinear } = property;
    const v = typeof value === "function" ? value : () => value;
    const V = data.map(v);
    if (!range) return [key, V];
    const domain = extent(V);
    const transform = scale(domain, range);
    const scaled = V.map(transform);
    return [key, scaled];
  });
  return Object.fromEntries(values);
}
