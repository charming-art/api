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
  render(container) {
    const {node, dispose} = render(this._options);

    if (container) {
      const el = typeof container === "string" ? document.querySelector(container) : container;
      el.appendChild(node);
    }

    this._node = node;
    this._disposer = dispose;
    return node;
  }
}

export function app(options) {
  return new App(options);
}
