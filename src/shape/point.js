import { define } from "./define.js";

export const point = define((renderer, I, value) => {
  const {
    x: X = [],
    y: Y = [],
    stroke: S = [],
    strokeWidth: SW = [],
    stroke0: SC = [],
    stroke1: SF = [],
    stroke2: SB = [],
  } = value;
  for (const i of I) {
    renderer.point({
      x: X[i],
      y: Y[i],
      stroke: S[i],
      stroke0: SC[i],
      stroke1: SF[i],
      stroke2: SB[i],
      strokeWidth: SW[i],
    });
  }
});
