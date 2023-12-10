import { webgl$node } from "./node.js";
import { webgl$init } from "./init.js";
import { webgl$triangles } from "./triangles.js";

function WebGL() {
  Object.defineProperties(this, {
    _gl: { value: null, writable: true },
    _triangle: { value: null, writable: true },
    _props: { value: {}, writable: true },
  });
}

Object.defineProperties(WebGL.prototype, {
  node: { value: webgl$node },
  init: { value: webgl$init },
  triangles: { value: webgl$triangles },
});

export function webgl(options) {
  return new WebGL(options);
}
