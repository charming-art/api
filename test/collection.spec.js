import {svg, html} from "../src/index.js";
import {test, expect} from "vitest";

test("SVG.tag(options) should return a SVG collection with expcted attributes", () => {
  const s = svg("circle", {cx: 0, cy: 0, r: 10});
  expect(s._tag).toBe("circle");
  expect(s._data).toEqual([0]);
  expect(s._options).toEqual({cx: 0, cy: 0, r: 10});
  expect(s._children).toEqual([]);
  expect(s._nodes).toEqual([]);
  expect(s._svg).toBe(true);
});

test("SVG.tag(data, options) should return a SVG collection with expcted attributes", () => {
  const s = svg("circle", [1, 2, 3], {cx: 0, cy: 0, r: 10});
  expect(s._tag).toBe("circle");
  expect(s._data).toEqual([1, 2, 3]);
  expect(s._options).toEqual({cx: 0, cy: 0, r: 10});
  expect(s._children).toEqual([]);
  expect(s._nodes).toEqual([]);
  expect(s._svg).toBe(true);
});

test("HTML.tag(options) should return a HTML collection with expcted attributes", () => {
  const h = html("div", {id: "test"});
  expect(h._tag).toBe("div");
  expect(h._data).toEqual([0]);
  expect(h._options).toEqual({id: "test"});
  expect(h._children).toEqual([]);
  expect(h._nodes).toEqual([]);
  expect(h._svg).toBe(false);
});

test("HTML.tag(data, options) should return a HTML collection with expcted attributes", () => {
  const h = html("div", [1, 2, 3], {id: "test"});
  expect(h._tag).toBe("div");
  expect(h._data).toEqual([1, 2, 3]);
  expect(h._options).toEqual({id: "test"});
  expect(h._children).toEqual([]);
  expect(h._nodes).toEqual([]);
  expect(h._svg).toBe(false);
});
