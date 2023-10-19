import { Flow } from "./index.js";

export function flow$map(callback) {
  const groups = this._groups;
  const m = groups.length;
  const newGroups = new Array(m);
  for (let j = 0; j < m; j++) {
    newGroups[j] = groups[j].map((d, i, data) =>
      callback.call(this, d, i, data)
    );
  }
  const flow = new Flow(newGroups, this._data, this._parent, this._app);
  return flow;
}
