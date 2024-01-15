export function derive(flow, groups, options) {
  const m = groups.length;
  const newGroups = new Array(m);
  const callback = (d, i, data) => {
    const obj = typeof d === "object" ? { ...d } : {};
    for (const [key, value] of Object.entries(options)) {
      obj[key] = typeof value === "function" ? value.call(flow, d, i, data) : value;
    }
    return obj;
  };
  for (let j = 0; j < m; j++) {
    newGroups[j] = groups[j].map((d, i, data) => callback.call(flow, d, i, data));
  }
  return newGroups;
}
