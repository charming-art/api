import {set} from "./set.js";
import {ticker} from "./ticker.js";

const isFunction = (x) => typeof x === "function";

// TODO: Diffing algorithm
function patch(node, prev, current) {
  const childList = [];
  for (const collection of current) {
    const svg = collection._svg;
    const tag = collection._tag;
    const data = collection._data;
    const options = collection._options;
    const children = collection._children;
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const child = svg ? document.createElementNS("http://www.w3.org/2000/svg", tag) : document.createElement(tag);
      const {decorators = [], ...props} = options;
      const nodeProps = {};
      for (const [k, v] of Object.entries(props)) {
        if (k.startsWith("on")) nodeProps[k] = (e) => v(e, d, i, data);
        else nodeProps[k] = isFunction(v) ? v(d, i, data) : v;
      }
      const nodeChildren = children.flatMap((c) => (isFunction(c) ? c(d, i, data) : c));
      set(child, nodeProps);
      for (const decorator of decorators) {
        const {type, ...decoratorProps} = isFunction(decorator) ? decorator(d, i, data) : decorator;
        type(child, decoratorProps);
      }
      childList.push(child);
      patch(child, null, nodeChildren);
    }
  }
  node.replaceChildren(...childList);
}

export const drawRef = {current: null};

export function render(options) {
  const {draw, loop = false, frameRate, ...rest} = options;

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

  let prev = null;
  const next = (options) => {
    const current = isFunction(draw) ? draw(options) : draw;
    patch(node, prev, current);
    prev = current;
  };

  if (!loop) {
    drawRef.current = next;
    next({});
    drawRef.current = null;
  } else {
    tick.on("animate", (options) => next(options), {frameRate});
  }

  return {
    dispose: () => tick.dispose(),
    node: () => node,
  };
}
