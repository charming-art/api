import { linear } from "../scale/linear.js";

function extent(array) {
  return [Math.min(...array), Math.max(...array)];
}

function applyScale(value, options) {
  return Object.fromEntries(
    Object.entries(value).map(([key, V]) => {
      const { [key]: descriptor } = options;
      if (!descriptor) return [key, V];
      const { range, domain = extent(V), scale = linear, ...rest } = descriptor;
      const map = scale(domain, range, rest);
      const scaled = V.map(map);
      return [key, scaled];
    })
  );
}

export function scale(_, data, options) {
  const m = data.length;
  for (let i = 0; i < m; i++) {
    const context = data[i];
    context.value = applyScale(context.value, options);
  }
  return data;
}
