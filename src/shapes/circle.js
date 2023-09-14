export function circle(context, I, value) {
  const {
    x: X,
    y: Y,
    r: R,
    fill: F = [],
    stroke: S = [],
    strokeWidth: SW = [],
  } = value;
  context.save();
  for (const i of I) {
    const stroke = S[i];
    const strokeWidth = SW[i];
    context.beginPath();
    if (stroke) context.strokeStyle = stroke;
    if (strokeWidth) context.lineWidth = strokeWidth;
    context.fillStyle = F[i];
    context.arc(X[i], Y[i], R[i], 0, Math.PI * 2);
    context.fill();
    if (stroke) context.stroke();
    context.closePath();
  }
  context.restore();
}
