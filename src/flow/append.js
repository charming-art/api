import { Flow } from "./index.js";
import { Node } from "../node.js";

export function valueOf(data, options) {
  const values = Object.entries(options).map(([key, value]) => {
    if (typeof value === "object" && value.preserve) return [key, value];
    if (Array.isArray(value)) return [key, value];
    const v = typeof value === "function" ? value : () => value;
    const V = data.map(v);
    return [key, V];
  });
  return Object.fromEntries(values);
}

export function flow$append(render, options) {
  const flow = this._data ? this : this.data((d) => [d]);
  const groups = flow._groups;
  const parent = this._parent;
  const values = groups.map((group) => ({
    I: group.map((_, i) => i),
    render,
    options,
    value: valueOf(group, options),
    group,
  }));
  const node = new Node(values, [], parent);
  parent._children.push(node);
  return new Flow(groups, null, node, this._app);
}
