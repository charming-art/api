import {SVG, HTML} from "../src/index.js";
import {test, expect} from "vitest";

test("SVG[tag] should ignore 'then', 'next', and 'return' properties", () => {
  expect(SVG.then).toBe(undefined);
  expect(SVG.next).toBe(undefined);
  expect(SVG.return).toBe(undefined);
});

test("HTML[tag] should ignore 'then', 'next', and 'return' properties", () => {
  expect(HTML.then).toBe(undefined);
  expect(HTML.next).toBe(undefined);
  expect(HTML.return).toBe(undefined);
});

test("SVG.tag(options) should return a SVG collection with expcted attributes", () => {
  const svg = SVG.circle({cx: 0, cy: 0, r: 10});
  expect(svg._tag).toBe("circle");
  expect(svg._data).toEqual([0]);
  expect(svg._options).toEqual({cx: 0, cy: 0, r: 10});
  expect(svg._children).toEqual([]);
  expect(svg._nodes).toEqual([]);
  expect(svg._svg).toBe(true);
});

test("SVG.tag(data, options) should return a SVG collection with expcted attributes", () => {
  const svg = SVG.circle([1, 2, 3], {cx: 0, cy: 0, r: 10});
  expect(svg._tag).toBe("circle");
  expect(svg._data).toEqual([1, 2, 3]);
  expect(svg._options).toEqual({cx: 0, cy: 0, r: 10});
  expect(svg._children).toEqual([]);
  expect(svg._nodes).toEqual([]);
  expect(svg._svg).toBe(true);
});

test("HTML.tag(options) should return a HTML collection with expcted attributes", () => {
  const html = HTML.div({id: "test"});
  expect(html._tag).toBe("div");
  expect(html._data).toEqual([0]);
  expect(html._options).toEqual({id: "test"});
  expect(html._children).toEqual([]);
  expect(html._nodes).toEqual([]);
  expect(html._svg).toBe(false);
});

test("HTML.tag(data, options) should return a HTML collection with expcted attributes", () => {
  const html = HTML.div([1, 2, 3], {id: "test"});
  expect(html._tag).toBe("div");
  expect(html._data).toEqual([1, 2, 3]);
  expect(html._options).toEqual({id: "test"});
  expect(html._children).toEqual([]);
  expect(html._nodes).toEqual([]);
  expect(html._svg).toBe(false);
});
