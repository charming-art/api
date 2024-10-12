import {canvas_circle} from "./circle.js";
import {canvas_background} from "./background.js";
import {canvas_init} from "./init.js";
import {canvas_node} from "./node.js";

function Canvas() {
  Object.defineProperties(this, {
    _ctx: {value: null, writable: true},
  });
}

Object.defineProperties(Canvas.prototype, {
  circle: {value: canvas_circle},
  background: {value: canvas_background},
  init: {value: canvas_init},
  node: {value: canvas_node},
});

export function canvas() {
  return new Canvas();
}
