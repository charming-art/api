import { Flow } from "./index.js";

export function flow$data(data) {
  const flow = new Flow({ data, parent: this, app: this._app });
  this._children.push(flow);
  return flow;
}
