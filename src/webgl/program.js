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

export function getProgram(gl, map, vertex, fragment) {
  const key = vertex + fragment;
  if (map.has(key)) return map.get(key);
  const program = compileProgram(gl, vertex, fragment);
  map.set(key, program);
  return program;
}

export function compileProgram(gl, vertexSource, fragmentSource) {
  // Create GLSL shaders, upload the GLSL source, compile the shaders.
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  // Link the two shaders into a program.
  return createProgram(gl, vertexShader, fragmentShader);
}
