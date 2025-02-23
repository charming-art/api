import {drawRef} from "./render.js";

let active;

function schedule(deps) {
  if (active) active.add(deps);
  else {
    active = new Set([deps]);
    setTimeout(() => {
      active.forEach((dep) => dep.forEach((fn) => fn()));
      active = null;
    });
  }
}

export function state(data) {
  const depsByKey = new Map();
  for (const key in data) depsByKey.set(key, new Set());
  return new Proxy(data, {
    get(target, key) {
      if (drawRef.current && key in data) depsByKey.get(key).add(drawRef.current);
      return target[key];
    },
    set(target, key, value) {
      if (depsByKey.has(key)) schedule(depsByKey.get(key));
      target[key] = value;
      return true;
    },
  });
}
