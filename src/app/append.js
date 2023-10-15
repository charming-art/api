import { Flow } from "../flow/index.js";
import { valueOf } from "../flow/_valueOf.js";
import { Node } from "../node/index.js";

export function app$append(render, options) {
  const data = [0];
  const node = new Node({
    I: data,
    render,
    options,
    value: valueOf(data, options),
  });
  this._children.push(node);
  return new Flow(data, node, this);
}
