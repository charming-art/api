import {set} from "./set.js";
import {Mark} from "./mark.js";

class SVG extends Mark {
  constructor(tag, data, options, children) {
    super(data, options, children);
    this._tag = tag;
  }
  create(props) {
    const tag = this._tag;
    const child = document.createElementNS("http://www.w3.org/2000/svg", tag);
    set(child, props);
    return child;
  }
}

export const svg = (name, data, options) => {
  if (options === undefined) (options = data), (data = [0]);
  const {children = [], ...rest} = options;
  return new SVG(name, data, rest, children);
};
