export function background(renderer, I, value, dimension) {
  const { fill: F = [], stroke: S = [] } = value;
  const { width, height } = dimension;
  for (const i of I) {
    renderer.rect({
      x: 0,
      y: 0,
      width,
      height,
      stroke: S[i],
      fill: F[i],
    });
  }
}
