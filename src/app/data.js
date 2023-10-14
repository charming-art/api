import { Flow } from "../flow/index.js";

export function app$data(data) {
  const flow = new Flow({ data, app: this, children: this._children });
  return flow;
}
