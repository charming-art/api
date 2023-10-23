export function each(flow, groups, callback) {
  const m = groups.length;
  for (let j = 0; j < m; j++) {
    const group = groups[j];
    for (let i = 0; i < group.length; i++) {
      const datum = group[i];
      callback.call(flow, datum, i, group, flow);
    }
  }
  return groups;
}
