export function push(flow, groups, datum) {
  const m = groups.length;
  const datumOf = typeof datum === "function" ? datum : () => datum;
  for (let i = 0; i < m; i++) {
    const group = groups[i];
    const datum = datumOf.call(flow, group, i, groups, flow);
    group.push(datum);
  }
  return groups;
}
