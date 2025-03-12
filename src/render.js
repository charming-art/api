import {set} from "./set.js";
import {ticker} from "./ticker.js";

const isFunction = (x) => typeof x === "function";

// TODO: Diffing algorithm
function patch(node, prev, current) {
  const childList = [];

  for (const mark of current) {
    const data = mark._data;
    const options = mark._options;
    const children = mark._children;
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const {decorators = [], ...props} = options;
      const nodeProps = {};
      for (const [k, v] of Object.entries(props)) {
        if (k.startsWith("on")) nodeProps[k] = (e) => v(e, d, i, data);
        else nodeProps[k] = isFunction(v) ? v(d, i, data) : v;
      }
      const child = mark.create(nodeProps);
      const nodeChildren = children.flatMap((c) => (isFunction(c) ? c(d, i, data) : c));
      for (const decorator of decorators) {
        const {type, ...decoratorProps} = isFunction(decorator) ? decorator(d, i, data) : decorator;
        type(child, decoratorProps);
      }
      childList.push(child);
      patch(child, null, nodeChildren);
    }
  }

  // Text node without children should not be replaced, because it will lose its textContent.
  if (node.nodeName !== "text" || childList.length) node.replaceChildren(...childList);
}

function noSVG(current) {
  return current.length !== 1 || current[0]._tag !== "svg";
}

export const drawRef = {current: null};

export function render(options) {
  const {draw, loop = false, frameRate, ...rest} = options;

  const tick = ticker();
  const style = {};
  const handler = {};

  for (const [key, value] of Object.entries(rest)) {
    if (key.startsWith("onGlobal")) handler[key] = value;
    else style[key] = value;
  }

  for (const key in handler) tick.on(key.slice(8).toLowerCase(), handler[key]);

  let prev, node;
  const next = (options) => {
    const current = isFunction(draw) ? draw(options) : draw;
    if (!node) {
      node = noSVG(current)
        ? document.createElementNS("http://www.w3.org/2000/svg", "svg")
        : document.createElement("span");
      set(node, style);
    }
    patch(node, prev, current);
    prev = current;
  };

  if (!loop) {
    drawRef.current = next;
    next({frameCount: 1, time: 0});
    drawRef.current = null;
  } else {
    next({frameCount: 1, time: 0});
    tick.on("animate", (options) => next(options), {frameRate});
  }

  return {node, disposer: () => tick.dispose()};
}
