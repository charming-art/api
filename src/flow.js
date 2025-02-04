import {reactive} from "echox";
import {interval} from "d3-timer";

function event(state, key, callback, options) {
  const listener = (event) => callback(event, state);
  window.addEventListener(key, listener, options);
  return () => window.removeEventListener(key, listener);
}

function loop(state, _, callback, {frameRate} = {}) {
  let frameCount = 0;
  const delay = frameRate ? 1000 / frameRate : undefined;
  const timer = interval((elapsed) => callback({elapsed, frameCount: ++frameCount}, state), delay);
  return () => timer.stop();
}

function flow_on(key, callback, options) {
  const call = key === "loop" ? loop : event;
  return this.observe((state) => {
    return call(state, key, callback, options);
  });
}

export function flow() {
  const rx = reactive();
  rx.constructor.prototype.on ??= flow_on;
  return rx;
}
