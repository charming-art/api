import { define } from "./define.js";

export const circle = define((renderer, I, value, options, group) => {
  if (renderer.circles) return renderer.circles(I, value, group);
  const {
    x: X,
    y: Y,
    r: R,
    fill: F = [],
    stroke: S = [],
    strokeWidth: SW = [],
    fillOpacity: FO = [],
    strokeOpacity: SO = [],
    fontWeight: FW = [],
    fontFamily: FF = [],
  } = value;
  for (const i of I) {
    renderer.circle({
      x: X[i],
      y: Y[i],
      r: R[i],
      fill: F[i],
      stroke: S[i],
      strokeWidth: SW[i],
      fillOpacity: FO[i],
      strokeOpacity: SO[i],
      fontWeight: FW[i],
      fontFamily: FF[i],
    });
  }
});
