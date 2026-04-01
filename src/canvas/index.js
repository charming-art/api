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
