export function circle(renderer, I, value) {
  const {
    x: X,
    y: Y,
    position: P = [],
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
      x: P[i] ? P[i][0] : X[i],
      y: P[i] ? P[i][1] : Y[i],
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
}
