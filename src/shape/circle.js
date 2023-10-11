export function circle(renderer, I, value) {
  const {
    x: X,
    y: Y,
    r: R,
    fill: F = [],
    stroke: S = [],
    strokeWidth: SW = [],
    fillOpacity: FO = [],
    strokeOpacity: SO = [],
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
    });
  }
}
