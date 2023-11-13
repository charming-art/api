export function context2d(width = 640, height = 480, dpi = null) {
  if (dpi == null) dpi = devicePixelRatio;
  const canvas = document.createElement("canvas");
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  const context = canvas.getContext("2d");
  context.scale(dpi, dpi);
  return context;
}

export function contextGL(width, height, dpi) {
  if (dpi == null) dpi = devicePixelRatio;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  gl.viewport(0, 0, width * dpi, height * dpi);
  return gl;
}
