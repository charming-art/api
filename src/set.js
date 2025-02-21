const protoOf = Object.getPrototypeOf;

const propSetterCache = {};

const isFunction = (v) => typeof v === "function";

function setAttribute(dom, k, v) {
  const name = dom.tagName.toLowerCase();
  const getPropDescriptor = (proto) =>
    proto ? (Object.getOwnPropertyDescriptor(proto, k) ?? getPropDescriptor(protoOf(proto))) : undefined;
  const cacheKey = name + "," + k;
  const propSetter = (propSetterCache[cacheKey] ??= getPropDescriptor(protoOf(dom))?.set ?? 0);
  const setter = propSetter ? propSetter.bind(dom) : dom.setAttribute.bind(dom, k);
  setter(v);
}

export function set(node, props) {
  const nodes = [node].flat(Infinity);
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    for (const k in props) {
      const value = props[k];
      setAttribute(n, k, isFunction(value) ? value(n, i, nodes) : value);
    }
  }
}
