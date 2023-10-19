import { Flow } from "./index.js";

export function flow$filter(match) {
  const groups = this._groups;
  const m = groups.length;
  const subgroups = new Array(m);
  for (let j = 0; j < m; j++) {
    const subgroup = (subgroups[j] = []);
    const group = groups[j];
    const n = group.length;
    for (let i = 0; i < n; i++) {
      const d = group[i];
      if (match.call(this, d, i, group)) subgroup.push(d);
    }
  }
  return new Flow(subgroups, this._data, this._parent, this._app);
}
