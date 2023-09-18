import { linear as scaleLinear } from "../scales/linear.js";

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

export function app$render() {
  for (const stream of this._data) {
    const { shapes, data } = stream.value();
    const I = data.map((_, i) => i);
    for (const shape of shapes) {
      const { render, options } = shape;
      const normalized = normalizeOptions(options);
      const values = normalized.map(([key, property]) => {
        const { value, range, scale = scaleLinear } = property;
        const V = data.map(value);
        if (!range) return [key, V];
        const domain = extent(V);
        const transform = scale(domain, range);
        const scaled = V.map(transform);
        return [key, scaled];
      });
      render(this._renderer, I, Object.fromEntries(values), {
        width: this.width(),
        height: this.height(),
      });
    }
  }
  this._data = [];
  return this.node();
}
