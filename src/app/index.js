import { app$data } from "./data.js";
import { app$datum } from "./datum.js";
import { app$node } from "./node.js";
import { app$render } from "./render.js";
import { app$start } from "./start.js";
import { app$stop } from "./stop.js";
import { app$append } from "./append.js";
import { app$call } from "./call.js";
import { app$dispose } from "./dispose.js";
import { app$on } from "./on.js";
import { app$prop } from "./prop.js";
import { maybe } from "./maybe.js";
import { Emitter } from "../emitter.js";
import { canvas } from "../canvas/index.js";
import { Node } from "../node.js";
import { Flow } from "../flow/index.js";

function App({
  width = 640,
  height = 480,
  renderer = canvas(),
  frameRate = 60,
  dpi = null,
  ...rest
} = {}) {
  const root = new Node();
  const flow = new Flow([[0]], [0], root, this);
  const emitter = new Emitter();
  const props = {
    frameRate,
    frameCount: 0,
    mouseX: 0,
    mouseY: 0,
  };
  Object.defineProperties(this, {
    _renderer: { value: renderer },
    _stop: { value: false, writable: true },
    _reschedule: { value: true, writable: true },
    _timer: { value: null, writable: true },
    _dispose: { value: () => {}, writable: true },
    _root: { value: root },
    _flow: { value: flow },
    _emitter: { value: emitter },
    _props: { value: props, writable: false },
  });
  maybe(this._renderer, "init", { width, height, dpi, ...rest });
  maybe(this._renderer, "mousemove", (e) => {
    const { x, y } = e;
    this._props.mouseX = x;
    this._props.mouseY = y;
  });
  maybe(this._renderer, "mousedown", () => emitter.emit("mousedown", this));
  maybe(this._renderer, "mouseup", () => emitter.emit("mouseup", this));
  maybe(this._renderer, "mouseclick", () => emitter.emit("mouseclick", this));
}

Object.defineProperties(App.prototype, {
  data: { value: app$data },
  datum: { value: app$datum },
  node: { value: app$node },
  render: { value: app$render },
  start: { value: app$start },
  stop: { value: app$stop },
  append: { value: app$append },
  call: { value: app$call },
  dispose: { value: app$dispose },
  prop: { value: app$prop },
  on: { value: app$on },
});

export function app(options) {
  return new App(options);
}
