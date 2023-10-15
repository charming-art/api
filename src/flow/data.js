import { Flow } from "./index.js";

export function flow$data(data) {
  const flow = new Flow(data, this._parent, this._app);
  return flow;
}
