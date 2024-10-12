import {canvas} from "./canvas/index.js";

export function render({width = 640, height = 480, renderer = canvas(), setup} = {}) {
  renderer.init({width, height});
  const data = setup();
  const datalist = (Array.isArray(data) ? data : [data]).flat(Infinity);
  for (const flow of datalist) {
    const {transform, I, ...value} = flow;
    transform(renderer, I, value);
  }
  return renderer.node();
}
