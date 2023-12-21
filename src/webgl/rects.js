import { normalizeColor } from "../color.js";
import {
  getProgram,
  hasGLSLAttribute,
  bindAttribute,
  bindUniform,
  defineGlobalAttributes,
  defineLocalAttributes,
  bindVariables,
} from "./program.js";

function createVertexShaderSource(descriptors, value) {
  return `
    ${defineGlobalAttributes(descriptors, value)}
    attribute vec2 a_vertex;
    attribute float a_datum;
    uniform vec2 u_resolution;
    varying vec4 v_fill;
    void main() {
      ${defineLocalAttributes(descriptors, value)}
      // Use computed attributes
      vec2 xy = vec2(_x, _y) + a_vertex * vec2(_width, _height);
      vec2 scale = xy / u_resolution;
      vec2 clipSpace = scale * 2.0 - 1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      v_fill = _fill;
    }
  `;
}

function createFragmentShaderSource() {
  return `
    precision mediump float;
    varying vec4 v_fill;
    void main() {
      gl_FragColor = v_fill;
    }
  `;
}

const attributeDescriptors = {
  x: { type: "float", size: 1, glType: "FLOAT", normalize: false, map: (value) => new Float32Array(value) },
  y: { type: "float", size: 1, glType: "FLOAT", normalize: false, map: (value) => new Float32Array(value) },
  width: { type: "float", size: 1, glType: "FLOAT", normalize: false, map: (value) => new Float32Array(value) },
  height: { type: "float", size: 1, glType: "FLOAT", normalize: false, map: (value) => new Float32Array(value) },
  fill: {
    type: "vec4",
    size: 4,
    glType: "UNSIGNED_BYTE",
    normalize: true,
    map: (value) => new Uint8Array(value.flatMap((d) => normalizeColor(d))),
  },
};

export function webgl$rects(I, value, data) {
  const { _gl: gl, _circle: map } = this;
  const { x, y, width, height, fill } = value;
  const accepts = { x, y, width, height, fill };
  const vertex = createVertexShaderSource(attributeDescriptors, accepts);
  const fragment = createFragmentShaderSource();
  const program = getProgram(gl, map, vertex, fragment);

  gl.useProgram(program);
  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE);
  gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);

  const ext = gl.getExtension("ANGLE_instanced_arrays");

  if (hasGLSLAttribute(value)) {
    bindAttribute(gl, program, ext, {
      name: "a_datum",
      data: new Float32Array(data),
      divisor: 1,
    });
  }

  bindAttribute(gl, program, ext, {
    name: "a_vertex",
    size: 2,
    divisor: 0,
    data: new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
  });

  bindUniform(gl, program, {
    name: "u_resolution",
    data: [gl.canvas.width / devicePixelRatio, gl.canvas.height / devicePixelRatio],
  });

  bindVariables(gl, program, ext, attributeDescriptors, accepts);

  ext.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, 4, I.length);
}
