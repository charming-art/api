import { define } from "./define.js";

const defaults = {
  stroke: "#000",
  strokeWidth: 1,
};

export const link = define((renderer, I, value) => {
  const {
    x: X,
    y: Y,
    x1: X1,
    y1: Y1,
    stroke: S = [],
    strokeWidth: SW = [],
    strokeCap: SC = [],
    rotate: R = [],
    transformOrigin: TO = [],
  } = value;
  for (const i of I) {
    renderer.line({
      ...defaults,
      x: X[i],
      y: Y[i],
      x1: X1[i],
      y1: Y1[i],
      rotate: R[i],
      transformOrigin: TO[i],
      ...(S[i] && { stroke: S[i] }),
      ...(SW[i] && { strokeWidth: SW[i] }),
      ...(SC[i] && { strokeCap: SC[i] }),
    });
  }
});
