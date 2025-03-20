import {app, svg, Mark} from "../src/index.js";
import {test, expect} from "vitest";

function html(tag, data, options) {
  return new Mark(tag, data, options);
}

test("cm.app() should draw without options.", () => {
  const node = app().render();
  expect(node.nodeName).toBe("svg");
});

test("cm.app(options) should draw without draw option.", () => {
  const node = app({}).render();
  expect(node.nodeName).toBe("svg");
});

test("cm.app(options) should return span element if contains only one svg element.", () => {
  const node = app({draw: [svg("svg", {})]}).render();
  expect(node.nodeName).toBe("SPAN");
});

test("cm.app(options) should return span element if only contains non-svg elements.", () => {
  const node = app({draw: [html("div", {})]}).render();
  expect(node.nodeName).toBe("SPAN");
});

test("cm.app(options) should set textContent for SVG text element corretly.", () => {
  const node = app({draw: [svg("text", {textContent: "hello world"})]}).render();
  const text = node.querySelector("text");
  expect(text.textContent).toBe("hello world");
});

test("cm.app(options) should stop timer when dispose() is called.", async () => {
  const app0 = app({loop: true, draw: ({time}) => [svg("circle", {id: "circle", r: time})]});
  const node = app0.render();
  const circle = node.querySelector("#circle");
  const r = circle.getAttribute("r");
  app0.dispose();
  await new Promise((resolve) => setTimeout(resolve, 100));
  expect(circle.getAttribute("r")).toBe(r);
});

test("cm.app(options) should pass time and frameCount for draw callback when loop is false.", () => {
  let t;
  let f;
  app({
    draw: ({time, frameCount}) => {
      t = time;
      f = frameCount;
      return [];
    },
  }).render();
  expect(t).toBe(0);
  expect(f).toBe(1);
});

test("cm.app({use}) should define decorators for makrs.", () => {
  const color = (node, color) => {
    node.setAttribute("fill", color);
    node.setAttribute("stroke", color);
    return node;
  };

  const node = app({
    use: {color},
    draw: [svg("circle", {r: 10, color: "red"})],
  }).render();

  const circle = node.querySelector("circle");
  expect(circle.getAttribute("fill")).toBe("red");
  expect(circle.getAttribute("stroke")).toBe("red");
});
