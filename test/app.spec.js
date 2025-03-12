import {app, svg} from "../src/index.js";
import {test, expect} from "vitest";

test("cm.app(options) should return span element if contains only one svg element.", () => {
  const node = app({draw: [svg("svg", {})]}).render();
  expect(node.nodeName).toBe("SPAN");
});

test("cm.app(options) should set textContent for SVG text element corretly.", () => {
  const node = app({draw: [svg("text", {textContent: "hello world"})]}).render();
  const text = node.querySelector("text");
  expect(text.textContent).toBe("hello world");
});
