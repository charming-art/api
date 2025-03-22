import {setAttribute} from "./set.js";
import {ticker} from "./ticker.js";

export const drawRef = {current: null};

const isFunction = (x) => typeof x === "function";

const wrapSVG = (current) => {
  if (current.length === 1 && current[0]._tag === "svg:svg") return false;
  return current.every((mark) => mark._tag.startsWith("svg:"));
};

// Assume the structure is not going to change for now.
function patch(parent, prev, current, context) {
  let mark;
  const m = current.length;
  const update = new Array(m);
  for (let i = 0; i < m; i++) {
    update[i] = (mark = prev[i]) ? ((mark._update = current[i]), mark) : (mark = current[i]);
    mark._next = prev[i + 1] || null;
    const [parents, prevNodes, childNodes] = mark.patch(parent, context);
    for (let j = 0; j < parents.length; j++) {
      const prev = patch(parents[j], prevNodes[j] || [], childNodes[j], context);
      prevNodes[j] = prev;
    }
    mark._nodesChildren = prevNodes;
  }
  return update;
}

export function render({draw = [], loop = false, frameRate, use = {}, ...rest} = {}) {
  const tick = ticker();
  const handler = {};
  const style = {};

  for (const [key, value] of Object.entries(rest)) {
    if (key.startsWith("on")) handler[key] = value;
    else style[key] = value;
  }

  for (const key in handler) tick.on(key.slice(2).toLowerCase(), handler[key]);

  let node;
  let prev = [];
  const context = {width: rest.width, height: rest.height, use, root: () => node};
  const next = (options) => {
    const current = [isFunction(draw) ? draw(options) : draw].flat();
    if (!node) {
      node = wrapSVG(current)
        ? document.createElementNS("http://www.w3.org/2000/svg", "svg")
        : document.createElement("span");
      for (const [k, v] of Object.entries(style)) setAttribute(node, k, v);
    }
    prev = patch(node, prev, current, context);
  };

  if (!loop) {
    drawRef.current = next;
    next({frameCount: 1, time: 0});
    drawRef.current = null;
  } else {
    next({frameCount: 1, time: 0});
    tick.on("animate", next, {frameRate});
  }

  return {node, dispose: () => tick.dispose()};
}
