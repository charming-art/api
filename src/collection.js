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

export const svg = create.bind(null, true);

export const html = create.bind(null, false);
