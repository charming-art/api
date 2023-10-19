import { Flow } from "../flow/index.js";
import { valueOf } from "../flow/_valueOf.js";
import { Node } from "../node/index.js";

export function app$append(render, options) {
  const I = [0];
  const value = {
    I,
    render,
    options,
    value: valueOf(I, options),
  };
  const node = new Node([value], [], this);
  this._children.push(node);
  return new Flow([I], I, node, this);
}
