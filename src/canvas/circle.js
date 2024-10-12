function applyMatrix(context, matrices) {
  for (const matrix of matrices) context.transform(...matrix);
}

export function canvas_circle(I, value) {
  const context = this._ctx;
  const {x: X = [], y: Y = [], r: R = [], fill: F = [], M = []} = value;
  for (const i of I) {
    context.save();
    applyMatrix(context, M[i] ?? []);
    context.beginPath();
    context.arc(X[i], Y[i], R[i], 0, 2 * Math.PI);
    context.fillStyle = F[i];
    context.fill();
    context.restore();
  }
}
