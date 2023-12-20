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
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  return createProgram(gl, vertexShader, fragmentShader);
}

export function uniformName(key, j) {
  return `_${key}_${j}`;
}

export function attributeName(key) {
  return `_${key}`;
}

export function bindAttribute(
  gl,
  program,
  ext,
  { name, data, size = 1, divisor = 0, normalize = false, stride = 0, offset = 0, type = gl.FLOAT },
) {
  const loc = gl.getAttribLocation(program, name);
  const radiusBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, radiusBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  gl.vertexAttribPointer(loc, size, type, normalize, stride, offset);
  gl.enableVertexAttribArray(loc);
  ext.vertexAttribDivisorANGLE(loc, divisor);
}

export function bindUniform(gl, program, { name, data }) {
  const resolutionLoc = gl.getUniformLocation(program, name);
  if (data.length === 1) gl.uniform1f(resolutionLoc, ...data);
  if (data.length === 2) gl.uniform2f(resolutionLoc, ...data);
}

export function bindVariables(gl, program, ext, descriptors, values) {
  for (const [key, value] of Object.entries(values)) {
    if (Array.isArray(value)) {
      const { size, glType, normalize, map } = descriptors[key];
      const data = map(value);
      const name = attributeName(key);
      bindAttribute(gl, program, ext, { name, data, size, type: gl[glType], normalize, divisor: 1 });
    } else {
      const { params } = value;
      const uniforms = params.map((d, j) => ({ name: uniformName(key, j), data: [d] }));
      for (const { name, data } of uniforms) bindUniform(gl, program, { name, data });
    }
  }
}

export function hasGLSLAttribute(value) {
  return Object.values(value).some((d) => !Array.isArray(d));
}

export function defineFunctionAttribute(descriptors, attribute) {
  const [key, value] = attribute;
  const { strings, params } = value;
  const uniforms = params.map((_, j) => `uniform float ${uniformName(key, j)};`).join("\n");
  let _ = uniforms + "\n" + strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    _ += uniformName(key, i - 1) + strings[i];
  }
  return _;
}

export function defineArrayAttribute(descriptors, attribute) {
  const [key] = attribute;
  const descriptor = descriptors[key];
  if (!descriptor) throw new Error(`Unknown attribute: ${key}`);
  return `attribute ${descriptor.type} ${attributeName(key)};`;
}

export function defineComputeAttribute(descriptors, attribute) {
  const [key] = attribute;
  const descriptor = descriptors[key];
  if (!descriptor) throw new Error(`Unknown attribute: ${key}`);
  return `${descriptor.type} ${attributeName(key)} = ${key}(a_datum);`;
}

export function defineAttribute(descriptors, attribute) {
  const [, value] = attribute;
  if (Array.isArray(value)) return defineArrayAttribute(descriptors, attribute);
  else return defineFunctionAttribute(descriptors, attribute);
}

export function defineGlobalAttributes(descriptors, value) {
  const values = Object.entries(value).map((d) => defineAttribute(descriptors, d));
  return values.join("\n");
}

export function defineLocalAttributes(descriptors, value) {
  const computes = Object.entries(value)
    .filter(([, value]) => !Array.isArray(value))
    .map((d) => defineComputeAttribute(descriptors, d));
  return computes.join("\n");
}
