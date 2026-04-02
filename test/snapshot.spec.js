import "./install-canvas-mock.js";
import {test, expect} from "vitest";
import * as snapshots from "./cases/index.js";

const hasOnly = Object.values(snapshots).some((fn) => fn.only);
const filtered = hasOnly ? Object.fromEntries(Object.entries(snapshots).filter(([, fn]) => fn.only)) : snapshots;

const TYPE_TEXT = 3;

function cleanWhitespace(root) {
  if (!(root instanceof Node)) return root;
  const walker = document.createTreeWalker(root);
  const removeNodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    switch (node.nodeType) {
      case TYPE_TEXT: {
        const text = node.data.trim();
        node.data = text;
        if (text === "") {
          removeNodes.push(node);
        }
      }
    }
  }
  for (const node of removeNodes) node.remove();
  return root;
}

function isCanvas(node) {
  return node instanceof HTMLCanvasElement;
}

for (const [name, fn] of Object.entries(filtered)) {
  test(`${name} should match snapshot`, async () => {
    const node = fn();
    const value = isCanvas(node) ? node.toString() : cleanWhitespace(node);
    const ext = isCanvas(node) ? "txt" : "html";
    await expect(value).toMatchFileSnapshot(`./output/${name}.${ext}`);
  });
}
