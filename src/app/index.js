import { app$data } from "./data.js";
import { app$datum } from "./datum.js";
import { app$frame } from "./frame.js";
import { app$height } from "./height.js";
import { app$node } from "./node.js";
import { app$render } from "./render.js";
import { app$start } from "./start.js";
import { app$stop } from "./stop.js";
import { app$width } from "./width.js";
import { app$append } from "./append.js";
import { app$call } from "./call.js";
import { app$mouseX, app$mouseY } from "./mouse.js";
import { app$dispose } from "./dispose.js";
import { app$frameCount } from "./frameCount.js";
import { app$afterAll } from "./afterAll.js";
import { app$afterEach } from "./afterEach.js";
import { app$beforeAll } from "./beforeAll.js";
import { app$beforeEach } from "./beforeEach.js";
import { app$mouseup } from "./mouseup.js";
import { app$mousedown } from "./mousedown.js";
import { canvas } from "../renderer/canvas.js";
import { Node } from "../node/index.js";
import { Flow } from "../flow/index.js";
import { maybe } from "./_maybe.js";
import { useHook } from "./_hook.js";

function App({
  width = 640,
  height = 480,
  renderer = canvas(),
  frameRate = 60,
  dpi = null,
} = {}) {
  const root = new Node();
  const flow = new Flow([[0]], [0], root, this);
  Object.defineProperties(this, {
    _renderer: { value: renderer },
    _stop: { value: false, writable: true },
    _reschedule: { value: true, writable: true },
    _hooks: { value: {}, writable: true },
    _frameRate: { value: frameRate, writable: true },
    _frameCount: { value: 0, writable: true },
    _timer: { value: null, writable: true },
    _mouseX: { value: 0, writable: true },
    _mouseY: { value: 0, writable: true },
    _dispose: { value: () => {}, writable: true },
    _root: { value: root },
    _flow: { value: flow },
  });
  maybe(this._renderer, "size", width, height, dpi);
  maybe(this._renderer, "mousemove", (e) => {
    const { x, y } = e;
    this._mouseX = x;
    this._mouseY = y;
  });
  maybe(this._renderer, "mousedown", () => useHook(this, "mousedown"));
  maybe(this._renderer, "mouseup", () => useHook(this, "mouseup"));
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
  append: { value: app$append },
  call: { value: app$call },
  mouseX: { value: app$mouseX },
  mouseY: { value: app$mouseY },
  dispose: { value: app$dispose },
  frameCount: { value: app$frameCount },
  afterAll: { value: app$afterAll },
  afterEach: { value: app$afterEach },
  beforeAll: { value: app$beforeAll },
  beforeEach: { value: app$beforeEach },
  mouseup: { value: app$mouseup },
  mousedown: { value: app$mousedown },
});

export function app(options) {
  return new App(options);
}
