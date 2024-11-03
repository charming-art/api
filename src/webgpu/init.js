function webgpu(width = 640, height = 480, dpr = null) {
  if (dpr == null) dpr = devicePixelRatio;
  const canvas = document.createElement("canvas");
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  return canvas.getContext("webgpu");
}

export function webgpu_init({width, height}) {
  const device = this._device;
  const context = webgpu(width, height);
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
  context.configure({device, format: presentationFormat});
  this._ctx = context;
  this._presentationFormat = presentationFormat;
}
