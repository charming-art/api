import { app$data } from "./data.js";
import { app$datum } from "./datum.js";
import { app$frame } from "./frame.js";
import { app$height } from "./height.js";
import { app$node } from "./node.js";
import { app$render } from "./render.js";
import { app$start } from "./start.js";
import { app$stop } from "./stop.js";
import { app$width } from "./width.js";
import { app$shape } from "./shape.js";
import { app$call } from "./call.js";
import { app$mouseX, app$mouseY } from "./mouse.js";
import { app$dispose } from "./dispose.js";
import { app$frameCount } from "./frameCount.js";
import { canvas } from "../renderer/canvas.js";

function App({
  width = 640,
  height = 480,
  renderer = canvas(),
  frameRate = 60,
  dpi = null,
} = {}) {
  Object.defineProperties(this, {
    _renderer: { value: renderer },
    _data: { value: [], writable: true },
    _stop: { value: false, writable: true },
    _reschedule: { value: true, writable: true },
    _frame: { value: [], writable: true },
    _frameRate: { value: frameRate, writable: true },
    _frameCount: { value: 0, writable: true },
    _timer: { value: null, writable: true },
    _mouseX: { value: 0, writable: true },
    _mouseY: { value: 0, writable: true },
    _dispose: { value: () => {}, writable: true },
  });
  this._renderer
    .size(width, height, dpi) // Update size.
    .mousemove((e) => {
      const { x, y } = e;
      this._mouseX = x;
      this._mouseY = y;
    });
}

Object.defineProperties(App.prototype, {
  data: { value: app$data },
  datum: { value: app$datum },
  node: { value: app$node },
  width: { value: app$width },
  height: { value: app$height },
  render: { value: app$render },
  frame: { value: app$frame },
  start: { value: app$start },
  stop: { value: app$stop },
  shape: { value: app$shape },
  call: { value: app$call },
  mouseX: { value: app$mouseX },
  mouseY: { value: app$mouseY },
  dispose: { value: app$dispose },
  frameCount: { value: app$frameCount },
});

export function app(options) {
  return new App(options);
}
