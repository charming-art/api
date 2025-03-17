import {setAttribute} from "./set.js";
import {Mark} from "./mark.js";

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

function updateAttributes(i, datum, node, data, options, children) {
  const {decorators = [], attrs = () => ({}), ...props} = options;

  for (const [k, v] of Object.entries({...attrs(datum, i, data), ...props})) {
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

  return children.flatMap((c) => (isFunction(c) ? c(datum, i, data) : [c].flat().map((d) => d.clone())));
}

class SVG extends Mark {
  constructor(tag, data, options, children) {
    super(children);
    this._tag = tag;
    this._data = data;
    this._options = options;
  }
  render(parent) {
    const data = this._update?._data || this._data;
    const options = this._update?._options || this._options;
    const children = this._update?._children || this._children;
    const nextNode = this._next?._nodes?.[0] || null;

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
        newNodesChildren[i] = updateAttributes(i, datum, node, data, options, children);
        newNodes[i] = node;
      }
    }

    for (let i = 0; i < nodeLength; i++) {
      if ((current = update[i])) {
        newNodesChildren[i] = updateAttributes(i, data[i], current, data, options, children);
        newNodes[i] = current;
      }
    }

    for (let i = 0; i < nodeLength; i++) if ((current = exit[i])) current.remove();

    return [(this._nodes = newNodes), prevNodesChildren, (this._nodesChildren = newNodesChildren)];
  }
  clone() {
    return new SVG(this._tag, this._data, this._options, this._children);
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
