export function circle(renderer, I, value) {
  const {
    x: X,
    y: Y,
    r: R,
    fill: F = [],
    stroke: S = [],
    strokeWidth: SW = [],
  } = value;
  for (const i of I) {
    renderer.circle({
      x: X[i],
      y: Y[i],
      r: R[i],
      fill: F[i],
      stroke: S[i],
      strokeWidth: SW[i],
    });
  }
}
