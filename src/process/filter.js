export function filter(flow, groups, match) {
  const m = groups.length;
  const subgroups = new Array(m);
  for (let j = 0; j < m; j++) {
    const subgroup = (subgroups[j] = []);
    const group = groups[j];
    const n = group.length;
    for (let i = 0; i < n; i++) {
      const d = group[i];
      if (match.call(flow, d, i, group)) subgroup.push(d);
    }
  }
  return subgroups;
}
