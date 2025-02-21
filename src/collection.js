const isFunction = (v) => typeof v === "function";

const isArray = Array.isArray;

const createNode = (svg, name, props) => ({name, props, svg, decorators: []});

class Collection {
  constructor(vdoms, children) {
    this._vdoms = vdoms;
    this._nodes = [];
    this._children = children;
  }
}

const create = (creator, name, data, options) => {
  if (options === undefined) {
    if (isArray(data)) data = {children: data};
    const {children = [], decorators = [], ...props} = data;
    const node = creator(name, props);
    for (const {type, ...options} of decorators) node.decorators.push({type, props: options});
    return new Collection([node], [children]);
  }
  if (isArray(options)) options = {children: options};
  const {children = [], decorators = [], ...props} = options;
  const n = data.length;
  const vdoms = new Array(n);
  const childrenList = new Array(n);
  for (let i = 0; i < n; i++) {
    const nodeProps = {};
    for (const [k, v] of Object.entries(props)) nodeProps[k] = isFunction(v) ? v(data[i], i, data) : v;
    const nodeChildren = children.flatMap((c) => (isFunction(c) ? c(data[i], i, data) : c));
    const node = creator(name, nodeProps, nodeChildren);
    for (const decorator of decorators) {
      const {type, ...decoratorProps} = isFunction(decorator) ? decorator(data[i], i, data) : decorator;
      node.decorators.push({type, props: decoratorProps});
    }
    vdoms[i] = node;
    childrenList[i] = nodeChildren;
  }
  return new Collection(vdoms, childrenList);
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

export const SVG = proxy(create.bind(null, createNode.bind(null, true)));

export const HTML = proxy(create.bind(null, createNode.bind(null, false)));
