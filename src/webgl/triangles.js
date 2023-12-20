import { color as d3Color } from "d3-color";
import { getProgram } from "./program";

function createVertexShaderSource() {
  return `
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
}

function createFragmentShaderSource() {
  return `
    precision mediump float;
    varying vec4 v_color;
    void main() {
      gl_FragColor = v_color;
    }
  `;
}

export function webgl$triangles(I, value) {
  const { _gl: gl, _triangle: map } = this;

  const program = getProgram(gl, map, createVertexShaderSource(), createFragmentShaderSource());

  gl.useProgram(program);

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
  gl.uniform2f(resolutionLocation, gl.canvas.width / devicePixelRatio, gl.canvas.height / devicePixelRatio);

  // Render.
  gl.drawArrays(gl.TRIANGLES, 0, I.length * 3);
}
