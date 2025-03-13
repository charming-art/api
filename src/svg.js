import {setAttribute} from "./set.js";

const isFunction = (x) => typeof x === "function";

function bindIndex(data, nodes, enter, update, exit) {
  const dataLength = data.length;
  const nodeLength = nodes.length;

  let i = 0;
  let node;

  for (; i < dataLength; i++) {
    if ((node = nodes[i])) update[i] = node;
    else enter[i] = {datum: data[i], next: null};
  }

  for (; i < nodeLength; i++) exit[i] = nodes[i];
}

function addEventListener(node, k, handler) {
  const key = "__" + k + "__";
  if (!node[key]) node.addEventListener(k.slice(2).toLowerCase(), (event) => node[key](event));
  node[key] = handler;
}

class SVG {
  constructor(tag, data, options, children) {
    const {ref, ...rest} = options;
    this._tag = tag;
    this._data = data;
    this._options = rest;
    this._children = children;
    this._update = null;
    this._nodes = null;
    this._next = null;
    this._nodesChildren = null;
    if (ref) (this._ref = ref), (ref.current = this);
  }
  render(parent) {
    const data = this._update?._data || this._data;
    const options = this._update?._options || this._options;
    const children = this._update?._children || this._children;
    const nextNode = this._next?._nodes?.[0] || null;
    if (this._update?._ref) this._update._ref.current = this;

    const tag = this._tag;
    const nodes = this._nodes || [];
    const prevNodesChildren = this._nodesChildren || [];
    const dataLength = data.length;
    const nodeLength = nodes.length;
    const enter = new Array(dataLength);
    const update = new Array(dataLength);
    const exit = new Array(nodeLength);
    const newNodes = new Array(dataLength);
    const newNodesChildren = new Array(dataLength);

    const updateAttributes = (i, datum, node) => {
      const {decorators = [], ...props} = options;

      for (const [k, v] of Object.entries(props)) {
        if (k.startsWith("on")) {
          const handler = (event) => v(event, datum, i, data);
          addEventListener(node, k, handler);
        } else {
          const value = isFunction(v) ? v(datum, i, data) : v;
          setAttribute(node, k, value);
        }
      }

      for (const decorator of decorators) {
        const {type, ...decoratorProps} = isFunction(decorator) ? decorator(datum, i, data) : decorator;
        type(node, decoratorProps);
      }

      const nodeChildren = children.flatMap((c) => (isFunction(c) ? c(datum, i, data) : c));
      newNodesChildren[i] = nodeChildren;
      newNodes[i] = node;
    };

    bindIndex(data, nodes, enter, update, exit);

    let previous, next;
    for (let i0 = 0, i1 = 0; i0 < dataLength; i0++) {
      if ((previous = enter[i0])) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = update[i1]) && ++i1 < nodeLength);
        previous.next = next || nextNode;
      }
    }

    let current;

    for (let i = 0; i < dataLength; i++) {
      if ((current = enter[i])) {
        const {datum, next} = current;
        const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
        parent.insertBefore(node, next);
        updateAttributes(i, datum, node);
      }
    }

    for (let i = 0; i < nodeLength; i++) {
      if ((current = update[i])) updateAttributes(i, data[i], current);
    }

    for (let i = 0; i < nodeLength; i++) if ((current = exit[i])) current.remove();

    return [(this._nodes = newNodes), prevNodesChildren, (this._nodesChildren = newNodesChildren)];
  }
  nodes() {
    return this._nodes;
  }
}

export const svg = (name, data, options) => {
  if (options === undefined) (options = data), (data = [0]);
  const {children = [], ...rest} = options;
  return new SVG(name, data, rest, children);
};
