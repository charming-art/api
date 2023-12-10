import { vertex as triangleVertex, fragment as triangleFragment } from "./triangles.js";
import { contextGL } from "../context.js";

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const succuss = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (succuss) return shader;
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function compileProgram(gl, vertexSource, fragmentSource) {
  // Create GLSL shaders, upload the GLSL source, compile the shaders.
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  // Link the two shaders into a program.
  return createProgram(gl, vertexShader, fragmentShader);
}

export function webgl$init({ width, height, dpi = null }) {
  const gl = contextGL(width, height, dpi);
  const triangle = compileProgram(gl, triangleVertex, triangleFragment);
  Object.assign(this._props, { width, height });
  Object.assign(this, { _gl: gl, _triangle: triangle });
  return this;
}
