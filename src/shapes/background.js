export function background(context, I, value, dimension) {
  const { fill: F = [], stroke: S = [] } = value;
  const { width, height } = dimension;
  for (const i of I) {
    const stroke = S[i];
    context.beginPath();
    if (stroke) context.strokeStyle = stroke;
    context.fillStyle = F[i];
    context.rect(0, 0, width, height);
    context.fill();
    if (stroke) context.stroke();
    context.closePath();
  }
}
