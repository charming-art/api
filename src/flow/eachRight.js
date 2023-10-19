export function flow$eachRight(callback) {
  const groups = this._groups;
  const m = groups.length;
  for (let j = 0; j < m; j++) {
    const group = groups[j];
    const n = group.length;
    for (let i = n - 1; i >= 0; i--) {
      const datum = group[i];
      callback.call(this, datum, i, group, this);
    }
  }
  return this;
}
