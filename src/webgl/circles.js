import { range } from "../array/range.js";
import { normalizeColor } from "../color.js";

export const vertex = `
  attribute vec2 a_vertex;
  attribute vec2 a_center;
  attribute float a_radius;
  attribute vec4 a_color;
  uniform vec2 u_resolution;
  varying vec4 v_color;
  void main() {
    vec2 xy = a_center + a_vertex * a_radius;
    vec2 scale = xy / u_resolution;
    vec2 clipSpace = scale * 2.0 - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    v_color = a_color;
  }
`;

export const fragment = `
  precision mediump float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
`;

export function webgl$circles(I, value) {
  const { _gl: gl, _circle: program } = this;
  gl.useProgram(program);
  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE);
  gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);

  const ext = gl.getExtension("ANGLE_instanced_arrays");
  const { count = 100, x: X, y: Y, r: R, stroke: S, strokeOpacity: SO } = value;

  const vertexLoc = gl.getAttribLocation(program, "a_vertex");
  const centerLoc = gl.getAttribLocation(program, "a_center");
  const radiusLoc = gl.getAttribLocation(program, "a_radius");
  const colorLoc = gl.getAttribLocation(program, "a_color");
  const resolutionLoc = gl.getUniformLocation(program, "u_resolution");

  const vertices = range(count, 0, Math.PI * 2).flatMap((i) => [Math.cos(i), Math.sin(i)]);
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.vertexAttribPointer(vertexLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexLoc);

  const centers = I.flatMap((i) => [X[i], Y[i]]);
  const centerBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, centerBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(centers), gl.STATIC_DRAW);
  gl.vertexAttribPointer(centerLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(centerLoc);
  ext.vertexAttribDivisorANGLE(centerLoc, 1);

  const radius = I.map((i) => R[i]);
  const radiusBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, radiusBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(radius), gl.STATIC_DRAW);
  gl.vertexAttribPointer(radiusLoc, 1, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(radiusLoc);
  ext.vertexAttribDivisorANGLE(radiusLoc, 1);

  const colors = I.flatMap((i) => normalizeColor(S[i], SO[i]));

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW);
  gl.vertexAttribPointer(colorLoc, 4, gl.UNSIGNED_BYTE, true, 0, 0);
  gl.enableVertexAttribArray(colorLoc);
  ext.vertexAttribDivisorANGLE(colorLoc, 1);

  gl.uniform2f(resolutionLoc, gl.canvas.width / devicePixelRatio, gl.canvas.height / devicePixelRatio);

  ext.drawArraysInstancedANGLE(gl.LINE_LOOP, 0, count, I.length);
}
