import {app, svg} from "../src/index.js";
import {test, expect} from "vitest";

test("cm.app(options) should set textContent for SVG text element corretly.", () => {
  const node = app({draw: [svg("text", {textContent: "hello world"})]}).render();
  const text = node.querySelector("text");
  expect(text.textContent).toBe("hello world");
});
