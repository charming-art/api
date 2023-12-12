import { webgl$node } from "./node.js";
import { webgl$init } from "./init.js";
import { webgl$clear } from "./clear.js";
import { webgl$triangles } from "./triangles.js";
import { webgl$circles } from "./circles.js";

function WebGL() {
  Object.defineProperties(this, {
    _gl: { value: null, writable: true },
    _triangle: { value: new Map() },
    _circle: { value: new Map() },
    _props: { value: {}, writable: true },
  });
}

Object.defineProperties(WebGL.prototype, {
  node: { value: webgl$node },
  init: { value: webgl$init },
  triangles: { value: webgl$triangles },
  circles: { value: webgl$circles },
  clear: { value: webgl$clear },
});

export function webgl(options) {
  return new WebGL(options);
}
