import {Mark} from "../src/index.js";
import {test, expect} from "vitest";

test("Mark should have expected defaults.", () => {
  const mark = new Mark();
  expect(mark._children).toEqual([]);
  expect(mark._data).toEqual([0]);
  expect(mark._options).toEqual({});
  expect(mark._tag).toBe(undefined);
  expect(mark._update).toBe(null);
  expect(mark._nodes).toBe(null);
  expect(mark._next).toBe(null);
  expect(mark._nodesChildren).toBe(null);
});

test("Mark.clone should return a new Mark with the same properties", () => {
  const mark = new Mark("svg:circle", [1, 2, 3], {cx: 0, cy: 0, r: 10}, []);
  const cloned = mark.clone();
  expect(cloned).toBeInstanceOf(Mark);
  expect(cloned._tag).toBe("svg:circle");
  expect(cloned._data).toEqual([1, 2, 3]);
  expect(cloned._options).toEqual({cx: 0, cy: 0, r: 10});
  expect(cloned._children).toEqual([]);
});
