const propSetterCache = {};
const propGetterCache = {};

const protoOf = Object.getPrototypeOf;

function snake2kebab(str) {
  return str.replace(/_/g, "-");
}

const eventsByDOM = new WeakMap();

const getProp = (p, k) => (p ? (Object.getOwnPropertyDescriptor(p, k) ?? getProp(protoOf(p), k)) : undefined);

// Ref: https://github.com/vanjs-org/van/blob/d09cfd1e1e3b5ea7cf8d0a9b5deacca4c0946fb4/src/van.js#L99
export function set(dom, k, v) {
  k = snake2kebab(k);
  if (k.startsWith("on")) {
    k = k.slice(2);
    const events = eventsByDOM.get(dom) ?? {};
    const prev = events[k];
    if (prev) dom.removeEventListener(k, prev);
    if (v !== null) {
      const [l, o] = Array.isArray(v) ? v : [v];
      dom.addEventListener(k, (events[k] = (e) => l(e, dom, undefined, undefined, undefined)), o);
    }
    return eventsByDOM.set(dom, events);
  }
  if (k.startsWith("style-")) {
    if (v === null) dom.style.removeProperty(k.slice(6));
    else dom.style.setProperty(k.slice(6), v);
    return;
  }
  const cacheKey = dom.nodeName + "," + k;
  const propSetter = (propSetterCache[cacheKey] ??= getProp(protoOf(dom), k)?.set ?? 0);
  const setter = propSetter ? propSetter.bind(dom) : dom.setAttribute.bind(dom, k);
  if (v === null) {
    if (propSetter) dom[k] = null;
    else dom.removeAttribute(k);
  } else setter(v);
}

function get(dom, k) {
  k = snake2kebab(k);
  if (k.startsWith("on")) return eventsByDOM.get(dom)?.[k.slice(2)];
  if (k.startsWith("style-")) return dom.style.getPropertyValue(k.slice(6));
  const value = dom.getAttribute(k);
  if (value !== null) return value;
  const cacheKey = dom.nodeName + "," + k;
  const propGetter = (propGetterCache[cacheKey] ??= getProp(protoOf(dom), k)?.get ?? 0);
  if (propGetter) return propGetter.call(dom);
  return null;
}

export function attr(dom, k, v) {
  if (arguments.length === 2) return get(dom, k);
  set(dom, k, v);
}
