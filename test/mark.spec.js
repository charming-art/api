import {Mark} from "../src/index.js";
import {test, expect} from "vitest";

test("cm.Mark should have expected defaults.", () => {
  const mark = new Mark([]);
  expect(mark._children).toEqual([]);
  expect(mark._update).toBe(null);
  expect(mark._nodes).toBe(null);
  expect(mark._next).toBe(null);
  expect(mark._nodesChildren).toBe(null);
});
