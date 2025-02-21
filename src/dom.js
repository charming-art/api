import {set} from "./set.js";

const isFunction = (v) => typeof v === "function";

const isArray = Array.isArray;

const createNode = (namespace, name, props, children) => {
  const dom = namespace === null ? document.createElement(name) : document.createElementNS(namespace, name);
  set(dom, props);
  for (const child of children) dom.appendChild(child);
  return dom;
};

const create = (creator, name, data, options) => {
  if (options === undefined) {
    if (isArray(data)) data = {children: data};
    const {children = [], decorators = [], ...props} = data;
    const node = creator(name, props, children);
    for (const {type, ...options} of decorators) type(node, options);
    return node;
  }
  if (isArray(options)) options = {children: options};
  const {children = [], decorators = [], ...props} = options;
  return data.map((d, i, array) => {
    const nodeProps = {};
    for (const [k, v] of Object.entries(props)) nodeProps[k] = isFunction(v) ? v(d, i, array) : v;
    const nodeChildren = children.map((c) => (isFunction(c) ? c(d, i, array) : c));
    const node = creator(name, nodeProps, nodeChildren);
    for (const decorator of decorators) {
      const {type, ...decoratorProps} = isFunction(decorator) ? decorator(d, i, array) : decorator;
      type(node, decoratorProps);
    }
    return node;
  });
};

// Exclude for Observable Notebook.
// @see https://github.com/observablehq/runtime/issues/375
const proxy = (creator) => {
  const excludes = ["then", "next", "return"];
  return new Proxy(Object.create(null), {
    get: (_, name) => {
      if (excludes.includes(name)) return;
      return (data, options) => creator(name, data, options);
    },
  });
};

export const SVG = proxy(create.bind(null, createNode.bind(null, "http://www.w3.org/2000/svg")));

export const HTML = proxy(create.bind(null, createNode.bind(null, null)));
