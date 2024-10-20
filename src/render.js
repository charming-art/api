import {canvas} from "./canvas/index.js";

function renderFlow(renderer, flow) {
  const shape = flow();
  const shapes = (Array.isArray(shape) ? shape : [shape]).flat(Infinity);
  for (const data of shapes) {
    const {transform, I, ...value} = data;
    transform(renderer, I, value);
  }
}

export function render({width = 640, height = 480, renderer = canvas(), setup, loop} = {}) {
  renderer.init({width, height});
  const node = renderer.node();
  if (setup) renderFlow(renderer, setup);
  if (loop) {
    let observer;
    const id = setInterval(() => {
      renderFlow(renderer, loop());
      if (node.parentNode && !observer) {
        const parent = node.parentNode;
        observer = new MutationObserver(() => {
          if (!parent.contains(node)) {
            clearInterval(id);
            observer.disconnect();
          }
        });
        observer.observe(parent, {childList: true});
      }
    }, 1000 / 60);
  }
  return node;
}
