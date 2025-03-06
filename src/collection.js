class Collection {
  constructor(tag, data, options, children) {
    this._tag = tag;
    this._data = data;
    this._options = options;
    this._nodes = [];
    this._children = children;
  }
}

export const svg = (name, data, options) => {
  if (options === undefined) (options = data), (data = [0]);
  const {children = [], ...rest} = options;
  return new Collection(name, data, rest, children);
};
