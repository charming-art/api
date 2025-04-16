import {svg, html} from "../src/index.js";
import {test, expect} from "vitest";

test("svg(svg) should draw without options.", () => {
  const root = svg("svg");
  root.render();
  expect(root.node().nodeName).toBe("svg");
});

test("svg(svg) should draw without children option.", () => {
  const root = svg("svg", {});
  root.render();
  expect(root.node().nodeName).toBe("svg");
});

test("svg(text, options) should set textContent for SVG text element correctly.", () => {
  const root = svg("svg", {children: [svg("text", {textContent: "hello world"})]});
  root.render();
  const text = root.node().querySelector("text");
  expect(text.textContent).toBe("hello world");
});

test("svg(tag, options) should return a SVG mark with expected attributes", () => {
  const s = svg("circle", {cx: 0, cy: 0, r: 10});
  expect(s._tag).toBe("svg:circle");
  expect(s._data).toEqual([0]);
  expect(s._options).toEqual({cx: 0, cy: 0, r: 10});
  expect(s._children).toEqual([]);
});

test("html(tag, options) should return a HTML mark with expected attributes", () => {
  const s = html("div", {class: "test"});
  expect(s._tag).toBe("div");
  expect(s._data).toEqual([0]);
  expect(s._options).toEqual({class: "test"});
  expect(s._children).toEqual([]);
});

test("svg(tag, data, options) should return a SVG mark with expected attributes", () => {
  const s = svg("circle", [1, 2, 3], {cx: 0, cy: 0, r: 10});
  expect(s._tag).toBe("svg:circle");
  expect(s._data).toEqual([1, 2, 3]);
  expect(s._options).toEqual({cx: 0, cy: 0, r: 10});
  expect(s._children).toEqual([]);
});

test("svg.node() should return the first node of the SVG mark", () => {
  const s = svg("circle", {cx: 0, cy: 0, r: 10});
  s.render();
  const node = s.node();
  expect(node.tagName).toBe("circle");
  expect(node.getAttribute("cx")).toBe("0");
  expect(node.getAttribute("cy")).toBe("0");
  expect(node.getAttribute("r")).toBe("10");
});

test("svg.node() should return the first node of the SVG mark with children", () => {
  const s = svg("g", {
    children: [svg("circle", {cx: 0, cy: 0, r: 10})],
  });
  s.render();
  const node = s.node();
  expect(node.tagName).toBe("g");
  expect(node.children.length).toBe(1);
  expect(node.children[0].tagName).toBe("circle");
  expect(node.children[0].getAttribute("cx")).toBe("0");
  expect(node.children[0].getAttribute("cy")).toBe("0");
  expect(node.children[0].getAttribute("r")).toBe("10");
});

test("svg(svg, {loop: true}) should stop timer when unmount() is called.", async () => {
  const root = svg("svg", {
    loop: true,
    children: ({time}) => [svg("circle", {id: "circle", r: time})],
  });
  root.render();
  const node = root.node();
  const circle = node.querySelector("#circle");
  const r = circle.getAttribute("r");
  root.unmount();
  await new Promise((resolve) => setTimeout(resolve, 100));
  expect(circle.getAttribute("r")).toBe(r);
});

test("svg(svg, {loop: true}) should pass time and frameCount for draw callback when loop is false.", () => {
  let t;
  let f;
  svg("svg", {
    children: ({time, frameCount}) => {
      t = time;
      f = frameCount;
      return [];
    },
  }).render();
  expect(t).toBe(0);
  expect(f).toBe(0);
});
