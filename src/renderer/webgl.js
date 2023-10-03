import { color as d3Color } from "d3-color";

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

function compileProgram(gl) {
  // Sources for our GLSL vertex shader.
  const vertexSource = `
    attribute vec2 a_position;
    attribute vec4 a_color;
    uniform vec2 u_resolution;
    varying vec4 v_color;
    void main() {
      vec2 scale = a_position / u_resolution;
      vec2 clipSpace = scale * 2.0 - 1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      v_color = a_color;
    }
  `;

  // Source for our GLSL fragment shader.
  const fragmentSource = `
    precision mediump float;
    varying vec4 v_color;
    void main() {
      gl_FragColor = v_color;
    }
  `;

  // Create GLSL shaders, upload the GLSL source, compile the shaders.
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  // Link the two shaders into a program.
  return createProgram(gl, vertexShader, fragmentShader);
}

function webgl$size(width, height, dpi = null) {
  if (dpi == null) dpi = devicePixelRatio;
  this._width = width;
  this._height = height;
  const { _canvas: canvas, _gl: gl } = this;
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  gl.viewport(0, 0, width * dpi, height * dpi);
}

function webgl$triangles(I, value) {
  const { _gl: gl, _program: program } = this;

  const { x: X, y: Y, x1: X1, y1: Y1, x2: X2, y2: Y2, fill: F = [] } = value;

  // Pass vertexes to position buffer.
  const positions = I.flatMap((i) => [X[i], Y[i], X1[i], Y1[i], X2[i], Y2[i]]);
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Pass colors to color buffer.
  const colors = I.flatMap((i) => {
    const fill = F[i];
    const { r, g, b, opacity } = d3Color(fill).rgb();
    const o = 255 * opacity;
    return [r, g, b, o, r, g, b, o, r, g, b, o];
  });
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(colors), gl.STATIC_DRAW);

  // Extract data from position buffer to attribute position.
  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Extract data from color buffer to attribute color.
  const colorLocation = gl.getAttribLocation(program, "a_color");
  gl.enableVertexAttribArray(colorLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(colorLocation, 4, gl.UNSIGNED_BYTE, true, 0, 0);

  // Set the resolution.
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  gl.uniform2f(
    resolutionLocation,
    gl.canvas.width / devicePixelRatio,
    gl.canvas.height / devicePixelRatio
  );

  // Render.
  gl.drawArrays(gl.TRIANGLES, 0, I.length * 3);
}

function webgl$node() {
  return this._canvas;
}

function webgl$width() {
  return this._width;
}

function webgl$height() {
  return this._height;
}

function WebGL({ document = window.document } = {}) {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  const program = compileProgram(gl);
  // Tell it to use our program (pair of shaders).
  gl.useProgram(program);
  Object.defineProperties(this, {
    _canvas: { value: canvas },
    _gl: { value: gl },
    _program: { value: program },
    _width: { value: 0, writable: true },
    _height: { value: 0, writable: true },
  });
}

Object.defineProperties(WebGL.prototype, {
  node: { value: webgl$node },
  width: { value: webgl$width },
  height: { value: webgl$height },
  size: { value: webgl$size },
  triangles: { value: webgl$triangles },
});

export function webgl(options) {
  return new WebGL(options);
}
