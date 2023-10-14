import { Flow } from "./index.js";

export function flow$data(data) {
  const flow = new Flow({ data, app: this._app, children: this._children });
  return flow;
}
