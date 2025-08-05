const propSetterCache = {};

const protoOf = Object.getPrototypeOf;

const isFunc = (x) => typeof x === "function";

const isStr = (x) => typeof x === "string";

const isObjectLiteral = (x) => Object.prototype.toString.call(x) === "[object Object]";

const isMark = (x) => x instanceof Mark;

const isTruthy = (x) => x != null && x !== false;

function preprocess(options) {
  if (options.marks) {
    options.children = options.marks;
    delete options.marks;
  }
  return options;
}

function postprocess(nodes) {
  if (!nodes) return null;
  if (nodes.length === 1) return nodes[0];
  const fragment = document.createDocumentFragment();
  fragment.append(...nodes);
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

class Mark {
  constructor(ns, tag, data, options) {
    if (isObjectLiteral(data)) (options = data), (data = undefined);
    this._ns = ns;
    this._tag = tag;
    this._data = data;
    this._options = options;
  }
  clone() {
    return new Mark(this._ns, this._tag, this._data, this._options);
  }
  with(children) {
    this._options = {...this._options, children};
    return this;
  }
  render() {
    return postprocess(renderNodes(this));
  }
}

function renderNodes(mark) {
  const {_ns: ns, _tag: tag, _data: data = [undefined], _options: options = {}} = mark;
  if (!isStr(tag)) return null;
  const {children = [], ...attrs} = options;
  const nodes = data.map((d, i, array) => {
    const dom = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      const val = k.startsWith("on") ? (e) => v(e, d, i, array) : isFunc(v) ? v(d, i, array) : v;
      set(dom, k, val);
    }
    return dom;
  });
  for (const child of children.filter(isTruthy).flat(Infinity)) {
    const n = nodes.length;
    if (!isMark(child)) {
      for (let i = 0; i < n; i++) {
        const node = nodes[i];
        const datum = data[i];
        const text = isFunc(child) ? child(datum, i, data) : child;
        node.append(document.createTextNode(text));
      }
    } else if (child._data) {
      for (let i = 0; i < n; i++) {
        const node = nodes[i];
        const datum = data[i];
        const childData = child._data;
        const clonedChild = child.clone();
        clonedChild._data = isFunc(childData) ? childData(datum, i, data) : childData;
        const childNodes = renderNodes(clonedChild);
        node.append(...childNodes);
      }
    } else {
      const clonedChild = child.clone();
      clonedChild._data = data;
      const childNodes = renderNodes(clonedChild);
      for (let i = 0; i < n; i++) nodes[i].append(childNodes[i]);
    }
  }
  return nodes;
}

export const render = (options) => svg("svg", preprocess(options)).render();

export const tag = (ns) => (tag, data, options) => new Mark(ns, tag, data, options);

export const svg = tag("http://www.w3.org/2000/svg");

export const html = tag(null);
