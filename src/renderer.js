import {setAttribute} from "./set.js";

const namespaces = {
  svg: "http://www.w3.org/2000/svg",
};

function addEventListener(node, k, handler) {
  const key = "__" + k + "__";
  if (!node[key]) node.addEventListener(k.slice(2).toLowerCase(), (event) => node[key](event));
  node[key] = handler;
}

export class Renderer {
  create(tag) {
    const [key, name] = tag.split(":");
    const namespace = namespaces[key];
    if (namespace) return document.createElementNS(namespace, name);
    return document.createElement(name);
  }
  events(node, events) {
    for (const [k, v] of Object.entries(events)) addEventListener(node, k, v);
  }
  attrs(node, attrs) {
    for (const [k, v] of Object.entries(attrs)) setAttribute(node, k, v);
  }
}
