export function context2d({width, height, dpi = devicePixelRatio, container}) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.scale(dpi, dpi);
  if (container) {
    container = typeof container === "string" ? document.querySelector(container) : container;
    container.appendChild(canvas);
  }
  return ctx;
}
