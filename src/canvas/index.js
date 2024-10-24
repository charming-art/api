import {canvas_circle} from "./circle.js";
import {canvas_background} from "./background.js";
import {canvas_init} from "./init.js";
import {canvas_node} from "./node.js";
import {canvas_attr} from "./attr.js";

function Canvas() {
  Object.defineProperties(this, {
    _ctx: {value: null, writable: true},
    _attrs: {value: {}},
  });
}

Object.defineProperties(Canvas.prototype, {
  circle: {value: canvas_circle},
  background: {value: canvas_background},
  init: {value: canvas_init},
  attr: {value: canvas_attr},
  node: {value: canvas_node},
});

export function canvas() {
  return new Canvas();
}
