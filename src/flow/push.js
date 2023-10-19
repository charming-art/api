export function flow$push(datum) {
  const groups = this._groups;
  const m = groups.length;
  const datumOf = typeof datum === "function" ? datum : () => datum;
  for (let i = 0; i < m; i++) {
    const group = groups[i];
    const datum = datumOf.call(this, group, i, groups, this);
    group.push(datum);
  }
  return this;
}
