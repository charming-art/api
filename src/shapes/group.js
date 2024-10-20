import {attribute} from "./attribute.js";

function rotateMatrix(angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [cos, sin, -sin, cos, 0, 0];
}

function translateMatrix(x, y) {
  return [1, 0, 0, 1, x, y];
}

function mergeMatrix(I, PM = [], M = []) {
  return I.map((i) => [...(PM[i] ?? []), ...(M[i] ?? [])]);
}

function withTransform({x, y, rotate}, ...flows) {
  return (raw) => {
    const {data = [0], x: px, y: py, rotate: protate, ...rest} = raw ?? {};
    const I = Array.from({length: data.length}, (_, i) => i);
    const transform = (context, _, value) => {
      const {x: X = [], y: Y = [], rotate: R = []} = value;
      for (const flow of flows) {
        const {I, transform, matrix: PM, ...rest} = flow(value);
        const M = I.map((i) => {
          const x = (raw ? X[i] : X[0]) ?? 0;
          const y = (raw ? Y[i] : Y[0]) ?? 0;
          const r = (raw ? R[i] : R[0]) ?? 0;
          return [translateMatrix(x, y), rotateMatrix(r)];
        });
        const NM = mergeMatrix(I, PM, M);
        transform(context, I, {...rest, matrix: NM, I});
      }
    };
    return {
      ...rest,
      ...(x !== undefined && {x: I.map((i) => attribute(x, i, data))}),
      ...(y !== undefined && {y: I.map((i) => attribute(y, i, data))}),
      ...(rotate !== undefined && {rotate: I.map((i) => attribute(rotate, i, data))}),
      I,
      data,
      transform,
    };
  };
}

function noTransform(...flows) {
  return (data) => {
    const transform = (context, _, value) => {
      for (const flow of flows) {
        const {I, transform, ...rest} = flow(value);
        transform(context, I, rest);
      }
    };
    return {...data, transform};
  };
}

export function group(options) {
  return typeof options === "function" ? noTransform(...arguments) : withTransform(...arguments);
}
