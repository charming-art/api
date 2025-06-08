const propSetterCache = {};

const protoOf = Object.getPrototypeOf;

const isFunc = (x) => typeof x === "function";

const isStr = (x) => typeof x === "string";

function postprocess(fragment) {
  if (fragment.firstChild === fragment.lastChild) return fragment.firstChild;
  return fragment;
}

function snake2kebab(str) {
  return str.replace(/_/g, "-");
}

// Ref: https://github.com/vanjs-org/van/blob/d09cfd1e1e3b5ea7cf8d0a9b5deacca4c0946fb4/src/van.js#L99
function set(dom, k, v) {
  k = snake2kebab(k);
  if (k.startsWith("on")) return dom.addEventListener(k.slice(2), v);
  if (k.startsWith("style-")) return dom.style.setProperty(k.slice(6), v);
  const get = (proto) => (proto ? (Object.getOwnPropertyDescriptor(proto, k) ?? get(protoOf(proto))) : undefined);
  const cacheKey = dom.nodeName + "," + k;
  const propSetter = (propSetterCache[cacheKey] ??= get(protoOf(dom))?.set ?? 0);
  const setter = propSetter ? propSetter.bind(dom) : dom.setAttribute.bind(dom, k);
  setter(v);
}

export function tag(ns, tag, data, options) {
  if (!isStr(tag)) return null;
  if (options === undefined) (options = data), (data = [0]);
  const root = document.createDocumentFragment();
  const {children = [], ...attrs} = options ?? {};
  const nodes = data.map((d, i, array) => {
    const dom = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      const val = k.startsWith("on") ? (e) => v(e, d, i, array) : isFunc(v) ? v(d, i, array) : v;
      set(dom, k, val);
    }
    const childNodes = isFunc(children)
      ? children(d, i, array).filter(Boolean)
      : children.filter(Boolean).map((child) => child.cloneNode(true));
    dom.append(...childNodes);
    return dom;
  });
  root.append(...nodes);
  return postprocess(root);
}

export function use(component, data, options) {
  if (options === undefined) (options = data), (data = [0]);
  const root = document.createDocumentFragment();
  const nodes = data.map((d, i, array) => {
    const props = {};
    for (const [k, v] of Object.entries(options)) props[k] = isFunc(v) ? v(d, i, array) : v;
    return component(props);
  });
  root.append(...nodes);
  return postprocess(root);
}

export const svg = tag.bind(null, "http://www.w3.org/2000/svg");

export const html = tag.bind(null, null);
