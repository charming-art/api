import { Flow } from "./index.js";

export function flow$transform(transform, ...params) {
  const flow = new Flow(this._groups, this._data, this._parent, this._app);
  if (!this._parent) return flow;
  const data = this._parent._data;
  this._parent._data = transform(this, data, ...params);
  return flow;
}
