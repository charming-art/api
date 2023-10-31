export function background(renderer, I, value) {
  const { fill: F = [] } = value;
  for (const i of I) renderer.clear({ fill: F[i] });
}
