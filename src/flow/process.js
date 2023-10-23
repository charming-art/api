import { Flow } from "./index.js";

export function flow$process(process, ...params) {
  const processed = process(this, this._groups, ...params);
  return new Flow(processed, this._data, this._parent, this._app);
}
