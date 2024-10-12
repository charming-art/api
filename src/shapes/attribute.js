export function attribute(value, i, data) {
  if (typeof value === "function") return value(data[i], i, data);
  return value;
}
