import {svg} from "../src/index.js";
import {test, expect} from "vitest";

test("svg(tag, options) should return a SVG mark with expcted attributes", () => {
  const s = svg("circle", {cx: 0, cy: 0, r: 10});
  expect(s._tag).toBe("circle");
  expect(s._data).toEqual([0]);
  expect(s._options).toEqual({cx: 0, cy: 0, r: 10});
  expect(s._children).toEqual([]);
});

test("svg(tag, data, options) should return a SVG mark with expcted attributes", () => {
  const s = svg("circle", [1, 2, 3], {cx: 0, cy: 0, r: 10});
  expect(s._tag).toBe("circle");
  expect(s._data).toEqual([1, 2, 3]);
  expect(s._options).toEqual({cx: 0, cy: 0, r: 10});
  expect(s._children).toEqual([]);
});
