import { Flow } from "./index.js";
import { valueOf } from "./_valueOf.js";
import { Node } from "../node/index.js";

export function flow$append(render, options) {
  const data = this._data || [0];
  const value = {
    I: data.map((_, i) => i),
    render,
    options,
    value: valueOf(this._data, options),
  };
  const node = new Node(value, [], this._parent);
  this._parent._children.push(node);
  return new Flow(data, node, this._app);
}
