import {webgpu_init} from "./init.js";
import {webgpu_node} from "./node.js";
import {webgpu_triangle} from "./triangle.js";

function WebGPU(device) {
  Object.defineProperties(this, {
    _device: {value: device},
    _ctx: {value: null, writable: true},
    _triangleRenderPipeline: {value: null, writable: true},
    _presentationFormat: {value: null, writable: true},
  });
}

Object.defineProperties(WebGPU.prototype, {
  init: {value: webgpu_init},
  node: {value: webgpu_node},
  triangle: {value: webgpu_triangle},
});

export async function webgpu() {
  const adapter = await navigator.gpu?.requestAdapter();
  const device = await adapter?.requestDevice();
  if (!device) console.error("need a browser that supports WebGPU");
  return new WebGPU(device);
}
