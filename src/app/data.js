import { Flow } from "../flow/index.js";

export function app$data(data) {
  return new Flow([data], data, this, this);
}
