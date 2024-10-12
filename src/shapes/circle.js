import {attribute} from "./attribute.js";

function applyMatrix(context, matrices) {
  for (const matrix of matrices) context.transform(...matrix);
}

export function circle({x, y, fill, r}) {
  return ({data} = {data: [0]}) => {
    const I = Array.from({length: data.length}, (_, i) => i);
    const transform = (context, I, value) => {
      const {x: X = [], y: Y = [], r: R = [], fill: F = [], M = []} = value;
      for (const i of I) {
        context.save();
        applyMatrix(context, M[i] ?? []);
        context.beginPath();
        context.arc(X[i], Y[i], R[i], 0, 2 * Math.PI);
        context.fillStyle = F[i];
        context.fill();
        context.restore();
      }
    };
    return {
      ...(x !== undefined && {x: I.map((i) => attribute(x, i, data))}),
      ...(y !== undefined && {y: I.map((i) => attribute(y, i, data))}),
      ...(r !== undefined && {r: I.map((i) => attribute(r, i, data))}),
      ...(fill !== undefined && {fill: I.map((i) => attribute(fill, i, data))}),
      data,
      I,
      transform,
    };
  };
}
