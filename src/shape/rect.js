import { define } from "./define.js";

export const rect = define((renderer, I, value) => {
  const {
    x: X = [],
    y: Y = [],
    width: W = [],
    height: H = [],
    fill: F = [],
    stroke: S = [],
    rotate: R = [],
    anchor: A = [],
    fillOpacity: FO = [],
    strokeOpacity: SO = [],
    strokeWidth: SW = [],
  } = value;
  for (const i of I) {
    renderer.rect({
      x: X[i],
      y: Y[i],
      width: W[i],
      height: H[i],
      stroke: S[i],
      fill: F[i],
      fillOpacity: FO[i],
      strokeOpacity: SO[i],
      strokeWidth: SW[i],
      ...(A[i] && { anchor: A[i] }),
      ...(R[i] && { rotate: R[i] }),
    });
  }
});
