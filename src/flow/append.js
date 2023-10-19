import { Flow } from "./index.js";
import { valueOf } from "./_valueOf.js";
import { Node } from "../node/index.js";

export function flow$append(render, options) {
  const flow = this._data ? this : this.data(() => [0]);
  const groups = flow._groups;
  const parent = this._parent;
  const values = groups.map((group) => ({
    I: group.map((_, i) => i),
    render,
    options,
    value: valueOf(group, options),
  }));
  const node = new Node(values, [], parent);
  parent._children.push(node);
  return new Flow(groups, null, node, this._app);
}
