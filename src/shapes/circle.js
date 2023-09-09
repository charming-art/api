export function circle(context, I, value) {
  const { x: X, y: Y, fill: F = [], r: R, stroke: S = [] } = value;
  for (const i of I) {
    const stroke = S[i];
    context.beginPath();
    if (stroke) context.strokeStyle = stroke;
    context.fillStyle = F[i];
    context.arc(X[i], Y[i], R[i], 0, Math.PI * 2);
    context.fill();
    if (stroke) context.stroke();
    context.closePath();
  }
}
