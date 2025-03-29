import {setAttribute} from "./set.js";

const isFunction = (x) => typeof x === "function";

const isStr = (x) => typeof x === "string";

const isDefined = (x) => x !== undefined && x !== null;

const namespaces = {
  svg: "http://www.w3.org/2000/svg",
};

function addEventListener(node, k, handler) {
  const key = "__" + k + "__";
  if (!node[key]) node.addEventListener(k.slice(2).toLowerCase(), (event) => node[key](event));
  node[key] = handler;
}

function applyAttributes(node, options, values, context = {}) {
  const {use} = context;
  const decorators = [];
  const props = {};

  for (const [k, v] of Object.entries(options)) {
    if (use && k in use && isDefined(v)) decorators.push([use[k], v]);
    else props[k] = v;
  }

  const {attrs = () => ({}), ...rest} = props;
  const {datum, i, data} = values;

  for (const [k, v] of Object.entries({...attrs(datum, i, data), ...rest})) {
    if (k.startsWith("on")) {
      const handler = (event) => v(event, datum, i, data);
      addEventListener(node, k, handler);
    } else {
      const value = isFunction(v) ? v(datum, i, data) : v;
      setAttribute(node, k, value);
    }
  }

  for (const [type, decorator] of decorators) {
    const options = isFunction(decorator) ? decorator(datum, i, data) : decorator;
    type(node, options, context);
  }

  return node;
}

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

export class Mark {
  constructor(tag, data, options) {
    if (options === undefined) (options = data), (data = [0]);
    const {children = [], ...props} = options ?? {};

    this._tag = tag;
    this._data = data;
    this._options = options;
    this._props = props;
    this._children = children;
    this._update = null;
    this._nodes = null;
    this._next = null;
    this._nodesChildren = null;
  }
  render(current, options, values, context) {
    let namespace;
    const node = isStr(current)
      ? (namespace = namespaces[current.split(":")[0]])
        ? document.createElementNS(namespace, current.split(":")[1])
        : document.createElement(current)
      : current;
    return applyAttributes(node, options, values, context);
  }
  patch(parent, context) {
    const data = this._update?._data || this._data;
    const props = this._update?._props || this._props;
    const children = this._update?._children || this._children;
    const nextNode = this._next?._nodes?.[0] || null;

    const tag = this._tag;
    const nodes = this._nodes || [];
    const dataLength = data.length;
    const nodeLength = nodes.length;
    const enter = new Array(dataLength);
    const update = new Array(dataLength);
    const exit = new Array(nodeLength);
    const newNodes = (this._nodes = new Array(dataLength));
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
        const node = this.render(tag, props, {datum, i, data}, context);
        parent?.insertBefore(node, next);
        newNodes[i] = node;
        newNodesChildren[i] = (isFunction(children) ? children(datum, i, data) : children)
          .flat(Infinity)
          .map((d) => d.clone());
      }
    }

    for (let i = 0; i < nodeLength; i++) {
      if ((current = update[i])) {
        const datum = data[i];
        newNodes[i] = this.render(current, props, {datum, i, data}, context);
        newNodesChildren[i] = (isFunction(children) ? children(datum, i, data) : children)
          .flat(Infinity)
          .map((d) => d.clone());
      }
    }

    for (let i = 0; i < nodeLength; i++) if ((current = exit[i])) current.remove();

    return [newNodes, newNodesChildren];
  }
  nodes() {
    if (!this._nodes) {
      const [nodes, children] = this.patch();
      for (let i = 0; i < nodes.length; i++) for (const mark of children[i]) mark.patch(nodes[i]);
    }
    return this._nodes;
  }
  node() {
    return this.nodes()[0] || null;
  }
  clone() {
    return new this.constructor(this._tag, this._data, this._options);
  }
}

export const svg = (tag, data, options) => new Mark(`svg:${tag}`, data, options);

export const html = (tag, data, options) => new Mark(tag, data, options);
