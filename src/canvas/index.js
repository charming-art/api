export function strokeLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

export function fillCircle(context, cx, cy, r) {
  context.beginPath();
  context.arc(cx, cy, r, 0, Math.PI * 2);
  context.fill();
}

export function strokeCircle(context, cx, cy, r) {
  context.beginPath();
  context.arc(cx, cy, r, 0, Math.PI * 2);
  context.stroke();
}

export function strokeEllipse(context, cx, cy, rx, ry) {
  context.beginPath();
  context.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  context.stroke();
}

export function fillEllipse(context, cx, cy, rx, ry) {
  context.beginPath();
  context.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  context.fill();
}

export function cssFont({
  fontStyle = "normal",
  fontVariant = "normal",
  fontWeight = "normal",
  fontSize = 10,
  fontFamily = "sans-serif",
} = {}) {
  return `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`.replace(/\s+/g, " ").trim();
}

export function context2d({width = 300, height = 150, dpr = devicePixelRatio, container} = {}) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.scale(dpr, dpr);
  if (container) {
    container = typeof container === "string" ? document.querySelector(container) : container;
    container.appendChild(canvas);
  }
  return ctx;
}
