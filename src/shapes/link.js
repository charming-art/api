const defaults = {
  stroke: "#000",
  strokeWidth: 1,
};

export function link(context, I, value) {
  const {
    x: X,
    y: Y,
    x1: X1,
    y1: Y1,
    stroke: S = [],
    strokeWidth: SW = [],
  } = value;
  for (const i of I) {
    const stroke = S[i] || defaults.stroke;
    const strokeWidth = SW[i] || defaults.strokeWidth;
    context.beginPath();
    if (stroke) context.strokeStyle = stroke;
    if (strokeWidth) context.lineWidth = strokeWidth;
    context.moveTo(X[i], Y[i]);
    context.lineTo(X1[i], Y1[i]);
    if (stroke) context.stroke();
    context.closePath();
  }
}
