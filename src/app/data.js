import { Flow } from "../flow/index.js";

export function app$data(data) {
  const flow = new Flow(data, this, this);
  return flow;
}
