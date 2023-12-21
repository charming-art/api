import { normalizeColor } from "../color.js";
import {
  getProgram,
  hasGLSLAttribute,
  bindAttribute,
  bindUniform,
  defineGlobalAttributes,
  defineLocalAttributes,
  bindVariables,
  defineFunctionAttribute,
} from "./program.js";

function createVertexShaderSource(descriptors, value) {
  const { fill } = value;
  const [fillVarying, fillAssignment] = Array.isArray(fill) ? ["varying vec4 v_fill;", " v_fill = _fill;"] : ["", ""];
  return `
    ${defineGlobalAttributes(descriptors, value)}
    attribute vec2 a_vertex;
    attribute float a_datum;
    uniform vec2 u_resolution;
    ${fillVarying}
    void main() {
      ${defineLocalAttributes(descriptors, value)}
      // Use computed attributes
      vec2 xy = vec2(_x, _y) + a_vertex * vec2(_width, _height);
      vec2 scale = xy / u_resolution;
      vec2 clipSpace = scale * 2.0 - 1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      ${fillAssignment}
    }
  `;
}

function createFragmentShaderSource(descriptors, value) {
  const newDescriptors = {
    ...descriptors,
    fill: { ...descriptors.fill, onlyUniform: false },
  };
  const { fill } = value;
  const globalFill = fill ? defineFunctionAttribute(newDescriptors, ["fill", fill]) : "varying vec4 v_fill;";
  const fragColor = fill ? `fill(gl_FragCoord.xy, gl_FragColor)` : "v_fill";
  return `
    precision mediump float;
    ${globalFill}
    void main() {
      gl_FragColor = ${fragColor};
    }
  `;
}

const attributes = {
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
    onlyUniform: true,
  },
};

export function webgl$rects(I, value, data) {
  const { _gl: gl, _circle: map } = this;
  const { x, y, width, height, fill } = value;
  const vertexVariables = { x, y, width, height, fill };
  const fragmentVariables = { ...(!Array.isArray(fill) && { fill }) };
  const vertex = createVertexShaderSource(attributes, vertexVariables);
  const fragment = createFragmentShaderSource(attributes, fragmentVariables);
  const program = getProgram(gl, map, vertex, fragment);

  gl.useProgram(program);
  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE);
  gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);

  const ext = gl.getExtension("ANGLE_instanced_arrays");

  if (hasGLSLAttribute(value, attributes)) {
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

  bindVariables(gl, program, ext, attributes, vertexVariables);

  ext.drawArraysInstancedANGLE(gl.TRIANGLE_STRIP, 0, 4, I.length);
}
