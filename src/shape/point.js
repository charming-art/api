import { define } from "./define.js";

export const point = define((renderer, I, value) => {
  const { x: X, y: Y, stroke: S = [], stroke0: SC = [], stroke1: SF = [], stroke2: SB = [] } = value;
  for (const i of I) {
    const stroke = {
      ...S[i],
      ...(SB[i] && { bg: SB[i] }),
      ...(SC[i] && { ch: SC[i] }),
      ...(SF[i] && { fg: SF[i] }),
    };
    renderer.point({ x: X[i], y: Y[i], stroke });
  }
});
