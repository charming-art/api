const propSetterCache = {};

const protoOf = Object.getPrototypeOf;

function snake2kebab(str) {
  return str.replace(/_/g, "-");
}

// Ref: https://github.com/vanjs-org/van/blob/d09cfd1e1e3b5ea7cf8d0a9b5deacca4c0946fb4/src/van.js#L99
export function attr(dom, k, v) {
  k = snake2kebab(k);
  if (k.startsWith("on")) return dom.addEventListener(k.slice(2), v);
  if (k.startsWith("style-")) return dom.style.setProperty(k.slice(6), v);
  const get = (proto) => (proto ? (Object.getOwnPropertyDescriptor(proto, k) ?? get(protoOf(proto))) : undefined);
  const cacheKey = dom.nodeName + "," + k;
  const propSetter = (propSetterCache[cacheKey] ??= get(protoOf(dom))?.set ?? 0);
  const setter = propSetter ? propSetter.bind(dom) : dom.setAttribute.bind(dom, k);
  setter(v);
}
