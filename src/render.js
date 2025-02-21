import {set} from "./set.js";
import {ticker} from "./ticker.js";

// TODO: Diffing algorithm
function patch(node, prev, current) {
  const childList = [];
  for (const collection of current) {
    const vdoms = collection._vdoms;
    const nodes = collection._nodes;
    const children = collection._children;
    for (let i = 0; i < vdoms.length; i++) {
      const vdom = vdoms[i];
      const {name, props, svg, decorators} = vdom;
      const child = svg ? document.createElementNS("http://www.w3.org/2000/svg", name) : document.createElement(name);
      set(child, props);
      for (const {type, props} of decorators) type(child, props);
      childList.push(child);
      nodes.push(child);
      patch(child, null, children[i]);
    }
  }
  node.replaceChildren(...childList);
}

export function render(options) {
  const {draw, frameRate, ...rest} = options;

  const tick = ticker();
  const style = {};
  const handler = {};

  for (const [key, value] of Object.entries(rest)) {
    if (key.startsWith("on")) handler[key] = value;
    else style[key] = value;
  }

  for (const key in handler) tick.on(key.slice(2).toLowerCase(), handler[key]);

  const node = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  set(node, style);

  if (typeof draw === "function") {
    let prev = null;
    tick.on(
      "animate",
      ({elapsed, frameCount}) => {
        const shape = draw({elapsed, frameCount, node});
        const current = [shape].flat(Infinity);
        patch(node, prev, current);
        prev = current;
      },
      {frameRate},
    );
  } else {
    const shapes = [draw].flat(Infinity);
    patch(node, null, shapes);
  }

  return Object.assign(node, {
    dispose: () => tick.dispose(),
  });
}
