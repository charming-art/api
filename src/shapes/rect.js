export function rect(renderer, I, value) {
  const {
    x: X = [],
    y: Y = [],
    width: W = [],
    height: H = [],
    fill: F = [],
    stroke: S = [],
  } = value;
  for (const i of I) {
    renderer.rect({
      x: X[i],
      y: Y[i],
      width: W[i],
      height: H[i],
      stroke: S[i],
      fill: F[i],
    });
  }
}
