import {reactive} from "echox";
import {interval} from "d3-timer";

const listenersByKey = new Map();
const handlerByKey = new Map();
const optionsByKey = new Map();

const keyof = (options) =>
  Object.keys(options)
    .sort()
    .map((k) => `${k}=${options[k]}`)
    .join(",");

// For better performance, we can use a single event listener for all events with the same event type and options.
function event(state, type, callback, options = {}) {
  if (typeof options === "boolean") options = {capture: options};

  const key = `${type}:${keyof(options)}`;
  const listeners = listenersByKey.get(key) ?? new Set();

  if (listeners.size === 0) {
    const handler = (event) => listeners.forEach((l) => l(event, state));
    window.addEventListener(type, handler, options);
    handlerByKey.set(key, handler);
    optionsByKey.set(key, options);
  }

  const listener = (event) => callback(event, state);
  listeners.add(listener);
  listenersByKey.set(key, listeners);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener(type, handlerByKey.get(key), optionsByKey.get(key));
      listenersByKey.delete(key);
      handlerByKey.delete(key);
      optionsByKey.delete(key);
    }
  };
}

// d3-timer has already to put tasks with same frame rate in the same timer, so we don't need to do anything special here.
function loop(state, _, callback, {frameRate} = {}) {
  let frameCount = 0;
  const delay = frameRate ? 1000 / frameRate : undefined;
  const timer = interval((elapsed) => callback({elapsed, frameCount: ++frameCount}, state), delay);
  return () => timer.stop();
}

function flow_on(key, callback, options) {
  const call = key === "loop" ? loop : event;
  return this.effect((state) => {
    return call(state, key, callback, options);
  });
}

export function flow() {
  const rx = reactive();
  rx.constructor.prototype.on ??= flow_on;
  return rx;
}
