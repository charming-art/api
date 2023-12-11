export function line(renderer, I, value, options) {
  const { close = false } = options;
  const { x: X, y: Y, stroke: S = [], strokeWidth: SW = [] } = value;
  const first = I[0];
  const D = [["M", X[first], Y[first]]];
  const k = I.length;
  for (let m = 1, i = I[m]; m < k; m++, i = I[m]) D.push(["L", X[i], Y[i]]);
  if (close) D.push(["Z"]);
  renderer.path({
    d: D,
    stroke: S[first],
    strokeWidth: SW[first],
  });
}
