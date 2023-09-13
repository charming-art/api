export function rect(context, I, value) {
  const {
    x: X = [],
    y: Y = [],
    width: W = [],
    height: H = [],
    fill: F = [],
    stroke: S = [],
  } = value;
  for (const i of I) {
    const stroke = S[i];
    context.beginPath();
    if (stroke) context.strokeStyle = stroke;
    context.fillStyle = F[i];
    context.rect(X[i], Y[i], W[i], H[i]);
    context.fill();
    if (stroke) context.stroke();
    context.closePath();
  }
}
