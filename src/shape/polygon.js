import { define } from "./define.js";

function isFlatArray(value) {
  return Array.isArray(value) && !Array.isArray(value[0]);
}

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

  if (isFlatArray(X)) {
    return renderer.polygon({
      x: X,
      y: Y,
      stroke: S[0],
      fill: F[0],
      fillOpacity: FO[0],
      strokeOpacity: SO[0],
      strokeWidth: SW[0],
    });
  }

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
