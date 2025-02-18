import {interval} from "d3-timer";

function event(type, callback, options = {}) {
  if (typeof options === "boolean") options = {capture: options};
  window.addEventListener(type, callback, options);
  return () => window.removeEventListener(type, callback, options);
}

function animate(callback, {frameRate} = {}) {
  let frameCount = 0;
  const delay = frameRate ? 1000 / frameRate : undefined;
  const timer = interval((elapsed) => callback({elapsed, frameCount: ++frameCount}), delay);
  return () => timer.stop();
}

class Ticker {
  constructor() {
    this._disposers = [];
  }
  on(type, callback, options = {}) {
    const disposer = type === "animate" ? animate(callback, options) : event(type, callback, options);
    this._disposers.push(disposer);
    return this;
  }
  dispose() {
    this._disposers.forEach((disposer) => disposer());
    this._disposers = [];
  }
}

export function ticker() {
  return new Ticker();
}
