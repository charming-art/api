// TODO
export function triangle() {
  return ({data = [0], ...rest} = {}) => {
    const I = Array.from({length: data.length}, (_, i) => i);
    return {
      ...rest,
      data,
      I,
      transform: (renderer, I, value) => renderer.triangle(I, value),
    };
  };
}
