import { define } from "./define.js";

export const clear = define((renderer, I, value) => {
  const { fill: F = [] } = value;
  for (const i of I) renderer.clear({ fill: F[i] });
});
