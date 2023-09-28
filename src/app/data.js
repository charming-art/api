import { Flow } from "../flow/index.js";

export function app$data(data) {
  const flow = new Flow({ data, app: this });
  this._flows.push(flow);
  return flow;
}
