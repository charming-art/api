import {attribute} from "./attribute.js";

export function circle({x, y, fill, r}) {
  return ({data} = {data: [0]}) => {
    const I = Array.from({length: data.length}, (_, i) => i);
    return {
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
