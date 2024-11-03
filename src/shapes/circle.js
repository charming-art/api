import {attribute} from "./attribute.js";

function omit(options) {
  delete options.x;
  delete options.y;
  delete options.rotate;
}

export function circle({x, y, fill, r}) {
  return ({data = [0], ...rest} = {}) => {
    const I = Array.from({length: data.length}, (_, i) => i);
    omit(rest);
    return {
      ...rest,
      ...(x !== undefined && {x: I.map((i) => attribute(x, i, data))}),
      ...(y !== undefined && {y: I.map((i) => attribute(y, i, data))}),
      ...(r !== undefined && {r: I.map((i) => attribute(r, i, data))}),
      ...(fill !== undefined && {fill: I.map((i) => attribute(fill, i, data))}),
      data,
      I,
      transform: (renderer, I, value) => renderer.circle(I, value),
    };
  };
}
