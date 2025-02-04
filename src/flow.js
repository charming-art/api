import {reactive} from "echox";

function event(state, key, callback, options) {
  const listener = (event) => callback(event, state);
  window.addEventListener(key, listener, options);
  return () => window.removeEventListener(key, listener);
}

function flow_on(key, callback, options) {
  return this.observe((state) => {
    return event(state, key, callback, options);
  });
}

export function flow() {
  const rx = reactive();
  rx.constructor.prototype.on ??= flow_on;
  return rx;
}
