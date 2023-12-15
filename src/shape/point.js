import { define } from "./define.js";

export const point = define((renderer, I, value) => {
  const { x: X, y: Y, stroke: S = [] } = value;
  for (const i of I) {
    renderer.point({ x: X[i], y: Y[i], stroke: S[i] });
  }
});
