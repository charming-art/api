import { define } from "./define.js";

export const polygon = define((renderer, I, value) => {
  const {
    x: X = [],
    y: Y = [],
    fill: F = [],
    stroke: S = [],
    fillOpacity: FO = [],
    strokeOpacity: SO = [],
    strokeWidth: SW = [],
  } = value;
  for (const i of I) {
    renderer.polygon({
      x: X[i],
      y: Y[i],
      stroke: S[i],
      fill: F[i],
      fillOpacity: FO[i],
      strokeOpacity: SO[i],
      strokeWidth: SW[i],
    });
  }
});
