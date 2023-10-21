import { Flow } from "./index.js";
import { linear as scaleLinear } from "../scale/linear.js";
import { Node } from "../node.js";

function extent(array) {
  return [Math.min(...array), Math.max(...array)];
}

function normalizeOptions(options) {
  return Object.entries(options).map(([key, value]) => [
    key,
    normalizeProperty(value),
  ]);
}

function normalizeProperty(property) {
  if (typeof property === "object") return property;
  if (typeof property === "function") return { value: property };
  return { value: () => property };
}

export function valueOf(data, options) {
  const normalized = normalizeOptions(options);
  const values = normalized.map(([key, property]) => {
    const { value, range, scale = scaleLinear } = property;
    const v = typeof value === "function" ? value : () => value;
    const V = data.map(v);
    if (!range) return [key, V];
    const { domain = extent(V) } = property;
    const transform = scale(domain, range);
    const scaled = V.map(transform);
    return [key, scaled];
  });
  return Object.fromEntries(values);
}

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
