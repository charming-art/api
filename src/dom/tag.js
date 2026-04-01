import {set} from "./attr.js";

const TYPE_NODE = 1;

const TYPE_TEXT = 3;

const isFunc = (x) => typeof x === "function";

const isNode = (x) => x?.nodeType;

const isArray = Array.isArray;

const isPlainObject = (x) => typeof x === "object" && x !== null && !Array.isArray(x);

function postprocess(node) {
  if (node.firstChild === node.lastChild) {
    return node.firstChild;
  }
  return node;
}

function cloneNode(node) {
  const cloned = node.cloneNode(true);
  cloned.__context__ = node.__context__;
  return cloned;
}

function contextOf(node) {
  let p = node.parentNode;
  while (p) {
    if (p.__context__) return p.__context__;
    p = p.parentNode;
  }
  return null;
}

function hydrate(node, value) {
  if (!isPlainObject(value)) return;

  const {data, ...attrs} = value;
  const context = contextOf(node);

  // Non data driven node.
  if (!data && !context) {
    for (const [k, v] of Object.entries(attrs)) {
      const val = k.startsWith("on") ? v : isFunc(v) ? v(node) : v;
      set(node, k, val);
    }
    return;
  }

  // Non data driven node in a data driven parent.
  if (!data && context) {
    for (const [k, v] of Object.entries(attrs)) {
      const [d, i, array] = context;
      if (k.startsWith("on")) {
        const [l, o] = Array.isArray(v) ? v : [v];
        const val = (e) => l(e, node, d, i, array);
        set(node, k, [val, o]);
      } else {
        const val = isFunc(v) ? v(d, i, array, node) : v;
        set(node, k, val);
      }
    }
    return;
  }

  // Data driven node.
  const nodeData = context && isFunc(data) ? data(context[0], context[1], context[2], node) : data;
  const nodes = nodeData.map((d, i, array) => {
    const cloned = cloneNode(node);
    for (const [k, v] of Object.entries(attrs)) {
      if (k.startsWith("on")) {
        const [l, o] = Array.isArray(v) ? v : [v];
        const val = (e) => l(e, cloned, d, i, array);
        set(cloned, k, [val, o]);
      } else {
        const val = isFunc(v) ? v(d, i, array, node) : v;
        set(cloned, k, val);
      }
    }
    cloned.__context__ = [d, i, array, cloned];
    return cloned;
  });
  const temp = document.createDocumentFragment();
  temp.append(...nodes);
  node.parentNode.insertBefore(temp, node.nextSibling);

  return node;
}

function append(node, value) {
  const children = [isArray(value) ? value : [value]].flat(Infinity);
  const temp = document.createDocumentFragment();
  const c = contextOf(node);
  for (const child of children) {
    const n = isFunc(child) && c ? child(c[0], c[1], c[2]) : child;
    if (isNode(n)) temp.append(n);
  }
  node.parentNode.insertBefore(temp, node);
}

export function tag(render) {
  return function ({raw: strings}) {
    let string = "";
    for (let j = 0, m = strings.length; j < m; j++) {
      const input = strings[j];
      if (j > 0) string += "::" + j;
      string += input;
    }
    const root = render(string);
    const walker = document.createTreeWalker(root); // DFS walker.
    const removeNodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      switch (node.nodeType) {
        case TYPE_NODE: {
          const attributes = node.attributes;
          for (let i = 0, n = attributes.length; i < n; i++) {
            const {name} = attributes[i];
            if (/^::/.test(name)) {
              const value = arguments[+name.slice(2)];
              node.removeAttribute(name);
              const removed = hydrate(node, value);
              if (removed) {
                removeNodes.push(removed);
                walker.nextSibling(); // Skip the children of the removed node.
              }
            }
          }
          break;
        }
        case TYPE_TEXT: {
          const data = node.data.trim();
          if (/^::/.test(data)) {
            const value = arguments[+data.slice(2)];
            append(node, value);
            removeNodes.push(node);
          }
          break;
        }
        default:
          break;
      }
    }
    for (const node of removeNodes) node.remove();
    return postprocess(root);
  };
}
