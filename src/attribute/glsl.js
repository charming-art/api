export function glsl(strings, ...params) {
  return {
    preserve: true,
    strings,
    params,
  };
}
