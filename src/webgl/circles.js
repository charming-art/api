import { range } from "../array/range.js";
import { normalizeColor } from "../color.js";
import {
  getProgram,
  hasGLSLAttribute,
  bindAttribute,
  bindUniform,
  variable,
  defineGlobalAttributes,
  defineLocalAttributes,
} from "./program.js";

function createVertexShaderSource(descriptors, value) {
  const { position, strokeOpacity } = value;
  const xy = position ? "_position + a_vertex * _r" : "vec2(_x, _y) + a_vertex * _r";
  const so = strokeOpacity ? "_strokeOpacity" : "1.0";
  return `
    ${defineGlobalAttributes(descriptors, value)}
    attribute vec2 a_vertex;
    attribute float a_datum;
    uniform vec2 u_resolution;
    varying vec4 v_stroke;
    void main() {
      ${defineLocalAttributes(descriptors, value)}
      // Use computed attributes
      vec2 xy = ${xy};
      vec2 scale = xy / u_resolution;
      vec2 clipSpace = scale * 2.0 - 1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      v_stroke = vec4(_stroke.r, _stroke.g, _stroke.b, ${so});
    }
  `;
}

function createFragmentShaderSource() {
  return `
    precision mediump float;
    varying vec4 v_stroke;
    void main() {
      gl_FragColor = v_stroke;
    }
  `;
}

const attributeDescriptors = {
  x: { type: "float", size: 1, glType: "FLOAT", normalize: false, map: (value) => new Float32Array(value) },
  y: { type: "float", size: 1, glType: "FLOAT", normalize: false, map: (value) => new Float32Array(value) },
  position: { type: "vec2", size: 2, glType: "FLOAT", map: (value) => new Float32Array(value) },
  stroke: {
    type: "vec4",
    size: 4,
    glType: "UNSIGNED_BYTE",
    normalize: true,
    map: (value) => new Uint8Array(value.flatMap(normalizeColor)),
  },
  strokeOpacity: {
    type: "float",
    glType: "UNSIGNED_BYTE",
    normalize: true,
    map: (value) => new Uint8Array(value.map((d) => (d * 255) | 0)),
  },
  r: { type: "float", size: 1, glType: "FLOAT", map: (value) => new Float32Array(value), normalize: false },
};

export function webgl$circles(I, value, data) {
  const { _gl: gl, _circle: map } = this;
  const { count = 100, ...rest } = value;
  const vertex = createVertexShaderSource(attributeDescriptors, rest);
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
    data: new Float32Array(range(count, 0, Math.PI * 2).flatMap((i) => [Math.cos(i), Math.sin(i)])),
  });
  bindUniform(gl, program, {
    name: "u_resolution",
    data: [gl.canvas.width / devicePixelRatio, gl.canvas.height / devicePixelRatio],
  });

  for (const [key, value] of Object.entries(rest)) {
    if (Array.isArray(value)) {
      const { size, glType, normalize, map } = attributeDescriptors[key];
      const data = map(value);
      const name = `_${key}`;
      bindAttribute(gl, program, ext, { name, data, size, type: gl[glType], normalize, divisor: 1 });
    } else {
      const { params } = value;
      const uniforms = params.map((d, j) => ({ name: variable(key, j), data: [d] }));
      for (const { name, data } of uniforms) bindUniform(gl, program, { name, data });
    }
  }

  ext.drawArraysInstancedANGLE(gl.LINE_LOOP, 0, count, I.length);
}
