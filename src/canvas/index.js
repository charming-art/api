import { canvas$init } from "./init.js";
import { canvas$node } from "./node.js";
import { canvas$circle } from "./circle.js";
import { canvas$rect } from "./rect.js";
import { canvas$line } from "./line.js";
import { canvas$triangle } from "./triangle";
import { canvas$translate } from "./translate.js";
import { canvas$path } from "./path.js";
import { canvas$polygon } from "./polygon.js";
import { canvas$text } from "./text.js";
import { canvas$clear } from "./clear.js";
import { canvas$mousemove } from "./mousemove.js";
import { canvas$mouseup } from "./mouseup.js";
import { canvas$mousedown } from "./mousedown.js";
import { canvas$mouseclick } from "./mouseclick.js";
import { canvas$rotate } from "./rotate.js";
import { canvas$save } from "./save.js";
import { canvas$restore } from "./restore.js";
import { canvas$textBBox } from "./textBBox.js";

function Canvas() {
  Object.defineProperties(this, {
    _context: { value: null, writable: true },
    _props: { value: {}, writable: true },
    _mousemove: { value: null, writable: true },
    _mousedown: { value: null, writable: true },
    _mouseup: { value: null, writable: true },
  });
}

Object.defineProperties(Canvas.prototype, {
  init: { value: canvas$init },
  node: { value: canvas$node },
  circle: { value: canvas$circle },
  rect: { value: canvas$rect },
  line: { value: canvas$line },
  triangle: { value: canvas$triangle },
  path: { value: canvas$path },
  polygon: { value: canvas$polygon },
  text: { value: canvas$text },
  clear: { value: canvas$clear },
  mousemove: { value: canvas$mousemove },
  mouseup: { value: canvas$mouseup },
  mousedown: { value: canvas$mousedown },
  mouseclick: { value: canvas$mouseclick },
  translate: { value: canvas$translate },
  rotate: { value: canvas$rotate },
  save: { value: canvas$save },
  restore: { value: canvas$restore },
  textBBox: { value: canvas$textBBox },
});

export function canvas(options) {
  return new Canvas(options);
}
