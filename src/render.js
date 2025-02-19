import {SVG} from "./dom.js";
import {ticker} from "./ticker.js";

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

  const node = SVG.svg(style);

  if (typeof draw === "function") {
    tick.on(
      "animate",
      ({elapsed, frameCount}) => {
        const shape = draw({elapsed, frameCount, node});
        const shapes = [shape].flat(Infinity);
        // TODO: Diff shapes.
        node.replaceChildren(...shapes);
      },
      {frameRate},
    );
  } else {
    const shapes = [draw].flat(Infinity);
    node.replaceChildren(...shapes);
  }

  return Object.assign(node, {
    dispose: () => tick.dispose(),
  });
}
