function context2d(width = 640, height = 480, dpr = null) {
  if (dpr == null) dpr = devicePixelRatio;
  const canvas = document.createElement("canvas");
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  const context = canvas.getContext("2d");
  context.scale(dpr, dpr);
  return context;
}

export function canvas_init({width, height}) {
  this._ctx = context2d(width, height);
  const canvas = this._ctx.canvas;
  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    this._attrs.mouseX = event.clientX - rect.left;
    this._attrs.mouseY = event.clientY - rect.top;
  });
}
