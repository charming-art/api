import {setAttribute} from "./set.js";
import {ticker} from "./ticker.js";

export const drawRef = {current: null};

const isFunction = (x) => typeof x === "function";

const noSVG = (current) => current.length !== 1 || current[0]._tag !== "svg";

// Assume the structure is not going to change for now.
function patch(parent, prev, current) {
  let mark;
  const m = current.length;
  const next = new Array(m);
  for (let i = 0; i < m; i++) {
    next[i] = (mark = prev[i]) ? ((mark._update = current[i]), mark) : (mark = current[i]);
    const [parents, prevNodes, childNodes] = mark.render(parent);
    for (let j = 0; j < parents.length; j++) {
      patch(parents[j], prevNodes[j], childNodes[j]);
    }
  }
  return next;
}

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

  let node;
  let prev = [];
  const next = (options) => {
    const current = isFunction(draw) ? draw(options) : draw;
    if (!node) {
      node = noSVG(current)
        ? document.createElementNS("http://www.w3.org/2000/svg", "svg")
        : document.createElement("span");
      for (const [k, v] of Object.entries(style)) setAttribute(node, k, v);
    }
    prev = patch(node, prev, current);
  };

  if (!loop) {
    drawRef.current = next;
    next();
    drawRef.current = null;
  } else {
    next({frameCount: 1, time: 0});
    tick.on("animate", (options) => next(options), {frameRate});
  }

  return {node, disposer: () => tick.dispose()};
}
