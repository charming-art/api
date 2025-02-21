class Collection {
  constructor(svg, tag, data, options, children) {
    this._svg = svg;
    this._tag = tag;
    this._data = data;
    this._options = options;
    this._nodes = [];
    this._children = children;
  }
}

const create = (svg, name, data, options) => {
  if (options === undefined) (options = data), (data = [0]);
  const {children = [], ...rest} = options;
  return new Collection(svg, name, data, rest, children);
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

export const SVG = proxy(create.bind(null, true));

export const HTML = proxy(create.bind(null, false));
