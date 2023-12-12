export function glsl(strings, ...params) {
  return {
    extract: false,
    strings,
    params,
  };
}
