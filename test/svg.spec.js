import {svg, html} from "../src/index.js";
import {test, expect} from "vitest";

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
  const node = s.node();
  expect(node.tagName).toBe("g");
  expect(node.children.length).toBe(1);
  expect(node.children[0].tagName).toBe("circle");
  expect(node.children[0].getAttribute("cx")).toBe("0");
  expect(node.children[0].getAttribute("cy")).toBe("0");
  expect(node.children[0].getAttribute("r")).toBe("10");
});
