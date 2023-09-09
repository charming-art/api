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

function scaleLinear(domain, range) {
  const [d, d1] = domain;
  const [r, r1] = range;
  return (x) => {
    const t = (x - d) / (d1 - d);
    return r * (1 - t) + t * r1;
  };
}

export function app$render() {
  for (const stream of this._data) {
    const { maps, shapes, data } = stream.value();
    const mapped = maps.reduce((data, map) => data.map(map), data);
    const I = mapped.map((_, i) => i);
    for (const shape of shapes) {
      const { render, options } = shape;
      const normalized = normalizeOptions(options);
      const values = normalized.map(([key, property]) => {
        const { value, range } = property;
        const V = mapped.map(value);
        if (!range) return [key, V];
        const domain = extent(V);
        const scale = scaleLinear(domain, range);
        const scaled = V.map(scale);
        return [key, scaled];
      });
      render(this._context, I, Object.fromEntries(values));
    }
  }
  this._data = [];
  return this.node();
}
