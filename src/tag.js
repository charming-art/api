import {set} from "./attr.js";

const isFunc = (x) => typeof x === "function";

const isTruthy = (x) => x != null && x !== false;

const isString = (x) => typeof x === "string";

const isNode = (x) => x?.nodeType;

export const tag = (ns) => (name, options) => {
  if (!isString(name)) return null;

  // Normalize arguments.
  if (Array.isArray(options)) options = {children: options};
  if (options === undefined) options = {};

  // Create node and store parameters.
  const node = ns ? document.createElementNS(ns, name) : document.createElement(name);
  node.__options__ = options;
  node.__name__ = name;

  const {data, ...rest} = options;

  // Nested groups.
  if (isFunc(data)) return node;

  // Non data driven node.
  if (!data) {
    const {children = [], ...attrs} = rest;
    for (const [k, v] of Object.entries(attrs)) {
      const val = k.startsWith("on") ? v : isFunc(v) ? v() : v;
      set(node, k, val);
    }
    for (const c of children.filter(isTruthy).flat(Infinity)) {
      const child = isNode(c) ? c : document.createTextNode("" + c);
      node.append(child);
    }
    return node;
  }

  // Data driven node.
  const {children = [], ...attrs} = rest;
  const nodes = data.map((d, i, array) => {
    const node = ns ? document.createElementNS(ns, name) : document.createElement(name);
    for (const [k, v] of Object.entries(attrs)) {
      if (k.startsWith("on")) {
        const [l, o] = Array.isArray(v) ? v : [v];
        const val = (e, {node}) => l(e, {d, i, data: array, node});
        set(node, k, [val, o]);
      } else {
        const val = isFunc(v) ? v(d, i, array) : v;
        set(node, k, val);
      }
    }
    return node;
  });

  for (const c of children.filter(isTruthy).flat(Infinity)) {
    const n = nodes.length;
    const __data__ = c?.__options__?.data;
    if (isFunc(c)) {
      // Data driven children, evaluate on parent data.
      for (let i = 0; i < n; i++) {
        let child = c(data[i], i, data);
        if (isTruthy(child)) {
          child = isNode(child) ? child : document.createTextNode("" + child);
          nodes[i].append(child);
        }
      }
    } else if (__data__) {
      // Nested groups, evaluate on derived data from parent data.
      for (let i = 0; i < n; i++) {
        const childData = isFunc(__data__) ? __data__(data[i], i, data) : __data__;
        const childNode = tag(ns)(c.__name__, {...c.__options__, data: childData});
        if (childNode) nodes[i].append(childNode);
      }
    } else {
      // Appended groups, evaluate on parent data.
      let childNodes = [];
      if (isNode(c)) {
        const fragment = tag(ns)(c.__name__, {...c.__options__, data});
        if (fragment) childNodes = Array.from(fragment.childNodes);
      } else {
        childNodes = data.map(() => document.createTextNode("" + c));
      }
      for (let i = 0; i < n; i++) nodes[i].append(childNodes[i]);
    }
  }

  const root = document.createDocumentFragment();
  root.append(...nodes);
  root.__options__ = options;
  root.__name__ = name;
  return root;
};
