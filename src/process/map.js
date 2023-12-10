export function map(flow, groups, callback) {
  const m = groups.length;
  const newGroups = new Array(m);
  for (let j = 0; j < m; j++) {
    newGroups[j] = groups[j].map((d, i, data) => callback.call(flow, d, i, data));
  }
  return newGroups;
}
