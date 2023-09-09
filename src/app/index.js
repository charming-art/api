import { app$data } from "./data.js";
import { app$frame } from "./frame.js";
import { app$height } from "./height.js";
import { app$node } from "./node.js";
import { app$render } from "./render.js";
import { app$start } from "./start.js";
import { app$stop } from "./stop.js";
import { app$width } from "./width.js";
import { app$shape } from "./shape.js";
import { app$background } from "./background.js";
import { app$call } from "./call.js";
import { app$mouseX, app$mouseY } from "./mouse.js";
import { app$dispose } from "./dispose.js";

function createContext(document, width = 640, height = 480, dpi = null) {
  if (dpi == null) dpi = devicePixelRatio;
  const canvas = document.createElement("canvas");
  canvas.width = width * dpi;
  canvas.height = height * dpi;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  const context = canvas.getContext("2d");
  context.scale(dpi, dpi);
  return context;
}

export function events(app) {
  const node = app.node();
  const mousemove = (e) => {
    const { x, y } = node.getBoundingClientRect();
    const { clientX, clientY } = e;
    app._mouseX = clientX - x;
    app._mouseY = clientY - y;
  };
  node.addEventListener("mousemove", mousemove);
  app._dispose = () => {
    node.addEventListener("mousemove", mousemove);
  };
}

function App({
  width = 640,
  height = 480,
  document = window.document,
  dpi = null,
  frameRate = 60,
} = {}) {
  Object.defineProperties(this, {
    _context: { value: createContext(document, width, height, dpi) },
    _width: { value: width, writable: true },
    _height: { value: height, writable: true },
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
  events(this);
}

Object.defineProperties(App.prototype, {
  data: { value: app$data },
  node: { value: app$node },
  width: { value: app$width },
  height: { value: app$height },
  render: { value: app$render },
  frame: { value: app$frame },
  start: { value: app$start },
  stop: { value: app$stop },
  shape: { value: app$shape },
  background: { value: app$background },
  call: { value: app$call },
  mouseX: { value: app$mouseX },
  mouseY: { value: app$mouseY },
  dispose: { value: app$dispose },
});

export function app(options) {
  return new App(options);
}
