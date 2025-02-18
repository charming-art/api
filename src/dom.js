// Inspired by https://github.com/observablehq/htl/blob/main/src/index.js
import {set} from "echox";

const isObjectLiteral = (value) => value && value.toString === Object.prototype.toString;

function renderHtml(string) {
  const template = document.createElement("template");
  template.innerHTML = string;
  return document.importNode(template.content, true);
}

function renderSvg(string) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.innerHTML = string;
  return g;
}

function hypertext(render, postprocess) {
  return function (strings, ...values) {
    let string = "";
    for (let i = 0; i < strings.length; i++) {
      string += strings[i];
      if (i < values.length) string += "::" + i;
    }
    const g = render(string);

    const walker = document.createTreeWalker(g, NodeFilter.SHOW_ELEMENT, null, false);

    while (walker.nextNode()) {
      const node = walker.currentNode;
      // Skip nodes that have already been processed.
      if (node.__htl__) continue;

      // For interpolate attributes.
      const attributes = node.attributes;
      const removeAttribute = [];
      const props = {};
      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];
        const match = /::(\d+)/.exec(attribute.name);
        if (match) {
          const value = values[match[1]];
          if (isObjectLiteral(value)) Object.assign(props, value);
        }
        removeAttribute.push(attribute);
      }
      for (const attribute of removeAttribute) node.removeAttribute(attribute.name);

      // For interpolate children.
      const children = [];
      let interpolated = false;
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        const nodes = Array.from(child.textContent.matchAll(/::(\d+)/g)).map((d) => values[+d[1]]);
        if (nodes.length) {
          interpolated = true;
          children.push(...nodes);
          node.removeChild(child);
        } else {
          children.push(child);
        }
      }

      if (interpolated) set(node, props, children);
      else set(node, props);
    }

    const node = postprocess(g);
    if (!node) return null;
    return Object.assign(node, {__htl__: true});
  };
}

export const svg = hypertext(renderSvg, (g) => {
  if (g.firstChild === null) return null;
  if (g.firstChild === g.lastChild) return g.removeChild(g.firstChild);
  return g;
});

export const html = hypertext(renderHtml, (fragment) => {
  if (fragment.firstChild === null) return null;
  if (fragment.firstChild === fragment.lastChild) return fragment.removeChild(fragment.firstChild);
  const span = document.createElement("span");
  span.appendChild(fragment);
  return span;
});
