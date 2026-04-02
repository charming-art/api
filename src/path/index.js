export function pathLine(x1, y1, x2, y2) {
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

export function pathCircle(cx, cy, r) {
  return `M ${cx} ${cy - r} A ${r} ${r} 0 1 0 ${cx} ${cy + r} A ${r} ${r} 0 1 0 ${cx} ${cy - r}`;
}

export function pathRect(x, y, width, height) {
  return `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`;
}

export function pathEllipse(cx, cy, rx, ry) {
  return `M ${cx} ${cy - ry} A ${rx} ${ry} 0 1 0 ${cx} ${cy + ry} A ${rx} ${ry} 0 1 0 ${cx} ${cy - ry}`;
}

export function pathPolygon(points) {
  return `M ${points.map((p) => `${p[0]} ${p[1]}`).join(" L ")} Z`;
}
