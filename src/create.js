import {setAttribute} from "./set.js";
import {ticker} from "./ticker.js";
import {Renderer} from "./renderer.js";

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
    const [parents, childNodes] = mark.patch(parent, context);
    const prevNodes = mark._nodesChildren || [];
    for (let j = 0; j < parents.length; j++) {
      const prev = patch(parents[j], prevNodes[j] || [], childNodes[j], context);
      prevNodes[j] = prev;
    }
    mark._nodesChildren = prevNodes;
  }
  return update;
}

export function create(dom, options) {
  if (arguments.length === 1) (options = dom), (dom = null);

  let prev = [];
  let node;

  const {loop = false, frameRate, renderer = new Renderer(), use = {}, width, height, ...rest} = options ?? {};
  const context = {width, height, use, renderer, root: () => node};
  const rootAttrs = {width, height, ...rest};
  const tick = ticker();
  const root = {render, on, dispose};

  function render(mark = []) {
    if (!loop) {
      drawRef.current = next;
      next({frameCount: 0, time: 0});
      drawRef.current = null;
    } else {
      next({frameCount: 0, time: 0});
      tick.on("animate", next, {frameRate});
    }

    function next(options) {
      const current = [isFunction(mark) ? mark(options) : mark].flat();
      if (!node) {
        node = wrapSVG(current)
          ? document.createElementNS("http://www.w3.org/2000/svg", "svg")
          : document.createElement("span");
        for (const [k, v] of Object.entries(rootAttrs)) v !== undefined && setAttribute(node, k, v);
      }
      prev = patch(node, prev, current, context);
    }

    if (dom) dom.appendChild(node);

    return dom ?? node;
  }

  function on(name, callback) {
    tick.on(name, callback);
  }

  function dispose() {
    tick.dispose();
  }

  return root;
}
