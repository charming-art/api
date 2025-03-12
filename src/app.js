import {render} from "../src/render.js";

class App {
  constructor(options) {
    this._options = options;
    this._node = null;
    this._disposer = null;
  }
  node() {
    return this._node;
  }
  dispose() {
    this._disposer?.();
  }
  render() {
    const {node, dispose} = render(this._options);
    this._node = node;
    this._disposer = dispose;
    return node;
  }
}

export function app(options) {
  return new App(options);
}
