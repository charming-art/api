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
    uniform vec2 u_resolution;
    void main() {
      vec2 scale = a_position / u_resolution;
      vec2 clipSpace = scale * 2.0 - 1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
  `;

  // Source for our GLSL fragment shader.
  const fragmentSource = `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1, 0, 0.5, 1);
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

  // Look up where the vertex data needs to go.
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // Look up uniform locations.
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution"
  );

  // Create a buffer and put three 2d clip space points in it.
  const positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer).
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const { x: X, y: Y, x1: X1, y1: Y1, x2: X2, y2: Y2 } = value;

  const positions = I.flatMap((i) => [X[i], Y[i], X1[i], Y1[i], X2[i], Y2[i]]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Turn on the attribute.
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // the data is 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  // Set the resolution.
  gl.uniform2f(
    resolutionUniformLocation,
    gl.canvas.width / devicePixelRatio,
    gl.canvas.height / devicePixelRatio
  );

  // draw
  const primitiveType = gl.TRIANGLES;
  const count = I.length * 3;
  gl.drawArrays(primitiveType, offset, count);
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
