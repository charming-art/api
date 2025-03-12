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

class SVG {
  constructor(tag, data, options, children) {
    this._tag = tag;
    this._data = data;
    this._options = options;
    this._children = children;
    this._update = null;
    this._nodes = null;
    this._nodesChildren = null;
  }
  render(parent) {
    const data = this._update?._data || this._data;
    const options = this._update?._options || this._options;
    const children = this._update?._children || this._children;
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
      for (const [k, v] of Object.entries(options)) {
        if (k.startsWith("on")) {
          const handler = (event) => v(event, datum, i, data);
          const key = "_" + k;
          if (!node[key]) node.addEventListener(k.slice(2).toLowerCase(), (event) => node[key](event));
          node[key] = handler;
        } else {
          const value = isFunction(v) ? v(datum, i, data) : v;
          setAttribute(node, k, value);
        }
      }

      newNodes[i] = node;

      const nodeChildren = children.flatMap((c) => (isFunction(c) ? c(datum, i, data) : c));
      newNodesChildren[i] = nodeChildren;
    };

    bindIndex(data, nodes, enter, update, exit);

    let previous, next;
    for (let i0 = 0, i1 = 0; i0 < dataLength; i0++) {
      if ((previous = enter[i0])) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = update[i1]) && ++i1 < nodeLength);
        previous.next = next || null;
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
}

export const svg = (name, data, options) => {
  if (options === undefined) (options = data), (data = [0]);
  const {children = [], ...rest} = options;
  return new SVG(name, data, rest, children);
};
